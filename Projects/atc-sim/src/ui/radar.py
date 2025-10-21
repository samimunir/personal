import math
import pygame as pg
from typing import Tuple, Optional
from config import (
    GRID_COLOR, RUNWAY_COLOR, FIX_COLOR, AIRCRAFT_COLOR, LEADER_COLOR,
    UI_TEXT, FONT_NAME, FONT_SIZE, SELECT_COLOR, ALERT_COLOR, CONFLICT_COLOR,
    TRAILS_ENABLED, CENTERLINE_LENGTH_NM, CENTERLINE_DASH_NM
)

HIT_RADIUS_PX = 8

class RadarView:
    def __init__(self, camera, world):
        self.cam = camera
        self.world = world
        self.font = pg.font.Font(FONT_NAME, FONT_SIZE)

        self._panning = False
        self._last_mouse: Optional[Tuple[int, int]] = None
        self.show_all_centerlines = False  # toggled by X

    # ---------- Input ----------
    def handle_event(self, e: pg.event.Event, zoom_step: float, zoom_min: float, zoom_max: float):
        if e.type == pg.MOUSEBUTTONDOWN:
            if e.button == 1:  # left: select
                self._select_at(e.pos)
            elif e.button == 3:  # right: pan
                self._panning = True
                self._last_mouse = e.pos
            elif e.button == 4:  # wheel up
                self.cam.zoom_at_screen_point(1.0 * zoom_step, *e.pos)
            elif e.button == 5:  # wheel down
                self.cam.zoom_at_screen_point(1.0 / zoom_step, *e.pos)

        elif e.type == pg.MOUSEBUTTONUP:
            if e.button == 3:
                self._panning = False
                self._last_mouse = None

        elif e.type == pg.MOUSEMOTION and self._panning:
            if self._last_mouse is not None:
                dx = e.pos[0] - self._last_mouse[0]
                dy = e.pos[1] - self._last_mouse[1]
                self.cam.pan_pixels(dx, dy)
                self._last_mouse = e.pos

    def _select_at(self, pos):
        sx, sy = pos
        best = None; best_d2 = (HIT_RADIUS_PX+1) ** 2
        for ac in self.world.aircraft:
            ax, ay = self.cam.world_to_screen(ac.wx, ac.wy)
            dx = ax - sx; dy = ay - sy
            d2 = dx*dx + dy*dy
            if d2 <= best_d2:
                best = ac; best_d2 = d2
        self.world.selected = best

    # ---------- Draw ----------
    def draw(self, surf: pg.Surface):
        self._draw_grid(surf)
        self._draw_runways(surf)
        self._draw_centerlines(surf)
        self._draw_fixes(surf)
        self._draw_aircraft(surf)
        self._draw_conflicts(surf)

    def _draw_grid(self, surf: pg.Surface):
        w, h = surf.get_size()
        target_px = 70
        pitch_nm = max(0.5, round(target_px / self.cam.px_per_nm, 1))
        left_wx, top_wy = self.cam.screen_to_world(0, 0)
        right_wx, bot_wy = self.cam.screen_to_world(w, h)
        min_x = min(left_wx, right_wx); max_x = max(left_wx, right_wx)
        min_y = min(bot_wy, top_wy); max_y = max(bot_wy, top_wy)

        start_x = (int(min_x / pitch_nm) - 1) * pitch_nm
        x = start_x
        while x < max_x + pitch_nm:
            sx, _ = self.cam.world_to_screen(x, 0)
            pg.draw.line(surf, GRID_COLOR, (sx, 0), (sx, h), 1)
            x += pitch_nm

        start_y = (int(min_y / pitch_nm) - 1) * pitch_nm
        y = start_y
        while y < max_y + pitch_nm:
            _, sy = self.cam.world_to_screen(0, y)
            pg.draw.line(surf, GRID_COLOR, (0, sy), (w, sy), 1)
            y += pitch_nm

        cx, cy = self.cam.world_to_screen(self.cam.center_wx, self.cam.center_wy)
        pg.draw.line(surf, GRID_COLOR, (cx-8, cy), (cx+8, cy), 2)
        pg.draw.line(surf, GRID_COLOR, (cx, cy-8), (cx, cy+8), 2)

    def _draw_runways(self, surf: pg.Surface):
        for rwy in self.world.airport.runways:
            a = rwy.ends[0]; b = rwy.ends[1]
            ax, ay = self.cam.world_to_screen(a.threshold_wx, a.threshold_wy)
            bx, by = self.cam.world_to_screen(b.threshold_wx, b.threshold_wy)
            pg.draw.line(surf, RUNWAY_COLOR, (ax, ay), (bx, by), 6)
            # labels near thresholds
            la = self.font.render(a.ident, True, UI_TEXT)
            lb = self.font.render(b.ident, True, UI_TEXT)
            surf.blit(la, (ax + 6, ay - 6))
            surf.blit(lb, (bx + 6, by - 6))

    def _draw_centerlines(self, surf: pg.Surface):
        # Draw extended centerlines; active arrival end always shown.
        ends = []
        active_end = self.world.get_active_arrival_end()
        if self.show_all_centerlines:
            # all ends
            for r in self.world.airport.runways:
                ends.extend(list(r.ends))
        else:
            ends = [active_end]

        for e in ends:
            # extend OUTBOUND from threshold along final course
            cr = math.radians(e.course_deg)
            dx = math.sin(cr)
            dy = math.cos(cr)
            segs = int(CENTERLINE_LENGTH_NM / CENTERLINE_DASH_NM)
            for i in range(segs):
                s0 = i * CENTERLINE_DASH_NM
                s1 = s0 + CENTERLINE_DASH_NM * 0.6  # gap after 60%
                wx0 = e.threshold_wx + dx * s0
                wy0 = e.threshold_wy + dy * s0
                wx1 = e.threshold_wx + dx * s1
                wy1 = e.threshold_wy + dy * s1
                x0, y0 = self.cam.world_to_screen(wx0, wy0)
                x1, y1 = self.cam.world_to_screen(wx1, wy1)
                pg.draw.line(surf, (120, 160, 200) if e is active_end else (90, 110, 130), (x0, y0), (x1, y1), 1)

    def _draw_fixes(self, surf: pg.Surface):
        for name, wx, wy in self.world.fixes:
            sx, sy = self.cam.world_to_screen(wx, wy)
            pg.draw.circle(surf, FIX_COLOR, (sx, sy), 3)
            label = self.font.render(name, True, UI_TEXT)
            surf.blit(label, (sx + 6, sy - 10))

    def _draw_aircraft(self, surf: pg.Surface):
        sel = self.world.selected
        for ac in self.world.aircraft:
            sx, sy = self.cam.world_to_screen(ac.wx, ac.wy)

            # trails
            if TRAILS_ENABLED and ac._trail:
                last = (sx, sy)
                for wx, wy in ac._trail[::-1]:
                    tx, ty = self.cam.world_to_screen(wx, wy)
                    pg.draw.line(surf, (70, 90, 90), (tx, ty), last, 1)
                    last = (tx, ty)

            # symbol
            pg.draw.circle(surf, AIRCRAFT_COLOR, (sx, sy), 3)

            # selection ring
            if ac is sel:
                pg.draw.circle(surf, SELECT_COLOR, (sx, sy), 7, 1)

            # leader line
            lwx, lwy = ac.leader_endpoint(ac.leader_secs)
            lsx, lsy = self.cam.world_to_screen(lwx, lwy)
            pg.draw.line(surf, LEADER_COLOR, (sx, sy), (lsx, lsy), 1)

            # data block
            vs_arrow = "↑" if ac.vs_fpm > 200 else ("↓" if ac.vs_fpm < -200 else " ")
            txt = f"{ac.callsign} {ac.phase}  {int(ac.alt_ft/100):02d}{vs_arrow}  {int(ac.spd_kts)}"
            img = self.font.render(txt, True, UI_TEXT)
            offx, offy = ac.label_offset_px
            surf.blit(img, (sx + offx, sy + offy))

    def _draw_conflicts(self, surf: pg.Surface):
        for item in self.world.conflicts:
            a = self.world.aircraft[item.pair.a_idx]
            b = self.world.aircraft[item.pair.b_idx]
            ax, ay = self.cam.world_to_screen(a.wx, a.wy)
            bx, by = self.cam.world_to_screen(b.wx, b.wy)
            color = CONFLICT_COLOR if item.level == "CONFLICT" else ALERT_COLOR
            pg.draw.line(surf, color, (ax, ay), (bx, by), 1)