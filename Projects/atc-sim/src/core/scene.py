from typing import Optional
import pygame as pg

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
        if self._scene: self._scene.on_enter()

    def handle_event(self, e: pg.event.Event):
        if self._scene: self._scene.handle_event(e)

    def update(self, dt: float):
        if self._scene: self._scene.update(dt)

    def draw(self, surface: pg.Surface):
        if self._scene: self._scene.draw(surface)
