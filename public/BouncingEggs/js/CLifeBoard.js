function CLifeBoard(oSprite, iX, iY) {

    var _pStartPosContainer;
    var _oContainer;
    var _oHeart;
    var _oTextBoard;
    var _oText;

    this._init = function (oSprite, iX, iY) {
        _pStartPosContainer = {x: iX, y: iY};

        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosContainer.x;
        _oContainer.y = _pStartPosContainer.y;

        _oTextBoard = createBitmap(oSprite);
        _oTextBoard.x = 0;
        _oTextBoard.y = 0;
        _oTextBoard.regX = oSprite.width * 0.5;
        _oTextBoard.regY = oSprite.height * 0.5;

        _oContainer.addChild(_oTextBoard);

        var iWidth = oSprite.width/2+5;
        var iHeight = oSprite.height;
        var iXPos = 20;
        var iYPos = 1;
        _oText = new CTLText(_oContainer, 
                    iXPos-iWidth/2, iYPos-iHeight/2, iWidth, iHeight, 
                    28, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    "x0",
                    true, true, true,
                    false );

        _oText.setShadow("#df7ac7",2,2,2);
        
        var oSpriteHeart = s_oSpriteLibrary.getSprite("heart");

        _oHeart = createBitmap(oSpriteHeart);
        _oHeart.x = -oSpriteHeart.width + 10;
        _oHeart.y = 0;
        _oHeart.regX = oSpriteHeart.width * 0.5;
        _oHeart.regY = oSpriteHeart.height * 0.5;
        
        _oContainer.addChild(_oHeart);

        s_oStage.addChild(_oContainer);

    };

    this.getStartPosition = function () {
        return _pStartPosContainer;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.unload = function () {
        s_oStage.removeChild(_oContainer);
    };

    this.heartAnimation = function () {
        createjs.Tween.get(_oHeart).to({scaleX: 0.8, scaleY: 0.8}, 250, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(_oHeart).to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.cubicOut);
        });
    };

    this.refresh = function (szText, bEffect) {
        _oText.refreshText( szText );

        if (bEffect) {
            this.heartAnimation();
        }
    };

    this._init(oSprite, iX, iY);

    return this;
}