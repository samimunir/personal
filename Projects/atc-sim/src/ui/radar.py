import pygame as pg
from typing import Tuple
from config import (
    GRID_COLOR, RUNWAY_COLOR, FIX_COLOR, AIRCRAFT_COLOR, LEADER_COLOR,
    UI_TEXT, FONT_NAME, FONT_SIZE
)

class RadarView:
    def __init__(self, camera, world):
        self.cam = camera
        self.world = world
        self.font = pg.font.Font(FONT_NAME, FONT_SIZE)

        self._panning = False
        self._last_mouse: Tuple[int, int] | None = None

    # ---------- Input ----------
    def handle_event(self, e: pg.event.Event, zoom_step: float, zoom_min: float, zoom_max: float):
        if e.type == pg.MOUSEBUTTONDOWN:
            if e.button == 3:  # right mouse
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

    # ---------- Draw ----------
    def draw(self, surf: pg.Surface):
        self._draw_grid(surf)
        self._draw_runway(surf)
        self._draw_fixes(surf)
        self._draw_aircraft(surf)

    def _draw_grid(self, surf: pg.Surface):
        w, h = surf.get_size()
        # Choose a grid pitch in NM that maps to ~50-100 px per line
        target_px = 70
        pitch_nm = max(0.5, round(target_px / self.cam.px_per_nm, 1))
        # Draw vertical lines
        left_wx, top_wy = self.cam.screen_to_world(0, 0)
        right_wx, bot_wy = self.cam.screen_to_world(w, h)
        min_x = min(left_wx, right_wx)
        max_x = max(left_wx, right_wx)
        min_y = min(bot_wy, top_wy)
        max_y = max(bot_wy, top_wy)

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

        # Center crosshair
        cx, cy = self.cam.world_to_screen(self.cam.center_wx, self.cam.center_wy)
        pg.draw.line(surf, GRID_COLOR, (cx-8, cy), (cx+8, cy), 2)
        pg.draw.line(surf, GRID_COLOR, (cx, cy-8), (cx, cy+8), 2)

    def _draw_runway(self, surf: pg.Surface):
        a, b = self.world.runway.endpoints()
        ax, ay = self.cam.world_to_screen(*a)
        bx, by = self.cam.world_to_screen(*b)
        pg.draw.line(surf, RUNWAY_COLOR, (ax, ay), (bx, by), 6)

    def _draw_fixes(self, surf: pg.Surface):
        for name, wx, wy in self.world.fixes:
            sx, sy = self.cam.world_to_screen(wx, wy)
            pg.draw.circle(surf, FIX_COLOR, (sx, sy), 3)
            label = self.font.render(name, True, UI_TEXT)
            surf.blit(label, (sx + 6, sy - 10))

    def _draw_aircraft(self, surf: pg.Surface):
        for ac in self.world.aircraft:
            sx, sy = self.cam.world_to_screen(ac.wx, ac.wy)
            # target symbol
            pg.draw.circle(surf, AIRCRAFT_COLOR, (sx, sy), 3)

            # leader line
            lwx, lwy = ac.leader_endpoint(ac.leader_secs)
            lsx, lsy = self.cam.world_to_screen(lwx, lwy)
            pg.draw.line(surf, LEADER_COLOR, (sx, sy), (lsx, lsy), 1)

            # data block
            text = f"{ac.callsign}  {int(ac.alt_ft/100):02d} {int(ac.spd_kts)}"
            img = self.font.render(text, True, UI_TEXT)
            offx, offy = ac.label_offset_px
            surf.blit(img, (sx + offx, sy + offy))