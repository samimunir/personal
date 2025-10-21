# ====== App / Loop ======
TITLE = "ATC Simulation – Milestone 1"
FPS = 60
FIXED_DT = 1 / 30          # simulation step (seconds)
RNG_SEED = 7
PAUSED_AT_START = False
DEFAULT_TIME_SCALE = 1.0   # 0.25x, 0.5x, 1x, 2x, 4x (keys 1-5)

# ====== Screen ======
SCREEN_WIDTH = 1300
SCREEN_HEIGHT = 750
BG_COLOR = (20, 20, 24)

# ====== Fonts / UI ======
FONT_NAME = "freesansbold.ttf"
FONT_SIZE = 15
UI_TEXT = (230, 230, 235)
UI_MUTED = (150, 150, 160)
UI_ACCENT = (0, 170, 255)
GRID_COLOR = (45, 45, 52)
FIX_COLOR = (140, 200, 255)
RUNWAY_COLOR = (210, 210, 210)
AIRCRAFT_COLOR = (0, 255, 180)
LEADER_COLOR = (80, 210, 180)
CONFLICT_COLOR = (255, 100, 100)

# ====== World Units / Camera ======
# We treat 1 world unit as 1 nautical mile in X/Y, altitude in ft.
INITIAL_CENTER_WX = 0.0   # world origin placed at airport center (wx, wy in NM)
INITIAL_CENTER_WY = 0.0
INITIAL_ZOOM_PX_PER_NM = 12.0  # pixels per NM at zoom 1.0

ZOOM_MIN = 4.0
ZOOM_MAX = 80.0
ZOOM_STEP = 1.15  # multiplicative per wheel click

# ====== Airport / Runway (starter) ======
AIRPORT_ICAO = "ZATC"
# A single runway aligned 160/340 (i.e., 160° heading for arrivals landing "16")
RUNWAY_HEADING_DEG = 160.0
RUNWAY_LENGTH_FT = 9000
RUNWAY_WIDTH_FT = 150
# Place at world origin (0,0). Use NM for horizontal distances.
RUNWAY_CENTER_WX = 0.0
RUNWAY_CENTER_WY = 0.0

# ====== Spawning ======
ARRIVAL_RING_RADIUS_NM = 28.0     # where arrivals appear
ARRIVAL_MIN_ALT_FT = 6000
ARRIVAL_MAX_ALT_FT = 12000
ARRIVAL_MIN_SPD_KTS = 210
ARRIVAL_MAX_SPD_KTS = 280

DEPARTURE_INIT_ALT_FT = 0
DEPARTURE_INIT_SPD_KTS = 180
DEPARTURE_CLIMB_FPM = 2000

# ====== Separation (for future; used to tint if too close later) ======
LATERAL_SEP_NM = 3.0
VERTICAL_SEP_FT = 1000