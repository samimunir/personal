import pygame as pg
from typing import Optional, Tuple, Callable, List
from config import PROMPT_BG, PROMPT_BORDER, PROMPT_TEXT, PROMPT_HINT, BANNER_BG, BANNER_TEXT, SCREEN_WIDTH

class CommandPrompt:
    """
    Lightweight modal prompt for H/A/S/G commands.
    Usage:
      prompt.start(mode, hint, on_submit)
      -> type...
      -> Enter => on_submit(text)
      -> Esc => cancel
    """
    def __init__(self, font: pg.font.Font):
        self.font = font
        self.active: bool = False
        self.mode: str = ""
        self.text: str = ""
        self.hint: str = ""
        self.on_submit: Optional[Callable[[str], None]] = None

    def start(self, mode: str, hint: str, on_submit: Callable[[str], None]):
        self.active = True
        self.mode = mode
        self.text = ""
        self.hint = hint
        self.on_submit = on_submit

    def cancel(self):
        self.active = False
        self.text = ""
        self.mode = ""
        self.hint = ""
        self.on_submit = None

    def handle_event(self, e: pg.event.Event):
        if not self.active: return
        if e.type == pg.KEYDOWN:
            if e.key == pg.K_ESCAPE:
                self.cancel()
            elif e.key == pg.K_RETURN:
                if self.on_submit:
                    self.on_submit(self.text.strip())
                self.cancel()
            elif e.key == pg.K_BACKSPACE:
                self.text = self.text[:-1]
            else:
                if e.unicode and (32 <= ord(e.unicode) < 127):
                    self.text += e.unicode

    def draw(self, surf: pg.Surface):
        if not self.active: return
        w = 560; h = 64
        x = (surf.get_width() - w)//2; y = surf.get_height() - h - 18
        pg.draw.rect(surf, PROMPT_BG, (x, y, w, h))
        pg.draw.rect(surf, PROMPT_BORDER, (x, y, w, h), 1)

        label = self.font.render(f"{self.mode}> {self.text}", True, PROMPT_TEXT)
        surf.blit(label, (x+12, y+12))
        hint = self.font.render(self.hint, True, PROMPT_HINT)
        surf.blit(hint, (x+12, y+34))

class Banner:
    """Top alert banner for conflicts."""
    def __init__(self, font: pg.font.Font):
        self.font = font
        self.lines: List[str] = []

    def set_lines(self, lines):
        self.lines = lines[:3]  # keep it short

    def draw(self, surf: pg.Surface):
        if not self.lines: return
        h = 24 + 18 * len(self.lines)
        pg.draw.rect(surf, BANNER_BG, (0, 0, surf.get_width(), h))
        for i, text in enumerate(self.lines):
            img = self.font.render(text, True, BANNER_TEXT)
            surf.blit(img, (12, 8 + i*18))