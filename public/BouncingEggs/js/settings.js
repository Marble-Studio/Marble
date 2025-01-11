var CANVAS_WIDTH = 840;
var CANVAS_HEIGHT = 1024;

var CANVAS_WIDTH_HALF = CANVAS_WIDTH * 0.5;
var CANVAS_HEIGHT_HALF = CANVAS_HEIGHT * 0.5;

var EDGEBOARD_X = 140;
var EDGEBOARD_Y = 90;

var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "dimboregular";
var TEXT_COLOR = "#fff";


var FPS = 30;

var FPS_TIME = 1 / FPS;

var SOUNDTRACK_VOLUME_IN_GAME = 1;

var TIME_STEP_BOX2D = 1 / 20;

var ITINERATION_BOX2D = 3;

var POSITION_ITINERATION_BOX2D = 3;

var ITEMS_ANGULAR_IMPULSE = -8.5;

var FORCE_HEROES_Y = -11;

var FORCE_HEROES_X_MULTIPLIER = -3.5;

var URL_LEVELS_SETTINGS = "json/levels_settings.json";

var ITEMS_TYPE = 2;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;
var ON_BUT_NO_DOWN = 6;
var ON_BUT_YES_DOWN = 7;

var MAX_BONUS_INSTANCES = 1;

var TIME_INTERVAL_SPAWN_ITEM = 0.7;

var TWEEN_END_MACTH_Y = CANVAS_HEIGHT * 0.5;

var MAX_ASSIGNED_STAR = 3;

var LEVEL_DIAGRAM;

var WALL = 0;

var TARGET = 1;

var HEROES = 2;

var OBSTACLE = 3;

var FLOOR = 4;

var ITEM = [5,9,10,11,12,13];

var BONUS_HEART = 6;

var LEFT_WALL = 7;
var RIGHT_WALL = 8;

var ITEM_IN_TARGET_ANIM_POS = {x: 400, y: 545};

var HEROES_START_POSITION = {x: 415, y: 750};

var HEROES_REG_OFFSET = {x:0,y:0};//{x: 10, y: 30};

var HEROES_X_LIMIT = {min: 100 + HEROES_REG_OFFSET.x, max: 720 + HEROES_REG_OFFSET.x};

var ITEM_CATEGORY_COLLISION = 0x0001;
var FIELD_CATEGORY_COLLISION = 0x0002;
var HEROES_CATEGORY_COLLISION = 0x0003;
var BONUS_CATEGORY_COLLISION = 0x0004;

var ITEM_DAMPING = [0.3];

var ITEM_ANGULAR_DAMPING = [0.1];

var WALL_DENSITY = 1;

var WALL_FRICTION = 1.0;

var WALL_RESTITUTION = 0.7;

var WORLD_SCALE = 30;

var STATE_INIT = 0;
var STATE_PLAY = 1;
var STATE_FINISH = 2;
var STATE_PAUSE = 3;

var TEST = false;
//FIELD DIAGRAM

var FIELD_DIAGRAM = [[{x: 0, y: CANVAS_HEIGHT - EDGEBOARD_Y}, {x: 0, y: -EDGEBOARD_Y}, LEFT_WALL],
    [{x: 0, y: -EDGEBOARD_Y}, {x: CANVAS_WIDTH, y: -EDGEBOARD_Y}, WALL],
    [{x: CANVAS_WIDTH, y: -EDGEBOARD_Y}, {x: CANVAS_WIDTH, y: CANVAS_HEIGHT - EDGEBOARD_Y}, RIGHT_WALL],
    [{x: CANVAS_WIDTH, y: CANVAS_HEIGHT - EDGEBOARD_Y}, {x: 0, y: CANVAS_HEIGHT - EDGEBOARD_Y}, FLOOR]];

var SPAWN_ITEMS_RANGE_X = {min: EDGEBOARD_X * 1.5, max: CANVAS_WIDTH - (EDGEBOARD_X * 1.5)};

var COLLISION_HEROES = {x: HEROES_START_POSITION.x, y: HEROES_START_POSITION.y, width: 80, height: 1, density: 1, friction: 0.5, restitution: 0,
    sensor: false, info: {type: HEROES}, angle: 0, catBits: HEROES_CATEGORY_COLLISION, maskBits: ITEM_CATEGORY_COLLISION, groupId: 1};

var COLLISION_TARGET = {x: 430, y: 481, width: 70, height: 30, density: 0, friction: 0, restitution: 0, sensor: true, info: {type: TARGET}, angle: 0,
    catBits: HEROES_CATEGORY_COLLISION, maskBits: ITEM_CATEGORY_COLLISION, groupId: 1};

var ITEM_DENSITY = 0.3;
var ITEM_FRICTION = 0.1;
var ITEM_WIDTH = 20;
var COLLISION_ITEM = [
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[0]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1},
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[1]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1},
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[2]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1},
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[3]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1},
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[4]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1},
    {x: 0, y: 0, width: ITEM_WIDTH, density: ITEM_DENSITY, friction: ITEM_FRICTION, restitution: 0.7, info: {type: ITEM[5]},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: ITEM_CATEGORY_COLLISION, maskBits: HEROES_CATEGORY_COLLISION, groupId: -1}
];

var OBSTACLES_COLLISION = [{x: 13, y: 25, width: 105, height: 23, density: 100, friction: 0.7, restitution: 0.3, sensor: false, info: {type: OBSTACLE}, angle: 45,
        catBits: HEROES_CATEGORY_COLLISION, maskBits: ITEM_CATEGORY_COLLISION, groupId: 1},
    {x: 15, y: 28, width: 192, height: 37, density: 100, friction: 0.5, restitution: 0.4, sensor: false, info: {type: OBSTACLE}, angle: 0,
        catBits: HEROES_CATEGORY_COLLISION, maskBits: ITEM_CATEGORY_COLLISION, groupId: 1}];

var COLLISION_BONUS = [{x: 0, y: 0, width: 20, density: 0.3, friction: 0.5, restitution: 0.7, info: {type: BONUS_HEART},
        linearDamping: ITEM_DAMPING[0], angularDamping: ITEM_ANGULAR_DAMPING[0],
        catBits: HEROES_CATEGORY_COLLISION, maskBits: BONUS_CATEGORY_COLLISION, groupId: 1}];

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var DEBUG_BOX2D = false;