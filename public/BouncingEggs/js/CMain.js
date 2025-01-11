function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var _oLevelMenu;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage, true);
        s_oStage.preventSelection = false;

        s_oCanvas.opacity = 0.5;

        s_bMobile = isMobile();
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);
        
        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './sounds/',filename:'win',loop:false,volume:1, ingamename: 'win'});
        s_aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        s_aSoundsInfo.push({path: './sounds/',filename:'basket',loop:false,volume:1, ingamename: 'basket'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bounce',loop:false,volume:1, ingamename: 'bounce'});
        s_aSoundsInfo.push({path: './sounds/',filename:'lose_life',loop:false,volume:1, ingamename: 'lose_life'});
        
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        
        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
        
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                         s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                         break;
                                                                                     }
                                                                                }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                                                                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
    };
    
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_continue_big", "./sprites/but_continue_big.png");
        s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("keyboard", "./sprites/keyboard.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");
        s_oSpriteLibrary.addSprite("heroes", "./sprites/heroes.png");
        s_oSpriteLibrary.addSprite("bg_ui", "./sprites/bg_ui.png");
        s_oSpriteLibrary.addSprite("items_bar", "./sprites/items_bar.png");
        s_oSpriteLibrary.addSprite("obstacle_0", "./sprites/obstacle_0.png");
        s_oSpriteLibrary.addSprite("obstacle_1", "./sprites/obstacle_1.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("target_back", "./sprites/target_back.png");
        s_oSpriteLibrary.addSprite("target_front", "./sprites/target_front.png");
        s_oSpriteLibrary.addSprite("bonus_0", "./sprites/bonus_0.png");
        s_oSpriteLibrary.addSprite("heart", "./sprites/heart.png");
        s_oSpriteLibrary.addSprite("edge", "./sprites/edge.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("fade_help_0", "./sprites/fade_help_0.png");
        s_oSpriteLibrary.addSprite("fade_help_1", "./sprites/fade_help_1.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("eggs", "./sprites/eggs.png");
        s_oSpriteLibrary.addSprite("flowers", "./sprites/flowers.png");
        s_oSpriteLibrary.addSprite("platform", "./sprites/platform.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };

    this._onAllImagesLoaded = function () {

    };

    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack", 1, true);
        Box2D().then(function(oBox2D){
            s_oBox2D = oBox2D;
            s_oMain.gotoMenu();
        });
    };

    this.preloaderReady = function () {
        this._loadImages();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
           this._initSounds();
        }

        s_aLevelsDiagram = LEVEL_SETTINGS;
        
        _bUpdate = true;
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu(s_aLevelsDiagram.length);
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iTeamChoosed) {
        _oGame = new CGame(_oData, iTeamChoosed);
        _iState = STATE_GAME;
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    
    s_bAudioActive = oData.audio_enable_on_startup;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_oPhysicsController;
var s_iAdsLevel = 1;
var s_aLevelsDiagram;
var s_iLastLevel = 1;
var s_aScores;
var s_aScores = new Array();

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_bFullscreen = false;
var s_bStorageAvailable = true;
var s_aSounds;
var s_aSoundsInfo;
var s_oCanvas;
var s_oBox2D;