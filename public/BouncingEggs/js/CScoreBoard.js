function CScoreBoard(oSprite, iX, iY, iWidth, szText, iXTextOffset) {

    var _pStartPosContainer;
    var _oContainer;
    var _oTextBoard;
    var _oText;

    this._init = function (oSprite, iX, iY, iWidth, szText, iXTextOffset) {
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

        var iHeight = oSprite.height;
        var iXPos = iXTextOffset;
        var iYPos = 2;
        _oText = new CTLText(_oContainer, 
                    iXPos-iWidth/2, iYPos-iHeight/2, iWidth, iHeight, 
                    32, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        _oText.setShadow("#df7ac7",2,2,2);
        
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

    this.refresh = function (szText) {
        _oText.refreshText( szText );
    };

    this._init(oSprite, iX, iY, iWidth, szText, iXTextOffset);

    return this;
}