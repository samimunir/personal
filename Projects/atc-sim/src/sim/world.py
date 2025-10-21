from dataclasses import dataclass, field
from typing import List, Tuple, Optional
import math, random

from .aircraft import Aircraft
from .conflict import build_conflicts, Proximity
from .airport import Airport, Runway, RunwayEnd, build_airport

from config import (
    AIRPORT_ICAO, RUNWAYS_DEF, DEFAULT_ACTIVE_ARRIVAL, DEFAULT_ACTIVE_DEPARTURE,
    ARRIVAL_RING_RADIUS_NM, ARRIVAL_MIN_ALT_FT, ARRIVAL_MAX_ALT_FT,
    ARRIVAL_MIN_SPD_KTS, ARRIVAL_MAX_SPD_KTS,
    DEPARTURE_INIT_ALT_FT, DEPARTURE_INIT_SPD_KTS, DEPARTURE_CLIMB_FPM,
    TRAILS_ENABLED, TRAIL_MAX_POINTS, TRAIL_SAMPLE_SEC,
    ALERT_LATERAL_NM, ALERT_VERTICAL_FT, LATERAL_SEP_NM, VERTICAL_SEP_FT,
)

FT_PER_NM = 6076.12

@dataclass
class World:
    airport: Airport
    fixes: List[Tuple[str, float, float]] = field(default_factory=list)
    aircraft: List[Aircraft] = field(default_factory=list)
    next_seq: int = 1

    selected: Optional[Aircraft] = None
    conflicts: List[Proximity] = field(default_factory=list)
    _trail_accum: float = 0.0

    # ----- Fixes -----
    def seed_fixes(self):
        self.fixes = [
            ("NORTH", 0.0, 12.0),
            ("SOUTH", 0.0, -14.0),
            ("EAST",  16.0, 0.0),
            ("WEST", -18.0, 0.0),
            ("KILO",  10.0, 10.0),
            ("MIKE", -12.0, 8.0),
        ]

    def find_fix(self, name: str) -> Optional[Tuple[str, float, float]]:
        name = name.strip().upper()
        for fx in self.fixes:
            if fx[0] == name:
                return fx
        return None

    # ----- Active runway ends -----
    def get_active_arrival_end(self) -> RunwayEnd:
        return self.airport.active_arrival

    def get_active_departure_end(self) -> RunwayEnd:
        return self.airport.active_departure

    def cycle_active_arrival(self):
        self.airport.cycle_arrival()

    def cycle_active_departure(self):
        self.airport.cycle_departure()

    # ----- Spawning -----
    def spawn_arrival(self) -> Aircraft:
        """Spawn far from field (on ring) and aim toward active ARR end threshold."""
        end = self.get_active_arrival_end()
        brg = random.uniform(0, 360)
        brg_rad = math.radians(brg)
        # position on ring
        wx = end.threshold_wx + math.sin(brg_rad) * ARRIVAL_RING_RADIUS_NM
        wy = end.threshold_wy + math.cos(brg_rad) * ARRIVAL_RING_RADIUS_NM

        alt = random.uniform(ARRIVAL_MIN_ALT_FT, ARRIVAL_MAX_ALT_FT)
        spd = random.uniform(ARRIVAL_MIN_SPD_KTS, ARRIVAL_MAX_SPD_KTS)

        # heading roughly toward threshold
        vec_to_thr = math.degrees(math.atan2(end.threshold_wx - wx, end.threshold_wy - wy)) % 360

        ac = Aircraft(
            callsign=f"Z{self.next_seq:03d}",
            wx=wx, wy=wy, alt_ft=alt,
            hdg_deg=vec_to_thr, spd_kts=spd, vs_fpm=0.0,
            is_arrival=True,
            tgt_hdg_deg=vec_to_thr,
            tgt_alt_ft=None, tgt_spd_kts=spd
        )
        self.next_seq += 1
        self.aircraft.append(ac)
        return ac

    def spawn_departure(self) -> Aircraft:
        """Spawn at active DEP end threshold and accelerate/climb along its course."""
        end = self.get_active_departure_end()
        hdg = end.course_deg
        ac = Aircraft(
            callsign=f"Z{self.next_seq:03d}",
            wx=end.threshold_wx,
            wy=end.threshold_wy,
            alt_ft=DEPARTURE_INIT_ALT_FT,
            hdg_deg=hdg,
            spd_kts=DEPARTURE_INIT_SPD_KTS,
            vs_fpm=DEPARTURE_CLIMB_FPM,
            is_arrival=False,
            tgt_hdg_deg=hdg,
            tgt_alt_ft=10000.0,
            tgt_spd_kts=250.0
        )
        self.next_seq += 1
        self.aircraft.append(ac)
        return ac

    # ----- Update loop -----
    def update(self, dt: float):
        for ac in self.aircraft:
            ac.update(dt)

        # Trails
        if TRAILS_ENABLED:
            self._trail_accum += dt
            if self._trail_accum >= TRAIL_SAMPLE_SEC:
                self._trail_accum = 0.0
                for ac in self.aircraft:
                    ac._trail.append((ac.wx, ac.wy))
                    if len(ac._trail) > TRAIL_MAX_POINTS:
                        ac._trail.pop(0)

        # Conflicts
        self.conflicts = build_conflicts(
            self.aircraft, cell_nm=5.0,
            alert_lat_nm=ALERT_LATERAL_NM, alert_vert_ft=ALERT_VERTICAL_FT,
            sep_lat_nm=LATERAL_SEP_NM, sep_vert_ft=VERTICAL_SEP_FT
        )

# ----- Factory -----
def make_default_world(rng_seed: Optional[int] = None) -> World:
    if rng_seed is not None:
        random.seed(rng_seed)

    airport = build_airport(
        AIRPORT_ICAO, RUNWAYS_DEF,
        default_arr=DEFAULT_ACTIVE_ARRIVAL,
        default_dep=DEFAULT_ACTIVE_DEPARTURE
        # active ends can be changed at runtime
    )

    w = World(airport=airport)
    w.seed_fixes()
    return w