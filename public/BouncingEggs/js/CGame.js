function CGame(oData, iLevel) {
    var _pStartPointHeroesXLimit;

    var _bStartGame = true;
    var _iScore;
    var _iLevelScore;
    var _iLevel;
    var _iPlayerTeam;
    var _iInstantiatedItems;
    var _iLives;
    var _iSavedItems;
    var _iTarget;
    var _iGameState;
    var _iBonusInstances;
    var _oInterface;
    var _oBg;
    var _oPhysicsObject;
    var _oTarget;
    var _oStageMouseMove = null;
    var _oHeroes;
    var _oContainerGame;
    var _oRightWall;
    var _oLeftWall;

    var _aLinesField;
    var _aObject;
    var _aItem;
    var _aItemOccurrance;
    var _aResetItemYPos;
    var _aObstacle = null;
    var _aBonus;
    var _aBonusOccurance;

    var _fIntervalSpawn;
    var _fIntervalSpawnBonus;

    this._init = function () {
        $(s_oMain).trigger("start_session");
        
        _pStartPointHeroesXLimit = {min: HEROES_X_LIMIT.min, max: HEROES_X_LIMIT.max};

        _bStartGame = true;
        _iGameState = STATE_PLAY;
        _iScore = 0;
        _iLevelScore = 0;
        _iInstantiatedItems = 0;
        _iSavedItems = 0;
        _iTarget = 0;
        _iBonusInstances = 0;
        _iLives = LIVES;

        _iLevel = iLevel;
        $(s_oMain).trigger("start_level", _iLevel);
        _aItem = new Array();
        _aLinesField = new Array();
        _aObject = new Array();
        _aResetItemYPos = new Array();

        for (var i = 0; i < _iLevel; i++) {
            _iScore += s_aScores[i];
        }

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(_oBg);

        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);

        s_oPhysicsController = new CPhysicsController();
        _oPhysicsObject = new CPhysicsObject();

        _oPhysicsObject.createAContactListener();

        this._createTarget();

        this._createHeroes();

        this.createField();

        this.createLevel();
        
        var oSprite = s_oSpriteLibrary.getSprite("flowers");
        var oFg = createBitmap(oSprite);
        oFg.regX = oSprite.width/2;
        oFg.regY = oSprite.height;
        oFg.x = CANVAS_WIDTH/2;
        oFg.y = CANVAS_HEIGHT;
        s_oStage.addChild(oFg);
                
        _oInterface = new CInterface(iLevel);
        _oInterface.refreshLives(_iLives);
        _oInterface.refreshTarget(_iSavedItems, _iTarget);
        _oInterface.refreshLevel(_iLevel + 1);
        _oInterface.refreshScore(_iScore);

        if (_iLevel === 0) {
            _oInterface.createInteractiveHelp();
            _bStartGame = false;
            _iGameState = STATE_HELP;
        } else {
            this.activeEventListeners();
        }
    };

    this._createHeroes = function () {
        var oSpriteHeroes = s_oSpriteLibrary.getSprite("heroes");
        _oHeroes = new CHeroes(HEROES_START_POSITION.x, HEROES_START_POSITION.y, oSpriteHeroes, _oPhysicsObject.addRectangle(COLLISION_HEROES), _oContainerGame);
    };

    this._createTarget = function () {
        _oTarget = new CTarget(430, 505, _oPhysicsObject.addRectangle(COLLISION_TARGET), _oContainerGame);
    };

    this._createRandomOpponentTeamOrder = function () {
        var aTeam = new Array();
        var iID = 0;
        for (var i = 0; i < TOT_TEAM; i++) {
            if (_iPlayerTeam !== i) {
                aTeam[iID] = i;
                iID++;
            }
        }
        aTeam = shuffle(aTeam);
        return aTeam;
    };

    this.createField = function () {
        var aLevelDiagram = FIELD_DIAGRAM;
        var oSpriteEdge = s_oSpriteLibrary.getSprite("edge");
        for (var i = 0; i < aLevelDiagram.length; i++) {
            var oStartPos = aLevelDiagram[i][0];
            var oEndPos = aLevelDiagram[i][1];
            var iType = aLevelDiagram[i][2];

            _aLinesField[i] = _oPhysicsObject.addLine(0, 0, oStartPos, oEndPos, 0, WALL_DENSITY, WALL_FRICTION, WALL_RESTITUTION, iType);

            if (iType === RIGHT_WALL) {
                _oRightWall = new CSideWall(oStartPos.x, 0, oSpriteEdge, iType, i, _aLinesField[i], -oSpriteEdge.width, s_oStage);
            } else if (iType === LEFT_WALL) {
                _oLeftWall = new CSideWall(oEndPos.x, 0, oSpriteEdge, iType, i, _aLinesField[i], oSpriteEdge.width, s_oStage);//iXPos, iYPos, oSprite, iType, iID, oPhysics, oParentContainer
                _oLeftWall.setScaleX(-1);
            }
        }
    };

    this.refreshPositionSidesWalls = function (iNewX) {
        var oStartPosRWall = _oRightWall.getStartPos();
        var oStartPosLWall = _oLeftWall.getStartPos();

        _oRightWall.setPosition(oStartPosRWall.x - iNewX, oStartPosRWall.y);
        _oRightWall.setPositionPhysics(-iNewX, oStartPosRWall.y);

        _oLeftWall.setPosition(oStartPosLWall.x + iNewX, oStartPosLWall.y);
        _oLeftWall.setPositionPhysics(iNewX, oStartPosLWall.y);
    };

    this.refreshLimitHeroesX = function (iNewX) {
        _pStartPointHeroesXLimit.min = HEROES_X_LIMIT.min + iNewX;
        _pStartPointHeroesXLimit.max = HEROES_X_LIMIT.max - iNewX;
    };

    this.createLevel = function () {
        _aItemOccurrance = new Array();
        var iItemsInstanceNum = s_aLevelsDiagram[_iLevel].item_instance_level;
        var iItemTypeTot = s_aLevelsDiagram[_iLevel].item_spawn.length;
        var iID = 0;
        
        var oData = {
            images: [s_oSpriteLibrary.getSprite("eggs")],
            // width, height & registration point of each sprite
            frames: {width: 70, height: 88, regX: 35, regY: 44},
            animations: {type_0: 0, type_1: 1, type_2: 2, type_3: 3, type_4: 4, type_5: 5}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        for (var i = 0; i < iItemTypeTot; i++) {
            _aResetItemYPos[i] = -44;
            for (var j = 0; j < iItemsInstanceNum; j++) {
                _aItem[iID] = new CItem(-88, j * 110, oSpriteSheet, i, iID,
                _oPhysicsObject.addCircle(COLLISION_ITEM[i], iID), _oContainerGame);
                iID++;

            }
            for (var k = 0; k < s_aLevelsDiagram[_iLevel].item_spawn[i].occurance; k++) {
                _aItemOccurrance.push(i);
            }
        }

        _fIntervalSpawn = TIME_INTERVAL_SPAWN_ITEM;
        _iTarget = s_aLevelsDiagram[_iLevel].saved_items_target;

        if (s_aLevelsDiagram[_iLevel].object.length > 0) {
            this.createObstacle(s_aLevelsDiagram[_iLevel].object.length);
        }

        this.createBonus();
    };

    this.createObstacle = function (iTotObstacle) {
        _aObstacle = new Array();
        for (var i = 0; i < iTotObstacle; i++) {
            var oObstacleInfo = s_aLevelsDiagram[_iLevel].object[i];
            var oSpriteObstacle = s_oSpriteLibrary.getSprite("obstacle_" + oObstacleInfo.type);
            _aObstacle.push(new CObstacle(oObstacleInfo.x, oObstacleInfo.y, oSpriteObstacle, oObstacleInfo.type, i, oObstacleInfo.angle,
                    _oPhysicsObject.addObstacle(oObstacleInfo.x, oObstacleInfo.y, oObstacleInfo.angle,
                            OBSTACLES_COLLISION[oObstacleInfo.type]), _oContainerGame));
        }
    };

    this.createBonus = function () {
        _aBonus = new Array();
        _aBonusOccurance = new Array();
        var aBonusToLoad = s_aLevelsDiagram[_iLevel].bonus_spawn;
        for (var i = 0; i < aBonusToLoad.length; i++) {
            var oSpriteBonus = s_oSpriteLibrary.getSprite("bonus_" + aBonusToLoad[i].type);
            _aBonus.push(new CBonus(-oSpriteBonus.width, i * oSpriteBonus.height, oSpriteBonus, aBonusToLoad[i].type, i,
                    _oPhysicsObject.addCircle(COLLISION_BONUS[aBonusToLoad[i].type], i), _oContainerGame));
            for (var j = 0; j < aBonusToLoad[i].occurance; j++) {
                _aBonusOccurance.push(i);
            }
        }
        _fIntervalSpawnBonus = this.timeSpawn(s_aLevelsDiagram[_iLevel].bonus_spawn_time);
    };

    this.unload = function () {
        _bStartGame = false;

        _oInterface.unload();

        this.destroyPhysicsEngine();

        s_oStage.removeAllChildren();

        createjs.Tween.removeAllTweens();

        if (s_bMobile === false) {
            document.onkeydown = null;
            document.onkeyup = null;
        }
    };

    this.destroyPhysicsEngine = function () {

        s_oPhysicsController.destroyAllBody();
        s_oPhysicsController.destroyWorld();

        s_oPhysicsController = null;
    };

    this.onExit = function () {
        this.unload();
        this.deactiveEventListeners();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume("soundtrack", 1);
        s_oMain.gotoMenu();
    };

    this._onExitHelp = function () {
        _oInterface.unloadHelp();
        this.unpause(true);
        _iGameState = STATE_PLAY;
        this.activeEventListeners();
    };

    this.unpause = function (bVal) {
        _bStartGame = bVal;
        if (bVal === true) {
            this.activeEventListeners();
        } else {
            this.deactiveEventListeners();
        }
    };

    this.nextLevel = function () {
        _iLevel++;
        this.unloadLevel();
        this.createLevel();

        _oInterface.refreshLevel(_iLevel + 1);
        // this.resetScene();
        $(s_oMain).trigger("start_level", _iLevel);
    };

    this.unloadLevel = function () {
        for (var i = 0; i < _aItem.length; i++) {
            s_oPhysicsController.destroyBody(_aItem[i].getPhysics());
            _aItem[i].unload();
        }
        if (_aObstacle !== null) {
            for (var i = 0; i < _aObstacle.length; i++) {
                s_oPhysicsController.destroyBody(_aObstacle[i].getPhysics());
                _aObstacle[i].unload();
            }
        }
        for (var i = 0; i < _aBonus.length; i++) {
            s_oPhysicsController.destroyBody(_aBonus[i].getPhysics());
            _aBonus[i].unload();
        }
        _aItem = new Array();
        _aBonus = new Array();
        _aObstacle = null;
    };

    this.heroesTouchItem = function (oItem, oLocalPoint, iID) {
        _aItem[iID].setTouchHeroes(true);
        this.applyImpulseToItem(oItem, oLocalPoint);
        _oHeroes.animPlatform();
        playSound("bounce", 1, false);
    };

    this.applyImpulseToItem = function (oItem, oLocalPoint) {
        if (oLocalPoint.y > 0) {
            return;
        }

        s_oPhysicsController.setElementLinearVelocity(oItem, {x: 0, y: 0});
        s_oPhysicsController.setElementAngularVelocity(oItem, oLocalPoint.x * ITEMS_ANGULAR_IMPULSE);

        var fDirY = FORCE_HEROES_Y;
        var fDirX = oLocalPoint.x * FORCE_HEROES_X_MULTIPLIER;

        var oImpulse = new s_oBox2D.b2Vec2(fDirX,fDirY);
        s_oPhysicsController.applyImpulse(oItem, oImpulse);
    };

    this.itemOnFloor = function (iID) {
        this.addLife(-1);
        s_oPhysicsController.setElementLinearVelocity(_aItem[iID].getPhysics(), {x: 0, y: 0});
        _aItem[iID].animOnFloor();
        if (_iInstantiatedItems < 2) {
            _fIntervalSpawn = TIME_INTERVAL_SPAWN_ITEM;
        }
        playSound("lose_life", 1, false);
    };

    this.bonusDisapper = function (iID) {
        _aBonus[iID].animDisappear();
        //s_oPhysicsController.setElementLinearVelocity(_aBonus[iID].getPhysics(), {x: 0, y: 0});
    };

    this.bonusHeart = function () {
        this.addLife(1);
    };

    this.addLife = function (iVal) {
        _iLives += iVal;
        if (_iLives < 1) {
            this.lose();
        }
        var bEffect = false;
        if (iVal < 0) {
            bEffect = true;
        }
        _oInterface.refreshLives(_iLives, bEffect);
    };

    this.lose = function () {
        _oInterface.createLosePanel(_iSavedItems, _iTarget);
        _iGameState = STATE_FINISH;
        this.deactiveEventListeners();
        playSound("game_over", 1, false);
        
        $(s_oMain).trigger("end_level", _iLevel);
    };

    this.onContinue = function () {
        this.nextLevel();
        this.resetValues();
        this.activeEventListeners();
        _iGameState = STATE_PLAY;
    };

    this.won = function () {
        var bEnd = false;
        if (_iLevel >= s_aLevelsDiagram.length - 1) {
            bEnd = true;
        }
        _iScore += _iLevelScore;
        _oInterface.createWinPanel(_iSavedItems, _iTarget, _iScore, bEnd);
        this.saveProgress();
        _iGameState = STATE_FINISH;
        this.deactiveEventListeners();
        playSound("win", 1, false);
        $(s_oMain).trigger("end_level", _iLevel);
    };

    this.saveProgress = function () {
        if (s_iLastLevel < _iLevel + 2) {
            s_iLastLevel = _iLevel + 2;
        }

        if (_iLevelScore > s_aScores[_iLevel]) {
            s_aScores[_iLevel] = _iLevelScore;
        }

        saveItem("LevelReachedItem", s_iLastLevel);
        saveItem("ScoresItem", JSON.stringify(s_aScores));
    };

    this.itemInTarget = function (iID) {
        if (!_aItem[iID].getTouchHeroes()) {
            return;
        }

        var oVel = s_oPhysicsController.getElementVelocity(_aItem[iID].getPhysics());
        if (oVel.y < 0) {
            return;
        }

        playSound("basket", 1, false);

        _oTarget.animTarget();
       

        this.addScore(ITEM_SCORE[_aItem[iID].getType()]);

        _aItem[iID].setTouchHeroes(false);

        var iIDTarget = _oTarget.getChildIndexFront();
        _aItem[iID].spriteFollowPhysics(false);
        _aItem[iID].setChildIndex(iIDTarget);
        _aItem[iID].animInTarget();

        if (_iInstantiatedItems < 2) {
            _fIntervalSpawn = TIME_INTERVAL_SPAWN_ITEM;
        }

        _iSavedItems++;

        if (_iSavedItems === _iTarget) {
            this.won();
        }

        playSound("basket", 1, false);

        _oInterface.refreshTarget(_iSavedItems, _iTarget);
    };

    this.cachedItem = function (iID) {
        _aItem[iID].setCache(true);
        _aItem[iID].resetPos();
        _aItem[iID].setAlpha(1);
        _aItem[iID].setTouchHeroes(false);
        _iInstantiatedItems--;
    };

    this.cachedBonus = function (iID) {
        _aBonus[iID].setCache(true);
        _aBonus[iID].resetPos();
        _aBonus[iID].setAlpha(1);
        _iBonusInstances--;
    };

    this.activeEventListeners = function () {
        if (_oStageMouseMove === null) {
            _oStageMouseMove = s_oStage.on("stagemousemove", this.onHeroesMove);
        }
    };

    this.deactiveEventListeners = function () {
        s_oStage.off("stagemousemove", _oStageMouseMove);
        _oStageMouseMove = null;
    };

    this.addScore = function (iScore) {
        var iTot = _iScore;
        _iLevelScore += iScore;
        iTot += _iLevelScore;
        _oInterface.refreshScore(iTot);
    };

    this.cachedAllItem = function () {
        for (var i = 0; i < _aItem.length; i++) {
            this.cachedItem(i);
        }
    };

    this.cachedAllBonus = function () {
        for (var i = 0; i < _aBonus.length; i++) {
            this.cachedBonus(i);
        }
    };

    this.restartLevel = function () {
        this.resetScene();
    
        this.activeEventListeners();
        _iLives = LIVES;
        _oInterface.refreshLives(_iLives);
        $(s_oMain).trigger("restart_level", _iLevel);
        _iGameState = STATE_PLAY;
    };

    this.resetScene = function () {
        this.cachedAllItem();
        this.cachedAllBonus();
        this.resetValues();
    };

    this.resetValues = function () {
        _iSavedItems = 0;
        _iInstantiatedItems = 0;
        _iBonusInstances = 0;
        _fIntervalSpawn = TIME_INTERVAL_SPAWN_ITEM;

        _iLevelScore = 0;

        _oInterface.refreshScore(_iScore);
        _oInterface.refreshTarget(_iSavedItems, _iTarget);

    };

    this._onEnd = function () {
        this.onExit();
    };

    this.onHeroesMove = function () {
        if (s_oStage.mouseX <= _pStartPointHeroesXLimit.min) {
            _oHeroes.x = _pStartPointHeroesXLimit.min;
            return;
        } else if (s_oStage.mouseX >= _pStartPointHeroesXLimit.max) {
            _oHeroes.x = _pStartPointHeroesXLimit.max;
            return;
        }
        var fPrevX = _oHeroes.getX();
        _oHeroes.setPosition(s_oStage.mouseX, _oHeroes.getY());
        var fVelocity = Math.abs(fPrevX - _oHeroes.getX());
        _oHeroes.moveAnimation(fVelocity);
    };

    this.moveItems = function () {
        for (var i = 0; i < _aItem.length; i++) {
            if (!_aItem[i].isCached()) {
                _aItem[i].update();
            }
        }
    };

    this.moveBonus = function () {
        for (var i = 0; i < _aBonus.length; i++) {
            if (!_aBonus[i].isCached()) {
                _aBonus[i].update();
            }
        }
    };

    this.getRandomType = function (aVectorOccurance) {
        var iRandType = Math.floor(Math.random() * aVectorOccurance.length);
        return aVectorOccurance[iRandType];
    };

    this.spawnItems = function () {
        //console.log("_iSavedItems:" + _iSavedItems + "saved_items_target:" + s_aLevelsDiagram[_iLevel].saved_items_target);
        if (_iInstantiatedItems >= s_aLevelsDiagram[_iLevel].item_instance_level || _iSavedItems >= s_aLevelsDiagram[_iLevel].saved_items_target) {
            //numero max instanze pesci per tipo e controlla se il numero di pesci salvati sono minori dell' obiettivo
            return;
        }
        if (_fIntervalSpawn > 0) {
            _fIntervalSpawn -= FPS_TIME;
        } else {
            var iRandType = this.getRandomType(_aItemOccurrance);
            for (var j = 0; j < _aItem.length; j++) {
                if (_aItem[j].getType() === iRandType && _aItem[j].isCached() && _aItem[j].isAnim() === null) {
                    this.spawnItemInstance(j);
                    _fIntervalSpawn = this.timeSpawn(s_aLevelsDiagram[_iLevel].item_spawn[iRandType].time);
                    _iInstantiatedItems++;
                    break;
                }
            }
        }
    };

    this.spawnItemInstance = function (iID) {
        var iRandX = (Math.random() * (SPAWN_ITEMS_RANGE_X.max - SPAWN_ITEMS_RANGE_X.min)) + SPAWN_ITEMS_RANGE_X.min;
        var iIDTarget = _oHeroes.getChildIndex() + 1;
        _aItem[iID].setChildIndex(iIDTarget);
        _aItem[iID].setPosition(iRandX, _aResetItemYPos[0]);
        _aItem[iID].setCache(false);
        
        
    };

    this.timeSpawn = function (fTime) {
        var oTime = fTime;
        var fRandTime = (Math.random() * (oTime.max - oTime.min)) + oTime.min;
        
        return fRandTime;
    };

    this.spawnBonus = function () {
        if (_iBonusInstances >= MAX_BONUS_INSTANCES) {
            return;
        }
        if (_fIntervalSpawnBonus > 0) {
            _fIntervalSpawnBonus -= FPS_TIME;
        } else {
            var iRandType = this.getRandomType(_aBonusOccurance);
            for (var i = 0; i < _aBonus.length; i++) {
                if (_aBonus[i].getType() === iRandType && _aBonus[i].isCached()) {
                    this.spawnBonusInstance(i);
                    _fIntervalSpawnBonus = this.timeSpawn(s_aLevelsDiagram[_iLevel].bonus_spawn_time);
                    _iBonusInstances++;
                    return;
                }
            }
        }
    };

    this.spawnBonusInstance = function (iID) {
        var iRandX = (Math.random() * (SPAWN_ITEMS_RANGE_X.max - SPAWN_ITEMS_RANGE_X.min)) + SPAWN_ITEMS_RANGE_X.min;
        _aBonus[iID].setPosition(iRandX, _aResetItemYPos[0]);
        _aBonus[iID].setCache(false);
    };


    this._updatePlay = function () {
        if (_bStartGame) {
            this.moveItems();

            this.moveBonus();
            
            s_oPhysicsController.update();
            
            this.spawnItems();

            this.spawnBonus();
        }
    };

    this.update = function () {
        switch (_iGameState) {
            case STATE_PLAY:
                {
                    this._updatePlay();
                }
                break;
            case STATE_FINISH:

                break;
            case STATE_PAUSE:

                break;
        }
    };

    s_oGame = this;

    ITEM_SCORE = oData.egg_score;
    LIVES = oData.lives;
    BONUS_SCORE = oData.bonus_scores;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;

    this._init();
}

var s_oGame;