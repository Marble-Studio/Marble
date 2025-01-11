function CBonus(iXPos, iYPos, oSprite, iType) {

    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _oInfoData = {};
    var _bBlock;
    var _oDirection = {};
    var _iBounce;
    var _iMaxBounce;
    var _bBonusUnload;
    var _pSpriteDim = {};
    var _pOffsetBonus={};
    
    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _bBonusUnload = false;

        _bBlock = false;
        
        _iBounce = 0;
        _iMaxBounce = MAX_BONUS_BOUNCE;

        var iX;
        var iY;
        var iRand = Math.random();

        if (iRand > 0.5) {
            iX = 1;
        } else {
            iX = -1;
        }
        iRand = Math.random();
        if (iRand > 0.5) {
            iY = 1;
        } else {
            iY = -1;
        }

        _oDirection = {x: iX, y: iY};

        if (iType === 0 || iType === 4) {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 5, height: oSprite.height / 2, regX: (oSprite.width / 2) / 5, regY: (oSprite.height / 2) / 2},
                animations: {normal: [0, 9, "normal", 1]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 7, (oSprite.height / 2) / 2, oSprite.width / 7, oSprite.height / 2);
            //_oButton.visible=true;
            _pSpriteDim = {x: (oSprite.width / 2) / 5, y: (oSprite.height / 2) / 2};
        }
        if (iType === 1) {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 8, height: oSprite.height / 2, regX: (oSprite.width / 2) / 8, regY: (oSprite.height / 2) / 2},
                animations: {normal: [0, 14, "normal", 1]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 8, (oSprite.height / 2) / 2, oSprite.width / 8, oSprite.height / 2);
            //_oButton.visible=true;
            _pSpriteDim = {x: (oSprite.width / 2) / 8, y: (oSprite.height / 2) / 2};
        }

        if (iType === 2 || iType === 3 || iType === 6) {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
                animations: {normal: [0, 1, "normal", 0.5]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
            //_oButton.visible=true;
            _pSpriteDim = {x: (oSprite.width / 2) / 2, y: oSprite.height / 2};
        }

        if (iType === 5) {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 7, height: oSprite.height, regX: (oSprite.width / 2) / 7, regY: oSprite.height / 2},
                animations: {normal: {frames: [0, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 0]}}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 7, oSprite.height / 2, oSprite.width / 7, oSprite.height);
            //_oButton.visible=true;
            _pSpriteDim = {x: (oSprite.width / 2) / 7, y: oSprite.height / 2};
        }
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.mouseEnabled = true;
        _oButton.visible = true;
        
        _pOffsetBonus={right:CANVAS_WIDTH - _pSpriteDim.x, left: 1 + _pSpriteDim.x, up: 173 + _pSpriteDim.y, down:CANVAS_HEIGHT - 173 - _pSpriteDim.y};
        
        s_oStage.addChild(_oButton);

        s_oStage.setChildIndex(_oButton, 4);

        this._initListener();
        //this.setState(szState);
        //_oButton.gotoAndPlay("normal");
    };

    this._initListener = function () {
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
    };

    this.block = function (bVal) {
        _bBlock = bVal;
    };

    this.setState = function (szState) {
        _oButton.gotoAndPlay(szState);
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };

    this.setInfoData = function (szKey, oValue) {
        _oInfoData[szKey] = oValue;
    };

    this.getInfoData = function (szKey) {
        return _oInfoData[szKey];
    };

    this.resetTheIndex = function (iValue) {
        _aParams.ID = iValue;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };

    this.buttonRelease = function () {
        if (_bBlock) {
            return;
        }
        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };

    this.buttonDown = function () {
        if (_bBlock) {
            return;
        }

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.unload = function () {
        _oButton.off("mousedown", this.buttonDown);
        _oButton.off("pressup", this.buttonRelease);

        s_oStage.removeChild(_oButton);
    };

    this.update = function () {
        _oButton.x += (BONUS_SPEED * _oDirection.x);
        _oButton.y += (BONUS_SPEED * _oDirection.y);

        if (_bBonusUnload === false) {

            if (_oButton.x >= _pOffsetBonus.right) {
                _oDirection.x *= -1;
                _iBounce++;
               
                playSound("boing",1,false);
                
            }else
            if (_oButton.y >= _pOffsetBonus.down) {
                _oDirection.y *= -1;
                _iBounce++;
                playSound("boing",1,false);
            }else
            if (_oButton.x <= 1 + _pOffsetBonus.left) {
                _oDirection.x *= -1;
                _iBounce++;
                playSound("boing",1,false);
            }else
            if (_oButton.y <= _pOffsetBonus.up) {
                _oDirection.y *= -1;
                _iBounce++;
                playSound("boing",1,false);
            }
        
            if (_iBounce >= _iMaxBounce) {
                _bBonusUnload = true;
            }
        }

        if (_bBonusUnload === true) {
            if (_oButton.y <= 135) {
                s_oGame.destroyFromBonusArray(_aParams.ID);
            }
            if (_oButton.x <= -20) {
                s_oGame.destroyFromBonusArray(_aParams.ID);
            }

            if (_oButton.x >= CANVAS_WIDTH + 40) {
                s_oGame.destroyFromBonusArray(_aParams.ID);
            }

            if (_oButton.y >= CANVAS_HEIGHT - 135) {
                s_oGame.destroyFromBonusArray(_aParams.ID);
            }
        }
    };

    s_oBonus = this;

    this._init();
}

var s_oBonus;

