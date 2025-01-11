function CObstacle(iXPos, iYPos, oSprite, iType, iID, iAngle, oPhysics, oParentContainer) {

    var _pResetPos;

    var _oObstacle;
    var _oPhysics = oPhysics;
    var _oParentContainer = oParentContainer;
    var _iType;
    var _iID;

    this._init = function (iXPos, iYPos, oSprite, iType, iID, iAngle) {

        _oObstacle = createBitmap(oSprite);
        _oObstacle.x = iXPos;
        _oObstacle.y = iYPos;

        _oObstacle.regX = oSprite.width * 0.5;
        _oObstacle.regY = oSprite.height * 0.5;

        this.setAngle(iAngle);

        _iType = iType;

        _iID = iID;

        _pResetPos = {x: iXPos, y: iYPos};

        _oParentContainer.addChild(_oObstacle);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oObstacle);
    };

    this.setVisible = function (bVisible) {
        _oObstacle.visible = bVisible;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oObstacle.x = iXPos;
        _oObstacle.y = iYPos;

        var oPos = {x: iXPos, y: iYPos};
        s_oPhysicsController.setElementPosition(_oPhysics, oPos);
    };

    this.resetPos = function () {
        this.setPosition(_pResetPos.x, _pResetPos.y);
    };

    this.setAngle = function (iAngle) {
        _oObstacle.rotation = iAngle;
    };

    this.getID = function () {
        return _iID;
    };

    this.getType = function () {
        return _iType;
    };

    this.getX = function () {
        return _oObstacle.x;
    };

    this.getY = function () {
        return _oObstacle.y;
    };

    this.scale = function (fValue) {
        _oObstacle.scaleX = fValue;
        _oObstacle.scaleY = fValue;
    };

    this.getScale = function () {
        return _oObstacle.scaleX;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setChildIndex = function (iValue) {
        _oParentContainer.setChildIndex(_oObstacle, iValue);
    };

    this.setAlpha = function (fValue) {
        _oObstacle.alpha = fValue;
    };

    this._init(iXPos, iYPos, oSprite, iType, iID, iAngle);

    return this;
}
