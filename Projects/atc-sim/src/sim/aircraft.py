from dataclasses import dataclass, field
from typing import Optional, List, Tuple
import math

def kts_to_nm_per_sec(kts: float) -> float:
    return kts / 3600.0

def fpm_to_ft_per_sec(fpm: float) -> float:
    return fpm / 60.0

def clamp_deg360(a: float) -> float:
    a = a % 360.0
    if a < 0: a += 360.0
    return a

def norm180(a: float) -> float:
    while a > 180: a -= 360
    while a <= -180: a += 360
    return a

@dataclass
class Aircraft:
    callsign: str
    wx: float
    wy: float
    alt_ft: float
    hdg_deg: float
    spd_kts: float
    vs_fpm: float
    is_arrival: bool

    # targets
    tgt_hdg_deg: Optional[float] = None
    tgt_alt_ft: Optional[float] = None
    tgt_spd_kts: Optional[float] = None

    # nav
    nav_direct_to: Optional[Tuple[str, float, float]] = None  # (fix, wx, wy)

    # visuals
    leader_secs: float = 2.5
    label_offset_px: Tuple[int, int] = field(default_factory=lambda: (12, -12))
    phase: str = "ENR"   # ENR, VEC, FNL, DEP
    _trail: List[Tuple[float,float]] = field(default_factory=list)
    _trail_accum: float = 0.0

    def update(self, dt: float):
        # Compute nav-based heading target if Direct-To set
        if self.nav_direct_to is not None:
            _, fx, fy = self.nav_direct_to
            brg = math.degrees(math.atan2(fx - self.wx, fy - self.wy)) % 360.0
            self.tgt_hdg_deg = brg
            self.phase = "VEC" if self.is_arrival else "DEP"

        # Heading convergence
        if self.tgt_hdg_deg is not None:
            self.hdg_deg = self._turn_towards(self.hdg_deg, self.tgt_hdg_deg, max_rate_deg_per_sec=3.0, dt=dt)

        # Speed convergence
        if self.tgt_spd_kts is not None:
            ds = self.tgt_spd_kts - self.spd_kts
            max_accel = 6.0
            step = max(-max_accel * dt, min(max_accel * dt, ds))
            self.spd_kts += step

        # Altitude convergence via VS
        if self.tgt_alt_ft is not None:
            da = self.tgt_alt_ft - self.alt_ft
            climb_dir = 1.0 if da > 0 else -1.0
            target_vs = climb_dir * min(2000.0, max(800.0, abs(da) * 0.8))
            self.vs_fpm = target_vs

        # Integrate
        speed_nms = kts_to_nm_per_sec(self.spd_kts)
        heading_rad = math.radians(self.hdg_deg)
        dx = math.sin(heading_rad) * speed_nms * dt
        dy = math.cos(heading_rad) * speed_nms * dt
        self.wx += dx
        self.wy += dy
        self.alt_ft += fpm_to_ft_per_sec(self.vs_fpm) * dt

        # Trails sampling handled by world (for consistent cadence)

    def leader_endpoint(self, seconds: float) -> tuple:
        speed_nms = kts_to_nm_per_sec(self.spd_kts)
        heading_rad = math.radians(self.hdg_deg)
        dx = math.sin(heading_rad) * speed_nms * seconds
        dy = math.cos(heading_rad) * speed_nms * seconds
        return (self.wx + dx, self.wy + dy)

    @staticmethod
    def _turn_towards(cur: float, tgt: float, max_rate_deg_per_sec: float, dt: float) -> float:
        err = norm180(tgt - cur)
        step = max(-max_rate_deg_per_sec * dt, min(max_rate_deg_per_sec * dt, err))
        return clamp_deg360(cur + step)
