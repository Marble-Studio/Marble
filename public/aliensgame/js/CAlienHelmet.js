function CAlienHelmet(iXPos, iYPos, oSprite, szState, iType, bSpeedDown, iSpeed) {

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
    var _oTrajcetories;
    var _oInfoData = {};
    var _bBlock;
    var _iSpeed;
    var _iOriginalSpeed;
    var _oHelmet;
    var _oContainer;
    var _bHelmet;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _iCntFrames = 0;
        _iInterpolationType = Math.floor(Math.random() * 6);
        _bExtraSpeed = false;
        _bBlock = false;
        _iSpeed = iSpeed;
        _iOriginalSpeed = _iSpeed;
        _bHelmet = true;
        console.log(_iInterpolationType);
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 4, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {normal: [0, 1, "normal", 0.2], pig: [2, 3, "pig", 0.2]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oButton = createSprite(oSpriteSheet, szState, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
        if (szState === "normal") {
            var oSpriteHelmet = s_oSpriteLibrary.getSprite("helmet_explosion");
            var oData = {
                images: [oSpriteHelmet],
                // width, height & registration point of each sprite
                frames: {width: oSpriteHelmet.width / 2, height: oSpriteHelmet.height / 2, regX: (oSpriteHelmet.width / 2) / 2, regY: (oSpriteHelmet.height / 2) / 2},
                animations: {normal: 0, destroy: [1, 3, "destroy", 0.2]}
            };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oHelmet = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

            _oContainer = new createjs.Container();

            _oContainer.addChild(_oButton, _oHelmet);
            _oHelmet.y = -25;
            _oHelmet.x = -40;
        }
        else
        {
            _oContainer = new createjs.Container();
            _oContainer.addChild(_oButton);
            _bHelmet = false;
        }

        console.log("CONTAINER " + _oContainer);
        _aStartingPos = new Array();
        _aEndPos = new Array();

        //console.log(oSpriteSheet.getAnimations());

        _oButton.mouseEnabled = true;
        _oButton.visible = true;

        _oEasing = new CEasing();
        _oTrajcetories = new CTrajectories();

        s_oStage.addChild(_oContainer);

        s_oStage.setChildIndex(_oContainer, 2);

        this.setSpeedDown(bSpeedDown);
        this.initPos();
        this._initListener();
        //this.setState(szState);
        //_oButton.gotoAndPlay("normal");
    };

    this._initListener = function () {
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
    };

    this.initPos = function () {
        if ((iXPos !== 0) && (iYPos !== 0)) {
            _oContainer.x = iXPos;
            _oContainer.y = iYPos;
        } else {
            _aStartingPos["x"] = s_oGame.getRandomAlienCoord();
            _aStartingPos["y"] = 115;
            //console.log("Diverso");
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
        trace("_aStartingPos: " + _aStartingPos["x"]);
        trace("t0: " + _aT0["x"]);
        trace("_aEndPos: " + _aEndPos["x"]);

        _oContainer.x = _aStartingPos["x"];
        _oContainer.y = _aStartingPos["y"];

    };

    this.block = function (bVal) {
        _bBlock = bVal;
    };

    this.setState = function (szState) {
        _oButton.gotoAndPlay(szState);
        if (szState === "pig") {
            if (_bHelmet === true) {
                _bHelmet = false;
                _oHelmet.gotoAndPlay("destroy");
                _oHelmet.on("animationend", function () {
                    _oContainer.removeChild(_oHelmet);
                    _oHelmet = null;
                });
            }
        }
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.setInfoData = function (szKey, oValue) {
        _oInfoData[szKey] = oValue;
    };

    this.getInfoData = function (szKey) {
        return _oInfoData[szKey];
    };

    this.resetTheIndex = function (iValue) {
        _aParams.ID = iValue;
        // console.log(_aParams);
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

    this.unloadHelmet = function () {
        if (_oHelmet === null) {
            return;
        }
        _oContainer.removeChild(1);
        _oHelmet = null;
    };


    this.buttonDown = function () {
        if (_bBlock) {
            return;
        }
        console.log("BOOLEAN" + _bHelmet);

        if (_bHelmet === false) {
            if (_aCbCompleted[ON_MOUSE_DOWN]) {
                _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
            }
        }
        else
        {
            _bHelmet = false;
            _oHelmet.gotoAndPlay("destroy");
            //console.log(_oContainer.getChildIndex(_oHelmet));
            _oHelmet.on("animationend", function () {
                _oContainer.removeChild(_oHelmet);
                _oHelmet = null;
            });

            //this.unloadHelmet();
            s_oGame.addEffect(_oContainer.x, _oContainer.y, 0, true);
        }
    };

    this.unload = function () {
        _oButton.off("mousedown", this.buttonDown);
        _oButton.off("pressup", this.buttonRelease);

        this.unloadHelmet();

        s_oStage.removeChild(_oContainer);
        
    };

    this.update = function () {
        _iCntFrames += _iSpeed;

        if (_oContainer.y >= _aEndPos["y"]) {
            _iCntFrames = 0;
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
                fLerp = _oEasing.easeInSine(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
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
                fLerp = _oEasing.easeOutQuad(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
            case 5:
            {
                fLerp = _oEasing.easeOutCubic(_iCntFrames, 0, 1, _oInfoData["Max_Frame"]);
                break;
            }
        }

        var pPosX = _oTrajcetories.quad(fLerp, _aTrajectoryPointX);
        var pPosY = _oTrajcetories.quad(fLerp, _aTrajectoryPointY);
//            console.log("pPosX: "+pPosX);
//            console.log("pPosY: "+pPosY);
//            console.log("fLerp=",fLerp);
        _oContainer.x = pPosX;
        _oContainer.y = pPosY;

    };

    s_oAlienHelmet = this;

    this._init();
}

var s_oAlienHelmet;
