function CEndPanel(iScore) {
    var _oBg;
    var _oFade;
    var _oButExit;
    var _oButRestart;
    var _oScoreText;
    var _oScoreOutline;
    var _oBestScoreText;
    var _oBestScoreOutline;
    var _oLabelText;
    var _oLabelOutline;
    var _oThis;

    var _oContainer;
    var _oFadeContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oFadeContainer = new createjs.Container();
        s_oStage.addChild(_oFadeContainer);
        s_oStage.addChild(_oContainer);
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oBg = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        _oFadeContainer.addChild(_oFade);
        _oFade.on("mousedown", function (){})
        _oContainer.addChild(_oBg);
 
        
        _oScoreOutline = new CTLText(_oContainer, 
                    _oContainer.getBounds().width / 2-250, 370, 500, 56, 
                    56, "center", "#5d2519", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_YOUR_SCORE + ":  " + s_oGame.getScore(),
                    true, true, false,
                    false );
        
        _oScoreOutline.setOutline(8);
        
        _oScoreText = new CTLText(_oContainer, 
                    _oContainer.getBounds().width / 2-250, 370, 500, 56, 
                    56, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_YOUR_SCORE + ":  " + s_oGame.getScore(),
                    true, true, false,
                    false );
                    


     
        
        _oBestScoreOutline = new CTLText(_oContainer, 
                    _oContainer.getBounds().width / 2-250, 430, 500, 56,
                    56, "center", "#5d2519", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BEST_SCORE + ":  " + s_oGame.getBestScore(),
                    true, true, false,
                    false );
        
        _oBestScoreOutline.setOutline(8);
        
        _oBestScoreText =  new CTLText(_oContainer, 
                    _oContainer.getBounds().width / 2-250, 430, 500, 56, 
                    56, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BEST_SCORE + ":  " + s_oGame.getBestScore(),
                    true, true, false,
                    false );
                    
                    
        var rand = randomIntBetween(0, GAME_WIN_LABELS.length -1);
        
        _oLabelOutline = new CTLText(_oContainer, 
                     _oContainer.getBounds().width / 2-250, -80, 500, 140, 
                    140, "center", "#5d2519", PRIMARY_FONT, 1,
                    0, 0,
                    GAME_WIN_LABELS[rand],
                    true, true, false,
                    false );
        
        _oLabelOutline.setOutline(10);
                    
        _oLabelText = new CTLText(_oContainer, 
                     _oContainer.getBounds().width / 2-250, -80, 500, 140, 
                    140, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    GAME_WIN_LABELS[rand],
                    true, true, false,
                    false );


        



        var dataSheet = {images: [s_oSpriteLibrary.getSprite("character")],
            frames: {width: 144, height: 144, regY: 144 / 2, regX: 144 / 2},
            animations: {
                idle: [0, 29]
            }
        };
        var spriteSheet = new createjs.SpriteSheet(dataSheet);
        _oSpriteContainer = new createjs.Container();
        _oSprite = new createjs.Sprite(spriteSheet, "idle");
        _oCloud = createBitmap(s_oSpriteLibrary.getSprite("cloud_0"))
        _oSpriteContainer.x = _oContainer.getBounds().width / 2;
        _oSpriteContainer.y = 180;
        _oCloud.x = _oSprite.x - 130;
        _oCloud.y = _oSprite.y + 50;
        _oSpriteContainer.addChild(_oSprite);
        _oSpriteContainer.addChild(_oCloud);
        
        _oSpriteContainer.scaleX = _oSpriteContainer.scaleY = 1.3;
        _oContainer.addChild(_oSpriteContainer);




        _oButExit = new CGfxButton(180, 600, s_oSpriteLibrary.getSprite('but_home'), _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);


        _oButRestart = new CGfxButton(490, 600, s_oSpriteLibrary.getSprite('but_restart'), _oContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        _oContainer.x = CANVAS_WIDTH / 2 - _oBg.getBounds().width/2;
        _oContainer.y = -_oContainer.getBounds().height - 90;

    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;

        _oButRestart.unload();
        _oButRestart = null;

        s_oStage.removeChild(_oContainer);
        s_oStage.removeChild(_oFadeContainer);
    };
    this.show = function ()
    {
        new createjs.Tween.get(_oFade).to({alpha: 0.8}, 1000);
        new createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2 - _oBg.getBounds().height/2}, 1000, createjs.Ease.bounceOut);
        _oScoreText.refreshText(TEXT_YOUR_SCORE + " : " + s_oGame.getScore());
        _oScoreOutline.refreshText(TEXT_YOUR_SCORE + " : " + s_oGame.getScore());
        _oBestScoreText.refreshText(TEXT_BEST_SCORE + " : " + s_iBestScore);
        _oBestScoreOutline.refreshText(TEXT_BEST_SCORE + " : " + s_iBestScore);
        
        if (s_oGame.getBestScore() <= s_oGame.getScore())
        {
            var rand = randomIntBetween(0, GAME_WIN_LABELS.length -1);
            _oLabelText.refreshText(GAME_WIN_LABELS[rand]);
            _oLabelOutline.refreshText(GAME_WIN_LABELS[rand]);
        }
        else
        {
            var rand = randomIntBetween(0, GAME_OVER_LABELS.length -1);
            _oLabelText.refreshText(GAME_OVER_LABELS[rand]);
            _oLabelOutline.refreshText(GAME_OVER_LABELS[rand]); 
        }

    };

    this._onExit = function () {
        _oThis.unload();
        s_oGame.onExit();
    };

    this._onRestart = function () {
        _oThis.unload();
        s_oGame.restart();
    };

    _oThis = this;
    this._init(iScore);
}