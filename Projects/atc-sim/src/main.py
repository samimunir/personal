import logging, random, math
import pygame as pg

from config import (
    TITLE, FPS, FIXED_DT, RNG_SEED, DEFAULT_TIME_SCALE, PAUSED_AT_START,
    SCREEN_WIDTH, SCREEN_HEIGHT, BG_COLOR,
    FONT_NAME, FONT_SIZE,
    INITIAL_CENTER_WX, INITIAL_CENTER_WY, INITIAL_ZOOM_PX_PER_NM,
    ZOOM_MIN, ZOOM_MAX, ZOOM_STEP,
    INTERCEPT_ANGLE_DEG, PLATFORM_ALT_FT, PLATFORM_RADIUS_NM
)

from core.scene import Scene, SceneManager
from core.camera import Camera
from sim.world import make_default_world
from sim.commands import HdgCmd, AltCmd, SpdCmd, DctCmd, apply_command
from ui.hud import DebugHUD
from ui.radar import RadarView
from ui.panels import CommandPrompt, Banner

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
        self.banner = Banner(self.font)
        self.prompt = CommandPrompt(self.font)

        self.time_scale = DEFAULT_TIME_SCALE
        self.paused = PAUSED_AT_START

    def on_enter(self):
        log.info("Simulation started (Milestone 2).")

    # ---------- Command helpers ----------
    def _selected(self):
        return self.world.selected

    def _prompt_number(self, mode: str, hint: str, on_ok):
        def _submit(text: str):
            if not text:
                return
            try:
                val = float(text)
                on_ok(val)
            except ValueError:
                pass
        self.prompt.start(mode, hint, _submit)

    def _prompt_direct_to(self):
        def _submit(text: str):
            if not text:
                return
            fx = self.world.find_fix(text)
            ac = self._selected()
            if fx and ac:
                name, wx, wy = fx
                apply_command(ac, DctCmd(name, wx, wy))
        self.prompt.start("DCT", "Type FIX name (e.g., KILO) and Enter", _submit)

    def _intercept_localizer(self):
        ac = self._selected()
        if not ac:
            return
        rw_hdg = self.world.runway.heading_deg
        hdg_rad = math.radians(rw_hdg)
        nx, ny = math.sin(hdg_rad), math.cos(hdg_rad)  # course unit vector
        cx, cy = self.world.runway.center_wx, self.world.runway.center_wy
        vx, vy = cx - ac.wx, cy - ac.wy
        cross = nx * vy - ny * vx  # sign tells which side of course
        turn_sign = -1.0 if cross > 0 else 1.0
        target = (rw_hdg + turn_sign * INTERCEPT_ANGLE_DEG) % 360.0
        apply_command(ac, HdgCmd(target))
        ac.phase = "VEC"

    def _descend_platform(self):
        ac = self._selected()
        if not ac:
            return
        dx = ac.wx - self.world.runway.center_wx
        dy = ac.wy - self.world.runway.center_wy
        dist = math.hypot(dx, dy)
        if dist <= PLATFORM_RADIUS_NM:
            apply_command(ac, AltCmd(PLATFORM_ALT_FT))
            ac.phase = "VEC"

    # ---------- Events ----------
    def handle_event(self, e: pg.event.Event):
        # Let prompt consume typing first
        self.prompt.handle_event(e)
        if self.prompt.active:
            # still allow pan/zoom while typing
            if e.type != pg.KEYDOWN:
                self.radar.handle_event(e, zoom_step=ZOOM_STEP, zoom_min=ZOOM_MIN, zoom_max=ZOOM_MAX)
            return

        if e.type == pg.QUIT:
            pg.event.post(pg.event.Event(pg.QUIT))

        elif e.type == pg.KEYDOWN:
            mods = pg.key.get_mods()

            if e.key == pg.K_ESCAPE:
                if self.world.selected:
                    self.world.selected = None
                else:
                    pg.event.post(pg.event.Event(pg.QUIT))

            elif e.key == pg.K_SPACE:
                self.paused = not self.paused

            elif e.key == pg.K_F1:
                self.hud.show = not self.hud.show

            elif e.key in (pg.K_1, pg.K_2, pg.K_3, pg.K_4, pg.K_5):
                scale_map = {pg.K_1: 0.25, pg.K_2: 0.5, pg.K_3: 1.0, pg.K_4: 2.0, pg.K_5: 4.0}
                self.time_scale = scale_map[e.key]

            # ---------- Commands (modifiers FIRST) ----------
            elif e.key == pg.K_h and self._selected():
                self._prompt_number("HDG", "Enter heading (0–359)",
                                    lambda v: apply_command(self._selected(), HdgCmd(v)))

            elif e.key == pg.K_s and self._selected():
                self._prompt_number("SPD", "Enter speed (kts)",
                                    lambda v: apply_command(self._selected(), SpdCmd(v)))

            # Altitude: Shift+A OR Ctrl+A (preempts plain "A")
            elif e.key == pg.K_a and self._selected() and (mods & (pg.KMOD_SHIFT | pg.KMOD_CTRL)):
                self._prompt_number("ALT", "Enter altitude (ft)",
                                    lambda v: apply_command(self._selected(), AltCmd(v)))

            elif e.key == pg.K_g and self._selected():
                self._prompt_direct_to()

            elif e.key == pg.K_l and self._selected():
                self._intercept_localizer()

            elif e.key == pg.K_v and self._selected():
                self._descend_platform()

            # ---------- Spawns (only when NO modifiers) ----------
            elif e.key == pg.K_a and not (mods & (pg.KMOD_SHIFT | pg.KMOD_CTRL | pg.KMOD_ALT | pg.KMOD_META)):
                self.world.spawn_arrival()

            elif e.key == pg.K_d and not (mods & (pg.KMOD_SHIFT | pg.KMOD_CTRL | pg.KMOD_ALT | pg.KMOD_META)):
                self.world.spawn_departure()

        # Mouse: selection / pan / zoom
        self.radar.handle_event(e, zoom_step=ZOOM_STEP, zoom_min=ZOOM_MIN, zoom_max=ZOOM_MAX)

    # ---------- Update/Draw ----------
    def update(self, dt: float):
        self.hud.time_scale = self.time_scale
        self.hud.paused = self.paused
        if not self.paused:
            self.hud.sim_time += dt * self.time_scale
            self.world.update(dt * self.time_scale)

        # Banner: show top conflicts
        lines = []
        for c in self.world.conflicts[:3]:
            a = self.world.aircraft[c.pair.a_idx].callsign
            b = self.world.aircraft[c.pair.b_idx].callsign
            lines.append(f"{c.level}: {a} ↔ {b}  ({c.lat_nm:.1f} NM / {int(c.vert_ft)} ft)")
        self.banner.set_lines(lines)

    def draw(self, surface: pg.Surface):
        surface.fill(BG_COLOR)
        self.radar.draw(surface)
        self.banner.draw(surface)
        self.hud.draw(surface)
        self.prompt.draw(surface)

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
        for e in pg.event.get():
            if e.type == pg.QUIT:
                running = False
            else:
                scenes.handle_event(e)

        frame_ms = clock.tick(FPS)
        if hasattr(scenes._scene, "hud"):
            scenes._scene.hud.fps = clock.get_fps()
        accumulator += frame_ms / 1000.0

        while accumulator >= FIXED_DT:
            scenes.update(FIXED_DT)
            accumulator -= FIXED_DT

        scenes.draw(screen)
        pg.display.flip()

    pg.quit()

if __name__ == "__main__":
    run()