function CInterface(iLevel) {
    var _oAudioToggle;
    var _pStartPosPause;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    var _bStoppedTime;
    var _pStartPosScore;
    
    var _oListener;
    var _oTransBg;
    var _oHelpBg;
    var _oHelpGreenText;
    var _oHelpAstronautText;
    var _oHelpYellowText;
    var _oHelpYellowText2;
    var _aAliensInfo;
    var _aAliensInfoText;
    var _aBonusInfo;
    var _oButNext;
    var _oHelmet;
    var _oBgUp;
    var _oBgDown;
    var _oScoreText;
    var _oBonusEvilHordeToggle;
    var _oBonusAstronautsAssault;
    var _oBonusPigMode;
    var _oBonusExtraSpeed;
    var _oTimeBarBg;
    var _oTimeBar;
    var _oTimeMask;
    var _iTimeBarWidth;
    var _iTimeBarHeight;
    var _oTimeText;
    var _oLifeBarBg;
    var _oLifeBar;
    var _oLifeMask;
    var _iLifeBarWidth;
    var _iLifeBarHeight;
    var _oWaveText;
    var _oButPause;
    var _oButExit;
    var _oPauseText;
    var _oButContinue;
    var _oGoodHitText;
    var _oPercHitText;
    var _oFinalScoreText;
    var _oScore;
    var _oHelp2Container;
    var _oCongratContainer;
    var _pLifeContPos = {};
    var _oLifeContainer;
    var _iWaveAds;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {
        _bStoppedTime = false;

        _aAliensInfo = new Array();
        _aAliensInfoText = new Array();

        _aBonusInfo = new Array();

        _iWaveAds = 0;

        var oSpriteGui = s_oSpriteLibrary.getSprite("gui_panel");
        _oBgUp = createBitmap(oSpriteGui);
        _oBgUp.x = oSpriteGui.width;
        _oBgUp.y = oSpriteGui.height + OFFSET_BG_UP;
        _oBgUp.rotation = 180;
        _oBgUp.on("click", function () {});

        s_oStage.addChild(_oBgUp);

        var oSpriteGui = s_oSpriteLibrary.getSprite("gui_panel");
        _oBgDown = createBitmap(oSpriteGui);
        _oBgDown.x = 0;
        _oBgDown.y = CANVAS_HEIGHT - oSpriteGui.height + OFFSET_BG_DOWN;

        s_oStage.addChild(_oBgDown);
        _oBgDown.on("click", function () {});

        var oSpritePause = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: CANVAS_WIDTH - (oSpritePause.width / 2) - 10, y: CANVAS_HEIGHT - oSpritePause.height/2 - 10};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSpritePause);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease, this);

        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: _pStartPosPause.x - oSpriteExit.width - 5, y: _pStartPosPause.y};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('icon_audio');
            _pStartPosAudio = {x: _pStartPosExit.x - oSprite.width/2 - 5, y: CANVAS_HEIGHT - (oSprite.height / 2) - 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 5,y: CANVAS_HEIGHT - (oSprite.height / 2) - 10};
        }else{
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSprite.width/2 - 5, y: CANVAS_HEIGHT - (oSprite.height / 2) - 10};
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oButPause.block(true);
        _oButExit.block(true);

        var oSpriteTimeBarBg = s_oSpriteLibrary.getSprite('time_bar_box');
        _oTimeBarBg = createBitmap(oSpriteTimeBarBg);
        _oTimeBarBg.x = (CANVAS_WIDTH / 2 - 100) - (oSpriteTimeBarBg.width / 2) / 1.5;
        _oTimeBarBg.y = CANVAS_HEIGHT / 2 - 367;
        _oTimeBarBg.scaleX = 0.6;
        _oTimeBarBg.scaleY = 0.6;
        s_oStage.addChild(_oTimeBarBg);

        var oSpriteLifeBarBg = s_oSpriteLibrary.getSprite('life_bar_box');
        _oLifeBarBg = createBitmap(oSpriteLifeBarBg);
        _oLifeBarBg.x = -(oSpriteLifeBarBg.width / 2) - 38;
        _oLifeBarBg.y = -3;

        //GAME INTERFACE
        var oInfoText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-230, CANVAS_HEIGHT / 2 - 405, 230, 36, 
                    36, "center", "#d4d503", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_TIME,
                    true, true, false,
                    false );
         
        var oBonusText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2+20, CANVAS_HEIGHT / 2 - 405, 200, 36, 
                    36, "center", "#d4d503", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS,
                    true, true, false,
                    false );
                 
        _pStartPosScore = {x:10,y:CANVAS_HEIGHT - 50};
        _oScoreText = new CTLText(s_oStage, 
                    _pStartPosScore.x, _pStartPosScore.y, 300, 36, 
                    36, "left", "#d4d503", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_SCORE+ " 0",
                    true, true, false,
                    false );


        var oSpriteToggle = s_oSpriteLibrary.getSprite("icon_evil_horde");
        var oData = {
            images: [oSpriteToggle],
            // width, height & registration point of each sprite
            frames: {width: oSpriteToggle.width / 2, height: oSpriteToggle.height, regX: (oSpriteToggle.width / 2) / 2, regY: oSpriteToggle.height / 2},
            animations: {state_false: 0, state_true: 1}
        };
        var pBonusPosition = {x: 50, y: 345};
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBonusEvilHordeToggle = createSprite(oSpriteSheet, "state_false", (oSpriteToggle.width / 2) / 2, oSpriteToggle.height / 2, oSpriteToggle.width / 2, oSpriteToggle.height);
        _oBonusEvilHordeToggle.x = CANVAS_WIDTH / 2 + pBonusPosition.x;
        _oBonusEvilHordeToggle.y = CANVAS_HEIGHT / 2 - pBonusPosition.y;
        s_oStage.addChild(_oBonusEvilHordeToggle);

        oSpriteToggle = s_oSpriteLibrary.getSprite("icon_astronaut_assault");
        var oData = {
            images: [oSpriteToggle],
            // width, height & registration point of each sprite
            frames: {width: oSpriteToggle.width / 2, height: oSpriteToggle.height, regX: (oSpriteToggle.width / 2) / 2, regY: oSpriteToggle.height / 2},
            animations: {state_false: 0, state_true: 1}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBonusAstronautsAssault = createSprite(oSpriteSheet, "state_false", (oSpriteToggle.width / 2) / 2, oSpriteToggle.height / 2, oSpriteToggle.width / 2, oSpriteToggle.height);
        _oBonusAstronautsAssault.x = CANVAS_WIDTH / 2 + pBonusPosition.x + 50;
        _oBonusAstronautsAssault.y = CANVAS_HEIGHT / 2 - pBonusPosition.y;
        s_oStage.addChild(_oBonusAstronautsAssault);

        oSpriteToggle = s_oSpriteLibrary.getSprite("icon_pig_mode");
        var oData = {
            images: [oSpriteToggle],
            // width, height & registration point of each sprite
            frames: {width: oSpriteToggle.width / 2, height: oSpriteToggle.height, regX: (oSpriteToggle.width / 2) / 2, regY: oSpriteToggle.height / 2},
            animations: {state_false: 0, state_true: 1}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBonusPigMode = createSprite(oSpriteSheet, "state_false", (oSpriteToggle.width / 2) / 2, oSpriteToggle.height / 2, oSpriteToggle.width / 2, oSpriteToggle.height);
        _oBonusPigMode.x = CANVAS_WIDTH / 2 + pBonusPosition.x + 100;
        _oBonusPigMode.y = CANVAS_HEIGHT / 2 - pBonusPosition.y;
        s_oStage.addChild(_oBonusPigMode);

        oSpriteToggle = s_oSpriteLibrary.getSprite("icon_extra_speed");
        var oData = {
            images: [oSpriteToggle],
            // width, height & registration point of each sprite
            frames: {width: oSpriteToggle.width / 2, height: oSpriteToggle.height, regX: (oSpriteToggle.width / 2) / 2, regY: oSpriteToggle.height / 2},
            animations: {state_false: 0, state_true: 1}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBonusExtraSpeed = createSprite(oSpriteSheet, "state_false", (oSpriteToggle.width / 2) / 2, oSpriteToggle.height / 2, oSpriteToggle.width / 2, oSpriteToggle.height);
        _oBonusExtraSpeed.x = CANVAS_WIDTH / 2 + pBonusPosition.x + 150;
        _oBonusExtraSpeed.y = CANVAS_HEIGHT / 2 - pBonusPosition.y;
        s_oStage.addChild(_oBonusExtraSpeed);

        var oSpriteTimeBar = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oTimeBar = createBitmap(oSpriteTimeBar);
        _oTimeBar.x = (CANVAS_WIDTH / 2 - 100) - (oSpriteTimeBar.width / 2) / 1.5;
        _oTimeBar.y = CANVAS_HEIGHT / 2 - 365;
        _oTimeBar.scaleX = 0.6;
        _oTimeBar.scaleY = 0.6;
        s_oStage.addChild(_oTimeBar);

        _iTimeBarHeight = oSpriteTimeBar.height;
        _iTimeBarWidth = oSpriteTimeBar.width / 1 - 5;

        _oTimeMask = new createjs.Shape();
        _oTimeMask.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oTimeBar.x, _oTimeBar.y, _iTimeBarWidth, _iTimeBarHeight);
        _oTimeBar.mask = _oTimeMask;

        _oTimeText = new createjs.Text(TIME_FINISH_GAME, 32 + "px " + PRIMARY_FONT, "#ff0000");
        _oTimeText.textAlign = "center";
        _oTimeText.textBaseline = "alphabetic";
        _oTimeText.x = CANVAS_WIDTH / 2 - 110;
        _oTimeText.y = CANVAS_HEIGHT / 2 - 315;
        s_oStage.addChild(_oTimeText);
        
        _pLifeContPos = {x: CANVAS_WIDTH / 2 + 70, y: CANVAS_HEIGHT / 2 + 330};

        _oLifeContainer = new createjs.Container();
        _oLifeContainer.x = _pLifeContPos.x;
        _oLifeContainer.y = _pLifeContPos.y;
        s_oStage.addChild(_oLifeContainer);
        
        var oSpriteLifeBar = s_oSpriteLibrary.getSprite('life_bar_fill');
        _oLifeBar = createBitmap(oSpriteLifeBar);
        _oLifeBar.x = -(oSpriteLifeBar.width / 2) - 40;

        _iLifeBarHeight = oSpriteLifeBar.height;
        _iLifeBarWidth = oSpriteLifeBar.width;

        _oLifeMask = new createjs.Shape();
        _oLifeMask.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oLifeBar.x, _oLifeBar.y, _iLifeBarWidth, _iLifeBarHeight);
        _oLifeBar.mask = _oLifeMask;

        var oLifeText = new CTLText(_oLifeContainer, 
                    -_iLifeBarWidth/2, 22, 300, 32, 
                    32, "center", "#d4d503", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_LIFE,
                    true, true, false,
                    false );
                    
 

       
        _oLifeContainer.addChild( _oLifeBarBg, _oLifeBar);
       

        _oWaveText = new createjs.Text(TEXT_WAVE + " " + iLevel, 36 + "px " + PRIMARY_FONT, "#d4d503");
        _oWaveText.x = CANVAS_WIDTH / 2;
        _oWaveText.y = CANVAS_HEIGHT / 2 - 420;
        _oWaveText.textAlign = "center";
        _oWaveText.textBaseline = "alphabetic";
        s_oStage.addChild(_oWaveText);

        _oTransBg = new createjs.Shape();
        _oTransBg.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oListener = _oTransBg.on("click",function(){});
        _oTransBg.alpha = 0.5;
        _oTransBg.visible = false;
        s_oStage.addChild(_oTransBg);
        
    };

    this.refreshButtonPos = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, _pStartPosAudio.y - s_iOffsetY);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - s_iOffsetX,_pStartPosFullscreen.y - s_iOffsetY);
        }
        
        _oButPause.setPosition(_pStartPosPause.x - s_iOffsetX, _pStartPosPause.y - s_iOffsetY);
        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y - s_iOffsetY)
        _oScoreText.setX(_pStartPosScore.x+s_iOffsetX);
        _oScoreText.setY( _pStartPosScore.y-s_iOffsetY);
        
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this._onButPauseRelease = function () {
        s_oGame.setPause(true);

        _oTransBg.visible = true;

        _oPauseText = new createjs.Text(TEXT_PAUSE, 48 + "px " + PRIMARY_FONT, "#ffffff");
        _oPauseText.textAlign = "center";
        _oPauseText.textBaseline = "alphabetic";
        _oPauseText.x = CANVAS_WIDTH / 2;
        _oPauseText.y = CANVAS_HEIGHT / 2 - 250;
        s_oStage.addChild(_oPauseText);

        _oButPause.block(true);
        _oButExit.block(true);

        createjs.Ticker.paused = true;

        var oSpriteContinue = s_oSpriteLibrary.getSprite('but_continue');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, oSpriteContinue);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);

    };

    this._onButContinueRelease = function () {
        _oTransBg.visible = false;

        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oPauseText);
        _oPauseText = null;

        _oButPause.block(false);
        _oButExit.block(false);

        createjs.Ticker.paused = false;

        s_oGame.setPause(false);
    };
    
    this.refreshBonusToggleAssault = function (bVal) {
        _oBonusAstronautsAssault.gotoAndStop("state_" + bVal);
    };

    this.refreshBonusToggleSpeedDown = function (bVal) {
        _oBonusExtraSpeed.gotoAndStop("state_" + bVal);
    };

    this.refreshBonusToggleEvilHorde = function (bVal) {
        _oBonusEvilHordeToggle.gotoAndStop("state_" + bVal);
    };

    this.refreshBonusTogglePigMode = function (bVal) {
        _oBonusPigMode.gotoAndStop("state_" + bVal);
    };

    this.refreshScore = function (iScore) {
        _oScoreText.refreshText(TEXT_SCORE+" "+iScore);
    };

    this.refreshMissionNumber = function (iLevel) {
        _oWaveText.text = "WAVE " + iLevel;
    };

    this.refreshTime = function (iTime) {
        _oTimeText.text = Math.round(iTime);
        _oTimeMask.graphics.clear();
        var iNewMaskWidth = Math.floor((iTime * _iTimeBarWidth) / 100);
        _oTimeMask.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oTimeBar.x, _oTimeBar.y, iNewMaskWidth, _iTimeBarHeight);
    };

    this.refreshLifeBar = function (iLife) {
        _oLifeMask.graphics.clear();
        var iNewMaskWidth = Math.floor((iLife * _iLifeBarWidth) / 100);
        _oLifeMask.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oLifeBar.x, _oLifeBar.y, iNewMaskWidth, _iLifeBarHeight);
    };

    this.help = function (aSprite, aSpriteBonus) {

        var oSpriteHelpBg = s_oSpriteLibrary.getSprite('help_bg');
        _oHelpBg = createBitmap(oSpriteHelpBg);
        _oHelpBg.on("click", function () {
            //DO NOTHING
        });
        s_oStage.addChild(_oHelpBg);

        _oHelpGreenText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-200, CANVAS_HEIGHT / 2 - 430, 400, 72, 
                    36, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP1,
                    true, true, true,
                    false );
                    
        _oHelpAstronautText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-200, CANVAS_HEIGHT / 2 - 98, 400, 72, 
                    36, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP3,
                    true, true, true,
                    false );        
        

        _oHelpYellowText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-270, CANVAS_HEIGHT / 2 + 150, 200, 36, 
                    36, "right", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP5,
                    true, true, false,
                    false );
                    
        _oHelpYellowText2 = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2+40, CANVAS_HEIGHT / 2 + 150, 400, 36, 
                    36, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP6,
                    true, true, false,
                    false );
  

        var iPoint = 0;
        var iStep = 0;

        var oData;

        for (var i = 0; i < aSprite.length - 4; i++) {
            oData = {
                images: [aSprite[i]],
                // width, height & registration point of each sprite
                frames: {width: aSprite[i].width / 4, height: aSprite[i].height, regX: (aSprite[i].width / 2) / 2, regY: aSprite[i].height / 2},
                animations: {normal: [0, 1, "normal", 0.2], pig: [2, 3, "pig", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oCreatedSprite;
            var oCreatedText;
            _aAliensInfo[i] = new createjs.Container();
            oCreatedSprite = createSprite(oSpriteSheet, "normal", (aSprite[i].width / 2) / 2, aSprite[i].height / 2, aSprite[i].width / 2, aSprite[i].height);
            _aAliensInfo[i].regX = (oCreatedSprite.width / 2) / 2;
            _aAliensInfo[i].regY = (oCreatedSprite.height / 2);
            oCreatedText = new createjs.Text("+" + ALIENS_SETTINGS[i][0], 32 + "px " + PRIMARY_FONT, "#ffcc00");
            oCreatedText.y = 40;
            oCreatedText.x = -70;

            if (i === 4) {
                iStep = 0;
            }

            _aAliensInfo[i].x = CANVAS_WIDTH / 2 - 100 + (100 * iStep);

            if (i < 4) {
                _aAliensInfo[i].y = CANVAS_HEIGHT / 2 - 310;
            }
            else {
                _aAliensInfo[i].y = CANVAS_HEIGHT / 2 - 180;

            }
            iStep++;
            _aAliensInfo[i].addChild(oCreatedSprite, oCreatedText);
            s_oStage.addChild(_aAliensInfo[i]);
            iPoint++;
        }
        //HELMET ON ALIEN 7
        var oSpriteHelmet = s_oSpriteLibrary.getSprite('helmet');

        _oHelmet = createBitmap(oSpriteHelmet);
        _oHelmet.regX = oSpriteHelmet.width / 2;
        _oHelmet.regY = oSpriteHelmet.height / 2;
        _oHelmet.x = CANVAS_WIDTH / 2 + 160;
        _oHelmet.y = CANVAS_HEIGHT / 2 - 200;
        s_oStage.addChild(_oHelmet);
        //ALIEN BONUS
        oData = {
            images: [aSprite[iPoint]],
            // width, height & registration point of each sprite
            frames: {width: aSprite[iPoint].width / 4, height: aSprite[iPoint].height, regX: (aSprite[iPoint].width / 2) / 2, regY: aSprite[iPoint].height / 2},
            animations: {normal: [0, 1, "normal", 0.2], pig: [2, 3, "pig", 0.2]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oCreatedSprite;
        _aAliensInfo[iPoint] = new createjs.Container();
        oCreatedSprite = createSprite(oSpriteSheet, "normal", (aSprite[iPoint].width / 2) / 2, aSprite[iPoint].height / 2, aSprite[iPoint].width / 2, aSprite[iPoint].height);
        _aAliensInfo[iPoint].regX = (oCreatedSprite.width / 2) / 2;
        _aAliensInfo[iPoint].regY = (oCreatedSprite.height / 2);
        _aAliensInfo[iPoint].x = CANVAS_WIDTH / 2 + 25;
        _aAliensInfo[iPoint].y = CANVAS_HEIGHT / 2 + 160;
        _aAliensInfo[iPoint].addChild(oCreatedSprite);
        s_oStage.addChild(_aAliensInfo[iPoint]);
        iPoint++;

        //ASTRONAUTS
        iStep = 0;
        for (var i = iPoint; i < aSprite.length; i++) {
            oData = {
                images: [aSprite[i]],
                // width, height & registration point of each sprite
                frames: {width: aSprite[i].width / 2, height: aSprite[i].height, regX: (aSprite[i].width / 2) / 2, regY: aSprite[i].height / 2},
                animations: {normal: [0, 1, "normal", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oCreatedSprite;
            var oCreatedText;

            _aAliensInfo[i] = new createjs.Container();
            oCreatedSprite = createSprite(oSpriteSheet, "normal", (aSprite[i].width / 2) / 2, aSprite[i].height / 2, aSprite[i].width / 2, aSprite[i].height);
            _aAliensInfo[i].regX = (oCreatedSprite.width / 2) / 2;
            _aAliensInfo[i].regY = (oCreatedSprite.height / 2);
            oCreatedText = new createjs.Text("+" + ALIENS_SETTINGS[i][0], 32 + "px " + PRIMARY_FONT, "#ffcc00");
            oCreatedText.y = 55;
            oCreatedText.x = -40;
            _aAliensInfo[i].addChild(oCreatedSprite, oCreatedText);
            _aAliensInfo[i].x = CANVAS_WIDTH / 2 - 140 + (140 * iStep);
            _aAliensInfo[i].y = CANVAS_HEIGHT / 2 + 30;
            s_oStage.addChild(_aAliensInfo[i]);
            iStep++;
        }
        //BONUS ITEM
        var j = 0;
        //BONUS 0
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 5, height: aSpriteBonus[j].height / 2, regX: (aSpriteBonus[j].width / 2) / 5, regY: (aSpriteBonus[j].height / 2) / 2},
            animations: {normal: [0, 9, "normal", 1]}
        };
        //_oButton.visible=true;
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 5, (aSpriteBonus[j].height / 2) / 2, aSpriteBonus[j].width / 5, aSpriteBonus[j].height / 2);
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 - 210;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;

        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        //BONUS 1
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 8, height: aSpriteBonus[j].height / 2, regX: (aSpriteBonus[j].width / 2) / 8, regY: (aSpriteBonus[j].height / 2) / 2},
            animations: {normal: [0, 14, "normal", 1]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 8, (aSpriteBonus[j].height / 2) / 2, aSpriteBonus[j].width / 8, aSpriteBonus[j].height / 2);
        //_oButton.visible=true;
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 - 150;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;
        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        //BONUS 2
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 2, height: aSpriteBonus[j].height, regX: (aSpriteBonus[j].width / 2) / 2, regY: aSpriteBonus[j].height / 2},
            animations: {normal: [0, 1, "normal", 0.2]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 2, aSpriteBonus[j].height / 2, aSpriteBonus[j].width / 2, aSpriteBonus[j].height);
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 - 80;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;
        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        //BONUS 3
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 2, height: aSpriteBonus[j].height, regX: (aSpriteBonus[j].width / 2) / 2, regY: aSpriteBonus[j].height / 2},
            animations: {normal: [0, 1, "normal", 0.2]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 2, aSpriteBonus[j].height / 2, aSpriteBonus[j].width / 2, aSpriteBonus[j].height);
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 - 10;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;
        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        //BONUS 4
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 5, height: aSpriteBonus[j].height / 2, regX: (aSpriteBonus[j].width / 2) / 5, regY: (aSpriteBonus[j].height / 2) / 2},
            animations: {normal: [0, 9, "normal", 1]}
        };
        //_oButton.visible=true;
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 7, (aSpriteBonus[j].height / 2) / 2, aSpriteBonus[j].width / 7, aSpriteBonus[j].height / 2);
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 + 60;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;

        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        //BONUS 5
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 7, height: aSpriteBonus[j].height, regX: (aSpriteBonus[j].width / 2) / 7, regY: aSpriteBonus[j].height / 2},
            animations: {normal: {frames: [0, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 0]}}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 7, aSpriteBonus[j].height / 2, aSpriteBonus[j].width / 7, aSpriteBonus[j].height);
        //_oButton.visible=t    rue;
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 + 130;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;
        s_oStage.addChild(_aBonusInfo[j]);
        j++;
        // BONUS 6
        var oData = {
            images: [aSpriteBonus[j]],
            // width, height & registration point of each sprite
            frames: {width: aSpriteBonus[j].width / 2, height: aSpriteBonus[j].height, regX: (aSpriteBonus[j].width / 2) / 2, regY: aSpriteBonus[j].height / 2},
            animations: {normal: [0, 1, "normal", 0.2]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _aBonusInfo[j] = createSprite(oSpriteSheet, "normal", (aSpriteBonus[j].width / 2) / 2, aSpriteBonus[j].height / 2, aSpriteBonus[j].width / 2, aSpriteBonus[j].height);
        _aBonusInfo[j].x = CANVAS_WIDTH / 2 + 200;
        _aBonusInfo[j].y = CANVAS_HEIGHT / 2 + 250;
        s_oStage.addChild(_aBonusInfo[j]);

        var oSpriteNext = s_oSpriteLibrary.getSprite('but_skip');
        _oButNext = new CGfxButton(CANVAS_WIDTH / 2 + 180, CANVAS_HEIGHT / 2 + 350, oSpriteNext);
        _oButNext.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this);

        this.refreshButtonPos();

    };

    this._onButFinishRelease = function () {
        for (var i = 0; i < _aAliensInfo.length; i++) {
            s_oStage.removeChild(_aAliensInfo[i]);
            _aAliensInfo[i] = null;
        }

        _oTransBg.visible = false;

        _oButContinue.unload();
        _oButContinue = null;


        s_oStage.removeChild(_oHelmet);
        _oHelmet = null;
        
        _oHelpYellowText.unload();
        _oHelpGreenText.unload();
        _oGoodHitText.unload();
        _oFinalScoreText.unload();
        _oPercHitText.unload();

        s_oStage.removeChild(_oScore);
        _oScore = null;

        _iWaveAds++;
        if (_iWaveAds === NUM_WAVES_FOR_ADS) {
            _iWaveAds = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }

        s_oGame.nextLevel();
    };

    this.animWave = function () {

        createjs.Tween.get(_oWaveText).to({y: CANVAS_HEIGHT / 2, scaleX: 2, scaleY: 2}, 1000, createjs.Ease.bounceOut).call(function () {
            createjs.Tween.get(_oWaveText).wait(500).to({y: CANVAS_HEIGHT / 2 - 420, scaleX: 1.0, scaleY: 1.0}, 1000, createjs.Ease.circInOut).call(function () {
                s_oGame.setPause(false);
            });
        });
    };

    this.missionComplete = function (iScore, aSprite, iLv, aHitAlienNum, oPercHit) {

        _oTransBg.visible = true;

        _oHelpYellowText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-300, CANVAS_HEIGHT / 2 - 400,600, 40, 
                    40, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_MISSION + " "+iLv+" " + TEXT_COMPLETED + "!!",
                    true, true, false,
                    false );
                    
                   

        _oHelpGreenText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-300, CANVAS_HEIGHT / 2 - 340, 600, 32, 
                    32, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_ALIENS_KILLED,
                    true, true, false,
                    false );


        var iStep = 0;

        var oData;

        for (var i = 0; i < aSprite.length - 4; i++) {
            oData = {
                images: [aSprite[i]],
                // width, height & registration point of each sprite
                frames: {width: aSprite[i].width / 4, height: aSprite[i].height, regX: (aSprite[i].width / 2) / 2, regY: aSprite[i].height / 2},
                animations: {normal: [0, 1, "normal", 0.2], pig: [2, 3, "pig", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oCreatedSprite;
            var oCreatedText;
            _aAliensInfo[i] = new createjs.Container();
            oCreatedSprite = createSprite(oSpriteSheet, "normal", (aSprite[i].width / 2) / 2, aSprite[i].height / 2, aSprite[i].width / 2, aSprite[i].height);
            _aAliensInfo[i].regX = (oCreatedSprite.width / 2) / 2;
            _aAliensInfo[i].regY = (oCreatedSprite.height / 2);
            oCreatedText = new createjs.Text(aHitAlienNum[i], 40 + "px " + PRIMARY_FONT, "#99cc00");
            oCreatedText.textAlign = "center";
            oCreatedText.textBaseline = "alphabetic";
            oCreatedText.y = 70;
            oCreatedText.x = -40;

            if (i === 4) {
                iStep = 0;
            }

            _aAliensInfo[i].x = CANVAS_WIDTH / 2 - 200 + (150 * iStep);

            if (i < 4) {
                _aAliensInfo[i].y = CANVAS_HEIGHT / 2 - 250;
            }
            else {
                _aAliensInfo[i].y = CANVAS_HEIGHT / 2 - 120;

            }
            iStep++;
            _aAliensInfo[i].addChild(oCreatedSprite, oCreatedText);
            s_oStage.addChild(_aAliensInfo[i]);
        }
        //HELMET ON ALIEN 7
        var oSpriteHelmet = s_oSpriteLibrary.getSprite('helmet');
        _oHelmet = createBitmap(oSpriteHelmet);
        _oHelmet.regX = oSpriteHelmet.width / 2;
        _oHelmet.regY = oSpriteHelmet.height / 2;
        _oHelmet.x = CANVAS_WIDTH / 2 + 210;
        _oHelmet.y = CANVAS_HEIGHT / 2 - 140;
        s_oStage.addChild(_oHelmet);

        var iTotalAlienHit = 0;

        for (var i = 0; i < aHitAlienNum.length; i++) {
            iTotalAlienHit += aHitAlienNum[i];
        }

        _oGoodHitText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2-20, 300, 100, 
                    50, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_GOOD_HIT + "\n" + iTotalAlienHit,
                    true, true, true,
                    false ); 
                    
    

        var iPercHit;

        iPercHit = (oPercHit.good / oPercHit.tot) * 100;

        _oPercHitText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2 + 30, CANVAS_HEIGHT / 2-20, 300, 100, 
                    50, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                   TEXT_PERCENTAGE + "\n" + Math.floor(iPercHit) + "%",
                    true, true, true,
                    false ); 
        

        _oFinalScoreText = new CTLText(s_oStage, 
                    CANVAS_WIDTH / 2-250, CANVAS_HEIGHT / 2 + 100, 500, 100, 
                    50, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_FINAL_SCORE+"\n"+iScore,
                    true, true, true,
                    false ); 

        var oSpriteContinue = s_oSpriteLibrary.getSprite('but_continue');
        if (iLv < ALIEN_OCCURENCE_PER_LEVEL.length) {
            _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 300, oSpriteContinue);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButFinishRelease, this);
        }
        else
        {
            _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 300, oSpriteContinue);
            _oButContinue.addEventListenerWithParams(ON_MOUSE_UP, this._onCompleteGame, this, iScore);
        }
        $(s_oMain).trigger("end_level", iLv);
        $(s_oMain).trigger("save_score", iScore);
    };

    this._onCompleteGame = function (iScore) {

        _oCongratContainer = new createjs.Container();
        _oCongratContainer.x = CANVAS_WIDTH / 2;
        _oCongratContainer.y = CANVAS_HEIGHT / 2 - 200;
        s_oStage.addChild(_oCongratContainer);
        
        var oCongratText = new CTLText(_oCongratContainer, 
                    -250, 0, 500, 90, 
                    90, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_CONGRATULATIONS,
                    true, true, false,
                    false ); 


        var oCompleteText = new CTLText(_oCongratContainer, 
                    -250, 100, 500, 80, 
                    40, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_COMPLETE_ROW_1 + "\n" + TEXT_COMPLETE_ROW_2,
                    true, true, true,
                    false ); 


        var oScoreText = new CTLText(_oCongratContainer, 
                    -250, 200, 500, 80, 
                    40, "center", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_TOTAL_SCORE + "\n" + iScore,
                    true, true, true,
                    false ); 


        for (var i = 0; i < _aAliensInfo.length; i++) {
            s_oStage.removeChild(_aAliensInfo[i]);
            _aAliensInfo[i] = null;
        }

        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oHelmet);
        _oHelmet = null;
        
        _oHelpYellowText.unload();
        _oHelpGreenText.unload();
        _oGoodHitText.unload();
        _oFinalScoreText.unload();
        _oPercHitText.unload();

        s_oStage.removeChild(_oScore);
        _oScore = null;

        var oSpriteContinue = s_oSpriteLibrary.getSprite('but_restart');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 300, oSpriteContinue);
        _oButContinue.addEventListener(ON_MOUSE_DOWN, s_oGame.onExit, this);

        $(s_oMain).trigger("share_event", iScore);

    };

    this._onButNextRelease = function () {
        for (var i = 0; i < _aAliensInfo.length; i++) {
            s_oStage.removeChild(_aAliensInfo[i]);
            _aAliensInfo[i] = null;
        }

        _oHelpGreenText.unload()

        _oHelpYellowText.unload();
        _oHelpAstronautText.unload();
        _oHelpYellowText2.unload();
        
        s_oStage.removeChild(_oHelmet);
        _oHelmet = null;
        

        this.help2();
    };

    this._onButPlay = function () {
        _oButNext.unload();

        for (var i = 0; i < _aBonusInfo.length; i++) {
            s_oStage.removeChild(_aBonusInfo[i]);
            _aBonusInfo[i] = null;
        }

        _oHelpGreenText.unload()

        //s_oStage.removeChild(_oTransBg);
        createjs.Tween.get(_oHelpBg).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
            s_oStage.removeChild(_oHelpBg);
            _oHelpBg = null;
            s_oInterface.animWave();
        });
        s_oStage.removeChild(_oHelp2Container);
        _oHelp2Container = null;

        _oButPause.block(false);
        _oButExit.block(false);
        $(s_oMain).trigger("start_level", iLevel);
        //s_oGame.setPause(false);
    };

    this.help2 = function () {

        _oButNext.addEventListener(ON_MOUSE_UP, this._onButPlay, this);

        for (var i = 0; i < _aBonusInfo.length; i++) {
            _aBonusInfo[i].x = CANVAS_WIDTH / 2 - 170;
            _aBonusInfo[i].y = CANVAS_HEIGHT / 2 - 300 + (100 * i);
        }

        var iWidthBonus = 60;
        
        _oHelp2Container = new createjs.Container();
        _oHelp2Container.x = CANVAS_WIDTH / 2 - 190;
        _oHelp2Container.y = CANVAS_HEIGHT / 2;        
        s_oStage.addChild(_oHelp2Container);
        
        var oTextTime = new CTLText(_oHelp2Container, 
                    iWidthBonus, -330, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_TIME,
                    true, true, true,
                    false ); 


        var oTextAssault = new CTLText(_oHelp2Container, 
                    iWidthBonus, -230, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_ASSAULT,
                    true, true, true,
                    false ); 
                    
        

        var  oTextBomb = new CTLText(_oHelp2Container, 
                    iWidthBonus, -130, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_BOMB,
                    true, true, true,
                    false ); 
 

        var oTextSpeed = new CTLText(_oHelp2Container, 
                    iWidthBonus, -30, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_SPEED,
                    true, true, true,
                    false ); 


        var oTextHorde = new CTLText(_oHelp2Container, 
                    iWidthBonus, 70, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_EVIL_HORDE,
                    true, true, true,
                    false ); 
                    


        var oTextPig = new CTLText(_oHelp2Container, 
                    iWidthBonus, 170, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_PIG_1 + "\n\n" + TEXT_BONUS_PIG_2,
                    true, true, true,
                    false ); 
                    

        var oTextHealth = new CTLText(_oHelp2Container, 
                    iWidthBonus, 270, 350, 64, 
                    32, "left", "#99cc00", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BONUS_LIFE,
                    true, true, true,
                    false ); 

    };

    this.unload = function () {
        _oBgDown = null;
        _oBgUp = null;
        _oHelpBg = null;
        _oHelpGreenText = null;
        _oHelpYellowText = null;
        _oLifeBar = null;
        _oLifeBarBg = null;
        _oLifeMask = null;
        _oTimeBar = null;
        _oTimeBarBg = null;
        _oTimeMask = null;
        _oTimeText = null;
        _oScoreText = null;

        _oLifeContainer = null;
        
        _oButExit.unload();
        _oButExit=null;
        
        _oButPause.unload();
        _oButPause=null;
        
        _oTransBg.off("click",_oListener);
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oInterface = null;

    };

    this._onExit = function () {
        s_oGame.onExit();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;