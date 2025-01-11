function CHeroes(iXPos, iYPos, oSprite, oPhysics, oParentContainer) {

    var _oHeroes;
    var _oPlatform;
    var _oPhysics = oPhysics;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    var _iFrame = 0;
    var _iBufferTime = 0;

    this._init = function (iXPos, iYPos, oSprite) {
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);
        
        var oData = {
            images: [s_oSpriteLibrary.getSprite("platform")],
            // width, height & registration point of each sprite
            frames: {width: 167, height: 72},
            animations: {start: 0 ,anim:[0,7,"start"]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oPlatform = createSprite(oSpriteSheet,"start",0,0,167,72);
        _oPlatform.regX = 83;
        _oPlatform.y = 10
        _oContainer.addChild(_oPlatform);
        
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 4, height: oSprite.height / 5, regX: (oSprite.width / 4) / 2 + HEROES_REG_OFFSET.x, regY: (oSprite.height / 5) / 2 + HEROES_REG_OFFSET.y}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oHeroes = createSprite(oSpriteSheet, 0, (oSprite.width / 4) / 2 + HEROES_REG_OFFSET.x, (oSprite.height / 5) / 2 + HEROES_REG_OFFSET.y, oSprite.width / 4, oSprite.height / 5);
        _oContainer.addChild(_oHeroes);
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
        this.move();
    };

    this.moveAnimation = function (iVelFrame) {
        if (iVelFrame > 4.5) {
            this._goToNextFrame();
        } else if (iVelFrame > 1.5) {
            _iBufferTime++;
            if (_iBufferTime > 3) {
                this._goToNextFrame();
                _iBufferTime = 0;
            }
        } else if (iVelFrame > 2) {
            _iBufferTime++;
            if (_iBufferTime > 3) {
                this._goToNextFrame();
                _iBufferTime = 0;
            }
        } else if (iVelFrame > 1) {
            _iBufferTime++;
            if (_iBufferTime > 4) {
                this._goToNextFrame();
                _iBufferTime = 0;
            }
        }
    };


    this._goToNextFrame = function () {
        if (_iFrame === 20) {
            _iFrame = 0;
            _oHeroes.gotoAndStop(_iFrame);
        } else {
            _iFrame++;
            _oHeroes.gotoAndStop(_iFrame);
        }
    };

    this.setAngle = function (iAngle) {
        _oHeroes.rotation = iAngle;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.scale = function (fValue) {
        _oContainer.scaleX = fValue;
        _oContainer.scaleY = fValue;
    };

    this.getScale = function () {
        return _oContainer.scaleX;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.childIndex = function (iValue) {
        _oParentContainer.setChildIndex(_oContainer, iValue);
    };

    this.getChildIndex = function () {
        return  _oParentContainer.getChildIndex(_oContainer);
    };

    this.move = function () {
        s_oPhysicsController.setElementPosition(_oPhysics, {x:_oContainer.x, y:_oContainer.y+50});
    };

    this.animPlatform = function(){
        _oPlatform.gotoAndPlay("anim");
    };
    
    this._init(iXPos, iYPos, oSprite);

    return this;
}
