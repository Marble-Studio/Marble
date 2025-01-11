function CItem(iXPos, iYPos, oSpriteSheet, iType, iID, oPhysics, oParentContainer) {

    var _pResetPos;

    var _oItem;
    var _oPhysics = oPhysics;
    var _oParentContainer = oParentContainer;
    var _oTween = null;
    var _oContainer;
    var _iType;
    var _iID;
    var _bCached = true;
    var _bTouchHeroes = false;


    this._init = function (iXPos, iYPos, oSpriteSheet, iType, iID) {
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        _oItem = createSprite(oSpriteSheet,"type_"+iType,35,44,70,88);

        _oContainer.addChild(_oItem);

        _iType = iType;

        _iID = iID;

        _pResetPos = {x: iXPos, y: iYPos};

        s_oPhysicsController.activeBody(_oPhysics, false);

        if (TEST) {
            var oText = new createjs.Text(iID, "36px " + FONT_GAME, "#000");
            oText.x = 0;
            oText.y = 0;
            oText.textAlign = "center";
            oText.textBaseline = "middle";
            _oContainer.addChild(oText);
        }

        _oParentContainer.addChild(_oContainer);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;

        var oPos = {x: iXPos, y: iYPos};
        s_oPhysicsController.setElementPosition(_oPhysics, oPos);
    };

    this.resetPos = function () {
        this.setPosition(_pResetPos.x, _pResetPos.y);
    };

    this.setAngle = function (iAngle) {
        _oItem.rotation = iAngle;
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
        _oContainer.visible = !bVal;
        this.setAngle(0);
    };

    this.getTouchHeroes = function () {
        return _bTouchHeroes;
    };

    this.setTouchHeroes = function (bVal) {
        _bTouchHeroes = bVal;
    };

    this.activeBody = function (bVal) {
        s_oPhysicsController.activeBody(_oPhysics, bVal);
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.scale = function (fValue) {
        _oItem.scaleX = fValue;
        _oItem.scaleY = fValue;
    };

    this.getScale = function () {
        return _oItem.scaleX;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setChildIndex = function (iValue) {
        _oParentContainer.setChildIndex(_oContainer, iValue);
    };

    this.move = function () {
        var oPos = s_oPhysicsController.getElementPosition(_oPhysics);
        _oContainer.x = oPos.x;
        _oContainer.y = oPos.y;
        
        _oItem.rotation = s_oPhysicsController.getElementAngle(_oPhysics);
    };

    this.spriteFollowPhysics = function (bVal) {
        _bCached = !bVal;
    };

    this.setAlpha = function (fValue) {
        _oItem.alpha = fValue;
    };

    this.isAnim = function () {
        return _oTween;
    };

    this.animInTarget = function () {
        if (_oTween === null) {
            _oTween = createjs.Tween.get(_oContainer).to({x: ITEM_IN_TARGET_ANIM_POS.x, y: ITEM_IN_TARGET_ANIM_POS.y}, 400, createjs.Ease.cubicOut).call(function () {
                s_oGame.cachedItem(_iID);
                _bTouchHeroes = false;
                _oTween = null;
            });
        }
    };

    this.animOnFloor = function () {
        if (_oTween === null) {
            _oTween = createjs.Tween.get(_oItem).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
                s_oGame.cachedItem(_iID);
                _bTouchHeroes = false;
                _oTween = null;
            });
        }
    };

    this.update = function () {
        this.move();
    };

    this._init(iXPos, iYPos, oSpriteSheet, iType, iID);

    return this;
}
