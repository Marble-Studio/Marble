function CTarget(iXPos, iYPos, oPhysics, oParentContainer) {

    var _oTargetBack;
    var _oTargetFront;
    var _oPhysics = oPhysics;
    var _oParentContainer = oParentContainer;
    var _bAnim = false;

    this._init = function (iXPos, iYPos) {
        var oSpriteTargetBack = s_oSpriteLibrary.getSprite("target_back");
        var oSpriteTargetFront = s_oSpriteLibrary.getSprite("target_front");

        _oTargetBack = createBitmap(oSpriteTargetBack);

        _oTargetBack.regX = oSpriteTargetBack.width * 0.5;
        _oTargetBack.regY = oSpriteTargetBack.height;
        _oTargetBack.x = iXPos;
        _oTargetBack.y = iYPos + oSpriteTargetBack.height * 0.5+7;
        _oParentContainer.addChild(_oTargetBack);

        _oTargetFront = createBitmap(oSpriteTargetFront);

        _oTargetFront.regX = oSpriteTargetFront.width * 0.5;
        _oTargetFront.regY = oSpriteTargetFront.height;
        _oTargetFront.x = iXPos - 1;
        _oTargetFront.y = iYPos + 8 + oSpriteTargetFront.height * 0.5;
        _oParentContainer.addChild(_oTargetFront);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oTargetBack);
    };

    this.setVisible = function (bVisible) {
        _oTargetBack.visible = bVisible;
        _oTargetFront.visible = bVisible;
    };

    this.getX = function () {
        return _oTargetBack.x;
    };

    this.getY = function () {
        return _oTargetBack.y;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.getChildIndexFront = function () {
        return  _oParentContainer.getChildIndex(_oTargetFront);
    };

    this.childIndexFront = function (iValue) {
        _oParentContainer.setChildIndex(_oTargetFront, iValue);
    };

    this.animTarget = function () {
        if (_bAnim) {
            createjs.Tween.removeTweens(_oTargetBack);
            createjs.Tween.removeTweens(_oTargetFront);
            _bAnim = false;
        }
        _bAnim = true;
        var iTime = 800;
        var iTime2 = 500;
        createjs.Tween.get(_oTargetBack).to({scaleY: 1.1}, iTime, createjs.Ease.elasticOut);
        createjs.Tween.get(_oTargetFront).to({scaleY: 1.1}, iTime, createjs.Ease.elasticOut).call(function () {
            createjs.Tween.get(_oTargetBack).to({scaleY: 1}, iTime2, createjs.Ease.cubicOut);
            createjs.Tween.get(_oTargetFront).to({scaleY: 1}, iTime2, createjs.Ease.cubicOut);

            _bAnim = false;
        });

    };

    this._init(iXPos, iYPos);

    return this;
}
