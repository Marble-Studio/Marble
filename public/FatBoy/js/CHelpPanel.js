function CHelpPanel(){
    var _oBg;

    var _oLabelText;
    var _oLabelText1;
    var _oScoreText;
    var _oScoreText1;
    var _oContainer;
    var _oTweenContainer;
    var _oParent = this;
    var _fScale = 1;
    this._init = function(){
        _oContainer = new createjs.Container();
        var _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.8;
        s_oStage.addChild(_oHitArea);
        s_oStage.addChild(_oContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        _oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(_oBg);
        _oBg.y = -100;
        
        _oTweenContainer = new createjs.Container();
        
        _oLabelText1 = new CTLText(_oContainer, 
                    oSpriteBg.width/2 - 250, 0, 500, 300, 
                    56, "center", "#5d2519", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );
                    
  

        _oLabelText1.setOutline(8);

        
        _oLabelText = new CTLText(_oContainer, 
                    oSpriteBg.width/2 - 250, 0, 500, 300, 
                    56, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );

        
        var dataSheet = { images: [s_oSpriteLibrary.getSprite("coin")],
                          frames: {width: 132, height: 102 ,regY:120/2, regX: 93/2},
                          animations : {
                                        coin0 : [0, 7],
                                        coin1 : [8, 15],
                                        coin2 : [16, 23],
                                        coin3 : [24, 31],
                                        coin4 : [32, 39],
                                       }
                        };
        var spriteSheet = new createjs.SpriteSheet(dataSheet);
        var oSpriteCoin = new createjs.Sprite(spriteSheet, "coin0");
        oSpriteCoin.x = 240;
        oSpriteCoin.y = 380;
        oSpriteCoin.scaleX = oSpriteCoin.scaleY = 1.4;
        _oContainer.addChild(oSpriteCoin);
        
        _oScoreText = new createjs.Text("+100", "90px " + PRIMARY_FONT, "#fff");
        _oScoreText1 = new createjs.Text("+100", "90px " + PRIMARY_FONT, "#5d2519");
         _oScoreText.textAlign = "center";
        _oTweenContainer.x = _oContainer.getBounds().width/2 + 30;
        _oTweenContainer.y = 350;
        _oScoreText.lineWidth = 500;
        _oScoreText.lineHeight = 50;
        _oScoreText1.textAlign = "center";
        
        _oScoreText1.lineWidth = 500;
        _oScoreText1.lineHeight = 50;
        _oScoreText1.outline = 8;
        _oTweenContainer.addChild(_oScoreText1);
        _oTweenContainer.addChild(_oScoreText);
        
        
        
     
        
        _oContainer.addChild(_oTweenContainer);
        
        _oContainer.x = CANVAS_WIDTH/2 - _oBg.getBounds().width/2;
        _oContainer.y = - _oContainer.getBounds().height;
        this.show();
        
        _oHitArea.on("pressup", function ()
        {
                  new createjs.Tween.get(_oContainer).to({y: -_oContainer.getBounds().height}, 1000, createjs.Ease.cubicOut);
                  s_oStage.removeChild(_oHitArea);
                  s_oGame.togglePause();
 
        }
          ) ;
       
        
    };
    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oTweenContainer).to({scaleX: _fScale * 0.9, scaleY: _fScale * 0.9}, 850, createjs.Ease.quadOut).to({scaleX: _fScale, scaleY: _fScale}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
    };
    this.unload = function()
    {
    };
    
    this.show = function ()
    {
      	new createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2 - _oBg.getBounds().height/2}, 500, createjs.Ease.cubicOut);
  
    };
    
   
    
    this._init();
}