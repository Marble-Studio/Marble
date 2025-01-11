function CResultFreespin(oParentContainer){
    var _oFade;
    var _oTextWin;
    var _oContainerPanel;
    var _oListener;
    var _oButExit;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListener = _oFade.on("click",function(){});
        _oContainer.addChild(_oFade);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box_win");
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2; 
        _oContainerPanel.regX = oSpriteBg.width/2;
        _oContainerPanel.regY = oSpriteBg.height/2;
        _oContainer.addChild(_oContainerPanel);
        
        
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);


        
        _oTextWin = new CTLText(_oContainerPanel, 
                    120, 210, oSpriteBg.width-240, 400, 
                    70, "center", "#dab977", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_CONGRATS,
                    true, true, true,
                    false );
        _oTextWin.setShadow("#000",4,4,2);
        
        _oButExit = new CGfxButton( oSpriteBg.width/2,oSpriteBg.height-120,s_oSpriteLibrary.getSprite('but_yes'),_oContainerPanel);
        _oButExit.addEventListener(ON_MOUSE_UP, this.hide, this); 

    };
    
    this.unload = function(){
        _oButExit.unload();
        _oFade.off("click",_oListener);
    };
    
    this.show = function(iAmount){
        _oButExit.enable();
        if(iAmount === 0){
            _oTextWin.y = 0;
            _oTextWin.refreshText(TEXT_NO_WIN);
            playSound("bonus_notify_lose",1,false);                
        }else{
            _oTextWin.y = 30;
            _oTextWin.refreshText(TEXT_CONGRATS+"\n\n"+TEXT_YOU_WON + " " + formatEntries( iAmount));
            
            this._showAvatar();
            playSound("end_bonus",1,false);                
        }

        _oContainer.alpha = 1;
        _oContainer.visible = true;
        
        
        
        _oContainerPanel.scale = 0;
        _oFade.alpha = 0;
        
        var oParent = this;
        createjs.Tween.get(_oFade).to({alpha: 0.7}, 300, createjs.Ease.quartOut)
        createjs.Tween.get(_oContainerPanel).to({scale:1}, 1000, createjs.Ease.bounceOut).call(function(){
                                                                                                setTimeout(function(){oParent.hide();},3000);
                                                                                    });
                                                              
    };
    
    this.hide = function(){
        _oButExit.disable();
        
        createjs.Tween.get(_oFade).to({alpha: 0}, 500, createjs.Ease.quartOut)
        createjs.Tween.get(_oContainerPanel).to({scale: 0}, 500, createjs.Ease.backIn).call(function(){
            _oContainer.visible = false;
        });
    };
    
    this._showAvatar = function(){
        
    };
    
    _oParentContainer = oParentContainer;
    this._init();
}