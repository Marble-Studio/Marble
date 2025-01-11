var CANVAS_WIDTH = 1120;
var CANVAS_HEIGHT = 1400;

var EDGEBOARD_X = 250;
var EDGEBOARD_Y = 0;

var FPS = 30;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = false;

var PHYSICS_ITERATION = 15;
var PRIMARY_FONT = "sharksoftbites";
var SCORE_ITEM_NAME = "fatboydream";
var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var STAR_PATTERN_LINE = 0;
var STAR_PATTERN_CIRCUMFERENCE = 1;
var STAR_PATTERN_VERTICAL_LINE = 2;
var STAR_PATTERN_VERTICAL_SINE = 3;



var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;
var ON_COLLISION = 6;

var PLANET_SPEEDS = [4,
                     5,
                     6,
                     -4,
                     -5,
                     -6
                    ];

var STARTX = 153;
var STARTY = 1120;

var GRAVITY = 0.015;
var JUMP_FORCE = -3.5;
var WALL_JUMP_FORCE = 2.5;

var OBST_WIDTH;
var OBST_HEIGHT;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var SOUNDTRACK_VOLUME_IN_GAME = 0.4;