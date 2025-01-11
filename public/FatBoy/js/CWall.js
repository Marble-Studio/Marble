function CWall(x,y, direction)
{
    var _vDirection;
    var _oContainer;
    var _oParallax;
    var _iHalfWidth;
    var _iDifference;
    this.init = function (x,y, direction)
    {
        _vDirection = new CVector2(direction, 0);
        _oContainer = new createjs.Container();
        _oParallax = new CParallax("wall",2,true,true,_oContainer,50);
        addElementToArray(s_oGame.getParallaxArray(), _oParallax);
        _oContainer.scaleX = direction;
        _oContainer.x = x + (s_iOffsetX * direction);
        _oContainer.y = y;
        s_oStage.addChild(_oContainer);
        _iHalfWidth = _oContainer.getBounds().width/2;
        _oContainer.regX = _iHalfWidth;
    };
    
    this.update = function ()
    {
        _iDifference = Math.abs(s_oCharacter.getX() - _oContainer.x);
        
        if (_iDifference <= s_oCharacter.getRadius() + _iHalfWidth)
             s_oCharacter.onWall(this);
    };
    this.getDirection = function ()
    {
      return _vDirection;  
    };
    this.getX = function ()
    {
        return _oContainer.x;
    };
    this.getDifference = function ()
    {
        return _iDifference;
    };
    this.init(x,y, direction);
}