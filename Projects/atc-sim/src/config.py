# ====== General ======
TITLE = "ATC Simulation – Python"
FPS = 60                     # Render framerate cap
FIXED_DT = 1 / 30            # Simulation step (seconds)
RNG_SEED = 42                # Deterministic runs for debugging

# ====== Screen ======
SCREEN_WIDTH = 1300
SCREEN_HEIGHT = 750
BG_COLOR = (26, 26, 26)

# ====== UI/Fonts ======
# Pygame bundles 'freesansbold.ttf', safe as a default
FONT_NAME = "freesansbold.ttf"
FONT_SIZE = 16
UI_ACCENT = (0, 170, 255)
UI_TEXT = (220, 220, 220)
UI_MUTED = (140, 140, 140)
GRID_COLOR = (50, 50, 50)

# ====== Simulation Defaults ======
DEFAULT_TIME_SCALE = 1.0     # 0.25x, 0.5x, 1x, 2x, 4x supported in UI
PAUSED_AT_START = False

# ====== Separation (starter placeholders) ======
# These are for future conflict detection – tune later
LATERAL_SEP_NM = 3.0
VERTICAL_SEP_FT = 1000
KTS_TO_PXS = 0.12            # crude px/sec scaler for early prototyping
NM_TO_PX = 12.0              # crude conversion for the scope
