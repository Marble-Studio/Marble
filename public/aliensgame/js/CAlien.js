function CAlien(iXPos, iYPos, oSprite, szState, iType, bSpeedDown, iSpeed) {

    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _iCntFrames;
    var _iInterpolationType;
    var _oEasing;
    var _aTrajectoryPointX;
    var _aTrajectoryPointY;
    var _bExtraSpeed;
    var _aStartingPos;
    var _aEndPos;
    var _bUpdate;
    var _oTrajcetories;
    var _oInfoData = {};
    var _bBlock;
    var _iSpeed;
    var _iOriginalSpeed;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _iCntFrames = 0;
        if (iType===8) {
            var iNum = new Array();
            iNum[0] = 3;
            iNum[1] = 5;
            iNum[2] = 6;
            var iRand = Math.floor(Math.random() * iNum.length);
            _iInterpolationType = iNum[iRand];
        }
        else
        {
            _iInterpolationType = Math.floor(Math.random() * 6);
        }
        _bExtraSpeed = false;
        _bBlock = false;
        _iSpeed = iSpeed;
        _iOriginalSpeed = _iSpeed;
        if (iType < 9) {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 4, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
                animations: {normal: [0, 1, "normal", 0.2], pig: [2, 3, "pig", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, szState, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
        } else {
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
                animations: {normal: [0, 1, "normal", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oButton = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
            
        }
        _aStartingPos = new Array();
        _aEndPos = new Array();

        _oButton.mouseEnabled = true;
        _oButton.visible = true;
        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oEasing = new CEasing();
        _oTrajcetories = new CTrajectories();

        s_oStage.addChild(_oButton);

        s_oStage.setChildIndex(_oButton, 2);

        this.setSpeedDown(bSpeedDown);
        this.initPos();
        this._initListener();
    };

    this._initListener = function () {
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
    };

    this.initPos = function () {
        if ((iXPos !== 0) && (iYPos !== 0)) {
            _oButton.x = iXPos;
            _oButton.y = iYPos;
        } else {
            _aStartingPos["x"] = s_oGame.getRandomAlienCoord();
            _aStartingPos["y"] = 115;
        }

        var _aT0 = new Array();
        var iRand;
        //var iRandT0 = Math.floor(Math.random() * 100) + 1;
        _aStartingPos["x"] = iXPos;
        _aStartingPos["y"] = iYPos;
        /*
         iRand = Math.floor(Math.random() * CANVAS_HEIGHT);
         _aT0["x"] = iRand;
         _aT0["y"] = (CANVAS_HEIGHT / 2) + iRandT0;
         */
        iRand = Math.floor(Math.random() * CANVAS_WIDTH);

        if (iRand > CANVAS_WIDTH - SPAWN_RANGE_MIN_X) {
            iRand = SPAWN_RANGE_MAX_X;
        }
        if (iRand < CANVAS_WIDTH - SPAWN_RANGE_MAX_X) {
            iRand = SPAWN_RANGE_MIN_X
        }

        _aEndPos["x"] = iRand;
        _aEndPos["y"] = CANVAS_HEIGHT - 120;

        if (_aStartingPos["x"] > (CANVAS_WIDTH / 2)) {
            iRand = Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100;
            _aT0["x"] = (CANVAS_WIDTH / 2) - 100;//ORIGINAL (CANVAS_WIDTH/2)-50
            _aT0["y"] = iRand;
        } else {
            iRand = Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100;
            _aT0["x"] = (CANVAS_WIDTH / 2) + 100;//ORIGINAL(CANVAS_WIDTH/2)+50
            _aT0["y"] = iRand;
        }

        _aTrajectoryPointX = new Array(_aStartingPos["x"], _aT0["x"], _aEndPos["x"]);
        _aTrajectoryPointY = new Array(_aStartingPos["y"], _aT0["y"], _aEndPos["y"]);

        _oButton.x = _aStartingPos["x"];
        _oButton.y = _aStartingPos["y"];

        _bUpdate = true;
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

    this.setSpeedDown = function (bValue) {
        if (bValue === true) {
            _iSpeed = _iOriginalSpeed / 2;
        }
        else
        {
            _iSpeed = _iOriginalSpeed;
        }

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
        _iCntFrames += _iSpeed;

        if (_oButton.y >= _aEndPos["y"]) {
            _bUpdate = false;
            s_oGame.alienDamage(_oInfoData["Type"]);
            s_oGame.destroyFromAlienArray(_aParams.ID);
        }
        
        var fLerp;
        switch (_iInterpolationType) {
            case 0:
            {
                fLerp = _oEasing.easeInQuad(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 1:
            {
                fLerp = _oEasing.easeOutSine(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 2:
            {
                fLerp = _oEasing.easeInCubic(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 3:
            {
                fLerp = _oEasing.easeOutBack(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 4:
            {
                fLerp = _oEasing.easeOutExpo(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 5:
            {
                fLerp = _oEasing.easeOutQuart(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
        }

        var pPosX = _oTrajcetories.quad(fLerp, _aTrajectoryPointX);
        var pPosY = _oTrajcetories.quad(fLerp, _aTrajectoryPointY);
        _oButton.x = pPosX;
        _oButton.y = pPosY;

    };

    s_oAlien = this;

    this._init();
}

var s_oAlien;
