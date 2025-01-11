function CStar (x,y)
{
    var _oSprite;
    var _oSpriteClone;
    var _iRadius;
    var _bCollision = false;

    this.init = function (x,y)
    {
        var dataSheet = { images: [s_oSpriteLibrary.getSprite("coin")],
                          frames: {width: 132, height: 102 ,regY:120/2, regX: 93/2},
                          animations : {
                                        coin0 : [0, 7],
                                        coin1 : [8, 15],
                                        coin2 : [16, 23],
                                        coin3 : [24, 31],
                                        coin4 : [32, 39]
                                       }
                        };
        var spriteSheet = new createjs.SpriteSheet(dataSheet);
        _oSprite = new createjs.Sprite(spriteSheet, "coin0");
        _oSpriteClone = new createjs.Sprite(spriteSheet, "coin0");
        _oSpriteClone.x = x;
        _oSpriteClone.y = y;
        _oSprite.x = x;
        _oSprite.y = y;
        _iRadius = _oSprite.getBounds().width/2;
        s_oGameContainer.addChild(_oSprite);
        s_oStage.addChild (_oSpriteClone);


    };
    this.spawn = function (x,y, index)
    {
        _oSprite.x = x;
        _oSprite.y = y; 
        _oSprite.alpha = 1;
        _oSprite.gotoAndPlay("coin"+index)
        _oSpriteClone.gotoAndPlay("coin"+index)
        _bCollision = false;

    };
    this.getX = function ()
    {
        return _oSprite.x;
    }
    
     this.getY = function ()
    {
        return _oSprite.y;
    }
    this.getRadius = function ()
    {
        return _iRadius;
    };
    this.getSprite = function ()
    {
      return _oSprite;  
    };
    this.onCharacterCollision = function ()
    {
        if (!_bCollision)
        {
            playSound("bite",1,false);
            var pt = s_oGameContainer.localToLocal(_oSprite.x, _oSprite.y, s_oStage);
            _oSpriteClone.x = pt.x;
            _oSpriteClone.y = pt.y;
            _oSpriteClone.alpha = 1;

            _oSprite.alpha = 0;

            s_oGame.increaseScore();
            var pt = {x: s_oInterface.getCollectorPos().x, y:s_oInterface.getCollectorPos().y};
            _bCollision = true;
            new createjs.Tween.get(_oSpriteClone).to({x: pt.x + 50, y : pt.y + 50, alpha:0.5}, 1000, createjs.Ease.sineOut).call(function () {_oSpriteClone.alpha = 0});
        }
    };
    
    this.init(x,y);
}