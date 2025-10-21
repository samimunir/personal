import logging
from dataclasses import dataclass
from typing import Optional

import pygame as pg

from config import (
    TITLE, FPS, FIXED_DT, RNG_SEED,
    SCREEN_WIDTH, SCREEN_HEIGHT, BG_COLOR,
    FONT_NAME, FONT_SIZE, UI_TEXT, UI_MUTED, UI_ACCENT, GRID_COLOR,
    DEFAULT_TIME_SCALE, PAUSED_AT_START
)

# ---------- Logging ----------
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger("atc")

# ---------- Small helpers ----------
def clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))

# ---------- Scene System ----------
class Scene:
    def on_enter(self): ...
    def on_exit(self): ...
    def handle_event(self, e: pg.event.Event): ...
    def update(self, dt: float): ...
    def draw(self, surface: pg.Surface): ...

class SceneManager:
    def __init__(self):
        self._scene: Optional[Scene] = None

    def set(self, scene: Scene):
        if self._scene: self._scene.on_exit()
        self._scene = scene
        self._scene.on_enter()

    def handle_event(self, e: pg.event.Event):
        if self._scene: self._scene.handle_event(e)

    def update(self, dt: float):
        if self._scene: self._scene.update(dt)

    def draw(self, surface: pg.Surface):
        if self._scene: self._scene.draw(surface)

# ---------- Debug HUD ----------
@dataclass
class DebugHUD:
    font: pg.font.Font
    show: bool = True
    fps: float = 0.0
    sim_time: float = 0.0
    time_scale: float = DEFAULT_TIME_SCALE
    paused: bool = PAUSED_AT_START

    def draw(self, surf: pg.Surface):
        if not self.show: return
        lines = [
            f"FPS: {self.fps:.1f}",
            f"Sim t: {self.sim_time:7.2f}s",
            f"Scale: x{self.time_scale:.2f}",
            f"Paused: {self.paused}",
        ]
        x, y = 10, 8
        for i, text in enumerate(lines):
            color = UI_TEXT if i < 2 else UI_MUTED
            img = self.font.render(text, True, color)
            surf.blit(img, (x, y + i * (self.font.get_height() + 2)))

# ---------- Sim Scene (placeholder world) ----------
class SimScene(Scene):
    def __init__(self, hud: DebugHUD):
        self.hud = hud
        self.sim_time = 0.0
        self.time_scale = DEFAULT_TIME_SCALE
        self.paused = PAUSED_AT_START
        self._make_scope_grid = True

    def on_enter(self):
        log.info("Simulation started")

    def handle_event(self, e: pg.event.Event):
        if e.type == pg.KEYDOWN:
            if e.key == pg.K_ESCAPE:
                pg.event.post(pg.event.Event(pg.QUIT))
            elif e.key == pg.K_SPACE:
                self.paused = not self.paused
            elif e.key == pg.K_F1:
                self.hud.show = not self.hud.show
            elif e.key in (pg.K_1, pg.K_2, pg.K_3, pg.K_4, pg.K_5):
                # Map 1..5 => 0.25x, 0.5x, 1x, 2x, 4x
                scale_map = {pg.K_1: 0.25, pg.K_2: 0.5, pg.K_3: 1.0, pg.K_4: 2.0, pg.K_5: 4.0}
                self.time_scale = scale_map[e.key]
            # future: command panel hotkeys, pan/zoom radar, etc.

    def update(self, dt: float):
        self.hud.time_scale = self.time_scale
        self.hud.paused = self.paused
        if not self.paused:
            self.sim_time += dt * self.time_scale
        self.hud.sim_time = self.sim_time

        # TODO: advance aircraft, conflict detection, handoffs, etc.

    def draw(self, surface: pg.Surface):
        surface.fill(BG_COLOR)
        self._draw_scope_grid(surface)
        # TODO: draw runways, fixes, routes, aircraft data blocks
        self.hud.draw(surface)

    def _draw_scope_grid(self, surface: pg.Surface):
        # Simple background grid to ground the UI visually
        step = 50
        w, h = surface.get_size()
        for x in range(0, w, step):
            pg.draw.line(surface, GRID_COLOR, (x, 0), (x, h), 1)
        for y in range(0, h, step):
            pg.draw.line(surface, GRID_COLOR, (0, y), (w, y), 1)
        # Crosshair
        cx, cy = w // 2, h // 2
        pg.draw.line(surface, UI_ACCENT, (cx - 10, cy), (cx + 10, cy), 2)
        pg.draw.line(surface, UI_ACCENT, (cx, cy - 10), (cx, cy + 10), 2)

# ---------- Game Loop (fixed timestep) ----------
def run():
    # Init
    pg.init()
    pg.display.set_caption(TITLE)
    screen = pg.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pg.time.Clock()

    # RNG determinism for testing (optional)
    try:
        import random as _r
        _r.seed(RNG_SEED)
    except Exception:
        pass

    # Fonts / HUD
    font = pg.font.Font(FONT_NAME, FONT_SIZE)
    hud = DebugHUD(font=font)

    # Scenes
    scenes = SceneManager()
    scenes.set(SimScene(hud))

    # Fixed timestep accumulator
    accumulator = 0.0
    running = True

    while running:
        # --- Events ---
        for e in pg.event.get():
            if e.type == pg.QUIT:
                running = False
            else:
                scenes.handle_event(e)

        # --- Timing ---
        frame_ms = clock.tick(FPS)  # limits FPS; returns elapsed ms
        hud.fps = clock.get_fps()
        accumulator += frame_ms / 1000.0

        # --- Fixed updates ---
        while accumulator >= FIXED_DT:
            scenes.update(FIXED_DT)
            accumulator -= FIXED_DT

        # --- Render ---
        scenes.draw(screen)
        pg.display.flip()

    pg.quit()

if __name__ == "__main__":
    run()
