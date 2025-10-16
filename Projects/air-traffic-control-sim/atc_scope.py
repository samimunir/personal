import math, time, random, sys
import pygame
from collections import deque
from typing import Optional, List, Dict, Tuple, Deque

# =========================
# Core Sim Constants
# =========================
DT = 0.1  # sim tick (10 Hz)
NM_TO_M = 1852.0
FT_TO_M = 0.3048
KTS_TO_MPS = NM_TO_M / 3600.0
DEG2RAD = math.pi / 180.0

LATERAL_SEP_NM = 5.0
VERT_SEP_FT = 1000.0
LOOKAHEAD_SEC = 120.0

ROUTE_ARRIVE_THRESH_NM = 0.7      # advance distance on FMS leg
HOLD_RWY_HDG_UNTIL_FT = 1500.0    # departure RWY heading hold
DEFAULT_VS_FPM = 1800.0           # climb/descent rate
ARRIVED_DESPAWN_SEC = 6.0         # parked arrival lifetime
GS_FTPER_NM = 318.0               # ~3.0 degree glide slope

# ----- Final capture envelope (tunable) -----
FINAL_MAX_DIST_NM        = 12.0   # must be within this from threshold
FINAL_MAX_OFFSET_NM      = 1.2    # max lateral offset from extended centerline
FINAL_MAX_INTERCEPT_DEG  = 30.0   # max difference between hdg and runway inbound
FINAL_GS_FTPER_NM        = 318.0  # ~3 deg (for gating)
FINAL_GS_ABOVE_WINDOW_FT = 250.0  # block capture if above GS by more than this
FINAL_MIN_ALT_FT         = 800.0  # don't capture if too high very close-in

AUTO_CAPTURE_DEFAULT = True

# ----- Traffic generation settings -----
DIFF_PROFILES = {
    "EASY":   {"spawn_period_s": (18, 28), "max_total": 12, "weights": (0.35, 0.40, 0.25)},  # dep, arr, trn
    "MEDIUM": {"spawn_period_s": (10, 16), "max_total": 22, "weights": (0.35, 0.45, 0.20)},
    "HARD":   {"spawn_period_s": (6, 10),  "max_total": 34, "weights": (0.30, 0.50, 0.20)},
}
DEFAULT_DIFFICULTY = "EASY"

# =========================
# Math Helpers
# =========================
class Vec2:
    __slots__ = ("x", "y")
    def __init__(self, x=0.0, y=0.0): self.x=x; self.y=y
    def __add__(self,o): return Vec2(self.x+o.x, self.y+o.y)
    def __sub__(self,o): return Vec2(self.x-o.x, self.y-o.y)
    def scale(self,k): return Vec2(self.x*k,self.y*k)
    def mag(self): return math.hypot(self.x,self.y)

def bearing_to_vec(deg):
    r = deg * DEG2RAD
    # 0 deg = north; x east, y north (screen y grows down; flip in render)
    return Vec2(math.sin(r), math.cos(r))

def clamp(v, lo, hi): return max(lo, min(hi, v))
def nm_distance_xy(ax, ay, bx, by): return math.hypot(ax-bx, ay-by)
def norm_angle_err(a, b): return ((a - b + 540) % 360) - 180  # signed shortest diff a-b

# =========================
# Nav Points
# =========================
class NavPoint:
    __slots__ = ("name","pos_nm")
    def __init__(self, name: str, pos_nm: Vec2): self.name=name; self.pos_nm=pos_nm

# =========================
# Airports & Runways
# =========================
class Runway:
    __slots__ = ("name","hdg_deg","center_nm","length_nm","half_width_nm","occupied_until","parts")
    def __init__(self, name: str, hdg_deg: float, center_nm: Vec2, length_nm=2.0, width_m=45):
        """
        name like '04/22'.
        Forward heading (hdg_deg) -> THR_B, reciprocal -> THR_A.
        parts[0] (e.g., '04') maps to THR_B; parts[1] (e.g., '22') maps to THR_A.
        """
        self.name = name
        self.hdg_deg = hdg_deg
        self.center_nm = center_nm
        self.length_nm = length_nm
        self.half_width_nm = (width_m/2.0)/NM_TO_M
        self.occupied_until = 0.0
        self.parts = tuple(name.replace(" ", "").split("/")) if "/" in name else (name,)

    def endpoints(self) -> Tuple[Vec2, Vec2]:
        v = bearing_to_vec(self.hdg_deg)
        half = self.length_nm/2.0
        a = Vec2(self.center_nm.x - v.x*half, self.center_nm.y - v.y*half)  # reciprocal end -> THR_A
        b = Vec2(self.center_nm.x + v.x*half, self.center_nm.y + v.y*half)  # forward end   -> THR_B
        return a, b

    def thr_for_designator(self, dsg: str) -> Optional[str]:
        d = dsg.upper().lstrip("0")
        def norm(s): return s.upper().lstrip("0")
        if len(self.parts) >= 2:
            if norm(self.parts[0]) == d: return "THR_B"
            if norm(self.parts[1]) == d: return "THR_A"
        else:
            if norm(self.parts[0]) == d: return "THR_B"
        return None

class Airport:
    __slots__ = ("icao","name","pos_nm","runways")
    def __init__(self, icao: str, name: str, pos_nm: Vec2):
        self.icao = icao
        self.name = name
        self.pos_nm = pos_nm
        self.runways: List[Runway] = []

    def add_runway(self, name: str, hdg_deg: float, length_nm=2.0, width_m=45):
        self.runways.append(Runway(name, hdg_deg, self.pos_nm, length_nm=length_nm, width_m=width_m))

# =========================
# Aircraft & Simple FMS
# =========================
class Aircraft:
    __slots__ = (
        "cs","pos","alt_m","gs_mps","hdg_deg",
        "tgt_alt_m","tgt_spd_mps","tgt_hdg_deg",
        "max_turn_rate_dps","vs_mps","hue",
        "flight_type","on_ground","airborne","phase",
        "assigned_rw","roll_timer",
        "route","route_idx","exit_fix","arrival_icao",
        "dep_runway_hdg","hold_rwy_hdg_until_m",
        "nav_mode","selectable","frozen","despawn_at",
        "pref_arr_rwy","heat_on","trail","auto_capture"
    )
    def __init__(self, cs: str, pos_nm, alt_ft: float, gs_kts: float, hdg_deg: float, flight_type="TRANSIT"):
        self.cs = cs
        self.pos = Vec2(pos_nm[0]*NM_TO_M, pos_nm[1]*NM_TO_M)
        self.alt_m = alt_ft*FT_TO_M
        self.gs_mps = gs_kts*KTS_TO_MPS
        self.hdg_deg = hdg_deg

        self.tgt_alt_m = self.alt_m
        self.tgt_spd_mps = self.gs_mps
        self.tgt_hdg_deg = self.hdg_deg

        self.max_turn_rate_dps = 3.0
        self.vs_mps = DEFAULT_VS_FPM * FT_TO_M / 60.0
        self.hue = random.random()

        self.flight_type = flight_type  # "DEP" | "ARR" | "TRANSIT"
        self.on_ground = (flight_type=="DEP")
        self.airborne = not self.on_ground
        self.phase = "NORMAL"   # "LINEUP","ROLL","CLIMB","FINAL","ROLLOUT","PARKED","CLEAR","EXITED"
        self.assigned_rw: Optional[Runway] = None
        self.roll_timer = 0.0

        # FMS Route
        self.route: List[str] = []
        self.route_idx = 0
        self.exit_fix: Optional[str] = None
        self.arrival_icao: Optional[str] = None

        # Departure runway heading hold
        self.dep_runway_hdg: Optional[float] = None
        self.hold_rwy_hdg_until_m: float = HOLD_RWY_HDG_UNTIL_FT * FT_TO_M

        # Nav mode
        self.nav_mode: str = "HDG"

        # Selection/parking state
        self.selectable = True
        self.frozen = False
        self.despawn_at: Optional[float] = None

        # Arrival preference + thermal trail
        self.pref_arr_rwy: Optional[str] = None
        self.heat_on = False
        self.trail: Deque[Tuple[float,float]] = deque(maxlen=220)
        self.auto_capture = AUTO_CAPTURE_DEFAULT

    # --- FMS helpers ---
    def current_leg_target(self) -> Optional[str]:
        if 0 <= self.route_idx < len(self.route):
            return self.route[self.route_idx]
        return None

    def advance_leg(self): 
        if self.route_idx < len(self.route): self.route_idx += 1

    def clear_route(self): 
        self.route = []; self.route_idx = 0

    def direct_to(self, leg: str):
        self.route = [leg]; self.route_idx = 0; self.nav_mode = "FMS"

# =========================
# Traffic Scheduler
# =========================
class TrafficScheduler:
    """
    Spawns departures from airports, arrivals from edges into airports,
    and transits edge-to-edge. Difficulty controls cadence and caps.
    """
    def __init__(self, sim):
        self.sim = sim
        self.difficulty = DEFAULT_DIFFICULTY
        self.next_spawn_time = 0.0
        self.rand = random.Random(1337)
        self.cs_counter = 100

        self.airlines = ["AAL", "DAL", "UAL", "SWA", "JBU", "FFT", "ASA", "BAW", "AFR", "DLH", "QFA"]
        self.arr_alt_ft_rng = (6000, 11000)
        self.arr_spd_kts_rng = (190, 260)
        self.dep_init_spd_kts = 0
        self.trn_alt_ft_rng = (7000, 13000)
        self.trn_spd_kts_rng = (210, 280)

        self.edge_names = ["WEST1","WEST2","NORTH1","NORTH2","EAST1","EAST2","SOUTH1","SOUTH2"]

    def set_difficulty(self, level: str):
        level = level.upper()
        if level in DIFF_PROFILES:
            self.difficulty = level
            self.next_spawn_time = min(self.next_spawn_time, self.sim.sim_time + 1.0)
            return True
        return False

    def _profile(self): return DIFF_PROFILES[self.difficulty]
    def _rand_period(self):
        lo, hi = self._profile()["spawn_period_s"]
        return self.rand.uniform(lo, hi)
    def _max_total(self): return self._profile()["max_total"]
    def _weights(self): return self._profile()["weights"]

    def _new_callsign(self):
        self.cs_counter += 1
        return f"{self.rand.choice(self.airlines)}{self.cs_counter}"

    def _pick_random_airport(self):
        return self.rand.choice(self.sim.airspace.airports) if self.sim.airspace.airports else None

    def _pick_random_runway(self, ap):
        return self.rand.choice(ap.runways) if ap and ap.runways else None

    def _pick_edge_nav(self):
        navs = [n for n in self.edge_names if n in self.sim.airspace.nav]
        if not navs: navs = list(self.sim.airspace.nav.keys())
        return self.sim.airspace.get_nav(self.rand.choice(navs)) if navs else None

    def maybe_spawn(self):
        if self.sim.sim_time < self.next_spawn_time: return
        if len(self.sim.aircraft) >= self._max_total():
            self.next_spawn_time = self.sim.sim_time + 3.0
            return

        w_dep, w_arr, w_trn = self._weights()
        pick = self.rand.random()
        if pick < w_dep:
            self._spawn_departure()
        elif pick < w_dep + w_arr:
            self._spawn_arrival()
        else:
            self._spawn_transit()

        self.next_spawn_time = self.sim.sim_time + self._rand_period()

    # ----------- spawn helpers -------------
    def _spawn_departure(self):
        ap = self._pick_random_airport()
        if not ap: return
        rw = self._pick_random_runway(ap)
        if not rw: return

        cs = self._new_callsign()
        ac = Aircraft(cs, pos_nm=(ap.pos_nm.x, ap.pos_nm.y), alt_ft=0,
                      gs_kts=self.dep_init_spd_kts, hdg_deg=rw.hdg_deg, flight_type="DEP")
        ac.exit_fix = self._guess_exit_for_heading(rw.hdg_deg)
        self.sim.add_ac(ac)

    def _spawn_arrival(self):
        ap = self._pick_random_airport()
        if not ap: return
        rw = self._pick_random_runway(ap)
        if not rw: return

        edge = self._pick_edge_nav()
        if not edge: return

        cs = self._new_callsign()
        hdg_to_ap = math.degrees(math.atan2(ap.pos_nm.x - edge.pos_nm.x, ap.pos_nm.y - edge.pos_nm.y)) % 360.0
        alt_ft = self.rand.uniform(*self.arr_alt_ft_rng)
        spd_kts = self.rand.uniform(*self.arr_spd_kts_rng)
        off = bearing_to_vec(hdg_to_ap).scale(self.rand.uniform(1.5, 3.0))
        pos_x = edge.pos_nm.x - off.x
        pos_y = edge.pos_nm.y - off.y

        ac = Aircraft(cs, pos_nm=(pos_x, pos_y), alt_ft=alt_ft, gs_kts=spd_kts,
                      hdg_deg=hdg_to_ap, flight_type="ARR")
        ac.arrival_icao = ap.icao
        ac.pref_arr_rwy = rw.parts[0]  # helps pick correct end (THR_B)
        self.sim.add_ac(ac)

    def _spawn_transit(self):
        a = self._pick_edge_nav()
        b = self._pick_edge_nav()
        if not a or not b or a.name == b.name: return

        hdg_to_b = math.degrees(math.atan2(b.pos_nm.x - a.pos_nm.x, b.pos_nm.y - a.pos_nm.y)) % 360.0
        alt_ft = self.rand.uniform(*self.trn_alt_ft_rng)
        spd_kts = self.rand.uniform(*self.trn_spd_kts_rng)
        off = bearing_to_vec(hdg_to_b).scale(self.rand.uniform(1.5, 3.0))
        pos_x = a.pos_nm.x - off.x
        pos_y = a.pos_nm.y - off.y

        cs = self._new_callsign()
        ac = Aircraft(cs, pos_nm=(pos_x, pos_y), alt_ft=alt_ft, gs_kts=spd_kts,
                      hdg_deg=hdg_to_b, flight_type="TRANSIT")
        ac.exit_fix = b.name
        self.sim.add_ac(ac)

    def _guess_exit_for_heading(self, hdg_deg: float) -> Optional[str]:
        hdg = hdg_deg % 360
        if 315 <= hdg or hdg < 45:
            candidates = [n for n in ["NORTH1","NORTH2"] if n in self.sim.airspace.nav]
        elif 45 <= hdg < 135:
            candidates = [n for n in ["EAST1","EAST2"] if n in self.sim.airspace.nav]
        elif 135 <= hdg < 225:
            candidates = [n for n in ["SOUTH1","SOUTH2"] if n in self.sim.airspace.nav]
        else:
            candidates = [n for n in ["WEST1","WEST2"] if n in self.sim.airspace.nav]
        return self.rand.choice(candidates) if candidates else None

# =========================
# Airspace (airports + nav points)
# =========================
class Airspace:
    def __init__(self):
        self.airports: List[Airport] = []
        self.nav: Dict[str, NavPoint] = {}

    def add_airport(self, ap: Airport): self.airports.append(ap)
    def add_nav(self, name: str, x_nm: float, y_nm: float): self.nav[name] = NavPoint(name, Vec2(x_nm, y_nm))
    def get_nav(self, name: str) -> Optional[NavPoint]: return self.nav.get(name)

    def all_runways(self):
        for ap in self.airports:
            for rw in ap.runways:
                yield ap, rw

    def nearest_centerline_capture(self, p_nm: Vec2, max_off_nm=1.2):
        best = None; best_perp = 1e9
        for ap, rw in self.all_runways():
            a,b = rw.endpoints()
            for end, hdg in [(b, rw.hdg_deg), (a, (rw.hdg_deg+180)%360)]:
                v_in = bearing_to_vec((hdg+180)%360)  # inbound direction
                apv = Vec2(p_nm.x - end.x, p_nm.y - end.y)
                proj_len = (apv.x*v_in.x + apv.y*v_in.y)
                proj = Vec2(v_in.x*proj_len, v_in.y*proj_len)
                perp = math.hypot(apv.x-proj.x, apv.y-proj.y)
                if perp <= max_off_nm and perp < best_perp:
                    best_perp = perp
                    best = (ap, rw, end, hdg)
        return best

    def get_airport(self, icao: str) -> Optional[Airport]:
        icao = icao.upper()
        for ap in self.airports:
            if ap.icao == icao: return ap
        return None

    def resolve_leg(self, leg: str) -> Optional[Tuple[float, float]]:
        """ Map leg token to world NM coords (x_nm, y_nm). """
        if leg.startswith("RWY:"):
            try:
                _, icao, rwname, thr_tag = leg.split(":")
            except ValueError:
                return None
            ap = self.get_airport(icao)
            if not ap: return None
            rw = next((r for r in ap.runways if r.name == rwname), None)
            if not rw: return None
            a, b = rw.endpoints()
            if thr_tag == "THR_A": return (a.x, a.y)
            if thr_tag == "THR_B": return (b.x, b.y)
            return None
        if leg.startswith("APT:"):
            icao = leg.split(":")[1]
            ap = self.get_airport(icao)
            return (ap.pos_nm.x, ap.pos_nm.y) if ap else None
        fix = self.get_nav(leg)
        return (fix.pos_nm.x, fix.pos_nm.y) if fix else None

# =========================
# Simulator
# =========================
class Sim:
    def __init__(self):
        self.aircraft: Dict[str, Aircraft] = {}
        self.running = False
        self.sim_time = 0.0
        self.airspace = Airspace()

        # Traffic scheduler
        self.traffic = TrafficScheduler(self)

        # Auto-capture default
        self.auto_capture_default = AUTO_CAPTURE_DEFAULT

        # Airports (unique orientations)
        kzph = Airport("KZPH", "Zephiron Intl", Vec2(0.0, 0.0))
        kzph.add_runway("09/27", 90,  length_nm=2.2)
        kzph.add_runway("18/36", 180, length_nm=1.8)
        self.airspace.add_airport(kzph)

        kstn = Airport("KSTN", "Stanton Field", Vec2(-30.0, -15.0))
        kstn.add_runway("04/22", 40,  length_nm=1.6)
        kstn.add_runway("13/31", 130, length_nm=2.0)
        self.airspace.add_airport(kstn)

        kmtx = Airport("KMTX", "MetroX", Vec2(40.0, 10.0))
        kmtx.add_runway("02/20", 20,  length_nm=2.4)
        kmtx.add_runway("08/26", 80,  length_nm=2.0)
        self.airspace.add_airport(kmtx)

        # Edge nav points (exits/entries)
        for name, pos in {
            "WEST1":(-45.0, 0.0), "WEST2":(-45.0, 20.0), "NORTH1":(0.0, 35.0),
            "NORTH2":(-25.0, 35.0), "EAST1":(55.0, 10.0), "EAST2":(55.0, -10.0),
            "SOUTH1":(0.0, -35.0), "SOUTH2":(25.0, -35.0)
        }.items():
            self.airspace.add_nav(name, pos[0], pos[1])

    def add_ac(self, ac: Aircraft): 
        ac.auto_capture = self.auto_capture_default
        self.aircraft[ac.cs] = ac

    # ---------- Final capture helpers ----------
    def _pick_runway_for_arrival(self, ac: Aircraft):
        """
        Priority:
        1) If user assigned airport & runway designator -> that exact runway end.
        2) If user assigned airport only -> runway end whose inbound heading matches vectoring.
        3) Else, best runway end across all airports by intercept criteria.
        Returns tuple (ap, rw, thr_end_nm_vec2, inbound_hdg, thr_tag) or None.
        """
        def candidates_for_airport(ap):
            for rw in ap.runways:
                a,b = rw.endpoints()
                yield (ap, rw, a, (rw.hdg_deg+180)%360, "THR_A")
                yield (ap, rw, b, rw.hdg_deg,               "THR_B")

        pos_nm = (ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M)

        # 1) Exact runway end by designator, if provided
        if ac.arrival_icao and ac.pref_arr_rwy:
            ap = self.airspace.get_airport(ac.arrival_icao)
            if ap:
                for rw in ap.runways:
                    tag = rw.thr_for_designator(ac.pref_arr_rwy)
                    if tag:
                        a,b = rw.endpoints()
                        thr = a if tag=="THR_A" else b
                        inbound = (rw.hdg_deg if tag=="THR_B" else (rw.hdg_deg+180)%360)
                        return (ap, rw, thr, inbound, tag)

        # 2) Best end within assigned airport (by vectoring and envelope)
        def best_by_vector(all_ends):
            best = None; best_score = 1e9
            for ap, rw, thr, inbound, tag in all_ends:
                dx = thr.x - pos_nm[0]; dy = thr.y - pos_nm[1]
                dnm = math.hypot(dx, dy)
                vin = bearing_to_vec((inbound+180)%360)
                proj = (dx*vin.x + dy*vin.y)
                perp = math.hypot(dx - vin.x*proj, dy - vin.y*proj)
                hdg_err = abs(((inbound - ac.hdg_deg + 540) % 360) - 180)
                score = dnm*0.8 + perp*4.0 + hdg_err*0.2
                if dnm <= FINAL_MAX_DIST_NM and perp <= FINAL_MAX_OFFSET_NM and hdg_err <= FINAL_MAX_INTERCEPT_DEG:
                    if score < best_score:
                        best_score = score; best = (ap, rw, thr, inbound, tag)
            return best

        if ac.arrival_icao:
            ap = self.airspace.get_airport(ac.arrival_icao)
            if ap:
                cand = best_by_vector(list(candidates_for_airport(ap)))
                if cand: return cand

        # 3) Best across all airports
        ends = []
        for ap in self.airspace.airports:
            ends.extend(list(candidates_for_airport(ap)))
        return best_by_vector(ends)

    def _meets_glideslope_gate(self, ac: Aircraft, thr_nm: Vec2):
        """Block capture if too high above GS, or generally too high so near the threshold."""
        d_nm = math.hypot(thr_nm.x*NM_TO_M - ac.pos.x, thr_nm.y*NM_TO_M - ac.pos.y) / NM_TO_M
        gs_ft = d_nm * FINAL_GS_FTPER_NM
        alt_ft = ac.alt_m / FT_TO_M
        if d_nm < 3.0 and alt_ft < FINAL_MIN_ALT_FT:
            return True
        return (alt_ft <= gs_ft + FINAL_GS_ABOVE_WINDOW_FT)

    def _try_capture_final(self, ac: Aircraft):
        """Try to switch to an RWY:<ICAO>:<RW>:THR_* leg and fly GS if all criteria pass."""
        if not ac.auto_capture or ac.phase not in ("NORMAL","FINAL"):
            return

        pick = self._pick_runway_for_arrival(ac)
        if not pick: return
        ap, rw, thr, inbound_hdg, thr_tag = pick

        # Envelope check again with the chosen end
        pos_nm = (ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M)
        dx = thr.x - pos_nm[0]; dy = thr.y - pos_nm[1]
        dnm = math.hypot(dx, dy)
        vin = bearing_to_vec((inbound_hdg+180)%360)
        proj = (dx*vin.x + dy*vin.y)
        perp = math.hypot(dx - vin.x*proj, dy - vin.y*proj)
        hdg_err = abs(((inbound_hdg - ac.hdg_deg + 540) % 360) - 180)

        if not (dnm <= FINAL_MAX_DIST_NM and perp <= FINAL_MAX_OFFSET_NM and hdg_err <= FINAL_MAX_INTERCEPT_DEG):
            return
        if not self._meets_glideslope_gate(ac, thr):
            return  # too high above GS → vector lower first

        # Commit the capture
        ac.assigned_rw = rw
        ac.direct_to(f"RWY:{ap.icao}:{rw.name}:{thr_tag}")  # nav_mode=FMS
        ac.tgt_hdg_deg = inbound_hdg
        ac.tgt_spd_mps = min(ac.tgt_spd_mps, 140*KTS_TO_MPS)
        gs_ft = dnm * GS_FTPER_NM
        ac.tgt_alt_m = min(ac.tgt_alt_m, gs_ft * FT_TO_M)
        ac.phase = "FINAL"
        self._occupy_runway(rw, secs=30.0)

    # ---------- Command parser ----------
    def apply_command_line(self, line: str):
        toks = line.strip().upper().split()
        if not toks: return "Empty"
        cs = toks[0]

        # ---- System commands: SYS DIFF <LEVEL> | SYS AUTO ON|OFF
        if cs == "SYS":
            diff_level = None
            auto_toggle = None
            i = 1
            try:
                while i < len(toks):
                    if toks[i] == "DIFF":
                        diff_level = toks[i+1]; i += 2
                    elif toks[i] == "AUTO":
                        auto_toggle = toks[i+1]; i += 2
                    else:
                        i += 1
            except Exception:
                return "Parse error"

            if diff_level is not None:
                ok = self.traffic.set_difficulty(diff_level)
                return f"Difficulty set to {self.traffic.difficulty}" if ok else \
                       "Unknown difficulty (use EASY|MEDIUM|HARD)"

            if auto_toggle is not None:
                val = (auto_toggle == "ON")
                self.auto_capture_default = val
                for a in self.aircraft.values():
                    a.auto_capture = val
                return f"Auto-capture set to {'ON' if val else 'OFF'}"

            return "No system action."

        # ---- Per-aircraft commands
        if cs not in self.aircraft: return f"Unknown callsign {cs}"
        i=1
        hdg=alt=spd=None; direct=None; exit_fix=None; arr_icao=None
        rwy_airport=None; rwy_dsg=None
        heat_toggle=None
        diff_level = None
        ac_auto = None
        try:
            while i < len(toks):
                t = toks[i]
                if t=="HDG": hdg=float(toks[i+1]); i+=2
                elif t=="ALT": alt=float(toks[i+1]); i+=2
                elif t=="SPD": spd=float(toks[i+1]); i+=2
                elif t=="DIRECT": direct=toks[i+1]; i+=2
                elif t=="EXIT": exit_fix=toks[i+1]; i+=2
                elif t=="ARR": arr_icao=toks[i+1]; i+=2
                elif t=="RWY": rwy_airport=toks[i+1]; rwy_dsg=toks[i+2]; i+=3
                elif t in ("HEAT","TRAIL"):
                    onoff = toks[i+1]; heat_toggle = (onoff=="ON"); i+=2
                elif t=="DIFF": diff_level=toks[i+1]; i+=2  # allow DIFF via aircraft too
                elif t=="AUTO":
                    onoff = toks[i+1]; ac_auto = (onoff=="ON"); i+=2
                else: i+=1
        except Exception:
            return "Parse error"
        ac = self.aircraft[cs]

        if hdg is not None:
            ac.tgt_hdg_deg = hdg % 360
            ac.nav_mode = "HDG"
            ac.clear_route()

        if alt is not None: ac.tgt_alt_m = alt * FT_TO_M
        if spd is not None: ac.tgt_spd_mps = spd * KTS_TO_MPS

        if direct is not None:
            fix = self.airspace.get_nav(direct)
            ap = self.airspace.get_airport(direct)
            if fix: ac.direct_to(direct)
            elif ap: ac.direct_to(f"APT:{ap.icao}")
            else: return f"Unknown fix/airport {direct}"

        if exit_fix is not None:
            if self.airspace.get_nav(exit_fix): ac.exit_fix = exit_fix
            else: return f"Unknown fix {exit_fix}"

        if arr_icao is not None:
            if self.airspace.get_airport(arr_icao): ac.arrival_icao = arr_icao
            else: return f"Unknown airport {arr_icao}"

        if rwy_airport and rwy_dsg:
            ap = self.airspace.get_airport(rwy_airport)
            if not ap: return f"Unknown airport {rwy_airport}"
            ac.arrival_icao = ap.icao
            ac.pref_arr_rwy = rwy_dsg

        if heat_toggle is not None: ac.heat_on = heat_toggle

        if diff_level is not None:
            ok = self.traffic.set_difficulty(diff_level)
            if not ok: return f"Unknown difficulty {diff_level} (use EASY|MEDIUM|HARD)"

        if ac_auto is not None:
            ac.auto_capture = ac_auto

        return f"{cs} ack."

    def step(self, dt):
        # automatic traffic generation
        if self.running:
            self.traffic.maybe_spawn()

        # clear runway occupancy when timers expire
        for _, rw in self.airspace.all_runways():
            if self.sim_time > rw.occupied_until: rw.occupied_until = 0.0

        # phases + objectives
        for ac in list(self.aircraft.values()):
            self._auto_objectives(ac)
            self._auto_phases(ac)

        # integrate kinematics
        for ac in self.aircraft.values():
            if ac.frozen:
                continue
            # speed
            if ac.on_ground:
                if ac.tgt_spd_mps > ac.gs_mps:
                    ac.gs_mps += 3.5*KTS_TO_MPS*dt
                else:
                    ac.gs_mps = max(0.0, ac.gs_mps - 2.0*KTS_TO_MPS*dt)
            else:
                spd_err = ac.tgt_spd_mps - ac.gs_mps
                step = 2.0*KTS_TO_MPS*dt
                if abs(spd_err) <= step: ac.gs_mps = ac.tgt_spd_mps
                else: ac.gs_mps += step if spd_err>0 else -step
            # turn
            hdg_err = norm_angle_err(ac.tgt_hdg_deg, ac.hdg_deg)
            max_delta = 3.0 * dt
            ac.hdg_deg = (ac.hdg_deg + clamp(hdg_err, -max_delta, max_delta)) % 360
            # altitude
            if not ac.on_ground:
                alt_err = ac.tgt_alt_m - ac.alt_m
                vs_mps = DEFAULT_VS_FPM * FT_TO_M / 60.0
                ac.alt_m += clamp(alt_err, -vs_mps*dt, vs_mps*dt)
            # move
            v = bearing_to_vec(ac.hdg_deg)
            ac.pos = ac.pos + v.scale(ac.gs_mps*dt)

        self.sim_time += dt

        # Despawn parked arrivals and exited aircraft
        to_del = []
        for cs, a in self.aircraft.items():
            if a.phase == "EXITED":
                to_del.append(cs)
            elif a.phase == "PARKED" and a.despawn_at is not None and self.sim_time >= a.despawn_at:
                to_del.append(cs)
        for cs in to_del: del self.aircraft[cs]

    def _occupy_runway(self, rw: Runway, secs=20.0):
        rw.occupied_until = max(rw.occupied_until, self.sim_time + secs)

    # --- Objectives & FMS ---
    def _auto_objectives(self, ac: Aircraft):
        # Departure runway-heading hold regardless of nav mode
        if ac.flight_type == "DEP" and ac.phase in ("CLIMB","ROLL") and not ac.on_ground:
            if ac.dep_runway_hdg is not None and ac.alt_m < ac.hold_rwy_hdg_until_m:
                ac.tgt_hdg_deg = ac.dep_runway_hdg

        # FMS steering only when in FMS mode
        if ac.nav_mode == "FMS":
            tgt = ac.current_leg_target()
            if tgt:
                resolved = self.airspace.resolve_leg(tgt)
                if resolved:
                    tx, ty = resolved
                    steer_ok = not (ac.flight_type=="DEP" and ac.dep_runway_hdg is not None and ac.alt_m < ac.hold_rwy_hdg_until_m)
                    if steer_ok:
                        dx = tx - ac.pos.x/NM_TO_M; dy = ty - ac.pos.y/NM_TO_M
                        if abs(dx)+abs(dy) > 1e-6:
                            brg = (math.degrees(math.atan2(dx, dy)) + 360.0) % 360.0
                            ac.tgt_hdg_deg = brg

                    dnm = nm_distance_xy(ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M, tx, ty)

                    # If leg is runway threshold, follow a 3° glideslope to threshold
                    if tgt.startswith("RWY:"):
                        gs_ft = max(0.0, dnm * GS_FTPER_NM)
                        ac.tgt_alt_m = min(ac.tgt_alt_m, gs_ft * FT_TO_M)

                    if dnm <= ROUTE_ARRIVE_THRESH_NM:
                        ac.advance_leg()
                        if tgt == ac.exit_fix and ac.flight_type in ("DEP","TRANSIT"):
                            ac.phase = "EXITED"

    # --- Departures/Arrivals automation ---
    def _auto_phases(self, ac: Aircraft):
        if ac.flight_type=="DEP":
            if ac.phase == "NORMAL":
                pick = min((rw for _,rw in self.airspace.all_runways()), key=lambda r: r.occupied_until)
                ac.assigned_rw = pick
                a,b = pick.endpoints()
                start = a
                offs = bearing_to_vec(pick.hdg_deg).scale(0.05*NM_TO_M)
                ac.pos = Vec2(start.x*NM_TO_M - offs.x, start.y*NM_TO_M - offs.y)
                ac.hdg_deg = pick.hdg_deg
                ac.tgt_hdg_deg = pick.hdg_deg
                ac.dep_runway_hdg = pick.hdg_deg
                ac.on_ground = True; ac.airborne=False
                ac.phase = "LINEUP"
                self._occupy_runway(pick, secs=10.0)

            elif ac.phase in ("LINEUP","ROLL"):
                if ac.tgt_spd_mps > ac.gs_mps + 0.1 or ac.tgt_alt_m > ac.alt_m + 10.0:
                    ac.phase = "ROLL"
                if ac.phase=="ROLL" and ac.gs_mps >= 120*KTS_TO_MPS:
                    ac.on_ground = False; ac.airborne=True
                    ac.phase = "CLIMB"
                    ac.tgt_alt_m = max(ac.tgt_alt_m, (3000*FT_TO_M))
                    if ac.assigned_rw: self._occupy_runway(ac.assigned_rw, secs=15.0)

        elif ac.flight_type=="ARR":
            # Attempt final capture when vectored inside envelope
            self._try_capture_final(ac)

            if ac.phase=="FINAL" and ac.assigned_rw:
                a,b = ac.assigned_rw.endpoints()
                tgt = ac.current_leg_target()
                use_b = True
                if tgt and tgt.startswith("RWY:"):
                    parts = tgt.split(":")
                    if len(parts) == 4:
                        use_b = (parts[3] == "THR_B")
                thr_nm = (b if use_b else a)
                thr = Vec2(thr_nm.x*NM_TO_M, thr_nm.y*NM_TO_M)
                d_nm = math.hypot(thr.x - ac.pos.x, thr.y - ac.pos.y)/NM_TO_M
                gs_ft = max(0.0, d_nm * GS_FTPER_NM)
                ac.tgt_alt_m = min(ac.tgt_alt_m, gs_ft * FT_TO_M)
                if d_nm <= 0.2 and ac.alt_m <= 80*FT_TO_M and ac.gs_mps <= 150*KTS_TO_MPS:
                    ac.on_ground=True; ac.airborne=False
                    ac.phase="ROLLOUT"; ac.tgt_spd_mps=0.0
                    self._occupy_runway(ac.assigned_rw, secs=25.0)

            if ac.phase=="ROLLOUT" and ac.gs_mps <= 5*KTS_TO_MPS:
                ac.phase = "PARKED"
                ac.frozen = True
                ac.selectable = False
                ac.tgt_spd_mps = 0.0
                ac.gs_mps = 0.0
                ac.despawn_at = self.sim_time + ARRIVED_DESPAWN_SEC

    def conflicts(self):
        cs = list(self.aircraft.keys())
        hits = []
        for i in range(len(cs)):
            for j in range(i+1, len(cs)):
                a = self.aircraft[cs[i]]; b = self.aircraft[cs[j]]
                hit, tca, lat, vv = self._predict_conflict(a,b)
                if hit: hits.append((a,b,tca,lat,vv))
        return hits

    @staticmethod
    def _predict_conflict(a: Aircraft, b: Aircraft, horizon=LOOKAHEAD_SEC, dt=1.0):
        pa = Vec2(a.pos.x, a.pos.y); ha=a.hdg_deg; sa=a.gs_mps; za=a.alt_m
        pb = Vec2(b.pos.x, b.pos.y); hb=b.hdg_deg; sb=b.gs_mps; zb=b.alt_m
        vsa = (DEFAULT_VS_FPM*FT_TO_M/60.0) if a.tgt_alt_m>za else (-(DEFAULT_VS_FPM*FT_TO_M/60.0) if a.tgt_alt_m<za else 0.0)
        vsb = (DEFAULT_VS_FPM*FT_TO_M/60.0) if b.tgt_alt_m>zb else (-(DEFAULT_VS_FPM*FT_TO_M/60.0) if b.tgt_alt_m<zb else 0.0)
        t=0.0
        while t<=horizon:
            lateral_nm = math.hypot(pa.x-pb.x, pa.y-pb.y)/NM_TO_M
            vert_ft = abs(za - zb)/FT_TO_M
            if lateral_nm < LATERAL_SEP_NM and vert_ft < VERT_SEP_FT:
                return True, t, lateral_nm, vert_ft
            pa = pa + bearing_to_vec(ha).scale(sa*dt)
            pb = pb + bearing_to_vec(hb).scale(sb*dt)
            za += vsa*dt; zb += vsb*dt
            t += dt
        return False, None, None, None

# =========================
# PyGame Radar UI (revamped visuals + thermal trails)
# =========================
WIDTH, HEIGHT = 1280, 840

BG = (7, 10, 16)
GRID = (24, 30, 40)
RINGS = (34, 60, 84)
TXT = (220, 228, 235)
SUBTXT = (160, 175, 190)
SEL = (255, 230, 120)
OK = (90, 200, 140)
ALERT = (235, 75, 90)
PANEL_BG = (14, 18, 26)
RUNWAY_FILL = (46, 66, 86)
RUNWAY_EDGE = (120, 150, 175)
TAG_BG = (18, 24, 34)

def hue_to_rgb(h):
    i = int(h*6); f = h*6 - i; q = 1 - f; t = f; i = i % 6
    if i == 0: r,g,b = 1, t, 0
    elif i == 1: r,g,b = q,1,0
    elif i == 2: r,g,b = 0,1,t
    elif i == 3: r,g,b = 0,q,1
    elif i == 4: r,g,b = t,0,1
    else: r,g,b = 1,0,q
    return (int(r*200+30), int(g*200+30), int(b*200+30))

class Radar:
    def __init__(self):
        pygame.init()
        pygame.display.set_caption("ATC Scope — Pro visuals, RWY capture/GS, thermal trails, auto traffic, smarter final")
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("consolas", 18)
        self.font_small = pygame.font.SysFont("consolas", 14)

        # View (with smoothing)
        self.center_nm = Vec2(0.0, 0.0)
        self.target_center_nm = Vec2(0.0, 0.0)
        self.ppnm = 9.0
        self.target_ppnm = 9.0
        self.selected = None

        # Command line
        self.cmd_text = ""
        self.msg = ""
        self.msg_until = 0

        # Sim + scenario
        random.seed(42)
        self.sim = Sim()
        self.sim.running = True

        # Seed aircraft
        dep = Aircraft("ZEP101", pos_nm=(0.0,0.0), alt_ft=0, gs_kts=0, hdg_deg=90, flight_type="DEP")
        dep.exit_fix = "EAST1"; self.sim.add_ac(dep)

        arr = Aircraft("STN202", pos_nm=(-38.0, -25.0), alt_ft=9000, gs_kts=250, hdg_deg=135, flight_type="ARR")
        arr.arrival_icao = "KSTN"; self.sim.add_ac(arr)

        trn = Aircraft("MTX303", pos_nm=(55.0, 10.0), alt_ft=8000, gs_kts=240, hdg_deg=260, flight_type="TRANSIT")
        trn.exit_fix = "WEST2"; self.sim.add_ac(trn)

        self.accum = 0.0
        self.last_time = time.perf_counter()

    # --- Coordinate transforms ---
    def world_to_screen(self, w_nm: Vec2):
        dx_nm = w_nm.x - self.center_nm.x
        dy_nm = w_nm.y - self.center_nm.y
        x = WIDTH/2 + dx_nm * self.ppnm
        y = HEIGHT/2 - dy_nm * self.ppnm
        return (int(x), int(y))

    def screen_to_world(self, x, y):
        dx_px = x - WIDTH/2
        dy_px = HEIGHT/2 - y
        return Vec2(dx_px / self.ppnm + self.center_nm.x, dy_px / self.ppnm + self.center_nm.y)

    # --- UI helpers ---
    def post_msg(self, text, secs=2.5):
        self.msg = text; self.msg_until = time.time() + secs

    def update_view_smoothing(self, dt_frame):
        pan_rate = 6.0; zoom_rate = 6.0
        pan_alpha = 1.0 - math.exp(-pan_rate*dt_frame)
        zoom_alpha = 1.0 - math.exp(-zoom_rate*dt_frame)
        self.center_nm.x += (self.target_center_nm.x - self.center_nm.x) * pan_alpha
        self.center_nm.y += (self.target_center_nm.y - self.center_nm.y) * pan_alpha
        self.ppnm += (self.target_ppnm - self.ppnm) * zoom_alpha

    # --- Drawing ---
    def draw_grid(self):
        self.screen.fill(BG)
        center_px = (WIDTH//2, HEIGHT//2)
        max_nm = max(WIDTH, HEIGHT) / self.ppnm * 0.65
        step = 5
        r = step
        while r < max_nm:
            pygame.draw.circle(self.screen, RINGS, center_px, int(r*self.ppnm), 1)
            lbl = self.font_small.render(f"{r} NM", True, SUBTXT)
            self.screen.blit(lbl, (center_px[0]+int(r*self.ppnm)+6, center_px[1]-12))
            r += step
        pygame.draw.line(self.screen, GRID, (WIDTH//2, 0), (WIDTH//2, HEIGHT), 1)
        pygame.draw.line(self.screen, GRID, (0, HEIGHT//2), (WIDTH, HEIGHT//2), 1)

    def draw_airports_runways(self):
        for ap in self.sim.airspace.airports:
            ap_px = self.world_to_screen(ap.pos_nm)
            name = self.font_small.render(f"{ap.icao}", True, TXT)
            self.screen.blit(name, (ap_px[0]+6, ap_px[1]-18))
            for rw in ap.runways:
                a,b = rw.endpoints()
                a_px = self.world_to_screen(a)
                b_px = self.world_to_screen(b)
                pygame.draw.line(self.screen, RUNWAY_FILL, a_px, b_px, max(1,int(rw.half_width_nm*self.ppnm*4)))
                pygame.draw.line(self.screen, RUNWAY_EDGE, a_px, b_px, 1)
                c_px = self.world_to_screen(rw.center_nm)
                lbl = self.font_small.render(rw.name, True, SUBTXT)
                self.screen.blit(lbl, (c_px[0]+6, c_px[1]-6))
                if rw.occupied_until > self.sim.sim_time:
                    occ = self.font_small.render("OCC", True, ALERT)
                    self.screen.blit(occ, (c_px[0]+6, c_px[1]+12))

        # Draw nav points
        for name, nav in self.sim.airspace.nav.items():
            x,y = self.world_to_screen(nav.pos_nm)
            pygame.draw.circle(self.screen, (120,180,255), (x,y), 3)
            self.screen.blit(self.font_small.render(name, True, SUBTXT), (x+6, y-6))

    def draw_trail(self, points: List[Tuple[int,int]]):
        n = len(points)
        if n < 2: return
        for idx, (x, y) in enumerate(points):
            alpha = int(40 + 130 * (idx / (n-1)))
            s = pygame.Surface((6,6), pygame.SRCALPHA)
            pygame.draw.circle(s, (200, 120, 40, alpha), (3,3), 3)
            self.screen.blit(s, (x-3, y-3), special_flags=pygame.BLEND_PREMULTIPLIED)

    def draw_ac_glow(self, x, y, col):
        for r, alpha in [(10, 30), (6, 60)]:
            s = pygame.Surface((r*2, r*2), pygame.SRCALPHA)
            pygame.draw.circle(s, (*col, alpha), (r, r), r)
            self.screen.blit(s, (x-r, y-r), special_flags=pygame.BLEND_PREMULTIPLIED)

    def _goal_texts(self, ac: Aircraft) -> Tuple[str,str,str]:
        if ac.flight_type=="DEP": goal = f"Goal: Exit→{ac.exit_fix or '—'}"
        elif ac.flight_type=="ARR": goal = f"Goal: Arr→{ac.arrival_icao or 'KZPH'}"
        else: goal = f"Goal: Transit→{ac.exit_fix or '—'}"

        tgt = ac.current_leg_target() if ac.nav_mode=="FMS" else None
        if tgt:
            r = self.sim.airspace.resolve_leg(tgt)
            if r:
                tx, ty = r
                if tgt.startswith("RWY:"):
                    _, icao, rwname, _ = tgt.split(":"); disp = f"{icao} {rwname}"
                elif tgt.startswith("APT:"):
                    disp = tgt.split(":")[1]
                else:
                    disp = tgt
                dnm = nm_distance_xy(ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M, tx, ty)
                leg = f"Leg: {disp}  {dnm:0.1f} NM"
            else:
                leg = "Leg: —"
        else:
            leg = "Leg: —"
        navtxt = f"NAV {ac.nav_mode}" + ("  HEAT" if ac.heat_on else "")
        acauto = " AUTO" if ac.auto_capture else " MANUAL"
        line1 = f"{ac.cs} [{ac.flight_type}]  {ac.phase}  {navtxt}{acauto}"
        line2 = f"ALT {int(ac.alt_m/FT_TO_M+0.5)}  SPD {int(ac.gs_mps/(NM_TO_M/3600.0)+0.5)}"
        return line1, line2, f"{goal}   {leg}"

    def draw_aircraft(self, conflicts):
        hits_set = set()
        for a,b,_,_,_ in conflicts:
            hits_set.add(a.cs); hits_set.add(b.cs)
            ax, ay = self.world_to_screen(Vec2(a.pos.x/NM_TO_M, a.pos.y/NM_TO_M))
            bx, by = self.world_to_screen(Vec2(b.pos.x/NM_TO_M, b.pos.y/NM_TO_M))
            pygame.draw.line(self.screen, ALERT, (ax,ay), (bx,by), 2)

        for ac in self.sim.aircraft.values():
            ac.trail.append((ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M))
            pos_nm = Vec2(ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M)
            x, y = self.world_to_screen(pos_nm)
            vx = math.sin(ac.hdg_deg*DEG2RAD); vy = math.cos(ac.hdg_deg*DEG2RAD)
            tip = (int(x + vx*16), int(y - vy*16))
            base_col = hue_to_rgb(ac.hue)
            col = (120, 140, 155) if ac.frozen else base_col
            if ac.cs in hits_set: col = ALERT
            if self.selected == ac.cs and ac.selectable: col = SEL

            if ac.heat_on and len(ac.trail) > 2:
                pts = [self.world_to_screen(Vec2(px, py)) for (px,py) in ac.trail]
                self.draw_trail(pts)

            if not ac.frozen:
                self.draw_ac_glow(x, y, col)
            pygame.draw.circle(self.screen, col, (x,y), 4)
            pygame.draw.line(self.screen, col, (x,y), tip, 2)

            tgt = ac.current_leg_target() if (ac.nav_mode=="FMS" and not ac.frozen) else None
            if tgt:
                r = self.sim.airspace.resolve_leg(tgt)
                if r:
                    tx, ty = r
                    txp, typ = self.world_to_screen(Vec2(tx, ty))
                    pygame.draw.line(self.screen, (100,180,120), (x,y), (txp,typ), 1)

            l1, l2, l3 = self._goal_texts(ac)
            surf1 = self.font_small.render(l1, True, TXT if not ac.frozen else SUBTXT)
            surf2 = self.font_small.render(l2, True, SUBTXT)
            surf3 = self.font_small.render(l3, True, SUBTXT)
            w = max(surf1.get_width(), surf2.get_width(), surf3.get_width()) + 10
            h = surf1.get_height() + surf2.get_height() + surf3.get_height() + 10
            block = pygame.Surface((w, h), pygame.SRCALPHA)
            alpha = 150 if not ac.frozen else 80
            brd = (70,90,110) if not ac.frozen else (55,70,85)
            pygame.draw.rect(block, (*TAG_BG, alpha), (0,0,w,h), border_radius=6)
            pygame.draw.rect(block, brd, (0,0,w,h), width=1, border_radius=6)
            block.blit(surf1, (6, 4))
            block.blit(surf2, (6, 4 + surf1.get_height()))
            block.blit(surf3, (6, 6 + surf1.get_height() + surf2.get_height()))
            self.screen.blit(block, (x+12, y- block.get_height()//2))

    def draw_footer(self, fps, sps, conflicts):
        h = 96
        pygame.draw.rect(self.screen, PANEL_BG, (0, HEIGHT-h, WIDTH, h))
        txt = self.font_small.render("> " + self.cmd_text, True, TXT)
        self.screen.blit(txt, (16, HEIGHT-h+14))

        cmsg = "No predicted conflicts in 120s."
        color = OK
        if conflicts:
            soonest = min(conflicts, key=lambda t: t[2])[2]
            cmsg = f"CONFLICT: {len(conflicts)} pair(s), soonest TCA {soonest:0.1f}s"
            color = ALERT

        stat = self.font_small.render(
            f"FPS {fps:0.1f}  SPS {sps:0.1f}  AC {len(self.sim.aircraft)}  "
            f"Z {self.ppnm:0.1f}px/NM  Ctr ({self.center_nm.x:0.1f},{self.center_nm.y:0.1f})  |  "
            f"Diff {self.sim.traffic.difficulty}  |  Auto {'ON' if self.sim.auto_capture_default else 'OFF'}  |  {cmsg}",
            True, color)
        self.screen.blit(stat, (16, HEIGHT-h+44))

        if time.time() < self.msg_until:
            m = self.font_small.render(self.msg, True, SEL)
            self.screen.blit(m, (16, HEIGHT-h+66))

        help1 = self.font_small.render(
            "Controls: Click select • Type • Enter=send • -=zoom out, =/+=zoom in • Arrow keys pan • Ctrl/Cmd+R reset • Mouse wheel zoom • F1/F2/F3 set difficulty",
            True, SUBTXT)
        self.screen.blit(help1, (16, HEIGHT-h+70))

    # --- Input / misc ---
    def handle_click(self, mx, my):
        best = None; best_d2 = 15*15
        for ac in self.sim.aircraft.values():
            if not ac.selectable:  # parked/frozen are unclickable
                continue
            sx, sy = self.world_to_screen(Vec2(ac.pos.x/NM_TO_M, ac.pos.y/NM_TO_M))
            d2 = (mx - sx)**2 + (my - sy)**2
            if d2 < best_d2:
                best_d2 = d2; best = ac.cs
        if best:
            self.selected = best
            if not self.cmd_text.strip():
                self.cmd_text = f"{best} "
            self.post_msg(f"Selected {best}")

    def send_command(self, line):
        if not line.strip(): return
        msg = self.sim.apply_command_line(line)
        self.post_msg(msg)

    def reset_view(self):
        self.target_center_nm = Vec2(0.0, 0.0)
        self.target_ppnm = 9.0

    # --- Main loop ---
    def run(self):
        running = True
        sps = 0.0; sps_acc = 0.0; sps_ticks = 0

        while running:
            now = time.perf_counter()
            dt_frame = now - self.last_time
            self.last_time = now
            self.accum += dt_frame

            for e in pygame.event.get():
                if e.type == pygame.QUIT:
                    running = False
                elif e.type == pygame.KEYDOWN:
                    if e.key == pygame.K_ESCAPE:
                        running = False
                    elif e.key == pygame.K_RETURN:
                        self.send_command(self.cmd_text); self.cmd_text = ""
                    elif e.key == pygame.K_BACKSPACE:
                        self.cmd_text = self.cmd_text[:-1]
                    elif e.key == pygame.K_EQUALS or e.key == pygame.K_PLUS:
                        self.target_ppnm = min(70.0, self.target_ppnm*1.2)
                    elif e.key == pygame.K_MINUS:
                        self.target_ppnm = max(2.0, self.target_ppnm/1.2)
                    elif e.key == pygame.K_UP:
                        self.target_center_nm.y += 5.0
                    elif e.key == pygame.K_DOWN:
                        self.target_center_nm.y -= 5.0
                    elif e.key == pygame.K_LEFT:
                        self.target_center_nm.x -= 5.0
                    elif e.key == pygame.K_RIGHT:
                        self.target_center_nm.x += 5.0
                    elif e.key == pygame.K_F1:
                        self.sim.traffic.set_difficulty("EASY");  self.post_msg("Difficulty: EASY")
                    elif e.key == pygame.K_F2:
                        self.sim.traffic.set_difficulty("MEDIUM"); self.post_msg("Difficulty: MEDIUM")
                    elif e.key == pygame.K_F3:
                        self.sim.traffic.set_difficulty("HARD");   self.post_msg("Difficulty: HARD")
                    elif e.key == pygame.K_r:
                        if e.mod & (pygame.KMOD_CTRL | pygame.KMOD_META):
                            self.reset_view()
                        else:
                            if e.unicode and 32 <= ord(e.unicode) <= 126:
                                self.cmd_text += e.unicode
                    else:
                        if e.unicode and 32 <= ord(e.unicode) <= 126:
                            self.cmd_text += e.unicode
                elif e.type == pygame.MOUSEBUTTONDOWN and e.button == 1:
                    mx, my = pygame.mouse.get_pos()
                    self.handle_click(mx, my)
                elif e.type == pygame.MOUSEWHEEL:
                    if e.y > 0:
                        self.target_ppnm = min(70.0, self.target_ppnm*(1.0+0.1*e.y))
                    elif e.y < 0:
                        self.target_ppnm = max(2.0, self.target_ppnm/(1.0+0.1*(-e.y)))

            # Fixed-step sim
            stepped = 0
            while self.accum >= DT:
                self.sim.step(DT)
                self.accum -= DT
                stepped += 1
            if stepped > 0:
                sps_acc += stepped; sps_ticks += 1
                if sps_ticks >= 10:
                    sps = sps_acc / sps_ticks / (1.0/DT)
                    sps_acc = 0; sps_ticks = 0

            conflicts = self.sim.conflicts()

            # Smooth view
            self.update_view_smoothing(dt_frame)

            # Draw
            self.draw_grid()
            self.draw_airports_runways()
            self.draw_aircraft(conflicts)
            fps = self.clock.get_fps()
            self.draw_footer(fps if fps else 0.0, sps, conflicts)

            pygame.display.flip()
            self.clock.tick(60)

        pygame.quit()
        sys.exit(0)

# =========================
# Entrypoint
# =========================
if __name__ == "__main__":
    Radar().run()
