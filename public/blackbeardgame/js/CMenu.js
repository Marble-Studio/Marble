function CMenu(){
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosCredits;
    var _pStartPosDelete;
    var _pStartPosPlayPortrait;
    var _pStartPosPlayLandscape;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oButPlay;
    var _oButDeleteSavings;
    var _oAudioToggle;
    var _oButCredits;
    var _oButFullscreen;
    var _oFade;
    var _oAreYouSurePanel;
    
    this._init = function(){
        fadeStopSound("soundtrack_menu",0,1,3000);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oAttachSection.addChild(_oBg);
        
        var aSprites = new Array();
        for(var k=0;k<5;k++){
            aSprites.push(s_oSpriteLibrary.getSprite("logo_menu-"+k))
        }
        
        var oData = {   // image to use
                        "images": aSprites,

                        "framerate": 24,
                        "frames": [
                                    [1, 1, 957, 404, 0, 480, 202],
                                    [960, 1, 957, 404, 0, 480, 202],
                                    [1, 407, 957, 400, 0, 480, 198],
                                    [960, 407, 957, 404, 0, 480, 202],
                                    [1, 813, 957, 404, 0, 480, 202],
                                    [960, 813, 957, 404, 0, 480, 202],
                                    [1, 1219, 957, 404, 0, 480, 202],
                                    [960, 1219, 957, 404, 0, 480, 202],
                                    [1, 1625, 957, 404, 0, 480, 202],
                                    [960, 1625, 957, 404, 0, 480, 202],
                                    [1, 1, 957, 394, 1, 480, 192],
                                    [960, 1, 957, 398, 1, 480, 196],
                                    [1, 401, 957, 385, 1, 480, 183],
                                    [960, 401, 960, 393, 1, 480, 191],
                                    [1, 796, 957, 404, 1, 480, 202],
                                    [960, 796, 957, 404, 1, 480, 202],
                                    [1, 1202, 958, 385, 1, 480, 183],
                                    [961, 1202, 960, 395, 1, 480, 193],
                                    [1, 1599, 960, 403, 1, 480, 201],
                                    [963, 1599, 960, 404, 1, 480, 202],
                                    [1, 1, 957, 399, 2, 480, 197],
                                    [960, 1, 957, 396, 2, 480, 194],
                                    [1, 402, 957, 404, 2, 480, 202],
                                    [960, 402, 957, 404, 2, 480, 202],
                                    [1, 808, 957, 404, 2, 480, 202],
                                    [960, 808, 957, 404, 2, 480, 202],
                                    [1, 1214, 959, 404, 2, 480, 202],
                                    [962, 1214, 960, 404, 2, 480, 202],
                                    [1, 1620, 960, 403, 2, 480, 201],
                                    [963, 1620, 960, 404, 2, 480, 202],
                                    [1, 1, 960, 403, 3, 480, 201],
                                    [963, 1, 957, 404, 3, 480, 202],
                                    [1, 407, 957, 404, 3, 480, 202],
                                    [960, 407, 957, 404, 3, 480, 202],
                                    [1, 813, 957, 395, 3, 480, 193],
                                    [960, 813, 957, 393, 3, 480, 191],
                                    [1, 1210, 957, 404, 3, 480, 202],
                                    [960, 1210, 957, 404, 3, 480, 202],
                                    [1, 1616, 957, 404, 3, 480, 202],
                                    [960, 1616, 957, 383, 3, 480, 181],
                                    [1, 1, 957, 386, 4, 480, 184],
                                    [960, 1, 957, 404, 4, 480, 202],
                                    [1, 407, 957, 404, 4, 480, 202],
                                    [960, 407, 957, 404, 4, 480, 202],
                                    [1, 813, 957, 404, 4, 480, 202],
                                    [960, 813, 957, 404, 4, 480, 202],
                                    [1, 1219, 957, 393, 4, 480, 191],
                                    [960, 1219, 957, 402, 4, 480, 200],
                                    [1, 1623, 957, 400, 4, 480, 198],
                                    [960, 1623, 957, 398, 4, 480, 196]
                                ],

                        animations: {  idle: 0,anim:[0,49]}
        };
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oLogo = createSprite(oSpriteSheet,"anim");
        oLogo.x = CANVAS_WIDTH/2;
        oLogo.y = CANVAS_HEIGHT/2-150;
        oLogo.alpha = 0;
        oLogo.scale = 0;
        s_oAttachSection.addChild(oLogo);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlayPortrait ={x:(CANVAS_WIDTH/2),y:CANVAS_HEIGHT -350};
        _pStartPosPlayLandscape = {x:(CANVAS_WIDTH/2),y:CANVAS_HEIGHT - 200};
        _oButPlay = new CGfxButton(_pStartPosPlayPortrait.x,_pStartPosPlayPortrait.y,oSprite,s_oAttachSection);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        _oButPlay.pulseAnimation();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4) - 4, y: (oSprite.height/2) + 4};   
            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        if(SHOW_CREDITS){
            var oSprite = s_oSpriteLibrary.getSprite('but_credits');
            _pStartPosCredits = {x:(oSprite.width/2) + 4,y:(oSprite.height/2) + 4};
            _oButCredits = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite,s_oAttachSection);
            _oButCredits.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
            
            _pStartPosFullscreen = {x: _pStartPosCredits.x + oSprite.width + 4,y:_pStartPosCredits.y};
        }else{
             _pStartPosFullscreen = {x:(oSprite.width/2) + 4,y:(oSprite.height/2) + 4};
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

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oAttachSection);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSprite = s_oSpriteLibrary.getSprite("but_delete_savings")
        _pStartPosDelete = {x:oSprite.width/2 +4,y:CANVAS_HEIGHT-oSprite.height/2-4};
        _oButDeleteSavings = new CGfxButton(_pStartPosDelete.x,_pStartPosDelete.y,oSprite,s_oAttachSection);
        _oButDeleteSavings.addEventListener(ON_MOUSE_UP,this._onDeleteSavings,this);


        if(!s_bStorageAvailable){
            s_oMsgBox.show(TEXT_ERR_LS);
            _oButDeleteSavings.setVisible(false);
        }else if(!RESTART_CREDIT && getItem(LOCALSTORAGE_STRING+"score")){
            TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING+"score"));
        }else{
            _oButDeleteSavings.setVisible(false);
        }
        
        _oAreYouSurePanel = new CAreYouSurePanel();
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,this._onExitYes,this);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oAttachSection.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 400).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos();
        
        createjs.Tween.get(oLogo).to({alpha:1}, 800,createjs.Ease.quintOut); 
        createjs.Tween.get(oLogo).to({scale:1}, 800,createjs.Ease.backOut); 
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        _oButDeleteSavings.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if(SHOW_CREDITS){
            _oButCredits.unload();
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oAttachSection.removeChild(_oBg);
        _oBg = null;
        
        s_oAttachSection.removeChild(_oFade);
        _oFade = null;
        
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }
        if(SHOW_CREDITS){
            _oButCredits.setPosition(_pStartPosCredits.x + s_iOffsetX,_pStartPosCredits.y + s_iOffsetY);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
        
        _oButDeleteSavings.setPosition(_pStartPosDelete.x + s_iOffsetX,_pStartPosDelete.y-s_iOffsetY);
        
        if(s_bLandscape){
            _oButPlay.setPosition(_pStartPosPlayLandscape.x,_pStartPosPlayLandscape.y-s_iOffsetY);
        }else{
            _oButPlay.setPosition(_pStartPosPlayPortrait.x,_pStartPosPlayPortrait.y-s_iOffsetY);
        }
        
    };
    
    this._onButPlayRelease = function(){
        this.unload();

        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
    };

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButCreditsRelease = function(){
        new CCreditsPanel();
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
    
    this._onDeleteSavings = function(){
        _oAreYouSurePanel.show(TEXT_DELETE_SAVINGS+": "+START_MONEY+TEXT_CURRENCY+"\n"+TEXT_ARE_SURE);
    };
    
    this._onExitYes = function(){
        clearLocalStorage();
        _oButDeleteSavings.setVisible(false);
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;