function CInterface(iBestScore) {
    var _oAudioToggle;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosRestart;
    var _pStartPosFullscreen;
    var _oScoreText;
    var _iBestScore;
    var _oBestScoreText;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButExit;
    var _oHitArea;
    var _oEndPanel;
    var _oScoreOutline;
    var _oBestScoreOutline;
    
    var _oCoinCollector;
    var _oBestScoreSprite;
    this._init = function (iBestScore) {
        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _iBestScore = s_oGame.getBestScore();
        _pStartPosExit = {x: CANVAS_WIDTH - oSpriteExit.width/2 -5, y: (oSpriteExit.height / 2) + 5};
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("red").drawRect(0, 5, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        s_oStage.addChild(_oHitArea);
        _oButExit = new CGfxButton(5, _pStartPosExit.y, oSpriteExit);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        
        

        _oHitArea.on("pressup", function () { s_oGame.releaseScreen() });
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            
            _pStartPosAudio = {x: _pStartPosExit.x - oSpriteExit.width/2 - oSprite.width/4 - 5, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width/2 - 5,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSpriteExit.width - 5, y: _pStartPosExit.y};
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
            
            _pStartPosRestart = {x: _pStartPosFullscreen.x - oSpriteExit.width, y: _pStartPosFullscreen.y};
        }else{
            _pStartPosRestart = {x: _pStartPosFullscreen.x, y: _pStartPosFullscreen.y};
        }
        _oCoinCollector = createBitmap(s_oSpriteLibrary.getSprite("coin_collector"));
        _oCoinCollector.scaleX = _oCoinCollector.scaleY = 0.8;
        
        _oBestScoreSprite = createBitmap(s_oSpriteLibrary.getSprite("best_score"));
        _oBestScoreSprite.scaleX = _oBestScoreSprite.scaleY = 0.8;

        _oScoreOutline = new createjs.Text("x999","56px "+ PRIMARY_FONT, "#5d2519");
        _oScoreOutline.x = CANVAS_WIDTH/2 - 350;
        _oScoreOutline.y = 40;
        _oScoreOutline.outline = 5;

        _oScoreText = new createjs.Text("X0","56px "+ PRIMARY_FONT, "#5d2519");
        _oScoreText.x = CANVAS_WIDTH/2 - 350;
        _oScoreText.y = 40;
        _oScoreOutline.textAlign = "center";
        _oScoreText.textAlign = "center";


        _oBestScoreText = new createjs.Text("X"+_iBestScore,"56px "+PRIMARY_FONT, "#fff");
        _oBestScoreText.x = CANVAS_WIDTH/2 - 150;
        _oBestScoreText.y = 80;
        _oBestScoreText.textAlign = "left";
        _oBestScoreOutline = new createjs.Text("X"+_iBestScore,"56px "+PRIMARY_FONT, "#5d2519");
        _oBestScoreOutline.x = CANVAS_WIDTH/2 - 150;
        _oBestScoreOutline.y = 35;
        _oBestScoreOutline.textAlign = "left";

        _oBestScoreOutline.outline = 8;
        s_oStage.addChild(_oBestScoreSprite);

        s_oStage.addChild(_oBestScoreOutline);

        s_oStage.addChild(_oBestScoreText);

        s_oStage.addChild(_oCoinCollector);

      
        s_oStage.addChild(_oScoreText);
        new CHelpPanel();
        _oEndPanel = new CEndPanel();
 
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oCoinCollector.x = 5 + iNewX;
        _oCoinCollector.y = 5 + iNewY;
        _oBestScoreSprite.x = 200 + iNewX;
        _oBestScoreSprite.y = 5;
        _oScoreText.y = - iNewY + 70;
        _oScoreText.x = 85+ iNewX;
        _oScoreText.rotation = -8;
        _oScoreOutline.y = _oScoreText.y;
        _oScoreOutline.x = _oScoreText.x+ iNewX;
        _oScoreOutline.rotation = _oScoreText.rotation;



        _oBestScoreText.y =_oScoreText.y + 10;
        _oBestScoreOutline.y = _oBestScoreText.y;
        _oBestScoreText.x = 210+ iNewX;
        _oBestScoreOutline.x = _oBestScoreText.x;

        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        
    };

   this.refreshScore = function(iScore){
       _oScoreText.text = "X"+iScore;
       _oScoreOutline.text = "X"+iScore;
            if (_iBestScore < iScore)
            {
                _oBestScoreText.text = "X"+iScore;
                _oBestScoreOutline.text = "X"+iScore;
            }
    };
    
    
    this.getCollectorPos = function ()
    {
        return {x: _oCoinCollector.x, y: _oCoinCollector.y};
    };
    this.unload = function () {
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }

        _oButExit.unload();
        s_oInterface = null;
    };
    
    
    this._onExit = function (){
        new CAreYouSurePanel();
    };

    this.gameOver = function (){
      _oEndPanel.show();  
    };
    
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
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

    this._init(iBestScore);

    return this;
}

var s_oInterface = null;