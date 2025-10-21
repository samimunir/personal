from dataclasses import dataclass
from typing import List, Tuple, Optional
import math

FT_PER_NM = 6076.12

@dataclass
class RunwayEnd:
    ident: str            # e.g., "16"
    course_deg: float     # final approach course (0=N, 90=E)
    threshold_wx: float   # world NM (east)
    threshold_wy: float   # world NM (north)

@dataclass
class Runway:
    name: str             # "16/34"
    length_ft: int
    width_ft: int
    ends: Tuple[RunwayEnd, RunwayEnd]

    def end_by_ident(self, ident: str) -> Optional[RunwayEnd]:
        i = ident.strip().upper()
        for e in self.ends:
            if e.ident.upper() == i:
                return e
        return None

@dataclass
class Airport:
    icao: str
    runways: List[Runway]
    active_arrival: RunwayEnd
    active_departure: RunwayEnd

    def all_runway_ends(self) -> List[RunwayEnd]:
        out: List[RunwayEnd] = []
        for rwy in self.runways:
            out.extend(list(rwy.ends))
        return out

    def cycle_arrival(self):
        ends = self.all_runway_ends()
        idx = ends.index(self.active_arrival)
        self.active_arrival = ends[(idx + 1) % len(ends)]

    def cycle_departure(self):
        ends = self.all_runway_ends()
        idx = ends.index(self.active_departure)
        self.active_departure = ends[(idx + 1) % len(ends)]

def _normalize_runway_geometry(
    name: str,
    length_ft: int,
    width_ft: int,
    end_a_raw: Tuple[str, float, float, float],  # (ident, course, thr_wx, thr_wy)
    end_b_raw: Tuple[str, float, float, float],
) -> Runway:
    """
    Recompute threshold positions so they are EXACTLY aligned to the runway axis
    defined by end A's course. Keep the runway centered near the average of the
    provided threshold positions so the airport stays where you intended.
    """
    ident_a, course_a, ax_raw, ay_raw = end_a_raw
    ident_b, course_b_raw, bx_raw, by_raw = end_b_raw

    # Midpoint of the raw thresholds (keeps user’s intended airport placement)
    mid_wx = (ax_raw + bx_raw) * 0.5
    mid_wy = (ay_raw + by_raw) * 0.5

    # Axis from end A's course
    cr = math.radians(float(course_a))
    ux, uy = math.sin(cr), math.cos(cr)  # 0°=north, 90°=east (matches aircraft math)

    # Half-length in NM
    half_len_nm = (float(length_ft) / FT_PER_NM) * 0.5

    # New, perfectly aligned thresholds
    ax = mid_wx + ux * half_len_nm
    ay = mid_wy + uy * half_len_nm
    bx = mid_wx - ux * half_len_nm
    by = mid_wy - uy * half_len_nm

    # Force opposite end to be antiparallel
    course_b = (float(course_a) + 180.0) % 360.0

    end_a = RunwayEnd(ident=ident_a, course_deg=float(course_a), threshold_wx=ax, threshold_wy=ay)
    end_b = RunwayEnd(ident=ident_b, course_deg=course_b,      threshold_wx=bx, threshold_wy=by)

    return Runway(name=name, length_ft=int(length_ft), width_ft=int(width_ft), ends=(end_a, end_b))

def build_airport(icao: str, runways_def, default_arr, default_dep) -> Airport:
    """
    runways_def:
      [
        (name, length_ft, width_ft,
         (identA, courseA, thrAx, thrAy),
         (identB, courseB, thrBx, thrBy)),
        ...
      ]
    """
    runways: List[Runway] = []
    for name, length, width, end_a, end_b in runways_def:
        # Normalize geometry so the thresholds are collinear with the declared course
        rwy = _normalize_runway_geometry(name, length, width, end_a, end_b)
        runways.append(rwy)

    # pick defaults
    def find_end(name: str, ident: str) -> RunwayEnd:
        for r in runways:
            if r.name == name:
                e = r.end_by_ident(ident)
                if e:
                    return e
        # fallback
        return runways[0].ends[0]

    arr_end = find_end(default_arr[0], default_arr[1])
    dep_end = find_end(default_dep[0], default_dep[1])
    return Airport(icao=icao, runways=runways, active_arrival=arr_end, active_departure=dep_end)