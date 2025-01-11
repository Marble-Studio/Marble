function CBonusBg(oParentContainer){
    var _iStartY;
    var _iFinalY;
    var _aPossibleHitPoint;
    var _aPossibleMissPoint;
    var _aJumpingEnemyPos;
    var _aParticles;
    var _aFireSfx;
    
    var _oWaves;
    var _oContainerShip;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(){

        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("#2658b0").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oContainer.addChild(oFade);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('bg_bonus');
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);
        
        _oContainerShip = new createjs.Container();
        _oContainerShip.x = CANVAS_WIDTH/2;
        _oContainerShip.y = 1296;
        _oContainer.addChild(_oContainerShip);
        
        var oSpriteEnemy = s_oSpriteLibrary.getSprite("enemy_ship");
        var oShip = createBitmap(oSpriteEnemy);
        _oContainerShip.addChild(oShip);
        
        _oContainerShip.regX = oSpriteEnemy.width/2;
        _oContainerShip.regY = oSpriteEnemy.height;
        
        var oSeaFog = createBitmap(s_oSpriteLibrary.getSprite("ship_seaboard"));
        oSeaFog.x = 658;
        oSeaFog.y = 1225;
        _oContainer.addChild(oSeaFog);
        
        var oFog = createBitmap(s_oSpriteLibrary.getSprite("fog"));
        oFog.y = 594;
        _oContainer.addChild(oFog);
        
        var aSprites = new Array();
        for(var k=0;k<5;k++){
            aSprites.push(s_oSpriteLibrary.getSprite("waves_"+k));
        }
        
        var oData = {   // image to use
                        images:aSprites, 
                        framerate:40,
                        "frames": [
                                    [1, 1, 960, 129, 0, 0, -6],
                                       [963, 1, 960, 129, 0, 0, -6],
                                       [1, 132, 960, 129, 0, 0, -6],
                                       [963, 132, 960, 129, 0, 0, -6],
                                       [1, 263, 960, 129, 0, 0, -6],
                                       [963, 263, 960, 129, 0, 0, -6],
                                       [1, 394, 960, 129, 0, 0, -6],
                                       [963, 394, 960, 129, 0, 0, -6],
                                       [1, 525, 960, 129, 0, 0, -6],
                                       [963, 525, 960, 129, 0, 0, -6],
                                       [1, 656, 960, 129, 0, 0, -6],
                                       [963, 656, 960, 129, 0, 0, -6],
                                       [1, 787, 960, 129, 0, 0, -6],
                                       [963, 787, 960, 129, 0, 0, -6],
                                       [1, 918, 960, 129, 0, 0, -6],
                                       [963, 918, 960, 129, 0, 0, -6],
                                       [1, 1049, 960, 129, 0, 0, -6],
                                       [963, 1049, 960, 129, 0, 0, -6],
                                       [1, 1180, 960, 129, 0, 0, -6],
                                       [963, 1180, 960, 129, 0, 0, -6],
                                       [1, 1311, 960, 129, 0, 0, -6],
                                       [963, 1311, 960, 129, 0, 0, -6],
                                       [1, 1442, 960, 129, 0, 0, -6],
                                       [963, 1442, 960, 129, 0, 0, -6],
                                       [1, 1573, 960, 129, 0, 0, -6],
                                       [963, 1573, 960, 129, 0, 0, -6],
                                       [1, 1704, 960, 129, 0, 0, -6],
                                       [963, 1704, 960, 129, 0, 0, -6],
                                       [1, 1835, 960, 129, 0, 0, -6],
                                       [963, 1835, 960, 129, 0, 0, -6],
                                       [1, 1, 960, 129, 1, 0, -6],
                                       [963, 1, 960, 129, 1, 0, -6],
                                       [1, 132, 960, 129, 1, 0, -6],
                                       [963, 132, 960, 129, 1, 0, -6],
                                       [1, 263, 960, 129, 1, 0, -6],
                                       [963, 263, 960, 129, 1, 0, -6],
                                       [1, 394, 960, 129, 1, 0, -6],
                                       [963, 394, 960, 129, 1, 0, -6],
                                       [1, 525, 960, 129, 1, 0, -6],
                                       [963, 525, 960, 129, 1, 0, -6],
                                       [1, 656, 960, 129, 1, 0, -6],
                                       [963, 656, 960, 129, 1, 0, -6],
                                       [1, 787, 960, 129, 1, 0, -6],
                                       [963, 787, 960, 129, 1, 0, -6],
                                       [1, 918, 960, 129, 1, 0, -6],
                                       [963, 918, 960, 129, 1, 0, -6],
                                       [1, 1049, 960, 129, 1, 0, -6],
                                       [963, 1049, 960, 129, 1, 0, -6],
                                       [1, 1180, 960, 129, 1, 0, -6],
                                       [963, 1180, 960, 129, 1, 0, -6],
                                       [1, 1311, 960, 129, 1, 0, -6],
                                       [963, 1311, 960, 129, 1, 0, -6],
                                       [1, 1442, 960, 129, 1, 0, -6],
                                       [963, 1442, 960, 129, 1, 0, -6],
                                       [1, 1573, 960, 129, 1, 0, -6],
                                       [963, 1573, 960, 129, 1, 0, -6],
                                       [1, 1704, 960, 129, 1, 0, -6],
                                       [963, 1704, 960, 129, 1, 0, -6],
                                       [1, 1835, 960, 129, 1, 0, -6],
                                       [963, 1835, 960, 129, 1, 0, -6],
                                       [1, 1, 960, 129, 2, 0, -6],
                                       [963, 1, 960, 129, 2, 0, -6],
                                       [1, 132, 960, 129, 2, 0, -6],
                                       [963, 132, 960, 129, 2, 0, -6],
                                       [1, 263, 960, 129, 2, 0, -6],
                                       [963, 263, 960, 129, 2, 0, -6],
                                       [1, 394, 960, 129, 2, 0, -6],
                                       [963, 394, 960, 129, 2, 0, -6],
                                       [1, 525, 960, 129, 2, 0, -6],
                                       [963, 525, 960, 129, 2, 0, -6],
                                       [1, 656, 960, 129, 2, 0, -6],
                                       [963, 656, 960, 129, 2, 0, -6],
                                       [1, 787, 960, 129, 2, 0, -6],
                                       [963, 787, 960, 129, 2, 0, -6],
                                       [1, 918, 960, 129, 2, 0, -6],
                                       [963, 918, 960, 129, 2, 0, -6],
                                       [1, 1049, 960, 129, 2, 0, -6],
                                       [963, 1049, 960, 129, 2, 0, -6],
                                       [1, 1180, 960, 129, 2, 0, -6],
                                       [963, 1180, 960, 129, 2, 0, -6],
                                       [1, 1311, 960, 129, 2, 0, -6],
                                       [963, 1311, 960, 129, 2, 0, -6],
                                       [1, 1442, 960, 129, 2, 0, -6],
                                       [963, 1442, 960, 129, 2, 0, -6],
                                       [1, 1573, 960, 129, 2, 0, -6],
                                       [963, 1573, 960, 129, 2, 0, -6],
                                       [1, 1704, 960, 129, 2, 0, -6],
                                       [963, 1704, 960, 129, 2, 0, -6],
                                       [1, 1835, 960, 129, 2, 0, -6],
                                       [963, 1835, 960, 129, 2, 0, -6],
                                       [1, 1, 960, 129, 3, 0, -6],
                                       [963, 1, 960, 129, 3, 0, -6],
                                       [1, 132, 960, 129, 3, 0, -6],
                                       [963, 132, 960, 129, 3, 0, -6],
                                       [1, 263, 960, 129, 3, 0, -6],
                                       [963, 263, 960, 129, 3, 0, -6],
                                       [1, 394, 960, 129, 3, 0, -6],
                                       [963, 394, 960, 129, 3, 0, -6],
                                       [1, 525, 960, 129, 3, 0, -6],
                                       [963, 525, 960, 129, 3, 0, -6],
                                       [1, 656, 960, 129, 3, 0, -6],
                                       [963, 656, 960, 129, 3, 0, -6],
                                       [1, 787, 960, 129, 3, 0, -6],
                                       [963, 787, 960, 129, 3, 0, -6],
                                       [1, 918, 960, 129, 3, 0, -6],
                                       [963, 918, 960, 129, 3, 0, -6],
                                       [1, 1049, 960, 129, 3, 0, -6],
                                       [963, 1049, 960, 129, 3, 0, -6],
                                       [1, 1180, 960, 129, 3, 0, -6],
                                       [963, 1180, 960, 129, 3, 0, -6],
                                       [1, 1311, 960, 129, 3, 0, -6],
                                       [963, 1311, 960, 129, 3, 0, -6],
                                       [1, 1442, 960, 129, 3, 0, -6],
                                       [963, 1442, 960, 129, 3, 0, -6],
                                       [1, 1573, 960, 129, 3, 0, -6],
                                       [963, 1573, 960, 129, 3, 0, -6],
                                       [1, 1704, 960, 129, 3, 0, -6],
                                       [963, 1704, 960, 129, 3, 0, -6],
                                       [1, 1835, 960, 129, 3, 0, -6],
                                       [963, 1835, 960, 129, 3, 0, -6],
                                       [1, 1, 960, 129, 4, 0, -6],
                                       [963, 1, 960, 129, 4, 0, -6],
                                       [1, 132, 960, 129, 4, 0, -6],
                                       [963, 132, 960, 129, 4, 0, -6],
                                       [1, 263, 960, 129, 4, 0, -6],
                                       [963, 263, 960, 129, 4, 0, -6],
                                       [1, 394, 960, 129, 4, 0, -6],
                                       [963, 394, 960, 129, 4, 0, -6],
                                       [1, 525, 960, 129, 4, 0, -6],
                                       [963, 525, 960, 129, 4, 0, -6],
                                       [1, 656, 960, 129, 4, 0, -6],
                                       [963, 656, 960, 129, 4, 0, -6],
                                       [1, 787, 960, 129, 4, 0, -6],
                                       [963, 787, 960, 129, 4, 0, -6],
                                       [1, 918, 960, 129, 4, 0, -6],
                                       [963, 918, 960, 129, 4, 0, -6],
                                       [1, 1049, 960, 129, 4, 0, -6],
                                       [963, 1049, 960, 129, 4, 0, -6]
                                ],
                        animations: {  start: 0,anim:[0,137] }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oWaves = createSprite(oSpriteSheet,"start");
        _oWaves.y = 1205;
        _oWaves.scale = 2;
        _oContainer.addChild(_oWaves);
        
        this.reset();
    };
    
    this.reset = function(){
        _iStartY = -250;
        _iFinalY = -150;
        
        createjs.Tween.removeTweens(_oContainer);
        createjs.Tween.removeTweens(_oContainerShip);
        _oContainer.y = _iStartY;
        _oContainerShip.y = 1296;
        _oContainerShip.rotation = -4;
        _oWaves.gotoAndStop("start");
        
        _aPossibleHitPoint = [{x:60,y:400},{x:140,y:420},{x:200,y:400},{x:260,y:420},{x:320,y:400},{x:360,y:400}];
        _aPossibleMissPoint = [{x:100,y:500},{x:140,y:500},{x:140,y:500},{x:200,y:500},{x:260,y:500}];
        _aJumpingEnemyPos = [{x:58,y:327,left:true,final_x:8,final_y:520,time_fall:800},{x:116,y:360,left:true,final_x:58,final_y:520,time_fall:800},
                                {x:327,y:410,left:false,final_x:377,final_y:520,time_fall:500},{x:170,y:400,left:true,final_x:150,final_y:520,time_fall:800},
                                {x:170,y:400,left:false,final_x:220,final_y:520,time_fall:800},{x:250,y:400,left:false,final_x:300,final_y:520,time_fall:800},
                                {x:250,y:400,left:true,final_x:200,final_y:520,time_fall:800}];
        
        _aPossibleHitPoint = shuffle(_aPossibleHitPoint);
        _aPossibleMissPoint = shuffle(_aPossibleMissPoint);
        _aJumpingEnemyPos = shuffle(_aJumpingEnemyPos);
        
        _aParticles = new Array();
        _aFireSfx = new Array();
    };
    
    this.startBonus = function(){
        _oWaves.gotoAndPlay("anim");
        _oContainer.on("click",function(){});
        
        createjs.Tween.get(_oContainer,{loop:-1}).to({y: _iFinalY}, 5500, createjs.Ease.sineInOut).to({y: _iStartY}, 5500, createjs.Ease.sineInOut);
        createjs.Tween.get(_oContainerShip,{loop:-1}).to({rotation: 4}, 8000, createjs.Ease.sineInOut).to({rotation: -4}, 8000, createjs.Ease.sineInOut);
    };
    
    this.endBonus = function(){
        _oContainer.off("click",function(){});
        for(var k=0;k<_aParticles.length;k++){
            _aParticles[k].unload();
        }
        
        for(var t=0;t<_aFireSfx.length;t++){
            _aFireSfx[t].stop();
        }
        
        this.reset();
    };
    
    this.hitShip = function(iPoint){
        var pPos = _aPossibleHitPoint.pop();
        var oParticle = new CHitShipEffect(pPos.x,pPos.y,_oContainerShip);
        _aParticles.push(oParticle);
        
        new CScoreText("+"+iPoint,pPos.x,pPos.y-150,_oContainerShip);
        
        if(Math.random()>0.5){
            setTimeout(function(){
                var oEnemyPos = _aJumpingEnemyPos.pop();
                new CJumpingEnemy(oEnemyPos,_oContainerShip);
            },1500);
        }
    };
    
    this.missShip = function(){
        var pPos = _aPossibleMissPoint.pop();
        
        var oParticle = new CMissShipEffect(pPos.x,pPos.y,true,_oContainerShip);
        
        
        new CScoreText(TEXT_MISS,pPos.x,pPos.y-150,_oContainerShip);
    };
    
    this._init();
}