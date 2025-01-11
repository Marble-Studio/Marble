function CArrow(iXPos, iYPos, oSpriteArrow, oParentContainer) {

    var _pStartPosTween;
    var _pEndPosTween;

    var _oArrow;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSpriteArrow) {

        _oArrow = createBitmap(oSpriteArrow);
        _oArrow.x = iXPos;
        _oArrow.y = iYPos;
        _oArrow.regY = oSpriteArrow.height * 0.5;
        _oArrow.regX = oSpriteArrow.width * 0.5;
        _oParentContainer.addChild(_oArrow);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oArrow);
    };

    this.setVisible = function (bVisible) {
        _oArrow.visible = bVisible;
    };
    this.setAngle = function (iRotation) {
        _oArrow.rotation = iRotation;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oArrow.x = iXPos;
        _oArrow.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oArrow.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oArrow.y = iYPos;
    };

    this.getX = function () {
        return _oArrow.x;
    };

    this.getY = function () {
        return _oArrow.y;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oArrow);
    };

    this.setStartPosTween = function (iXPos, iYPos) {
        _pStartPosTween = {x: iXPos, y: iYPos};
    };

    this.setEndPosTween = function (iXPos, iYPos) {
        _pEndPosTween = {x: iXPos, y: iYPos};
    };

    this.animatePos = function (iTime) {
        var oParent = this;
        createjs.Tween.get(_oArrow).to({x: _pEndPosTween.x, y: _pEndPosTween.y}, iTime, createjs.Ease.cubicInOut).call(function () {
            createjs.Tween.get(_oArrow).to({x: _pStartPosTween.x, y: _pStartPosTween.y}, iTime, createjs.Ease.cubicInOut).call(function () {
                oParent.animatePos(iTime);
            });
        });
    };

    this.removeTween = function () {
        createjs.Tween.removeTweens(_oArrow);
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSpriteArrow);

    return this;
}