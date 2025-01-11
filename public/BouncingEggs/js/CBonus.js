function CBonus(iXPos, iYPos, oSprite, iType, iID, oPhysics, oParentContainer) {

    var _pResetPos;

    var _oBonus;
    var _oPhysics = oPhysics;
    var _oParentContainer = oParentContainer;
    var _oTween = null;
    var _iType;
    var _iID;
    var _bCached = true;

    this._init = function (iXPos, iYPos, oSprite, iType, iID) {

        _oBonus = createBitmap(oSprite);
        _oBonus.x = iXPos;
        _oBonus.y = iYPos;

        _oBonus.regX = oSprite.width * 0.5;
        _oBonus.regY = oSprite.height * 0.5;

        _iType = iType;

        _iID = iID;

        _pResetPos = {x: iXPos, y: iYPos};

        s_oPhysicsController.activeBody(_oPhysics, false);

        _oParentContainer.addChild(_oBonus);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oBonus);
    };

    this.setVisible = function (bVisible) {
        _oBonus.visible = bVisible;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oBonus.x = iXPos;
        _oBonus.y = iYPos;

        var oPos = {x: iXPos, y: iYPos};
        s_oPhysicsController.setElementPosition(_oPhysics, oPos);
    };

    this.resetPos = function () {
        this.setPosition(_pResetPos.x, _pResetPos.y);
    };

    this.setAngle = function (iAngle) {
        _oBonus.rotation = iAngle;
    };

    this.getID = function () {
        return _iID;
    };

    this.getType = function () {
        return _iType;
    };

    this.isCached = function () {
        return _bCached;
    };

    this.setCache = function (bVal) {
        _bCached = bVal;
        this.activeBody(!bVal);
        _oBonus.visible = !bVal;
        this.setAngle(0);
    };

    this.activeBody = function (bVal) {
        s_oPhysicsController.activeBody(_oPhysics, bVal);
    };

    this.getX = function () {
        return _oBonus.x;
    };

    this.getY = function () {
        return _oBonus.y;
    };

    this.scale = function (fValue) {
        _oBonus.scaleX = fValue;
        _oBonus.scaleY = fValue;
    };

    this.getScale = function () {
        return _oBonus.scaleX;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setChildIndex = function (iValue) {
        _oParentContainer.setChildIndex(_oBonus, iValue);
    };

    this.move = function () {
        var oPos = s_oPhysicsController.getElementPosition(_oPhysics);

        _oBonus.x = oPos.x;
        _oBonus.y = oPos.y;

        _oBonus.rotation = s_oPhysicsController.getElementAngle(_oPhysics);
    };

    this.spriteFollowPhysics = function (bVal) {
        _bCached = !bVal;
    };

    this.setAlpha = function (fValue) {
        _oBonus.alpha = fValue;
    };

    this.animDisappear = function () {
        if (_oTween === null) {
            _oTween = createjs.Tween.get(_oBonus).to({alpha: 0}, 250, createjs.Ease.cubicIn).call(function () {
                s_oGame.cachedBonus(_iID);
                _oTween = null;
            });
        }
    };

    this.update = function () {
        this.move();
    };

    this._init(iXPos, iYPos, oSprite, iType, iID);

    return this;
}
