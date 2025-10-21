from dataclasses import dataclass
import pygame as pg

@dataclass
class Camera:
    center_wx: float      # world X (NM, +east)
    center_wy: float      # world Y (NM, +north)
    px_per_nm: float      # zoom scalar (pixels per NM)

    screen_w: int
    screen_h: int
    zoom_min: float
    zoom_max: float

    def world_to_screen(self, wx: float, wy: float) -> tuple[int, int]:
        # y-up (world) -> y-down (screen) flip
        sx = (wx - self.center_wx) * self.px_per_nm + self.screen_w / 2
        sy = (-(wy - self.center_wy)) * self.px_per_nm + self.screen_h / 2
        return int(sx), int(sy)

    def screen_to_world(self, sx: float, sy: float) -> tuple[float, float]:
        wx = (sx - self.screen_w / 2) / self.px_per_nm + self.center_wx
        wy = -((sy - self.screen_h / 2) / self.px_per_nm - self.center_wy)
        return wx, wy

    def pan_pixels(self, dx_px: float, dy_px: float):
        # drag the screen by pixels => move camera center in world
        self.center_wx -= dx_px / self.px_per_nm
        self.center_wy += dy_px / self.px_per_nm

    def zoom_at_screen_point(self, factor: float, anchor_sx: float, anchor_sy: float):
        # Zoom keeping (anchor_sx, anchor_sy) stable in world space.
        before_w = self.screen_to_world(anchor_sx, anchor_sy)
        self.px_per_nm = max(self.zoom_min, min(self.zoom_max, self.px_per_nm * factor))
        after_w = self.screen_to_world(anchor_sx, anchor_sy)
        # adjust center so the anchor remains over same world point
        self.center_wx += (before_w[0] - after_w[0])
        self.center_wy += (before_w[1] - after_w[1])
