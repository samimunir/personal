import random as RANDOM
import string as STRING
import pygame as PG

from config import (
    FPS,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    BG_COLOR
)

def main() -> None:
    PG.init()
    SCREEN = PG.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    PG.display.set_caption("ATC Simulation - Python")
    CLOCK = PG.time.Clock()

    RUNNING = True

    while RUNNING:
        for EVENT in PG.event.get():
            if EVENT.type == PG.QUIT:
                RUNNING = False
        
        SCREEN.fill(BG_COLOR)

        PG.display.flip()
        CLOCK.tick(FPS)

    PG.quit()

if __name__ == '__main__':
    main()