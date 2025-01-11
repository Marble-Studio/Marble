function CCharacter(iX, iY, oSprite)
{
    var _pStartPos;
    
    var _vPosition;
    var _vCurrForce;
    var _vGravity;
    var _vOnWallSlope;
    var _vWallDirection;
    
    var _oSprite;
    var _oSlideSprite;
    var _oCharacterContainer;
    var _oCurrPlanet;
    
    var _iRadius;
    var _iRadius2;
    var _iWidth;
    var _iHeight;
    var _iMoltiplier;
    var _iRotation;
    var _iSpeed;
    
    var _bOnPlanet = false;
    var _bOnAir = true;
    var _bOnWall = false;
    this.init = function (iX, iY, oSprite)
    {
        s_oCharacter = this;
        _pStartPos = {x: iX, y: iY};
        _vPosition = new CVector2(_pStartPos.x, _pStartPos.y);
        _vCurrForce = new CVector2(0,0);
        _vOnWallSlope = new CVector2(0,0.009);
        _vGravity = new CVector2(0,GRAVITY);
        _oCharacterContainer = new createjs.Container();
        _iMoltiplier = 0;
        _vWallDirection = new CVector2(0,0);
        var dataSheet = { images: [oSprite, s_oSpriteLibrary.getSprite("slide")],
                          frames: {width: 144, height: 144 ,regY:144/2, regX: 144/2},
                          animations : {
                                        idle : [0, 29],
                                        jump : [30,31, "air"],
                                        air : [32,38],
                                        slidedx : [39],
                                        slidesx : [40]
                                       }
                        };
        var spriteSheet = new createjs.SpriteSheet(dataSheet);
        _oSprite = new createjs.Sprite(spriteSheet, "idle");
      
       var dataSheet = { images: [s_oSpriteLibrary.getSprite("slide")],
                          frames: {width: 116, height: 134 ,regY:116/2, regX: 134/2},
                          animations : {
                                        sx : [0],
                                        dx : [1]
                                       }
                        };
        var spriteSheet = new createjs.SpriteSheet(dataSheet);
        _oSlideSprite = new createjs.Sprite(spriteSheet, "sx");
        _oCurrPlanet = null;
        _oCharacterContainer.x = iX;
        _oCharacterContainer.y = iY;
        _iWidth = dataSheet.frames.width;
        _iHeight = dataSheet.frames.height;
        _iSpeed = 2;
       _iRotation = 0;
       _oCharacterContainer.addChild(_oSprite);
       _oCharacterContainer.addChild(_oSlideSprite);
        _iRadius = _iWidth/2;
        _iRadius2 = _iRadius*_iRadius;
        s_oGameContainer.addChild(_oCharacterContainer);

    };
    
    this.getX = function ()
    {
        return _vPosition.getX();
    };
    this.getContainer = function ()
    {
      return _oCharacterContainer;  
    };
    this.getVectorPosition = function ()
    {
      return _vPosition;  
    };
    this.getCurrentPlanet = function ()
    {
      return _oCurrPlanet;  
    };
    this.update = function ()
    {
        var pt = s_oGameContainer.localToLocal(0,_vPosition.getY(),s_oStage);
        if (pt.y >CANVAS_HEIGHT + 450)
        {
            s_oGame.gameOver();
            return false;
        }
        if (_bOnAir)
        {
            _oCharacterContainer.rotation = 0;
            _oSlideSprite.visible = false;
            _oSprite.visible = true;

            _vCurrForce.addV(_vGravity);
            _vPosition.addV(_vCurrForce);
        }
        if (_bOnPlanet)
        {
            _oSprite.gotoAndPlay("idle");
            _oSlideSprite.visible = false;
            _oSprite.visible = true;

            var iRotation = _iRotation- 1.57;
            var x = _oCurrPlanet.getX() + Math.cos(iRotation)*(_iPlanetRadius + _iRadius);
          var y = _oCurrPlanet.getY() + Math.sin(iRotation)*(_iPlanetRadius + _iRadius);
          _oCharacterContainer.rotation +=  _iSpeed;
          _iRotation += (_iSpeed * Math.PI/180);
            _vPosition.set(x,y);
        }
        
        if (_bOnWall)
        {
            _oSprite.visible = false;
            _oSlideSprite.visible = true;
            _vCurrForce.addV(_vOnWallSlope);
            _vPosition.addV(_vCurrForce);
        }
          _oCharacterContainer.x = _vPosition.getX();
        _oCharacterContainer.y = _vPosition.getY();
        
        return true;
    };
        var _iPlanetRadius = 0;

    this.jump = function ()
    {
        
        if (_bOnPlanet)
        {    
        _vCurrForce.add(0, JUMP_FORCE);
        _oSprite.gotoAndPlay("air");
        playSound("swish",1,false);
        _vCurrForce.rotate( -_iRotation);
        _bOnAir = true;
        _bOnPlanet = false;
        _bOnWall = false;
        }
        if (_bOnWall)
        {
          _vCurrForce.set(0,-1);
          _vCurrForce.setV(reflectVectorV2(_vCurrForce, _vWallDirection));
          _vCurrForce.scalarProduct(WALL_JUMP_FORCE);
            _oCharacterContainer.rotation = Math.atan2(_vCurrForce.getY(), _vCurrForce.getX());
            setVolume("slide", 0.1);
          _bOnAir = true;
          _bOnWall = false;
        _bOnPlanet = false;

        }
    };
    this.onPlanet = function (oPlanet)
    {                
        
        if (!_bOnPlanet)
        {
        playSound("footstep",1,false);
        stopSound("swish",1,false);
        _oCurrPlanet = oPlanet;
        _vCurrForce.rotate(_iRotation * Math.PI / 180);
       _iRotation = -Math.atan2(oPlanet.getX() - _vPosition.getX(), oPlanet.getY() - _vPosition.getY());
       _iSpeed = oPlanet.getRotationSpeedValue();
         _iPlanetRadius = oPlanet.getRadius();
        _vCurrForce.set (0,0);
        _oCharacterContainer.rotation = _iRotation * 180/Math.PI;
        _bOnWall = false;
        _bOnAir = false;
        _bOnPlanet = true;
        
        }
     
    };
     this.onWall = function (oWall)
    {                
        if (!_bOnPlanet && !_bOnWall)
        {
        _vCurrForce.set (0,0);
       _vWallDirection.setV(oWall.getDirection());
       if (_vWallDirection.getX() < 0)
       {
            _oSlideSprite.gotoAndPlay("dx");
            _oSlideSprite.x = 20;
       }
       else
       {
        _oSlideSprite.gotoAndPlay("sx");
        _oSlideSprite.x = 0;


       }
        _vPosition.add(10 * _vWallDirection.getX(),0);
        _bOnAir = false;
        _bOnWall = true;
        _bOnPlanet = false;
            playSound("slide",1,false);

        }
     
    }
    this.getRadius = function ()
    {
      return _iRadius;  
    };
    this.getSquaredRadius = function ()
    {
      return _iRadius2;  
    };
    this.getY = function ()
    {
        return _vPosition.getY();
    };

    this.init(iX, iY, oSprite);
}
var s_oCharacter;