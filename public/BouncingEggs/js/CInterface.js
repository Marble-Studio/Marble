function CInterface(iLevel) {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosPause;
    var _pStartPosLevel;
    var _pStartPosFullscreen;
    
    var _oButExit;
    var _oButPause;
    var _oAudioToggle;
    var _oLosePanel;
    var _oWinPanel;
    var _oScoreBoard;
    var _oLifeBoard;
    var _oItemsBoard;
    var _oLevelText;
    var _oHelp = null;
    var _oPause;
    var _oButFullscreen;
    var _oGUIExpandible;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {

        var oSpriteScoreBoard = s_oSpriteLibrary.getSprite("bg_ui");
        var iBordPosX = (oSpriteScoreBoard.width * 0.5) + 10;
        _oScoreBoard = new CScoreBoard(oSpriteScoreBoard, iBordPosX, CANVAS_HEIGHT-(oSpriteScoreBoard.height * 0.5) -10, oSpriteScoreBoard.width, ": 0", 0);

        var iLifePosX = (iBordPosX + iBordPosX) + (oSpriteScoreBoard.width * 0.5);
        _oLifeBoard = new CLifeBoard(oSpriteScoreBoard, iLifePosX, CANVAS_HEIGHT-(oSpriteScoreBoard.height * 0.5) - 10);

        var oSpriteItemsBar = s_oSpriteLibrary.getSprite("items_bar");
        var iItemsPosX = (oSpriteItemsBar.width * 0.5) + 10;
        _oItemsBoard = new CScoreBoard(oSpriteItemsBar, iItemsPosX, (oSpriteItemsBar.height * 0.5) + 11, oSpriteScoreBoard.width/2-10, "10/10", 18);


        _pStartPosLevel = {x: CANVAS_WIDTH-10, y: CANVAS_HEIGHT-40};
        _oLevelText = new CTLText(s_oStage, 
                    _pStartPosLevel.x, _pStartPosLevel.y, 400, 50, 
                    50, "right", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    sprintf(TEXT_LEVEL,0),
                    true, true, false,
                    false );
                    
        _oLevelText.setShadow("#df7ac7",2,2,2);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.width - 3, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onPause, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.width/2 - 3, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 3,y:_pStartPosExit.y};
        }else{
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
             _pStartPosFullscreen = {x: _pStartPosPause.x - oSprite.width/2 -3, y: _pStartPosExit.y};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        _oGUIExpandible.addButton(_oButPause);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oGUIExpandible.addButton(_oAudioToggle);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }

        s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oGUIExpandible.refreshPos(iNewX,iNewY);

        var oPosScore = _oScoreBoard.getStartPosition();
        _oScoreBoard.setPosition(oPosScore.x + iNewX, oPosScore.y - iNewY);

        var oPosLife = _oLifeBoard.getStartPosition();
        _oLifeBoard.setPosition(oPosLife.x + iNewX, oPosLife.y - iNewY);

        var oPosItems = _oItemsBoard.getStartPosition();
        _oItemsBoard.setPosition(oPosItems.x + iNewX, oPosItems.y + iNewY);
        
        _oLevelText.setX(_pStartPosLevel.x - s_iOffsetX);
        _oLevelText.setY(_pStartPosLevel.y - s_iOffsetY);

        s_oGame.refreshPositionSidesWalls(iNewX);

        s_oGame.refreshLimitHeroesX(iNewX);
    };

    this.createInteractiveHelp = function () {
        _oHelp = new CHelp(s_oStage);
    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;

        if (_oHelp)
            _oHelp.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oInterface = null;
    };

    this.createLosePanel = function (iSavedItems, iTarget) {
        _oLosePanel = new CLosePanel(s_oSpriteLibrary.getSprite("msg_box"));
        _oLosePanel.show(iSavedItems, iTarget);
    };

    this.createWinPanel = function (iSavedItems, iTarget, _iScore, bEnd) {
        _oWinPanel = new CWinPanel(s_oSpriteLibrary.getSprite("msg_box"), bEnd);
        _oWinPanel.show(iSavedItems, iTarget, _iScore);
    };

    this.blockAllButton = function (bVal) {
        _oButExit.block(bVal);
        _oButPause.block(bVal);
    };

    this.getScoreBoardResult = function () {
        return _oScoreBoard.getResult();
    };

    this.unloadHelp = function () {
        if (_oHelp) {
            _oHelp.unload();
            _oHelp = null;
        }
    };

    this.createPauseInterface = function () {
        _oPause = new CPause();
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.refreshScore = function (iScore) {
        _oScoreBoard.refresh(iScore);
    };

    this.refreshLives = function (iLives, bEffect) {
        _oLifeBoard.refresh("x " + iLives, bEffect);
    };

    this.refreshTarget = function (iSaved, iTarget) {
        _oItemsBoard.refresh(iSaved + "/" + iTarget);
    };

    this.refreshLevel = function (iLevel) {
        _oLevelText.refreshText( sprintf(TEXT_LEVEL,iLevel) );
        _oLevelText.setY(_pStartPosLevel.y - s_iOffsetY);
    };

    this._onExit = function () {
        var _oAreYouSure = new CAreYouSurePanel(s_oStage);
        _oAreYouSure.show();
    };

    this._onPause = function () {
        s_oGame.unpause(false);
        this.createPauseInterface();
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

    s_oInterface = this;

    this._init(iLevel);

    return this;
}

var s_oInterface = null;