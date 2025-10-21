# ====== App / Loop ======
TITLE = "ATC Simulation – Multi-Runway Prep"
FPS = 60
FIXED_DT = 1 / 30
RNG_SEED = 7
PAUSED_AT_START = False
DEFAULT_TIME_SCALE = 1.0

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
SELECT_COLOR = (255, 255, 0)
ALERT_COLOR = (255, 170, 60)
CONFLICT_COLOR = (255, 80, 80)
BANNER_BG = (32, 32, 40)
BANNER_TEXT = (240, 240, 245)

# Command prompt
PROMPT_BG = (18, 18, 22)
PROMPT_BORDER = (60, 60, 70)
PROMPT_TEXT = (235, 235, 240)
PROMPT_HINT = (150, 150, 160)

# ====== World Units / Camera ======
# 1 world unit = 1 NM (horizontal), altitude in ft
INITIAL_CENTER_WX = 0.0
INITIAL_CENTER_WY = 0.0
INITIAL_ZOOM_PX_PER_NM = 12.0
ZOOM_MIN = 4.0
ZOOM_MAX = 80.0
ZOOM_STEP = 1.15

# ====== Airport / Runways (multi-runway) ======
AIRPORT_ICAO = "ZATC"
# Define runways relative to airport origin (NM). Thresholds are tiny offsets around (0,0)
# name, length_ft, width_ft, (ident, course, thr_wx, thr_wy), (ident, course, thr_wx, thr_wy)
RUNWAYS_DEF = [
    ("16/34", 9000, 150, ("16", 160.0, -0.07, -0.45), ("34", 340.0,  0.07,  0.45)),
    ("09/27", 7000, 150, ("09",  90.0, -0.60,  0.10), ("27", 270.0,  0.60, -0.10)),
]
DEFAULT_ACTIVE_ARRIVAL = ("16/34", "16")
DEFAULT_ACTIVE_DEPARTURE = ("16/34", "16")

# ====== Spawning ======
ARRIVAL_RING_RADIUS_NM = 28.0   # far enough so you vector them in
ARRIVAL_MIN_ALT_FT = 6000
ARRIVAL_MAX_ALT_FT = 12000
ARRIVAL_MIN_SPD_KTS = 210
ARRIVAL_MAX_SPD_KTS = 280

DEPARTURE_INIT_ALT_FT = 0
DEPARTURE_INIT_SPD_KTS = 180
DEPARTURE_CLIMB_FPM = 2000

# ====== Separation ======
LATERAL_SEP_NM = 3.0
VERTICAL_SEP_FT = 1000
ALERT_LATERAL_NM = 2.0
ALERT_VERTICAL_FT = 600

# ====== Vector-to-final helper ======
INTERCEPT_ANGLE_DEG = 30.0
PLATFORM_ALT_FT = 3000.0
PLATFORM_RADIUS_NM = 15.0

# ====== Motion Trails ======
TRAILS_ENABLED = True
TRAIL_MAX_POINTS = 18
TRAIL_SAMPLE_SEC = 0.33

# ====== Centerline display ======
SHOW_ALL_CENTERLINES_DEFAULT = False
CENTERLINE_LENGTH_NM = 25.0
CENTERLINE_DASH_NM = 0.5