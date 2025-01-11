function CBgController(oParentContainer){
    var _iStartY = -250;
    
    var _oBg;
    var _oBgFreespin;
    var _oShipBgFreespin;
    
    
    var _oContainerBg;
    var _oParentContainer = oParentContainer;
    
    this._init = function(){
        _oContainerBg = new createjs.Container();
        _oContainerBg.y = _iStartY;
        _oParentContainer.addChild(_oContainerBg);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        _oContainerBg.addChild(_oBg);
        
        _oBgFreespin = createBitmap(s_oSpriteLibrary.getSprite("bg_freespin"));
        _oBgFreespin.alpha = 0;
        _oContainerBg.addChild(_oBgFreespin);

        var oShipBg0 = createBitmap(s_oSpriteLibrary.getSprite("bg_ship_0"));
        _oParentContainer.addChild(oShipBg0);
        
        var oShipBg1 = createBitmap(s_oSpriteLibrary.getSprite("bg_ship_1"));
        oShipBg1.y = 750;
        _oParentContainer.addChild(oShipBg1);
        
        _oShipBgFreespin = createBitmap(s_oSpriteLibrary.getSprite("bg_ship_freespin"));
        _oShipBgFreespin.alpha = 0;
        _oParentContainer.addChild(_oShipBgFreespin);

        createjs.Tween.get(_oContainerBg,{loop:-1}).to({y: 0}, 5500, createjs.Ease.sineInOut).to({y: _iStartY}, 5500, createjs.Ease.sineInOut);
    };
    
    this.startFreespin = function(){
        createjs.Tween.get(_oBgFreespin).to({alpha: 1}, 1500, createjs.Ease.cubicOut);
        createjs.Tween.get(_oShipBgFreespin).to({alpha: 1}, 1500, createjs.Ease.cubicOut);
    };
    
    this.stopFreespin = function(){
        createjs.Tween.get(_oBgFreespin).to({alpha: 0}, 1500, createjs.Ease.cubicOut);
        createjs.Tween.get(_oShipBgFreespin).to({alpha: 0}, 1500, createjs.Ease.cubicOut);
    };
    
    this._init();
}