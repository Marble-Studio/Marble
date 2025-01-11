function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oGame;
    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        

        s_bMobile = isMobile();
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
        }else{
            createjs.Touch.enable(s_oStage, true);
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = 30;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();


    };

    this.preloaderReady = function () {
        this._loadImages();
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        
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
        s_aSoundsInfo.push({path: './sounds/',filename:'game_over_theme',loop:false,volume:1, ingamename: 'game_over_theme'});
        s_aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'astronaut1',loop:false,volume:1, ingamename: 'astronaut1'});
        s_aSoundsInfo.push({path: './sounds/',filename:'astronaut2',loop:false,volume:1, ingamename: 'astronaut2'});
        s_aSoundsInfo.push({path: './sounds/',filename:'boing',loop:false,volume:1, ingamename: 'boing'});
        s_aSoundsInfo.push({path: './sounds/',filename:'combo',loop:false,volume:1, ingamename: 'combo'});
        s_aSoundsInfo.push({path: './sounds/',filename:'energy_lost',loop:false,volume:1, ingamename: 'energy_lost'});
        s_aSoundsInfo.push({path: './sounds/',filename:'evil_pig',loop:false,volume:1, ingamename: 'evil_pig'});
        s_aSoundsInfo.push({path: './sounds/',filename:'evil1',loop:false,volume:1, ingamename: 'evil1'});
        s_aSoundsInfo.push({path: './sounds/',filename:'evil2',loop:false,volume:1, ingamename: 'evil2'});
        s_aSoundsInfo.push({path: './sounds/',filename:'evil3',loop:false,volume:1, ingamename: 'evil3'});
        s_aSoundsInfo.push({path: './sounds/',filename:'evil8',loop:false,volume:1, ingamename: 'evil8'});
        s_aSoundsInfo.push({path: './sounds/',filename:'explosion',loop:false,volume:1, ingamename: 'explosion'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bomb',loop:false,volume:1, ingamename: 'bomb'});
        s_aSoundsInfo.push({path: './sounds/',filename:'pigmode',loop:false,volume:1, ingamename: 'pigmode'});
        s_aSoundsInfo.push({path: './sounds/',filename:'power_up',loop:false,volume:1, ingamename: 'power_up'});
        s_aSoundsInfo.push({path: './sounds/',filename:'shot',loop:false,volume:1, ingamename: 'shot'});
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
                                                                                    if ( s_aSounds[s_aSoundsInfo[i].ingamename]._sounds.length>0 && szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                        s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                        break;
                                                                                    }else{
                                                                                        document.querySelector("#block_game").style.display = "none";
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

        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");

        s_oSpriteLibrary.addSprite("life_bar_fill", "./sprites/life_bar_fill.png");
        s_oSpriteLibrary.addSprite("time_bar_fill", "./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("life_bar_box", "./sprites/life_bar_box.png");
        s_oSpriteLibrary.addSprite("time_bar_box", "./sprites/time_bar_box.png");

        s_oSpriteLibrary.addSprite("bg_level_bonus", "./sprites/bg_level_bonus.jpg");
        s_oSpriteLibrary.addSprite("bg_level_1", "./sprites/bg_level_1.jpg");
        s_oSpriteLibrary.addSprite("bg_level_2", "./sprites/bg_level_2.jpg");
        s_oSpriteLibrary.addSprite("bg_level_3", "./sprites/bg_level_3.jpg");
        s_oSpriteLibrary.addSprite("help_bg", "./sprites/help_bg.jpg");

        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("icon_audio", "./sprites/icon_audio.png");

        s_oSpriteLibrary.addSprite("explosion_sprite", "./sprites/explosion_sprite.png");
        s_oSpriteLibrary.addSprite("zap_flash", "./sprites/zap_flash.png");

        s_oSpriteLibrary.addSprite("game_over_panel", "./sprites/game_over_panel.png");

        s_oSpriteLibrary.addSprite("alien0", "./sprites/alien0.png");
        s_oSpriteLibrary.addSprite("alien1", "./sprites/alien1.png");
        s_oSpriteLibrary.addSprite("alien2", "./sprites/alien2.png");
        s_oSpriteLibrary.addSprite("alien3", "./sprites/alien3.png");
        s_oSpriteLibrary.addSprite("alien4", "./sprites/alien4.png");
        s_oSpriteLibrary.addSprite("alien5", "./sprites/alien5.png");
        s_oSpriteLibrary.addSprite("alien6", "./sprites/alien6.png");
        s_oSpriteLibrary.addSprite("alien7", "./sprites/alien7.png");
        s_oSpriteLibrary.addSprite("alien8", "./sprites/alien8.png");
        s_oSpriteLibrary.addSprite("alien9", "./sprites/alien9.png");
        s_oSpriteLibrary.addSprite("alien10", "./sprites/alien10.png");
        s_oSpriteLibrary.addSprite("alien11", "./sprites/alien11.png");

        s_oSpriteLibrary.addSprite("helmet", "./sprites/helmet.png");
        s_oSpriteLibrary.addSprite("helmet_explosion", "./sprites/helmet_explosion.png");

        s_oSpriteLibrary.addSprite("but_skip", "./sprites/but_skip.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");

        s_oSpriteLibrary.addSprite("item_bomb_sprite", "./sprites/item_bomb_sprite.png");
        s_oSpriteLibrary.addSprite("item_medikit_sprite", "./sprites/item_medikit_sprite.png");
        s_oSpriteLibrary.addSprite("item_pig_mode_sprite", "./sprites/item_pig_mode_sprite.png");
        s_oSpriteLibrary.addSprite("item_time_sprite", "./sprites/item_time_sprite.png");
        s_oSpriteLibrary.addSprite("item_assault_sprite", "./sprites/item_assault_sprite.png");
        s_oSpriteLibrary.addSprite("item_evil_horde_sprite", "./sprites/item_evil_horde_sprite.png");

        s_oSpriteLibrary.addSprite("icon_extra_speed", "./sprites/icon_extra_speed.png");
        s_oSpriteLibrary.addSprite("icon_astronaut_assault", "./sprites/icon_astronaut_assault.png");
        s_oSpriteLibrary.addSprite("icon_evil_horde", "./sprites/icon_evil_horde.png");
        s_oSpriteLibrary.addSprite("icon_pig_mode", "./sprites/icon_pig_mode.png");

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");

        s_oSpriteLibrary.addSprite("bonus_assault", "./sprites/bonus_assault.png");
        s_oSpriteLibrary.addSprite("bonus_evil_horde", "./sprites/bonus_evil_horde.png");
        s_oSpriteLibrary.addSprite("bonus_pig_mode", "./sprites/bonus_pig_mode.png");
        s_oSpriteLibrary.addSprite("bonus_speed_down", "./sprites/bonus_speed_down.png");
        
        s_oSpriteLibrary.addSprite("gui_panel", "./sprites/gui_panel.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

    };

    this._onAllImagesLoaded = function () {
        
    };
    
    this._onRemovePreloader = function(){
        _oPreloader.unload();
        

        s_oSoundTrack = playSound("soundtrack", 1, true);
        
        
        s_oMain.gotoMenu();
    };
    
    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function () {
        _oGame = new CGame(_oData);
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
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
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_aSoundsInfo ;
var s_aSounds;


var s_bFullscreen = false;