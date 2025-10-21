from dataclasses import dataclass
from typing import Optional

@dataclass
class HdgCmd:
    value_deg: float

@dataclass
class AltCmd:
    value_ft: float

@dataclass
class SpdCmd:
    value_kts: float

@dataclass
class DctCmd:
    fix_name: str
    wx: float
    wy: float

def apply_command(ac, cmd) -> None:
    from .aircraft import clamp_deg360
    if isinstance(cmd, HdgCmd):
        ac.tgt_hdg_deg = clamp_deg360(cmd.value_deg)
        ac.nav_direct_to = None
    elif isinstance(cmd, AltCmd):
        ac.tgt_alt_ft = max(0.0, cmd.value_ft)
    elif isinstance(cmd, SpdCmd):
        ac.tgt_spd_kts = max(120.0, cmd.value_kts)
    elif isinstance(cmd, DctCmd):
        ac.nav_direct_to = (cmd.fix_name, cmd.wx, cmd.wy)
        # heading target is recomputed each update; clear manual tgt
        ac.tgt_hdg_deg = None
