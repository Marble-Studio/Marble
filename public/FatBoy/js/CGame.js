function CGame(oData) {
    var _bPause;
    var _bCamOnCharacter;
    var _bCanJump;
    var _bScrollGameContainer = true;
    var _bGameStarted = false;
    
    var _oInterface;
    var _oPlanetManager;
    var _oCharacter;
    var _oStarsManager;
    var _oCamTween = null;
    var _oBgParallax;

    var _aWalls;
    var _aParallaxes;

    var _iPlanetsLand;
    var _iCurrentPlanetIndex = 0;
    var _iTappingTime;
    var _iScore;

    this._init = function ()
    {
        
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME );
        s_oGameContainer = new createjs.Container();
        _aParallaxes = [];
        _oBgParallax = new CParallax("bg_game_", 2,false, true,s_oStage, 80);
        _aParallaxes.push(_oBgParallax);
        _oCloudParallax = new CParallax("cloud_0",5,true,false,s_oStage, 60, true);
        _oCloudParallax.setMoltiplier(-0.5);
        _oCloudParallax2 = new CParallax("cloud_1",5,true,false,s_oStage, 80, true);
        _oCloudParallax2.setMoltiplier(2);
        _aParallaxes.push(_oCloudParallax);
        _aParallaxes.push(_oCloudParallax2);

        _oPlanetManager = new CPlanetManager();
        _oCharacter = new CCharacter(500, CANVAS_HEIGHT - 600, s_oSpriteLibrary.getSprite("character"));
        _bPause = true;
        _iTappingTime = 0;
        _bCamOnCharacter = false;
        _bCanJump = false;
        _iPlanetsLand = 0;
        _iScore = 0;
        _aWalls = new Array();
        direction = 1;
        x = 0;
        for (var i = 0; i < 2; i++) {
            oWall = new CWall(x, 0, direction);
            _aWalls.push(oWall);
            x = CANVAS_WIDTH;
            direction = -1;
        }
        
        s_oStage.addChild(s_oGameContainer);
                        

        _oInterface = new CInterface();
_oStarsManager = new CStarManager();

    };



    this.unload = function () {


        _oInterface.unload();
        s_oStage.removeAllChildren();

        s_oGame = null;
    };
    this.restart = function ()
    {
        _oInterface.unload();
        s_oStage.removeAllChildren();
        this._init();
    };

    this.togglePause = function ()
    {
        _bPause = !_bPause;
    }
    
    this.gameOver = function (){
        _bPause = true;
 
        
        
        $(s_oMain).trigger("save_score", _iScore);

        if (_iScore >= this.getBestScore()) {
            saveItem(SCORE_ITEM_NAME, _iScore);
            s_iBestScore = _iScore;
            playSound("win", 0.1,false);
            setVolume("soundtrack", 0);
        }else{
           playSound("lose", 0.1);
            setVolume("soundtrack", 0);
        }
        
        _oInterface.gameOver();
    };

    this.increaseScore = function ()
    {
        _iScore += 100;
        _oInterface.refreshScore(_iScore);
    };
    this.getScore = function ()
    {
        return _iScore;
    };
    this.getBestScore = function ()
    {
        if (getItem(SCORE_ITEM_NAME) !== null && getItem(SCORE_ITEM_NAME) !== undefined)
        {
            return getItem(SCORE_ITEM_NAME);
        }
        return 0;
    };
    this.onExit = function () {
        setVolume("soundtrack", 1);

        s_oGame.unload();
        s_oMain.gotoMenu();

        $(s_oMain).trigger("end_session");

        $(s_oMain).trigger("show_interlevel_ad");
    };

    this.getCollidables = function ()
    {
        return _oPlanetManager.getArray();
    };
    this.getParallaxArray = function ()
    {
      return _aParallaxes;  
    };
    this.releaseScreen = function () {

        _oCharacter.jump(_iTappingTime);
        _bCamOnCharacter = false;
        _bGameStarted = true;
        _iTappingTime = 0;
    };
    this.cameraFollowCharacter = function ()
    {
        if (!_bCamOnCharacter)
        {
            if (_oCamTween !== null)
            {
                createjs.Tween.removeTweens(s_oGameContainer);
            }
            _bScrollGameContainer = false;
            _bCanJump = false;
            seconds = 1;
            time = FPS * seconds;
            var y = CANVAS_HEIGHT - s_oCharacter.getY() - 200;
            _oCamTween = new createjs.Tween.get(s_oGameContainer, {useTicks: true})
                    .to({y: y}, time, createjs.Ease.cubicInOut)
                    .call(function () {
                        _oCamTween = null;
                        _bScrollGameContainer = true;
                    });
             
             
             for (var i = 0; i < _aParallaxes.length; i++) {
                var y = _aParallaxes[i].getContainer().y + _aParallaxes[i].getIncrement();
                new createjs.Tween.get(_aParallaxes[i].getContainer(), {useTicks: true})
                    .to({y: y}, time, createjs.Ease.cubicInOut)
            }
                        _bCamOnCharacter = true;


        }

    };

    this.handleStars = function ()
    {

        if (_iPlanetsLand === 5)
        {
            nextPlanet = _iCurrentPlanetIndex + 2;
            lastPlanetIndex = _oPlanetManager.getLastPlanetIndex();
            planetOne = ((nextPlanet) > _oPlanetManager.getArray().length - 1 && nextPlanet !== lastPlanetIndex) ? 0 : nextPlanet;
            planetTwo = (planetOne > _oPlanetManager.getArray().length - 2) ? 0 : planetOne + 1;
            _oStarsManager.spawnStars(_oPlanetManager.getArray()[planetOne], _oPlanetManager.getArray()[planetTwo]);
            _iPlanetsLand = 0;

        }
    };
    this.update = function () {
        if (!_bPause)
        {
            
            for (var i = 0; i < _aParallaxes.length; i++) {
                _aParallaxes[i].update();
            }
                            _oStarsManager.update();

            for (var j = 0; j < PHYSICS_ITERATION; j++) {


                if( !_oCharacter.update() ){
                    return;
                }
                _oPlanetManager.update();
                _aWalls[0].update();
                _aWalls[1].update();
                this.handleStars();
                for (var i = 0; i < _oPlanetManager.getArray().length; i++) {


                    iHeroX = _oCharacter.getX();
                    iHeroY = _oCharacter.getY();
                    iPlanetX = _oPlanetManager.getArray()[i].getX();
                    iPlanetY = _oPlanetManager.getArray()[i].getY();
                    iHeroRadius = _oCharacter.getRadius();
                    iPlanetRadius = _oPlanetManager.getArray()[i].getRadius();
                    iPlanetRotation = _oPlanetManager.getArray()[i].getRotationValue();
                    iMaxDistance = (iHeroRadius + iPlanetRadius) * (iHeroRadius + iPlanetRadius);
                    distance = distanceBetween2Points(iHeroX, iHeroY, iPlanetX, iPlanetY);

                    if (distance < iMaxDistance)
                    {
                        _oCharacter.onPlanet(_oPlanetManager.getArray()[i]);
                        
                        if (_iCurrentPlanetIndex !== i)
                        {
                            _iCurrentPlanetIndex = i;
                            _iPlanetsLand++;
                        }
                        
                            if (_bScrollGameContainer)
                        {
                            if (_bGameStarted)
                            {
                            createjs.Tween.removeTweens(s_oGameContainer);
                            s_oGameContainer.y += 5 / PHYSICS_ITERATION;
                        }
                        }
                            this.cameraFollowCharacter();
                    }

                }

            }
        }


    };
    s_oGame = this;
    this._init();
}
var s_oGame;
var s_oGameContainer;
