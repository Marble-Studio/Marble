function CBonusPanel(){
    var _bUpdate;
    var _bSpriteLoaded = false;
    var _iCurMult;
    var _iCurBet;
    var _iMaskWidth;
    var _iMaskHeight;
    var _iCurResources;
    var _iTotResources;
    var _iTotWin;
    var _aPosXCannonsPortrait;
    var _aPosXCannonsLandscape;
    var _aBonusSeq;
    var _aButtons;
    var _oMaskPreloader;
    var _oListenerBlock;
    var _pStartPosScore;
    var _pStartPosHit;

    var _oMultAmountText;
    var _oContainerScore;
    var _oContainerHit;
    var _oBgController;
    var _oBgLoading;
    var _oLoadingText;
    var _oProgressBar;
    var _oResultPanel;
    var _oScoreText = null;
    var _oHitCounterText;
    var _oContainerCannons;
    var _oBlock;
    var _oContainer;
    
    this._init = function(){
        _bUpdate = false;
        _bSpriteLoaded = true;

        _aPosXCannonsPortrait = [0,450,820];
        _aPosXCannonsLandscape = [0,600,1120];
        _oContainer.removeAllChildren();
        _oContainer.visible = false;
        
        _oBgController = new CBonusBg(_oContainer);

        var oShip = createBitmap(s_oSpriteLibrary.getSprite("ship_bonus_0"));
        oShip.y = 1248;
        _oContainer.addChild(oShip);
        
        var oShip1 = createBitmap(s_oSpriteLibrary.getSprite("ship_bonus_1"));
        oShip1.y = 20;
        _oContainer.addChild(oShip1);
        
        var oShip2 = createBitmap(s_oSpriteLibrary.getSprite("ship_bonus_2"));
        oShip2.x = 310;
        oShip2.y = 1098;
        _oContainer.addChild(oShip2);

        _oContainerCannons = new createjs.Container();
        _oContainerCannons.x = CANVAS_WIDTH/2-80;
        _oContainerCannons.y = CANVAS_HEIGHT/2+400;
        _oContainer.addChild(_oContainerCannons);
        
        this._initCannonButtons();
        
        
        _pStartPosHit = {x:20,y:20};
        _oContainerHit = new createjs.Container();
        _oContainerHit.x = _pStartPosHit.x;
        _oContainerHit.y = _pStartPosHit.y;
        _oContainer.addChild(_oContainerHit);
        
        var oSpriteHit = s_oSpriteLibrary.getSprite("hit_counter");
        var oBgHit = createBitmap(oSpriteHit);
        _oContainerHit.addChild(oBgHit);
        
        _oHitCounterText = new CTLText(_oContainerHit, 	
                    102, 106, 45, 32, 	
                    32, "center", "#dab977", FONT_GAME_1, 1,	
                    0, 0,	
                    "x0",	
                    true, true, false,	
                    false );	
        
        var oSpriteScoreBg = s_oSpriteLibrary.getSprite("amount_bonus_win");
        _pStartPosScore = {x:CANVAS_WIDTH-20,y:20};
        _oContainerScore = new createjs.Container();
        _oContainerScore.x = _pStartPosScore.x;
        _oContainerScore.y = _pStartPosScore.y;
        _oContainerScore.regX = oSpriteScoreBg.width;
        _oContainer.addChild(_oContainerScore);
        
        
        var oBgScore = createBitmap(oSpriteScoreBg);
        _oContainerScore.addChild(oBgScore);
        
        _oMultAmountText = new CTLText(_oContainerScore, 	
                    40, 28, oSpriteScoreBg.width-80, 80, 	
                    56, "center", "#dab977", FONT_GAME_1, 1,	
                    0, 0,	
                    formatEntries(0),	
                    true, true, false,	
                    false );	

        
        _oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oBlock.on("click",function(){});
        _oContainer.addChild(_oBlock);
        
        this.refreshButtonPos();
        
        this._startBonus();
    };
    
    this._loadAllResources = function(){
        _oContainer = new createjs.Container();
        s_oAttachSection.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bg_loading_bonus');
        _oBgLoading = createBitmap(oSprite);
        _oContainer.addChild(_oBgLoading);
        
        var oSpriteBonus = s_oSpriteLibrary.getSprite("bg_loading_bonus_text");
        var oTextBonus = createBitmap(oSpriteBonus);
        oTextBonus.x = CANVAS_WIDTH/2;
        oTextBonus.y = CANVAS_HEIGHT/2;
        oTextBonus.regX = oSpriteBonus.width/2;
        oTextBonus.regY = oSpriteBonus.height/2;
        _oContainer.addChild(oTextBonus);
        
        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
       _oProgressBar  = createBitmap(oSprite);
       _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width/2);
       _oProgressBar.y = CANVAS_HEIGHT/2 + 210;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = oSprite.width;
       _iMaskHeight = oSprite.height;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1,_iMaskHeight);
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       
        _oLoadingText = new createjs.Text("0%","30px "+FONT_GAME_1, "#dab977");
        _oLoadingText.x = CANVAS_WIDTH/2;
        _oLoadingText.y = CANVAS_HEIGHT/2 +200;
        _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);

        s_oSpriteLibrary.init( this._onResourceBonusLoaded,this._onAllImagesLoaded, this );
        
        //LOAD BONUS SPRITES
        s_oSpriteLibrary.addSprite("bg_bonus","./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("enemy_ship","./sprites/bonus/enemy_ship.png");
        s_oSpriteLibrary.addSprite("enemy_ship_fire","./sprites/bonus/enemy_ship_fire.png");
        s_oSpriteLibrary.addSprite("enemy_ship_hit","./sprites/bonus/enemy_ship_hit.png");
        s_oSpriteLibrary.addSprite("ship_seaboard","./sprites/bonus/ship_seaboard.png");
        s_oSpriteLibrary.addSprite("fog","./sprites/bonus/fog.png");
        for(var k=0;k<5;k++){
            s_oSpriteLibrary.addSprite("waves_"+k,"./sprites/bonus/waves-"+k+".png");
        }
        s_oSpriteLibrary.addSprite("splash","./sprites/bonus/splash.png");
        s_oSpriteLibrary.addSprite("ship_bonus_0","./sprites/bonus/ship_bonus_0.jpg");
        s_oSpriteLibrary.addSprite("ship_bonus_1","./sprites/bonus/ship_bonus_1.png");
        s_oSpriteLibrary.addSprite("ship_bonus_2","./sprites/bonus/ship_bonus_2.png");
        s_oSpriteLibrary.addSprite("but_fire","./sprites/bonus/but_fire.png");
        s_oSpriteLibrary.addSprite("hit_counter","./sprites/bonus/hit_counter.png");
        s_oSpriteLibrary.addSprite("enemy_pirate","./sprites/bonus/enemy_pirate.png");
        
        for(var i=0;i<3;i++){
            var iFinalIndex = 6;
            if(i===0){
                iFinalIndex = 7;
            }
            for(var t=0;t<iFinalIndex;t++){
                s_oSpriteLibrary.addSprite("cannon_"+i+"_"+t,"./sprites/bonus/cannons/cannon_"+i+"-"+t+".png");
            }
        }
        
        _iCurResources = 0;
       
        _iTotResources = s_oSpriteLibrary.getNumSprites() ;
        if(_iTotResources === 0){
            this._startBonus();
        }else{
            s_oSpriteLibrary.loadSprites();
        }
    };
    
    // CALLBACK FOR LOADED RESOURCES
    this._onResourceBonusLoaded = function(){
        _iCurResources++;
        var iPerc = Math.floor(_iCurResources/_iTotResources *100);
        _oLoadingText.text = iPerc+"%";
        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth,_iMaskHeight);
        
        if(_iCurResources === _iTotResources){
           this._init();
        }
    };

    
    this.unload = function(){
        _oBlock.off("click",_oListenerBlock);
        for(var i=0;i<_aButtons.length;i++){
            _aButtons[i].unload();
        }
    };
    
    this._onAllImagesLoaded = function(){
    };
    
    this.reset = function(){
        _oBgController.reset();
        _oMultAmountText.refreshText(formatEntries(0));

        if(_oScoreText !== null){
            _oScoreText.unload();
            _oScoreText = null;
        }
    };
    
    this.refreshButtonPos = function(){
        if(_aPosXCannonsLandscape === undefined){
            return;
        }
        
        if(_oContainerScore !== undefined){
            _oContainerScore.x = _pStartPosScore.x - s_iOffsetX;
            _oContainerScore.y = _pStartPosScore.y + s_iOffsetY;
        }
        
        _oContainerHit.x = _pStartPosHit.x+s_iOffsetX;
        _oContainerHit.y = _pStartPosHit.y+s_iOffsetY;
        
        if(s_bLandscape){
            for(var k=0;k<_aPosXCannonsLandscape.length;k++){
                _aButtons[k].setX(_aPosXCannonsLandscape[k]);
            }
            _oContainerCannons.x = CANVAS_WIDTH/2-130;
            _oContainerCannons.scale = 1;
        }else{
            for(var k=0;k<_aPosXCannonsPortrait.length;k++){
                _aButtons[k].setX(_aPosXCannonsPortrait[k]);
            }
            
            _oContainerCannons.x = CANVAS_WIDTH/2-80;
            _oContainerCannons.scale = 0.9;
        }
        
        _oContainerCannons.regX = _oContainerCannons.getBounds().width/2;
        _oContainerCannons.regY = _oContainerCannons.getBounds().height;
    };
    
    this.show = function(aBonusSeq,iCurBet){
        _iCurBet = iCurBet;
        _aBonusSeq = aBonusSeq;
        
        
        if(_bSpriteLoaded){
            this._startBonus();
        }else{
            this._loadAllResources();
        }
    };
    
    this.hide = function(){
        _bUpdate = false;
        stop("bonus_soundtrack");
        
        _oBgController.endBonus();
        _oContainer.visible = false;

        this.reset();
        s_oGame.exitFromBonus(_iTotWin);

    };
    
    this._startBonus = function(){
        this.refreshButtonPos();
        
        _iTotWin = 0;
        
       _oHitCounterText.refreshText("x"+_aBonusSeq.length);
        _oBgController.startBonus();
        _oContainer.visible = true;
        _bUpdate = true;
        this.enableAllButtons();
        
        playSound("bonus_soundtrack",1,true);
    };
    
    this.endBonus = function(){
        _oResultPanel = new CBonusResultPanel(_iTotWin,_oContainer);

        playSound("end_bonus",1,false);
    };
    
    this._initCannonButtons = function(){
            //SPRITESHEET CANNONS
            var aSpriteSheet = new Array();

            _aButtons = new Array();        
            
            
            var aFrames = [
                            [
                                [1, 1, 537, 470, 0, -109, -177],
                                [540, 1, 572, 488, 0, -86, -181],
                                [1114, 1, 659, 691, 0, -18, -47],
                                [1, 694, 637, 702, 0, -36, -30],
                                [640, 694, 652, 698, 0, -21, -23],
                                [1294, 694, 639, 580, 0, -26, -137],
                                [1, 1398, 622, 585, 0, -38, -133],
                                [625, 1398, 583, 566, 0, -75, -128],
                                [1210, 1398, 565, 552, 0, -90, -126],
                                [1, 1, 549, 539, 1, -102, -124],
                                [552, 1, 541, 529, 1, -108, -122],
                                [1095, 1, 537, 527, 1, -109, -120],
                                [1, 542, 537, 529, 1, -109, -118],
                                [540, 542, 537, 530, 1, -109, -117],
                                [1079, 542, 537, 534, 1, -109, -113],
                                [1, 1078, 537, 534, 1, -109, -113],
                                [540, 1078, 537, 537, 1, -109, -110],
                                [1079, 1078, 537, 540, 1, -109, -107],
                                [1, 1, 537, 540, 2, -109, -107],
                                [540, 1, 537, 541, 2, -109, -106],
                                [1079, 1, 537, 544, 2, -109, -103],
                                [1, 547, 537, 547, 2, -109, -100],
                                [540, 547, 537, 547, 2, -109, -100],
                                [1079, 547, 537, 550, 2, -109, -97],
                                [1, 1099, 537, 553, 2, -109, -94],
                                [540, 1099, 537, 555, 2, -109, -92],
                                [1079, 1099, 537, 557, 2, -109, -90],
                                [1, 1, 537, 559, 3, -109, -88],
                                [540, 1, 537, 560, 3, -109, -87],
                                [1079, 1, 537, 562, 3, -109, -85],
                                [1, 565, 537, 564, 3, -109, -83],
                                [540, 565, 537, 566, 3, -109, -81],
                                [1079, 565, 537, 567, 3, -109, -80],
                                [1, 1134, 537, 567, 3, -109, -80],
                                [540, 1134, 537, 569, 3, -109, -78],
                                [1079, 1134, 537, 571, 3, -109, -76],
                                [1, 1, 537, 572, 4, -109, -75],
                                [540, 1, 537, 572, 4, -109, -75],
                                [1079, 1, 537, 574, 4, -109, -73],
                                [1, 577, 537, 575, 4, -109, -72],
                                [540, 577, 537, 576, 4, -109, -71],
                                [1079, 577, 537, 578, 4, -109, -69],
                                [1, 1157, 537, 580, 4, -109, -67],
                                [540, 1157, 537, 581, 4, -109, -66],
                                [1079, 1157, 537, 585, 4, -109, -62],
                                [1, 1, 537, 588, 5, -109, -59],
                                [540, 1, 537, 590, 5, -109, -57],
                                [1079, 1, 537, 592, 5, -109, -55],
                                [1, 595, 537, 595, 5, -109, -52],
                                [540, 595, 537, 597, 5, -109, -50],
                                [1079, 595, 537, 600, 5, -109, -47],
                                [1, 1197, 537, 603, 5, -109, -44],
                                [540, 1197, 537, 606, 5, -109, -41],
                                [1079, 1197, 537, 607, 5, -109, -40],
                                [1, 1, 537, 609, 6, -109, -38],
                                [540, 1, 537, 612, 6, -109, -35],
                                [1079, 1, 537, 611, 6, -109, -36],
                                [1, 615, 537, 612, 6, -109, -35],
                                [540, 615, 537, 612, 6, -109, -35],
                                [1079, 615, 537, 603, 6, -109, -44],
                                [1, 1229, 537, 594, 6, -109, -53],
                                [540, 1229, 537, 540, 6, -109, -107]
                            ],
                        
                            [
                                [1, 1, 477, 471, 0, -89, -178],
                                [480, 1, 471, 490, 0, -101, -182],
                                [953, 1, 523, 698, 0, -82, -45],
                                [1478, 1, 525, 711, 0, -80, -29],
                                [1, 714, 517, 702, 0, -73, -22],
                                [520, 714, 511, 586, 0, -72, -135],
                                [1033, 714, 509, 590, 0, -82, -131],
                                [1, 1418, 521, 570, 0, -73, -127],
                                [524, 1418, 511, 556, 0, -77, -125],
                                [1037, 1418, 502, 543, 0, -83, -123],
                                [1541, 1418, 475, 531, 0, -107, -121],
                                [1, 1, 500, 531, 1, -105, -118],
                                [503, 1, 500, 532, 1, -105, -117],
                                [1005, 1, 500, 534, 1, -105, -115],
                                [1507, 1, 500, 537, 1, -105, -112],
                                [1, 540, 500, 538, 1, -105, -111],
                                [503, 540, 500, 541, 1, -105, -108],
                                [1005, 540, 500, 542, 1, -105, -107],
                                [1507, 540, 500, 544, 1, -105, -105],
                                [1, 1086, 500, 545, 1, -105, -104],
                                [503, 1086, 500, 547, 1, -105, -102],
                                [1005, 1086, 500, 551, 1, -105, -98],
                                [1507, 1086, 500, 551, 1, -105, -98],
                                [1, 1, 500, 554, 2, -105, -95],
                                [503, 1, 500, 557, 2, -105, -92],
                                [1005, 1, 500, 557, 2, -105, -92],
                                [1507, 1, 500, 560, 2, -105, -89],
                                [1, 563, 500, 563, 2, -105, -86],
                                [503, 563, 500, 564, 2, -105, -85],
                                [1005, 563, 500, 566, 2, -105, -83],
                                [1507, 563, 500, 567, 2, -105, -82],
                                [1, 1132, 500, 569, 2, -105, -80],
                                [503, 1132, 500, 569, 2, -105, -80],
                                [1005, 1132, 500, 571, 2, -105, -78],
                                [1507, 1132, 500, 572, 2, -105, -77],
                                [1, 1, 500, 574, 3, -105, -75],
                                [503, 1, 500, 575, 3, -105, -74],
                                [1005, 1, 500, 576, 3, -105, -73],
                                [1507, 1, 500, 577, 3, -105, -72],
                                [1, 580, 500, 578, 3, -105, -71],
                                [503, 580, 500, 579, 3, -105, -70],
                                [1005, 580, 500, 581, 3, -105, -68],
                                [1507, 580, 500, 584, 3, -105, -65],
                                [1, 1166, 500, 585, 3, -105, -64],
                                [503, 1166, 500, 587, 3, -105, -62],
                                [1005, 1166, 500, 592, 3, -105, -57],
                                [1507, 1166, 500, 594, 3, -105, -55],
                                [1, 1, 500, 595, 4, -105, -54],
                                [503, 1, 500, 599, 4, -105, -50],
                                [1005, 1, 500, 600, 4, -105, -49],
                                [1507, 1, 500, 603, 4, -105, -46],
                                [1, 606, 500, 607, 4, -105, -42],
                                [503, 606, 500, 609, 4, -105, -40],
                                [1005, 606, 500, 611, 4, -105, -38],
                                [1507, 606, 500, 613, 4, -105, -36],
                                [1, 1221, 500, 614, 4, -105, -35],
                                [503, 1221, 500, 614, 4, -105, -35],
                                [1005, 1221, 500, 614, 4, -105, -35],
                                [1507, 1221, 500, 614, 4, -105, -35],
                                [1, 1, 500, 606, 5, -105, -43],
                                [1, 609, 500, 597, 5, -105, -52],
                                [1, 1208, 500, 543, 5, -105, -106]
                            ],
                            
                            [
                                [1, 1, 513, 471, 0, -82, -176],
                                [516, 1, 512, 487, 0, -101, -180],
                                [1030, 1, 641, 687, 0, -52, -43],
                                [1, 690, 655, 704, 0, -38, -26],
                                [658, 690, 653, 702, 0, -13, -18],
                                [1313, 690, 528, 582, 0, -112, -133],
                                [1, 1396, 524, 588, 0, -98, -128],
                                [527, 1396, 510, 570, 0, -112, -124],
                                [1039, 1396, 512, 556, 0, -96, -122],
                                [1, 1, 509, 544, 1, -89, -119],
                                [512, 1, 494, 533, 1, -101, -117],
                                [1008, 1, 495, 531, 1, -100, -116],
                                [1505, 1, 495, 533, 1, -100, -114],
                                [1, 547, 495, 535, 1, -100, -112],
                                [498, 547, 495, 539, 1, -100, -108],
                                [995, 547, 495, 539, 1, -100, -108],
                                [1492, 547, 495, 541, 1, -100, -106],
                                [1, 1090, 495, 544, 1, -100, -103],
                                [498, 1090, 495, 545, 1, -100, -102],
                                [995, 1090, 495, 546, 1, -100, -101],
                                [1492, 1090, 495, 549, 1, -100, -98],
                                [1, 1, 495, 551, 2, -100, -96],
                                [498, 1, 495, 552, 2, -100, -95],
                                [995, 1, 495, 555, 2, -100, -92],
                                [1492, 1, 495, 558, 2, -100, -89],
                                [1, 561, 495, 559, 2, -100, -88],
                                [498, 561, 495, 561, 2, -100, -86],
                                [995, 561, 495, 564, 2, -100, -83],
                                [1492, 561, 495, 565, 2, -100, -82],
                                [1, 1128, 495, 567, 2, -100, -80],
                                [498, 1128, 495, 568, 2, -100, -79],
                                [995, 1128, 495, 570, 2, -100, -77],
                                [1492, 1128, 495, 571, 2, -100, -76],
                                [1, 1, 495, 572, 3, -100, -75],
                                [498, 1, 495, 574, 3, -100, -73],
                                [995, 1, 495, 576, 3, -100, -71],
                                [1492, 1, 495, 576, 3, -100, -71],
                                [1, 579, 495, 576, 3, -100, -71],
                                [498, 579, 495, 578, 3, -100, -69],
                                [995, 579, 495, 579, 3, -100, -68],
                                [1492, 579, 495, 580, 3, -100, -67],
                                [1, 1161, 495, 583, 3, -100, -64],
                                [498, 1161, 495, 585, 3, -100, -62],
                                [995, 1161, 495, 585, 3, -100, -62],
                                [1492, 1161, 495, 589, 3, -100, -58],
                                [1, 1, 495, 593, 4, -100, -54],
                                [498, 1, 495, 594, 4, -100, -53],
                                [995, 1, 495, 596, 4, -100, -51],
                                [1492, 1, 495, 600, 4, -100, -47],
                                [1, 603, 495, 602, 4, -100, -45],
                                [498, 603, 495, 604, 4, -100, -43],
                                [995, 603, 495, 608, 4, -100, -39],
                                [1492, 603, 495, 611, 4, -100, -36],
                                [1, 1216, 495, 612, 4, -100, -35],
                                [498, 1216, 495, 613, 4, -100, -34],
                                [995, 1216, 495, 616, 4, -100, -31],
                                [1492, 1216, 495, 615, 4, -100, -32],
                                [1, 1, 495, 616, 5, -100, -31],
                                [498, 1, 495, 616, 5, -100, -31],
                                [1, 619, 495, 607, 5, -100, -40],
                                [498, 619, 495, 598, 5, -100, -49],
                                [1, 1228, 495, 545, 5, -100, -102]
                            ]
                        
            ];
            
            var aButFirePos = [{x:300,y:420},{x:300,y:420},{x:360,y:420}]
            for(var i=0;i<3;i++){
                var aSprites = new Array();
                
                var iFinalIndex = 6;
                if(i===0){
                    iFinalIndex = 7;
                }
            
                for(var k=0;k<iFinalIndex;k++){
                    aSprites.push(s_oSpriteLibrary.getSprite("cannon_"+i+"_"+k))
                }
                var oData = {   // image to use
                        "images": aSprites,
                        "framerate": 35,
                        "frames": aFrames[i],

                        animations: {  
                                        idle: 0,anim:[0,61,"idle"]
                                    }
                };
                aSpriteSheet[i] = new createjs.SpriteSheet(oData);
                
                var oButton = new CBonusBut(i,aSpriteSheet[i],s_bLandscape?_aPosXCannonsLandscape[i]:_aPosXCannonsPortrait[i],0,aButFirePos[i],_oContainerCannons);
                oButton.addEventListener(ON_MOUSE_UP,this._onButtonRelease,this);
                oButton.addEventListener(ON_CANNON_ANIM_END,this._onCannonAnimEnd,this);
                
                _aButtons.push(oButton);
            }
        
    };

    
    this._disableAllButtons = function(){
        for(var k=0;k<_aButtons.length;k++){
            _aButtons[k].setButVisible(false);
        }
        
        _oBlock.visible = true;
    };
    
    this.enableAllButtons = function(){
        for(var k=0;k<_aButtons.length;k++){
            _aButtons[k].setButVisible(true);
        }
        
        _oBlock.visible = false;
    };
    
    this.refreshScoreAmount = function(){
        _oMultAmountText.refreshText(formatEntries(_iTotWin));
    };
    
    this._onButtonRelease = function(iIndex){
        s_oBonusPanel._disableAllButtons();
        playSound("bonus_game_cannon_fire",1,false);

        _iCurMult = _aBonusSeq.shift();
        _aButtons[iIndex].playAnim();
        _oHitCounterText.refreshText("x"+_aBonusSeq.length);
    };
    
    this._checkHit = function(){
        if(_iCurMult>0){
            _oBgController.hitShip(_iCurMult);
        }else{
            _oBgController.missShip();
        }
    };
    
    this._onCannonAnimEnd = function(){
        _iTotWin += _iCurMult;
        s_oBonusPanel.refreshScoreAmount();
        
        s_oBonusPanel._checkHit();
    };
    
    this.checkEndBonus = function(){
        if(_aBonusSeq.length === 0){
            this.endBonus();
        }else{

            s_oBonusPanel.enableAllButtons();
        }
    };
    
    s_oBonusPanel = this;
}


var s_oBonusPanel = null;