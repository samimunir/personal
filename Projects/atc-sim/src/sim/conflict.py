from dataclasses import dataclass
from typing import List, Tuple, Dict, Set
import math

@dataclass(frozen=True)
class Pair:
    a_idx: int
    b_idx: int

@dataclass
class Proximity:
    pair: Pair
    lat_nm: float
    vert_ft: float
    level: str  # "OK" | "ALERT" | "CONFLICT"

def dist_nm(ax, ay, bx, by) -> float:
    dx = ax - bx
    dy = ay - by
    return math.hypot(dx, dy)

def build_conflicts(aircraft, cell_nm: float,
                    alert_lat_nm: float, alert_vert_ft: float,
                    sep_lat_nm: float, sep_vert_ft: float) -> List[Proximity]:
    # Spatial hashing by square cells in world NM
    cells: Dict[Tuple[int,int], List[int]] = {}
    for i, ac in enumerate(aircraft):
        cx = int(ac.wx // cell_nm)
        cy = int(ac.wy // cell_nm)
        cells.setdefault((cx, cy), []).append(i)

    checked: Set[Tuple[int,int]] = set()
    prox: List[Proximity] = []

    neigh = [(-1,-1), (0,-1), (1,-1),
             (-1, 0), (0, 0), (1, 0),
             (-1, 1), (0, 1), (1, 1)]

    for (cx, cy), idxs in cells.items():
        for dx, dy in neigh:
            key = (cx+dx, cy+dy)
            if key not in cells: continue
            for i in idxs:
                for j in cells[key]:
                    if j <= i: continue
                    a = aircraft[i]; b = aircraft[j]
                    lat = dist_nm(a.wx, a.wy, b.wx, b.wy)
                    vert = abs(a.alt_ft - b.alt_ft)
                    level = "OK"
                    if lat < sep_lat_nm and vert < sep_vert_ft:
                        level = "CONFLICT"
                    elif lat < alert_lat_nm and vert < alert_vert_ft:
                        level = "ALERT"
                    if level != "OK":
                        prox.append(Proximity(pair=Pair(i, j), lat_nm=lat, vert_ft=vert, level=level))
    return prox