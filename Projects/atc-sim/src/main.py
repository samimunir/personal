import logging, random
import pygame as pg

from config import (
    TITLE, FPS, FIXED_DT, RNG_SEED, DEFAULT_TIME_SCALE, PAUSED_AT_START,
    SCREEN_WIDTH, SCREEN_HEIGHT, BG_COLOR,
    FONT_NAME, FONT_SIZE, UI_TEXT, UI_MUTED,
    INITIAL_CENTER_WX, INITIAL_CENTER_WY, INITIAL_ZOOM_PX_PER_NM,
    ZOOM_MIN, ZOOM_MAX, ZOOM_STEP
)

from core.scene import Scene, SceneManager
from core.camera import Camera
from sim.world import make_default_world
from ui.hud import DebugHUD
from ui.radar import RadarView

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger("atc")

class SimScene(Scene):
    def __init__(self, screen: pg.Surface):
        self.screen = screen
        self.clock = pg.time.Clock()
        self.font = pg.font.Font(FONT_NAME, FONT_SIZE)

        random.seed(RNG_SEED)
        self.world = make_default_world(RNG_SEED)

        self.camera = Camera(
            center_wx=INITIAL_CENTER_WX,
            center_wy=INITIAL_CENTER_WY,
            px_per_nm=INITIAL_ZOOM_PX_PER_NM,
            screen_w=screen.get_width(),
            screen_h=screen.get_height(),
            zoom_min=ZOOM_MIN,
            zoom_max=ZOOM_MAX
        )

        self.radar = RadarView(self.camera, self.world)
        self.hud = DebugHUD(font=self.font, time_scale=DEFAULT_TIME_SCALE, paused=PAUSED_AT_START)

        self.time_scale = DEFAULT_TIME_SCALE
        self.paused = PAUSED_AT_START

    def on_enter(self):
        log.info("Simulation started (Milestone 1).")

    def handle_event(self, e: pg.event.Event):
        if e.type == pg.QUIT:
            pg.event.post(pg.event.Event(pg.QUIT))  # let loop handle it
        elif e.type == pg.KEYDOWN:
            if e.key == pg.K_ESCAPE:
                pg.event.post(pg.event.Event(pg.QUIT))
            elif e.key == pg.K_SPACE:
                self.paused = not self.paused
            elif e.key == pg.K_F1:
                self.hud.show = not self.hud.show
            elif e.key in (pg.K_1, pg.K_2, pg.K_3, pg.K_4, pg.K_5):
                scale_map = {pg.K_1: 0.25, pg.K_2: 0.5, pg.K_3: 1.0, pg.K_4: 2.0, pg.K_5: 4.0}
                self.time_scale = scale_map[e.key]
            elif e.key == pg.K_a:
                self.world.spawn_arrival()
            elif e.key == pg.K_d:
                self.world.spawn_departure()

        # Radar handles mouse pan/zoom
        self.radar.handle_event(e, zoom_step=ZOOM_STEP, zoom_min=ZOOM_MIN, zoom_max=ZOOM_MAX)

    def update(self, dt: float):
        self.hud.time_scale = self.time_scale
        self.hud.paused = self.paused
        if not self.paused:
            self.hud.sim_time += dt * self.time_scale
            self.world.update(dt * self.time_scale)

    def draw(self, surface: pg.Surface):
        surface.fill(BG_COLOR)
        self.radar.draw(surface)
        self.hud.draw(surface)

def run():
    pg.init()
    pg.display.set_caption(TITLE)
    screen = pg.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    scenes = SceneManager()
    scenes.set(SimScene(screen))

    clock = pg.time.Clock()
    accumulator = 0.0
    running = True

    while running:
        # Events
        for e in pg.event.get():
            if e.type == pg.QUIT:
                running = False
            else:
                scenes.handle_event(e)

        # Timing
        frame_ms = clock.tick(FPS)
        scenes._scene.hud.fps = clock.get_fps() if hasattr(scenes._scene, "hud") else 0.0
        accumulator += frame_ms / 1000.0

        # Fixed-step updates
        while accumulator >= FIXED_DT:
            scenes.update(FIXED_DT)
            accumulator -= FIXED_DT

        # Render
        scenes.draw(screen)
        pg.display.flip()

    pg.quit()

if __name__ == "__main__":
    run()
