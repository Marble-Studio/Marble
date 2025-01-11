function CSideWall(iXPos, iYPos, oSprite, iType, iID, oPhysics, iOffsetX, oParentContainer) {

    var _pStartPos;

    var _oWall;
    var _oPhysics = oPhysics;
    var _oParentContainer = oParentContainer;
    var _iType;
    var _iID;
    var _iOffsetX;

    this._init = function (iXPos, iYPos, oSprite, iType, iID, iOffsetX) {

        _oWall = createBitmap(oSprite);
        _oWall.x = iXPos + iOffsetX;
        _oWall.y = iYPos;

        _iType = iType;

        _iID = iID;

        _iOffsetX = iOffsetX;

        _pStartPos = {x: _oWall.x, y: iYPos};


        _oParentContainer.addChild(_oWall);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oWall);
    };

    this.setVisible = function (bVisible) {
        _oWall.visible = bVisible;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oWall.x = iXPos;
        _oWall.y = iYPos;
    };

    this.setPositionPhysics = function (iXPos, iYPos) {
        var oPos = {x: iXPos + iOffsetX, y: iYPos};
        s_oPhysicsController.setElementPosition(_oPhysics, oPos);
    };

    this.getPosPhysics = function () {
        return s_oPhysicsController.getElementPosition(_oPhysics);
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.setAngle = function (iAngle) {
        _oWall.rotation = iAngle;
    };

    this.getID = function () {
        return _iID;
    };

    this.getType = function () {
        return _iType;
    };

    this.getX = function () {
        return _oWall.x;
    };

    this.getY = function () {
        return _oWall.y;
    };

    this.scale = function (fValue) {
        _oWall.scaleX = fValue;
        _oWall.scaleY = fValue;
    };

    this.setScaleX = function (fValue) {
        _oWall.scaleX = fValue;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setChildIndex = function (iValue) {
        _oParentContainer.setChildIndex(_oWall, iValue);
    };

    this.setAlpha = function (fValue) {
        _oWall.alpha = fValue;
    };

    this._init(iXPos, iYPos, oSprite, iType, iID, iOffsetX);

    return this;
}



