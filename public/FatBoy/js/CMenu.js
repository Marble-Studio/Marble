function CMenu() {
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _oButCredits;
    var _oCreditsPanel = null;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _oThis = this;
    var _oLogo;
    
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game_0'));
        s_oStage.addChild(_oBg);

        _aPlanets = [];
        _aPositions = [{x: 65, y:800},
                        {x:865, y: 680},
                        {x:180, y: 293},
                        {x:882, y: 215}];
        _aScales = [0.45,0.40,0.25, 0.35];
        _aAlphas = [0.80,1,0.35,1];
        for (var i = 0; i < 4; i++) {
            rand = randomIntBetween(0,4);
            oPlanet = createBitmap(s_oSpriteLibrary.getSprite("planet"+(i+1)));
            oPlanet.x = _aPositions[i].x;
            oPlanet.y = _aPositions[i].y;
            oPlanet.regX = oPlanet.regY = oPlanet.getBounds().width/2
            oPlanet.scaleX = oPlanet.scaleY = _aScales[i];
            oPlanet.alpha = _aAlphas[i];
            s_oStage.addChild(oPlanet);
            _aPlanets.push (oPlanet);
        }


        var oSpritePlay = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 + 350, oSpritePlay);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        _oButPlay.pulseAnimation();
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x:20 + oSprite.width/2,y:(oSprite.height / 2) + 20};
        _oButCredits = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onCredits, this);
        
      
        
        
        _oLogo = createBitmap(s_oSpriteLibrary.getSprite("logo_menu"));
        s_oStage.addChild(_oLogo);
        _oLogo.x = CANVAS_WIDTH/2 - _oLogo.getBounds().width/2;
        _oLogo.y = 300;
        this.floatAnimation ();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - oSprite.width/4 -20, y: (oSprite.height / 2) + 20};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
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
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:_pStartPosCredits.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
        });
        
        

        if(!s_bStorageAvailable){

            new CMsgBox(TEXT_ERR_LS,s_oStage);
        }else{
            var iBestScore = getItem(SCORE_ITEM_NAME);
            if(iBestScore !== null ){
                s_iBestScore = iBestScore;
            }
        }
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        _oButCredits.unload();
        
        
        s_oStage.removeChild(_oBg);
        _oBg = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oMenu = null;
    };


    this.floatAnimation = function()
    {
      new createjs.Tween.get(_oLogo).to({y: 320}, 2000, createjs.Ease.sineOut).to({y:300}, 2000, createjs.Ease.sineOut).call(_oThis.floatAnimation) ; 
    };
    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }

        _oButCredits.setPosition(_pStartPosCredits.x + iNewX,_pStartPosCredits.y + iNewY);
    };
    
    this.exitFromCredits = function(){
        _oCreditsPanel = null;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCredits = function(){
        _oCreditsPanel = new CCreditsPanel();
    };

    this._onButPlayRelease = function () {
        this.unload();

        s_oMain.gotoGame();
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


    this.update = function (){
        for (var i = 0; i < _aPlanets.length; i++) {
            
            _aPlanets[i].rotation +=2;
        }
    }
    s_oMenu = this;

    this._init();
}

var s_oMenu = null;