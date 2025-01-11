function CGame(oData) {

    var _oBgLevel;
    var _oInterface;
    var _aSpriteAlien;
    var _aSpriteBonus;
    var _aAlien;
    var _iNum_Of_Alien_Spawned;
    var _iNum_Of_Bonus_Spawned;
    var _oSettingsLevel;
    var _iLevel;
    var _iCounterUpdate;
    var _aEvilAlienOccurance;
    var _aBonusOccurance;
    var _iAlienOccurenceStep;
    var _iTimeElapsed;
    var _szState;
    var _iRandTimeSpawnAlien;
    var _bPause;
    var _aBonus;
    var _iScore;
    var _aAlienDestroyCount;
    var _iLife;
    var _iCombo;
    var _oButMenu;
    var _iTimeForAssault;
    var _iTimeForSpeedDown;
    var _iTimeForEvilHorde;
    var _iTimeForPigMode;
    var _bAssaultActive;
    var _bSpeedDown;
    var _bHordeActive;
    var _bPigMode;
    var _szLevelBg;
    var _aHitAlienNum;
    var _oPercGoodHit = {};
    var _oGameOverPanel;
    var _oGameOverText;
    var _fMultiplier;

    this._init = function () {
        _bPause = true;

        _iScore = 0;
        _iTimeElapsed = TIME_FINISH_GAME;
        _iNum_Of_Alien_Spawned = 0;
        _iNum_Of_Bonus_Spawned = 0;

        _iCombo = 0;

        _iLife = 100;

        _fMultiplier = 1.0;

        _aEvilAlienOccurance = new Array();
        _aBonusOccurance = new Array();
        _aAlienDestroyCount = new Array();
        _aHitAlienNum = new Array();

        _oPercGoodHit = {good: 0, tot: 0};

        _bAssaultActive = false;
        _bSpeedDown = false;
        _bHordeActive = false;
        _bPigMode = false;

        _iLevel = 0;
        _iCounterUpdate = 0;

        _szLevelBg = "bg_level_1";

        _oBgLevel = createBitmap(s_oSpriteLibrary.getSprite(_szLevelBg));
        s_oStage.addChild(_oBgLevel); //Draws on canvas
        s_oStage.setChildIndex(_oBgLevel, 0);
        _oBgLevel.addEventListener("click", function () {
            _iCombo = 0;
            _oPercGoodHit.tot++;
        });

        _aSpriteAlien = new Array();
        _aSpriteBonus = new Array();

        for (var i = 0; i < TYPES_OF_ALIENS; i++) {
            _aSpriteAlien[i] = s_oSpriteLibrary.getSprite('alien' + i);
        }

        _aSpriteBonus[0] = s_oSpriteLibrary.getSprite("item_time_sprite");
        _aSpriteBonus[1] = s_oSpriteLibrary.getSprite("item_assault_sprite");
        _aSpriteBonus[2] = s_oSpriteLibrary.getSprite("item_bomb_sprite");
        _aSpriteBonus[3] = s_oSpriteLibrary.getSprite("icon_extra_speed");
        _aSpriteBonus[4] = s_oSpriteLibrary.getSprite("item_evil_horde_sprite");
        _aSpriteBonus[5] = s_oSpriteLibrary.getSprite("item_pig_mode_sprite");
        _aSpriteBonus[6] = s_oSpriteLibrary.getSprite("item_medikit_sprite");

        _oInterface = new CInterface(_iLevel + 1);
        _oInterface.help(_aSpriteAlien, _aSpriteBonus);

        _aAlien = new Array();
        _aBonus = new Array();

        _oSettingsLevel = new CSettingsLevel();

        this.setAlienOccuranceStep(1);
        this.setOccurance(ALIEN_OCCURENCE_PER_LEVEL[_iLevel]);
        this.resetAlienNumberHit();
        _szState = "normal";

        this.setRandomTimeAlien();
        
    };

    this.setPause = function (bVal) {
        _bPause = bVal;
        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].block(bVal);
        }
        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].block(bVal);
        }
    };

    this.resetAlienNumberHit = function () {
        for (var i = 0; i < TYPES_OF_ALIENS; i++) {
            _aHitAlienNum[i] = 0;
        }
    };

    this.setOccurance = function (aOccurrance) {
        _aEvilAlienOccurance = _oSettingsLevel.createAlienOccurance(aOccurrance);
        _aBonusOccurance = _oSettingsLevel.createBonusOccurance(_iLevel);
    };

    this.setRandomTimeAlien = function () {
        var iRand = Math.floor(Math.random() * PER_LEVEL_SPAWN_ALIEN_TIME[_iLevel]);
        iRand /= 2;
        _iRandTimeSpawnAlien = PER_LEVEL_SPAWN_ALIEN_TIME[_iLevel] - iRand;
    };

    this.setAlienOccuranceStep = function (iStep) {
        _iAlienOccurenceStep = iStep;
    };

    this.spawnAlien = function () {
        var iTypeRand = Math.floor(Math.random() * _aEvilAlienOccurance.length);
        var iXPos = this.getRandomAlienCoord();
        if (_aEvilAlienOccurance[iTypeRand] !== 7) {
            _aAlien[_iNum_Of_Alien_Spawned] = new CAlien(iXPos, 115, _aSpriteAlien[_aEvilAlienOccurance[iTypeRand]], _szState, _aEvilAlienOccurance[iTypeRand], _bSpeedDown, ALIENS_SETTINGS[_aEvilAlienOccurance[iTypeRand]][1]);
        }
        else
        {
            _aAlien[_iNum_Of_Alien_Spawned] = new CAlienHelmet(iXPos, 115, _aSpriteAlien[_aEvilAlienOccurance[iTypeRand]], _szState, _aEvilAlienOccurance[iTypeRand], _bSpeedDown, ALIENS_SETTINGS[_aEvilAlienOccurance[iTypeRand]][1]);
        }
        _aAlien[_iNum_Of_Alien_Spawned].setInfoData("Type", _aEvilAlienOccurance[iTypeRand]);
        _aAlien[_iNum_Of_Alien_Spawned].setInfoData("Score", ALIENS_SETTINGS[_aEvilAlienOccurance[iTypeRand]][0]);
        _aAlien[_iNum_Of_Alien_Spawned].setInfoData("State", _szState);
        _aAlien[_iNum_Of_Alien_Spawned].setInfoData("Max_Frame", ALIENS_MAX_FRAME[_iLevel]);
        _aAlien[_iNum_Of_Alien_Spawned].addEventListenerWithParams(ON_MOUSE_DOWN, this._onButAlienPress, this, {alien: _aAlien[_iNum_Of_Alien_Spawned], ID: _iNum_Of_Alien_Spawned});
        _iNum_Of_Alien_Spawned++;
    };

    this.generateABonus = function (iXPos, iYPos) {
        var iTypeRand = Math.floor(Math.random() * _aBonusOccurance.length);
        _aBonus[_iNum_Of_Bonus_Spawned] = new CBonus(iXPos, iYPos, _aSpriteBonus[_aBonusOccurance[iTypeRand]], _aBonusOccurance[iTypeRand]);
        _aBonus[_iNum_Of_Bonus_Spawned].setInfoData("Type", _aBonusOccurance[iTypeRand]);
        _aBonus[_iNum_Of_Bonus_Spawned].addEventListenerWithParams(ON_MOUSE_DOWN, this._onButBonusPress, this, {bonus: _aBonus[_iNum_Of_Bonus_Spawned], ID: _iNum_Of_Bonus_Spawned});
        _iNum_Of_Bonus_Spawned++;
    };

    this.nextLevel = function () {
        _iLife = 100;
        _fMultiplier = 1.0;
        $(s_oMain).trigger("start_level", _iLevel);
        this.setAlienOccuranceStep(1);
        this.setOccurance(ALIEN_OCCURENCE_PER_LEVEL[_iLevel]);
        this.resetAlienNumberHit();

        if (_iLevel > 2 && _iLevel < 6) {
            _szLevelBg = "bg_level_2";
        }

        if (_iLevel >= 6 && _iLevel < 10) {
            _szLevelBg = "bg_level_3";
        }
        ;

        var oSpriteBgNormal = s_oSpriteLibrary.getSprite(_szLevelBg);
        this.setBackGround(oSpriteBgNormal);
        _oInterface.refreshBonusToggleAssault(false);
        _oInterface.refreshBonusToggleEvilHorde(false);
        _oInterface.refreshBonusTogglePigMode(false);
        _oInterface.refreshBonusToggleSpeedDown(false);
        _oInterface.refreshMissionNumber(_iLevel + 1);
        _oInterface.refreshLifeBar(_iLife);

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].unload();
        }

        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].unload();
        }

        _aAlien = null;
        _aBonus = null;

        _aAlien = new Array();
        _aBonus = new Array();

        _iTimeElapsed = TIME_FINISH_GAME;

        _oInterface.refreshTime(_iTimeElapsed);

        _bHordeActive = false;
        _bAssaultActive = false;

        _bPigMode = false;
        _bSpeedDown = false;

        _szState = "normal";

        _oPercGoodHit.good = 0;
        _oPercGoodHit.tot = 0;

        _iNum_Of_Alien_Spawned = 0;
        _iNum_Of_Bonus_Spawned = 0;

        _oInterface.animWave();
    };

    this.getLevel = function () {
        return _iLevel;
    };

    this._onButBonusPress = function (oBonus) {

        switch (oBonus.bonus.getInfoData("Type")) {
            case 0:
                this.subtractTime(oBonus.bonus.getX(), oBonus.bonus.getY());
                break;
            case 1:
                this.activeAstronautAssault();
                break;
            case 2:
                this.activeBomb();
                break;
            case 3:
                this.speedDown(true);
                break;
            case 4:
                this.activeEvilHorde();
                break;
            case 5:
                this.activePigMode();
                break;
            case 6:
                this.activeLife();
                break;
        }
        this.destroyFromBonusArray(oBonus.ID);
    };

    this._onButAlienPress = function (oAlien) {
        var iEarnedScore;
        if (oAlien.alien.getInfoData("Type") > 9) {
            _iCombo++;
            _oPercGoodHit.tot++;
            _oPercGoodHit.good++;
            _fMultiplier += oAlien.alien.getInfoData("Score");
        }
        else
        {
            _aHitAlienNum[oAlien.alien.getInfoData("Type")]++;
            _oPercGoodHit.good++;
            _oPercGoodHit.tot++;
            _iCombo++;
        }
        if (_bPigMode === false) {
            if (oAlien.alien.getInfoData("Type") < 9) {
                iEarnedScore = oAlien.alien.getInfoData("Score") * _iCombo;
                _iScore += iEarnedScore * _fMultiplier;
                if (oAlien.alien.getInfoData("Type") === 0 || oAlien.alien.getInfoData("Type") === 1 || oAlien.alien.getInfoData("Type") === 2) {
                    playSound("evil1",1,false);
                }
                if (oAlien.alien.getInfoData("Type") === 3 || oAlien.alien.getInfoData("Type") === 4 || oAlien.alien.getInfoData("Type") === 5) {
                    playSound("evil2",1,false);
                }
                if (oAlien.alien.getInfoData("Type") === 6 || oAlien.alien.getInfoData("Type") === 7) {
                    playSound("evil3",1,false);
                }
                if (oAlien.alien.getInfoData("Type") === 8) {
                    playSound("evil8",1,false);
                }
            }
            else {
                if (oAlien.alien.getInfoData("Type") === 9 || oAlien.alien.getInfoData("Type") === 10) {
                    playSound("astronaut1",1,false);
                }
                if (oAlien.alien.getInfoData("Type") === 11) {
                    playSound("astronaut2",1,false);
                }
                this.addEffect(oAlien.alien.getX(), oAlien.alien.getY(), oAlien.alien.getInfoData("Score"), true, oAlien.alien.getInfoData("Type"));
                playSound("explosion",1,false);
                this.destroyFromAlienArray(oAlien.ID);
                return;
            }
        }
        else
        {
            if (oAlien.alien.getInfoData("Type") < 9) {
                iEarnedScore = (oAlien.alien.getInfoData("Score") * _iCombo) * 2;
                _iScore += iEarnedScore * _fMultiplier;
                playSound("evil_pig",1,false);
            }
            else
            {
                if (oAlien.alien.getInfoData("Type") === 9 || oAlien.alien.getInfoData("Type") === 10) {
                    playSound("astronaut1",1,false);
                }
                if (oAlien.alien.getInfoData("Type") === 11) {
                    playSound("astronaut2",1,false);
                }
                this.addEffect(oAlien.alien.getX(), oAlien.alien.getY(), oAlien.alien.getInfoData("Score"), true, oAlien.alien.getInfoData("Type"));
                playSound("explosion",1,false);
                this.destroyFromAlienArray(oAlien.ID);
                return;
            }
        }
        _iScore = Math.floor(_iScore);
        _oInterface.refreshScore(_iScore);

        if (oAlien.alien.getInfoData("Type") === 8) {
            this.generateABonus(oAlien.alien.getX(), oAlien.alien.getY());
        }

        if (oAlien.alien.getInfoData("Type") < 9) {
            this.addEffect(oAlien.alien.getX(), oAlien.alien.getY(), iEarnedScore, true, oAlien.alien.getInfoData("Type"));
        }

        playSound("explosion",1,false);
        this.destroyFromAlienArray(oAlien.ID);
    };

    this.subtractTime = function (iXPos, iYPos) {
        _iTimeElapsed += TIME_TO_SUBTRACT;
        var oSubTime;
        oSubTime = new createjs.Text(TIME_TO_SUBTRACT + "''",  50 + "px " + PRIMARY_FONT, "#ffcc00");
        oSubTime.textAlign = "center";
        oSubTime.textBaseline = "alphabetic";

        oSubTime.x = iXPos;
        oSubTime.y = iYPos;
        s_oStage.addChild(oSubTime);
        _oInterface.refreshTime(_iTimeElapsed);
        createjs.Tween.get(oSubTime).to({y: oSubTime.y - 200, alpha: 0}, 1500).call(function () {
            s_oStage.removeChild(oSubTime);
            oSubTime = null;
        });
    };

    this.activeAstronautAssault = function () {
        var oAstronautAssault;
        var oSpriteAssault = s_oSpriteLibrary.getSprite("bonus_assault");
        _iTimeForAssault = TIME_FOR_ASTRONAUT_ASSAULT;

        _bPause = true;

        playSound("power_up",1,false);
        
        oAstronautAssault = createBitmap(oSpriteAssault);
        oAstronautAssault.x = CANVAS_WIDTH / 2;
        oAstronautAssault.y = -(oSpriteAssault.height / 2) + 50;
        oAstronautAssault.regX = oSpriteAssault.width / 2;
        oAstronautAssault.regY = oSpriteAssault.height / 2;
        s_oStage.addChild(oAstronautAssault);

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].block(true);
        }

        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].block(true);
        }
        createjs.Tween.get(oAstronautAssault).to({y: CANVAS_WIDTH / 2}, 700, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(oAstronautAssault).wait(500).to({y: -(oSpriteAssault.height / 2) + 50}, 700, createjs.Ease.cubicIn).call(function () {
                s_oStage.removeChild(oAstronautAssault);
                oAstronautAssault = null;
                _bPause = false;
                _bAssaultActive = true;
                for (var i = 0; i < _aAlien.length; i++) {
                    _aAlien[i].block(false);
                }

                for (var i = 0; i < _aBonus.length; i++) {
                    _aBonus[i].block(false);
                }
            });
        });
        this.setOccurance(ALIEN_OCCURENCE_BONUS_ASTRONAUT_ASSAULT);
        _oInterface.refreshBonusToggleAssault(true);
    };

    this.activeBomb = function () {
        var iCnt = 0;
        for (var i = 0; i < _aAlien.length; i++) {

            if (_aAlien[i].getY() > 125) {
                this.addEffect(_aAlien[i].getX(), _aAlien[i].getY(), _aAlien[i].getInfoData("Score"), false, _aAlien[i].getInfoData("Type"));
            }
            _aHitAlienNum[_aAlien[i].getInfoData("Type")]++;
            _aAlien[i].unload();
            if (_aAlien[i].getInfoData("Type") > 9) {
                _fMultiplier += 0.1;
            }
            iCnt++;
        }

        playSound("bomb",1,false);
        
        _iNum_Of_Alien_Spawned = 0;
        _aAlien.splice(0, iCnt);
    };

    this.speedDown = function (bVal) {
        if (bVal === true) {
            _iTimeForSpeedDown = TIME_FOR_SPEED_DOWN;
            _bPause = true;

            var oSpeedDown;
            var oSpriteSpeedDown = s_oSpriteLibrary.getSprite("bonus_speed_down");

            oSpeedDown = createBitmap(oSpriteSpeedDown);
            oSpeedDown.x = CANVAS_WIDTH / 2;
            oSpeedDown.y = -(oSpriteSpeedDown.height / 2) - 50;
            oSpeedDown.regX = oSpriteSpeedDown.width / 2;
            oSpeedDown.regY = oSpriteSpeedDown.height / 2;
            s_oStage.addChild(oSpeedDown);

            for (var i = 0; i < _aAlien.length; i++) {
                _aAlien[i].block(true);
            }

            for (var i = 0; i < _aBonus.length; i++) {
                _aBonus[i].block(true);
            }

            createjs.Tween.get(oSpeedDown).to({y: CANVAS_WIDTH / 2}, 700, createjs.Ease.cubicOut).call(function () {
                createjs.Tween.get(oSpeedDown).wait(500).to({y: -300}, 700, createjs.Ease.cubicIn).call(function () {
                    s_oStage.removeChild(oSpeedDown);
                    oSpeedDown = null;
                    _bPause = false;
                    for (var i = 0; i < _aAlien.length; i++) {
                        _aAlien[i].block(false);
                    }
                    for (var i = 0; i < _aBonus.length; i++) {
                        _aBonus[i].block(false);
                    }
                });
            });
        }

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].setSpeedDown(bVal);
        }
        _bSpeedDown = bVal;
        _oInterface.refreshBonusToggleSpeedDown(bVal);
    };

    this.activeEvilHorde = function () {
        var oEvilHorde;
        var oSpriteEvil = s_oSpriteLibrary.getSprite("bonus_evil_horde");

        _bPause = true;

        playSound("power_up",1,false);
        
        _iTimeForEvilHorde = TIME_FOR_EVIL_HORDE;

        oEvilHorde = createBitmap(oSpriteEvil);
        oEvilHorde.x = CANVAS_WIDTH / 2;
        oEvilHorde.y = -(oSpriteEvil.height / 2) + 50;
        oEvilHorde.regX = oSpriteEvil.width / 2;
        oEvilHorde.regY = oSpriteEvil.height / 2;
        s_oStage.addChild(oEvilHorde);

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].block(true);
        }

        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].block(true);
        }

        this.setAlienOccuranceStep(1.5);

        createjs.Tween.get(oEvilHorde).to({y: CANVAS_WIDTH / 2}, 700, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(oEvilHorde).wait(500).to({y: -(oSpriteEvil.height / 2) + 50}, 700, createjs.Ease.cubicIn).call(function () {
                s_oStage.removeChild(oEvilHorde);
                oEvilHorde = null;
                _bPause = false;
                _bHordeActive = true;
                for (var i = 0; i < _aAlien.length; i++) {
                    _aAlien[i].block(false);
                }
                for (var i = 0; i < _aBonus.length; i++) {
                    _aBonus[i].block(false);
                }

            });
        });
        this.setOccurance(ALIEN_OCCURENCE_BONUS_EVIL_HORDE);
        _oInterface.refreshBonusToggleEvilHorde(true);
    };

    this.activePigMode = function () {
        var oPigMode;
        var oSpritePigMode = s_oSpriteLibrary.getSprite("bonus_pig_mode");
        var oSpriteBgPigMode = s_oSpriteLibrary.getSprite("bg_level_bonus");

        this.setBackGround(oSpriteBgPigMode);

        playSound("pigmode",1,false);

        _bPause = true;
        this.setAlienState("pig");
        _iTimeForPigMode = TIME_FOR_PIG_MODE;

        oPigMode = createBitmap(oSpritePigMode);
        oPigMode.x = CANVAS_WIDTH / 2;
        oPigMode.y = -(oSpritePigMode.height / 2) - 50;
        oPigMode.regX = oSpritePigMode.width / 2;
        oPigMode.regY = oSpritePigMode.height / 2;
        s_oStage.addChild(oPigMode);

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].block(true);
        }

        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].block(true);
        }

        createjs.Tween.get(oPigMode).to({y: CANVAS_WIDTH / 2}, 700, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(oPigMode).wait(500).to({y: -300}, 700, createjs.Ease.cubicIn).call(function () {
                s_oStage.removeChild(oPigMode);
                oPigMode = null;
                _bPause = false;
                _bPigMode = true;
                for (var i = 0; i < _aAlien.length; i++) {
                    _aAlien[i].block(false);
                }

                for (var i = 0; i < _aBonus.length; i++) {
                    _aBonus[i].block(false);
                }

            });
        });

        _oInterface.refreshBonusTogglePigMode(true);
    };

    this.activeLife = function () {
        _iLife += 20;
        if (_iLife > 100) {
            _iLife = 100;
        }
        playSound("power_up",1,false);
        _oInterface.refreshLifeBar(_iLife);
    };

    this.setBackGround = function (oSprite) {
        s_oStage.removeChild(_oBgLevel);
        _oBgLevel = null;
        _oBgLevel = createBitmap(oSprite);
        _oBgLevel.addEventListener("click", function () {
            _iCombo = 0;
            _oPercGoodHit.tot++;
        });
        s_oStage.addChild(_oBgLevel);
        s_oStage.setChildIndex(_oBgLevel, 0);
    };

    this.addEffect = function (iXPos, iYPos, iScore, bMouse, iType) {
        var oKaboom;
        var oZapFlash;
        var oSpriteKaboom = s_oSpriteLibrary.getSprite("explosion_sprite");
        var oData = {
            images: [oSpriteKaboom],
            // width, height & registration point of each sprite
            frames: {width: oSpriteKaboom.width / 9, height: oSpriteKaboom.height / 2, regX: (oSpriteKaboom.width / 2) / 9, regY: (oSpriteKaboom.height / 2) / 2},
            animations: {explode: [0, 17]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        oKaboom = createSprite(oSpriteSheet, "explode", (oSpriteKaboom.width / 2) / 9, (oSpriteKaboom.height / 2) / 2, oSpriteKaboom.width / 9, oSpriteKaboom.height / 2);
        oKaboom.x = iXPos;
        oKaboom.y = iYPos;
        s_oStage.addChild(oKaboom);

        oKaboom.on("animationend", this.destoyKaboom, null, true, oKaboom);

        if (bMouse === true) {
            var oSpriteZapFlash = s_oSpriteLibrary.getSprite("zap_flash");
            var oData = {
                images: [oSpriteZapFlash],
                // width, height & registration point of each sprite
                frames: {width: oSpriteZapFlash.width / 7, height: oSpriteZapFlash.height, regX: (oSpriteZapFlash.width / 2) / 7, regY: 0},
                animations: {zap: [0, 6, "zap", 1]}
            };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            oZapFlash = createSprite(oSpriteSheet, "zap", (oSpriteZapFlash.width / 2) / 7, 0, oSpriteZapFlash.width / 7, oSpriteZapFlash.height);
            oZapFlash.x = iXPos;
            oZapFlash.y = iYPos;
            s_oStage.addChild(oZapFlash);

            oZapFlash.on("animationend", this.destroyZapFlash, null, true, oZapFlash);

            if (_iCombo > 1) {
                var oCombo;
                oCombo = new createjs.Text(TEXT_COMBO+" " + _iCombo, 50 + "px " + PRIMARY_FONT, "#ffcc00");
                oCombo.textAlign = "center";
                oCombo.textBaseline = "alphabetic";
                if (iXPos > CANVAS_WIDTH / 2) {
                    oCombo.x = iXPos - 130;
                } else {
                    oCombo.x = iXPos + 150;
                }
                oCombo.y = iYPos;
                s_oStage.addChild(oCombo);
                createjs.Tween.get(oCombo).to({y: oCombo.y - 200, alpha: 0}, 1500).call(function () {
                    s_oStage.removeChild(oCombo);
                    oCombo = null;
                });
                playSound("combo",1,false);
            }
            playSound("shot",1,false);
        }

        if (iScore === 0) {
            return;
        }
        var oScore;
        var fMultiplier = Math.round(_fMultiplier * 100) / 100;
        if (iType < 9) {
            if (iScore > 0) {
                if (_fMultiplier < 1.1) {
                    oScore = new createjs.Text("+" + iScore, 72 + "px " + PRIMARY_FONT, "#ffcc00");
                }
                else
                {
                    oScore = new createjs.Text("+" + Math.floor(iScore) + "x" + fMultiplier,  72 + "px " + PRIMARY_FONT, "#ffcc00");
                }
            }
        }
        else
        {
            oScore = new createjs.Text("+X" + iScore,  72 + "px " + PRIMARY_FONT, "#ffcc00");
        }
        oScore.textAlign = "center";
        oScore.textBaseline = "alphabetic";
        oScore.x = iXPos;
        oScore.y = iYPos;
        s_oStage.addChild(oScore);
        createjs.Tween.get(oScore).to({y: oScore.y - 200, alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(oScore);
            oScore = null;
        });

    };

    this.alienDamage = function (iType) {
        if (iType < 9) {
            _iCombo = 1;
            _iLife -= ALIENS_DAMAGE;
            _oInterface.refreshLifeBar(_iLife);

            var oFadeRed;

            oFadeRed = new createjs.Shape();
            oFadeRed.graphics.beginFill("red").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            oFadeRed.alpha = 0;

            s_oStage.addChild(oFadeRed);

            createjs.Tween.get(oFadeRed).to({alpha: 0.5}, 200).to({alpha: 0}, 200).call(function () {
                s_oStage.removeChild(oFadeRed);
                oFadeRed = null;
            });

            playSound("energy_lost",1,false);

            if (_iLife <= 0) {
                _bPause = true;
                this.gameOver();
            }
        }
        else
        {
            _fMultiplier = 1;
            _iCombo = 1;
            //ASTRONAUTS
        }

    };

    this.destroyZapFlash = function (evt, oZap) {
        s_oStage.removeChild(oZap);
        oZap = null;
    };

    this.destoyKaboom = function (evt, oKaboom) {
        s_oStage.removeChild(oKaboom);
        oKaboom = null;
    };

    this.destroyFromAlienArray = function (iID) {
        _aAlien[iID].unload();
        _aAlien.splice(iID, 1);
        _iNum_Of_Alien_Spawned = _aAlien.length;
        for (var i = 0; i < _iNum_Of_Alien_Spawned; i++) {
            _aAlien[i].resetTheIndex(i);
        }
    };

    this.destroyFromBonusArray = function (iID) {
        _aBonus[iID].unload();
        _aBonus.splice(iID, 1);
        _iNum_Of_Bonus_Spawned = _aBonus.length;
        for (var i = 0; i < _iNum_Of_Bonus_Spawned; i++) {
            _aBonus[i].resetTheIndex(i);
        }

    };

    this.setAlienState = function (szState) {
        for (var i = 0; i < _iNum_Of_Alien_Spawned; i++) {
            if (_aAlien[i].getInfoData("Type") < 9) {
                _aAlien[i].setState(szState);
            }
        }
        _szState = szState;
    };

    this.getRandomAlienCoord = function () {
        var iRandX = Math.floor(Math.random() * CANVAS_WIDTH);
        if (iRandX > CANVAS_WIDTH - SPAWN_RANGE_MIN_X) {
            iRandX = SPAWN_RANGE_MAX_X;
        }
        if (iRandX < CANVAS_WIDTH - SPAWN_RANGE_MAX_X) {
            iRandX = SPAWN_RANGE_MIN_X;
        }
        return iRandX;
    };

    this.gameOver = function () {
        var oSpriteGameOver = s_oSpriteLibrary.getSprite("game_over_panel");
    
        playSound("game_over_theme", 1, false);
    
        _oGameOverPanel = createBitmap(oSpriteGameOver);
        _oGameOverPanel.x = 0;
        _oGameOverPanel.y = 0;
        _oGameOverPanel.alpha = 0;
        s_oStage.addChild(_oGameOverPanel);
    
        _oGameOverText = new CTLText(s_oStage, 
            CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT / 2 - 90, 300, 120, 
            40, "center", "#ffffff", PRIMARY_FONT, 1,
            0, 0,
            TEXT_GAME_OVER,
            true, true, true,
            false 
        );
    
        createjs.Tween.get(_oGameOverText.getText()).to({ alpha: 1 }, 1200, createjs.Ease.cubicIn);
        createjs.Tween.get(_oGameOverPanel).to({ alpha: 1 }, 1200, createjs.Ease.cubicIn).call(function () {
            var oSpriteContinue = s_oSpriteLibrary.getSprite('but_restart');
            _oButMenu = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 + 250, oSpriteContinue);
            _oButMenu.addEventListener(ON_MOUSE_DOWN, s_oGame.onExit, this);
        });
    
        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].block(true);
        }
    
        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].block(false);
        }
    
        // Save the final score when the game is over
        saveScoreToFirebase(_iScore);
    
        _bPause = true;
        $(s_oMain).trigger("share_event", _iScore);
    };
    

    this.onExit = function () {

        s_oGame.unload();
        s_oMain.gotoMenu();

        $(s_oMain).trigger("end_level", _iLevel, _iScore);
        $(s_oMain).trigger("end_session", _iScore);
        $(s_oMain).trigger("show_interlevel_ad");
    };

    this.unload = function () {
        if (_oButMenu !== undefined) {
            _oButMenu.unload();
            _oButMenu = null;
        }

        _oGameOverPanel = null;
        _oGameOverText = null;
        _oInterface.unload();
        _oSettingsLevel.unload();

        for (var i = 0; i < _aAlien.length; i++) {
            _aAlien[i].unload();
        }

        for (var i = 0; i < _aBonus.length; i++) {
            _aBonus[i].unload();
        }

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();

    };

    this.update = function () {
        if (_bPause === false) {
            if (_iTimeElapsed < 0) {
                _bPause = true;
                for (var i = 0; i < _aAlien.length; i++) {
                    _aAlien[i].block(true);
                }
                for (var i = 0; i < _aBonus.length; i++) {
                    _aBonus[i].block(true);
                }
                _iLevel++;
                _oInterface.missionComplete(_iScore, _aSpriteAlien, _iLevel, _aHitAlienNum, _oPercGoodHit);
            } else {
                var iFPS = createjs.Ticker.framerate;
                _iTimeElapsed -= 1 / iFPS;
                _oInterface.refreshTime(_iTimeElapsed);
                for (var i = 0; i < _iNum_Of_Alien_Spawned; i++) {
                    _aAlien[i].update();
                }
                for (var j = 0; j < _iNum_Of_Bonus_Spawned; j++) {
                    _aBonus[j].update();
                }
                if (_bAssaultActive === true) {
                    _iTimeForAssault -= 1 / iFPS;
                    if (_iTimeForAssault <= 0) {
                        _bAssaultActive = false;
                        this.setOccurance(ALIEN_OCCURENCE_PER_LEVEL[_iLevel]);
                        _oInterface.refreshBonusToggleAssault(false);
                    }
                }
                if (_bSpeedDown === true) {
                    _iTimeForSpeedDown -= 1 / iFPS;
                    if (_iTimeForSpeedDown <= 0) {
                        _bSpeedDown = false;
                        this.speedDown(false);
                        _oInterface.refreshBonusToggleSpeedDown(false);
                    }
                }
                if (_bHordeActive === true) {
                    _iTimeForEvilHorde -= 1 / iFPS;
                    if (_iTimeForEvilHorde <= 0) {
                        _bHordeActive = false;
                        this.setAlienOccuranceStep(1);
                        this.setOccurance(ALIEN_OCCURENCE_PER_LEVEL[_iLevel]);
                        _oInterface.refreshBonusToggleEvilHorde(false);
                    }
                }
                if (_bPigMode === true) {
                    _iTimeForPigMode -= 1 / iFPS;
                    if (_iTimeForPigMode <= 0) {
                        _bPigMode = false;
                        this.setAlienState("normal");
                        var oSpriteBgNormal = s_oSpriteLibrary.getSprite(_szLevelBg);
                        this.setBackGround(oSpriteBgNormal);
                        _oInterface.refreshBonusTogglePigMode(false);
                    }
                }
                _iCounterUpdate += _iAlienOccurenceStep;
                if (_iCounterUpdate > _iRandTimeSpawnAlien) {
                    _iCounterUpdate = 0;
                    this.setRandomTimeAlien();
                    this.spawnAlien();
                }
            }
        }
    };

    s_oGame = this;

    ALIENS_SETTINGS = [];
    for (var i = 0; i < TYPES_OF_ALIENS; i++) {
        ALIENS_SETTINGS[i] = new Array();
    }

    ALIENS_SETTINGS[0][0] = oData.score_alien0;
    ALIENS_SETTINGS[0][1] = oData.speed_alien0;

    ALIENS_SETTINGS[1][0] = oData.score_alien1;
    ALIENS_SETTINGS[1][1] = oData.speed_alien1;

    ALIENS_SETTINGS[2][0] = oData.score_alien2;
    ALIENS_SETTINGS[2][1] = oData.speed_alien2;

    ALIENS_SETTINGS[3][0] = oData.score_alien3;
    ALIENS_SETTINGS[3][1] = oData.speed_alien3;

    ALIENS_SETTINGS[4][0] = oData.score_alien4;
    ALIENS_SETTINGS[4][1] = oData.speed_alien4;

    ALIENS_SETTINGS[5][0] = oData.score_alien5;
    ALIENS_SETTINGS[5][1] = oData.speed_alien5;

    ALIENS_SETTINGS[6][0] = oData.score_alien6;
    ALIENS_SETTINGS[6][1] = oData.speed_alien6;

    ALIENS_SETTINGS[7][0] = oData.score_alien7;
    ALIENS_SETTINGS[7][1] = oData.speed_alien7;

    ALIENS_SETTINGS[8][0] = oData.score_alien8;
    ALIENS_SETTINGS[8][1] = oData.speed_alien8;

    ALIENS_SETTINGS[9][0] = oData.score_alien9;
    ALIENS_SETTINGS[9][1] = oData.speed_alien9;

    ALIENS_SETTINGS[10][0] = oData.score_alien10;
    ALIENS_SETTINGS[10][1] = oData.speed_alien10;

    ALIENS_SETTINGS[11][0] = oData.score_alien11;
    ALIENS_SETTINGS[11][1] = oData.speed_alien11;

    TIME_TO_SUBTRACT = oData.bonus_time;
    TIME_FOR_ASTRONAUT_ASSAULT = oData.time_astronaut_assault;
    TIME_FOR_SPEED_DOWN = oData.time_speed_down;
    TIME_FOR_EVIL_HORDE = oData.time_evil_horde;
    TIME_FOR_PIG_MODE = oData.time_pig_mode;

    ALIENS_DAMAGE = oData.aliens_damage;

    MAX_BONUS_BOUNCE = oData.max_bonus_bounces;

    BONUS_SPEED = oData.bonus_speed;

    NUM_WAVES_FOR_ADS = oData.num_waves_for_ads;

    this._init();
}

var s_oGame;
