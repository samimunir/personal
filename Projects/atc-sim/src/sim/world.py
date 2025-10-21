from dataclasses import dataclass, field
from typing import List, Tuple, Optional
import math, random, time
from .aircraft import Aircraft
from .conflict import build_conflicts, Proximity

from config import (
    AIRPORT_ICAO, RUNWAY_HEADING_DEG, RUNWAY_LENGTH_FT, RUNWAY_WIDTH_FT,
    RUNWAY_CENTER_WX, RUNWAY_CENTER_WY,
    ARRIVAL_RING_RADIUS_NM, ARRIVAL_MIN_ALT_FT, ARRIVAL_MAX_ALT_FT,
    ARRIVAL_MIN_SPD_KTS, ARRIVAL_MAX_SPD_KTS,
    DEPARTURE_INIT_ALT_FT, DEPARTURE_INIT_SPD_KTS, DEPARTURE_CLIMB_FPM,
    TRAILS_ENABLED, TRAIL_MAX_POINTS, TRAIL_SAMPLE_SEC,
    ALERT_LATERAL_NM, ALERT_VERTICAL_FT, LATERAL_SEP_NM, VERTICAL_SEP_FT,
)

FT_PER_NM = 6076.12

@dataclass
class Runway:
    heading_deg: float
    length_ft: float
    width_ft: float
    center_wx: float
    center_wy: float

    def endpoints(self) -> Tuple[Tuple[float, float], Tuple[float, float]]:
        half_len_nm = (self.length_ft / FT_PER_NM) / 2.0
        hdg_rad = math.radians(self.heading_deg)
        dx = math.sin(hdg_rad) * half_len_nm
        dy = math.cos(hdg_rad) * half_len_nm
        a = (self.center_wx - dx, self.center_wy - dy)
        b = (self.center_wx + dx, self.center_wy + dy)
        return a, b

@dataclass
class World:
    icao: str
    runway: Runway
    fixes: List[Tuple[str, float, float]] = field(default_factory=list)
    aircraft: List[Aircraft] = field(default_factory=list)
    next_seq: int = 1

    # runtime state
    selected: Optional[Aircraft] = None
    conflicts: List[Proximity] = field(default_factory=list)

    # trail timing
    _trail_accum: float = 0.0

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

    def spawn_arrival(self) -> Aircraft:
        brg = random.uniform(0, 360)
        brg_rad = math.radians(brg)
        wx = self.runway.center_wx + math.sin(brg_rad) * ARRIVAL_RING_RADIUS_NM
        wy = self.runway.center_wy + math.cos(brg_rad) * ARRIVAL_RING_RADIUS_NM

        alt = random.uniform(ARRIVAL_MIN_ALT_FT, ARRIVAL_MAX_ALT_FT)
        spd = random.uniform(ARRIVAL_MIN_SPD_KTS, ARRIVAL_MAX_SPD_KTS)
        vec_to_field = math.degrees(math.atan2(self.runway.center_wx - wx, self.runway.center_wy - wy)) % 360

        ac = Aircraft(
            callsign=f"Z{self.next_seq:03d}",
            wx=wx, wy=wy, alt_ft=alt,
            hdg_deg=vec_to_field, spd_kts=spd, vs_fpm=0.0,
            is_arrival=True,
            tgt_hdg_deg=vec_to_field,
            tgt_alt_ft=None, tgt_spd_kts=spd
        )
        self.next_seq += 1
        self.aircraft.append(ac)
        return ac

    def spawn_departure(self) -> Aircraft:
        hdg = self.runway.heading_deg
        ac = Aircraft(
            callsign=f"Z{self.next_seq:03d}",
            wx=self.runway.center_wx,
            wy=self.runway.center_wy,
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

    def update(self, dt: float):
        for ac in self.aircraft:
            ac.update(dt)

        # Trails sampling
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

def make_default_world(rng_seed: Optional[int] = None) -> World:
    if rng_seed is not None:
        random.seed(rng_seed)
    rw = Runway(
        heading_deg=RUNWAY_HEADING_DEG,
        length_ft=RUNWAY_LENGTH_FT,
        width_ft=RUNWAY_WIDTH_FT,
        center_wx=RUNWAY_CENTER_WX,
        center_wy=RUNWAY_CENTER_WY,
    )
    w = World(icao=AIRPORT_ICAO, runway=rw)
    w.seed_fixes()
    return w