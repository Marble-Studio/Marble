function CMenu() {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosInfo;
    var _pStartPosFullscreen;
    
    var _oLogo;
    var _oBg;
    var _oButPlay;
    var _oButInfo;
    var _oButContinue;
    var _oFade;
    var _oAudioToggle;
    var _oResetPanel = null;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        var oSpriteLogo = s_oSpriteLibrary.getSprite("logo_menu");
        _oLogo = createBitmap(oSpriteLogo);
        _oLogo.regX = oSpriteLogo.width/2;
        _oLogo.regY = oSpriteLogo.height/2;
        _oLogo.x = CANVAS_WIDTH/2;
        _oLogo.y = 300;
        _oLogo.scale = 0.01;
        s_oStage.addChild(_oLogo);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 300};
        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if (s_bStorageAvailable && getItem("LevelReachedItem") !== null) {
            s_iLastLevel = getItem("LevelReachedItem");
            s_aScores = JSON.parse(getItem("ScoresItem"));
            _oButPlay.setPosition(CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT - 500);

            var oSpriteContiune = s_oSpriteLibrary.getSprite('but_continue_big');
            _oButContinue = new CGfxButton(CANVAS_WIDTH / 2 + 200, CANVAS_HEIGHT - 500, oSpriteContiune, s_oStage);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
            _oButContinue.pulseAnimation();
        } else {
            _oButPlay.setPosition(CANVAS_WIDTH / 2, 584);
            _oButPlay.pulseAnimation();
            this.resetArrayScores();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width / 4) - 8, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteInfo = s_oSpriteLibrary.getSprite("but_info");
        _pStartPosInfo = {x: (oSpriteInfo.height / 2) + 10, y: (oSpriteInfo.height / 2) + 10};
        _oButInfo = new CGfxButton(_pStartPosInfo.x, _pStartPosInfo.y, oSpriteInfo, s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosInfo.x + oSprite.width/2 + 10,y:_pStartPosInfo.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 500).call(function () {
            _oFade.visible = false;
        });
        
        createjs.Tween.get(_oLogo).wait(250).to({scale: 1}, 1500, createjs.Ease.elasticOut)
        
        if(!s_bStorageAvailable){
            new CMsgBox(TEXT_ERR_LS,s_oStage);
        }
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX, _pStartPosInfo.y + iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButInfoRelease = function () {
        var oCreditsPanel = new CCreditsPanel();
    };

    this._onButPlayRelease = function () {
        if (!s_bStorageAvailable ||  getItem("LevelReachedItem") === null) {
            this.unload();

            
            s_oMain.gotoLevelMenu();
        } else {
            if (_oResetPanel === null) {
                _oResetPanel = new CConfirmPanel(TEXT_RESET, 0);
                _oResetPanel.addEventListener(ON_BUT_NO_DOWN, this._onButNo, this);
                _oResetPanel.addEventListener(ON_BUT_YES_DOWN, this._onButYes, this);
            }
        }
    };

    this._onButContinueRelease = function () {
        this.unload();

        s_oMain.gotoLevelMenu();
    };

    this._onButNo = function () {
        _oResetPanel.unload();
        _oResetPanel = null;
    };

    this._onButYes = function () {
        clearAllItem();
        this.unload();
        s_iLastLevel = 1;
        this.resetArrayScores();
        s_oMain.gotoLevelMenu();
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };


    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };
    
    this.resetArrayScores = function () {
        s_aScores = new Array();
        for (var i = 0; i < s_aLevelsDiagram.length; i++) {
            s_aScores[i] = 0;
        }
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;