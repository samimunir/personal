from dataclasses import dataclass
import pygame as pg
from config import UI_TEXT, UI_MUTED

@dataclass
class DebugHUD:
    font: pg.font.Font
    show: bool = True
    fps: float = 0.0
    sim_time: float = 0.0
    time_scale: float = 1.0
    paused: bool = False

    def draw(self, surf: pg.Surface):
        if not self.show: return
        lines = [
            f"FPS: {self.fps:.1f}",
            f"Sim t: {self.sim_time:7.2f}s",
            f"Scale: x{self.time_scale:.2f}",
            f"Paused: {self.paused}",
            "A: arrival  D: departure  RMB-drag: pan  Wheel: zoom"
        ]
        x, y = 10, 8
        for i, text in enumerate(lines):
            color = UI_TEXT if i < 3 else UI_MUTED
            img = self.font.render(text, True, color)
            surf.blit(img, (x, y + i * (self.font.get_height() + 2)))