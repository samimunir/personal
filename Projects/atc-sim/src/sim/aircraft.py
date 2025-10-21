from dataclasses import dataclass, field
import math
from typing import Optional

# Utility conversions
def kts_to_nm_per_sec(kts: float) -> float:
    return kts / 3600.0

def fpm_to_ft_per_sec(fpm: float) -> float:
    return fpm / 60.0

@dataclass
class Aircraft:
    callsign: str
    wx: float               # world x (NM, +east)
    wy: float               # world y (NM, +north)
    alt_ft: float
    hdg_deg: float
    spd_kts: float
    vs_fpm: float
    is_arrival: bool

    # simple guidance targets (used in later milestones too)
    # tgt_hdg_deg: float | None = None
    # tgt_alt_ft: float | None = None
    # tgt_spd_kts: float | None = None
    tgt_hdg_deg: Optional[float] = None
    tgt_alt_ft: Optional[float] = None
    tgt_spd_kts: Optional[float] = None

    # visuals
    leader_secs: float = 2.5   # how long ahead leader projects (sec)
    label_offset_px: tuple[int, int] = field(default_factory=lambda: (12, -12))

    def update(self, dt: float):
        """Integrate simple kinematics with heading hold and vertical speed."""
        # Gentle heading convergence if tgt set
        if self.tgt_hdg_deg is not None:
            self.hdg_deg = self._turn_towards(self.hdg_deg, self.tgt_hdg_deg, max_rate_deg_per_sec=3.0, dt=dt)

        # Gentle speed convergence
        if self.tgt_spd_kts is not None:
            ds = self.tgt_spd_kts - self.spd_kts
            max_accel = 6.0  # kts per sec (cartoonishly high but responsive)
            step = max(-max_accel * dt, min(max_accel * dt, ds))
            self.spd_kts += step

        # Gentle altitude convergence via VS target
        if self.tgt_alt_ft is not None:
            da = self.tgt_alt_ft - self.alt_ft
            climb_dir = 1.0 if da > 0 else -1.0
            # choose a sensible vertical speed based on delta
            target_vs = climb_dir * min(2000.0, max(800.0, abs(da) * 0.8))
            self.vs_fpm = target_vs

        # Integrate position & altitude
        speed_nms = kts_to_nm_per_sec(self.spd_kts)
        heading_rad = math.radians(self.hdg_deg)
        # aviation heading: 0°=north, 90°=east
        dx = math.sin(heading_rad) * speed_nms * dt
        dy = math.cos(heading_rad) * speed_nms * dt
        self.wx += dx
        self.wy += dy

        self.alt_ft += fpm_to_ft_per_sec(self.vs_fpm) * dt

    def leader_endpoint(self, seconds: float) -> tuple[float, float]:
        speed_nms = kts_to_nm_per_sec(self.spd_kts)
        heading_rad = math.radians(self.hdg_deg)
        dx = math.sin(heading_rad) * speed_nms * seconds
        dy = math.cos(heading_rad) * speed_nms * seconds
        return (self.wx + dx, self.wy + dy)

    @staticmethod
    def _turn_towards(cur: float, tgt: float, max_rate_deg_per_sec: float, dt: float) -> float:
        # shortest-angle turn
        def norm180(a): 
            while a > 180: a -= 360
            while a <= -180: a += 360
            return a
        err = norm180(tgt - cur)
        step = max(-max_rate_deg_per_sec * dt, min(max_rate_deg_per_sec * dt, err))
        return (cur + step) % 360.0