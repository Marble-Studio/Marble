function CBonusResultPanel(iPrize, oParentContainer){
    var _oContainer;
    var _oContainerPanel;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iPrize){
       _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box_win");
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainerPanel.y = CANVAS_HEIGHT/2; 
        _oContainerPanel.regX = oSpriteBg.width/2;
        _oContainerPanel.regY = oSpriteBg.height/2;
        _oContainerPanel.scale = 0;
        _oContainer.addChild(_oContainerPanel);
        
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);


        
        var oWonText = new CTLText(_oContainerPanel, 
                    120, 210, oSpriteBg.width-240, 400, 
                    70, "center", "#dab977", FONT_GAME_1, 1,
                    0, 0,
                    TEXT_CONGRATS+"\n\n"+TEXT_YOU_WIN+"\n"+formatEntries(iPrize),
                    true, true, true,
                    false );
        oWonText.setShadow("#000",4,4,2);            

        
        var oParent = this;
        createjs.Tween.get(_oContainerPanel).to({scale:1}, 1000, createjs.Ease.elasticOut).call(function(){
                                                                                                setTimeout(function(){
                                                                                                    oParent.hide(); 
                                                                                                },3000);
                                                                                    });
                                                                                                                                    
    };

    
    this.hide = function(){
        createjs.Tween.get(_oContainerPanel).to({scale: 0}, 500, createjs.Ease.backIn).call(function(){
            _oParentContainer.removeChild(_oContainer);
            s_oBonusPanel.hide();
        });
    };

    this._init(iPrize);
}