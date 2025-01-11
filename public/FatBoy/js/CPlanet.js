function CPlanet (x, y, size)
{
    var _oContainer;
    var _oSprite;
    var _iScale;
    var _vPosition;
    var _iSpeed;
    var _iRadius;
    var _iRadius2;
    var _iType;
    var _vCollision ;
    this.init = function (x,y, scale)
    {
       _oContainer = new createjs.Container();
       _iType = randomIntBetween(0,4);
       _oSprite = createBitmap(s_oSpriteLibrary.getSprite("planet"+_iType));
       _oContainer.addChild(_oSprite);
       
       _oSprite.x = -_oSprite.getBounds().width/2;
       _oSprite.y = -_oSprite.getBounds().width/2;
       _iScale = scale;
        _vCollision = new CVector2();
        _oContainer.x = x;
        _oContainer.y = y;
        _oContainer.scaleX = scale;
        _oContainer.scaleY = scale;
        _iRadius = _oSprite.getTransformedBounds().width/2 * scale;
        _vPosition = new CVector2(x,y);

        _iRadius2 = _iRadius * _iRadius;
        rand = randomIntBetween(0, PLANET_SPEEDS.length-1);
        _iSpeed = PLANET_SPEEDS[rand] / PHYSICS_ITERATION;
       s_oGameContainer.addChild (_oContainer);
    };
    
    this.updateRotation = function ()
    {
        _oContainer.rotation += _iSpeed;
        _vPosition.set(_oContainer.x, _oContainer.y);
    };
    
    this.changeType = function ()
    {
        _oContainer.removeChild(_oSprite);
        _iType = randomIntBetween(0,4);

        _oSprite = createBitmap(s_oSpriteLibrary.getSprite("planet"+_iType));
        _oContainer.addChild(_oSprite);
         _oSprite.x = -_oSprite.getBounds().width/2;
       _oSprite.y = -_oSprite.getBounds().width/2;
       _iScale = randomFloatBetween(0.4, 1);
        rand = randomIntBetween(0, PLANET_SPEEDS.length-1);
        _iSpeed = PLANET_SPEEDS[rand] / PHYSICS_ITERATION;
        _oContainer.scaleX = _iScale;
        _oContainer.scaleY = _iScale;
        _iRadius = _oContainer.getBounds().width/2 * _iScale;
        _iRadius2 = _iRadius * _iRadius;
    };
    this.getX = function ()
    {
        return _oContainer.x;
    };
    this.getY = function ()
    {
        return _oContainer.y;
    };
    this.getRadius = function ()
    {
      return _iRadius;  
    };
    this.getScale = function ()
    {
      return _iScale;  
    };
    this.getType = function ()
    {
        return _iType;
    }
    this.calculateVectorToChar = function ()
    {
        vDiff = new CVector2();
        vDiff.setV(s_oCharacter.getVectorPosition());
        vDiff.subtract(_vPosition);
        _vCollision.setV(vDiff);
        _vCollision.normalize();
        _vCollision.scalarProduct(_iRadius / _iScale);
    };
    this.getRotationSpeedValue = function()
    {
      return _iSpeed;  
    };
    this.getRotationValue = function ()
    {
      return _oContainer.rotation;  
    };
    
    this.getCollisionVector = function ()
    {
      return _vCollision;  
    };
     this.getPositionVector = function ()
    {
      return _vPosition;  
    };
    this.getSquaredRadius = function ()
    {
      return _iRadius2;  
    };
    this.getContainer = function ()
    {
        return _oContainer;
    }
    this.init(x,y, size);
}