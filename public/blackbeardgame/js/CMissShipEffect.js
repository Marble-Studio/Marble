function CMissShipEffect(iX,iY,bCheckEnd,oParentContainer){
    var _bCheckEnd = bCheckEnd;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY){

        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oData = {   // image to use
                        "images": [s_oSpriteLibrary.getSprite("splash")],
                        "framerate": 35,
                        "frames": [
                                    [1, 1, 14, 10, 0, 8, 14],
                                    [17, 1, 29, 19, 0, 13, 22],
                                    [48, 1, 43, 23, 0, 24, 26],
                                    [1, 26, 62, 29, 0, 35, 32],
                                    [1, 57, 86, 35, 0, 49, 38],
                                    [1, 94, 100, 40, 0, 57, 43],
                                    [1, 136, 109, 46, 0, 58, 49],
                                    [1, 184, 116, 52, 0, 59, 55],
                                    [1, 238, 117, 57, 0, 59, 60],
                                    [1, 297, 117, 62, 0, 58, 65],
                                    [1, 361, 116, 66, 0, 58, 69],
                                    [1, 429, 117, 66, 0, 58, 69],
                                    [1, 497, 118, 67, 0, 59, 70],
                                    [1, 566, 117, 67, 0, 58, 70],
                                    [1, 635, 118, 67, 0, 59, 70],
                                    [1, 704, 118, 68, 0, 59, 71],
                                    [1, 774, 118, 69, 0, 59, 72],
                                    [1, 845, 118, 69, 0, 59, 72],
                                    [1, 916, 118, 68, 0, 59, 71],
                                    [1, 986, 118, 69, 0, 59, 72],
                                    [1, 1057, 118, 69, 0, 59, 72],
                                    [1, 1128, 118, 68, 0, 59, 72],
                                    [1, 1198, 118, 67, 0, 59, 71],
                                    [1, 1267, 118, 68, 0, 59, 71],
                                    [1, 1337, 118, 67, 0, 59, 70],
                                    [1, 1406, 118, 67, 0, 59, 71],
                                    [1, 1475, 118, 67, 0, 59, 71],
                                    [1, 1544, 118, 68, 0, 59, 72],
                                    [1, 1614, 118, 68, 0, 59, 72],
                                    [1, 1684, 117, 67, 0, 59, 71],
                                    [1, 1753, 115, 68, 0, 59, 72],
                                    [1, 1823, 34, 47, 0, -25, 75]
                                ],

                        animations: {  idle: 0,anim:[0,31,"end"],end:31}
        };
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oHit = createSprite(oSpriteSheet,"anim");
        oHit.on("animationend",this._onAnimEnd,this);
        _oContainer.addChild(oHit);
        
        playSound("bonus_game_water_splash",1,false);

    };
    
    this._onAnimEnd = function(evt){
        if (evt.name === "end"){
            _oParentContainer.removeChild(_oContainer);
            if(_bCheckEnd){
                s_oBonusPanel.checkEndBonus();
            }
        }
    };
    
    this._init(iX,iY);
}