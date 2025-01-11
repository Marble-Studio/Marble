function CPlanetManager ()
{
    var _aPlanet;
    var _iLastPlanetIndex;
    var _iSpeed;
    var _iMoltiplier;
    var _iMinXDistance;
    var _iMaxXDistance;
     var _iMinYDistance;
    var _iMaxYDistance;
    var _bMoving = true;
    this.init = function ()
    {
        s_oPlanetManager = this;
        _aPlanet = [];
        var y = CANVAS_HEIGHT -220;
        var x = 550;
        _iMaxXDistance = CANVAS_WIDTH - 440;
        _iMinXDistance = 650;
        _iMinYDistance = 300;
        _iMaxYDistance = 400;
        s_iDistanceDifficulty = 50;
        for (var i = 0; i < 7; i++) {
            oPlanet = new CPlanet(x,y, 0.5);
            _aPlanet.push(oPlanet);
            y -= randomFloatBetween(_iMinYDistance, _iMaxYDistance) + oPlanet.getRadius();
            x = randomFloatBetween(_iMinXDistance, _iMaxXDistance);
        }
        _iLastPlanetIndex = _aPlanet.length - 1;
        _iSpeed = 1;
        _iMoltiplier = 0;
    };
    this.setMoltiplier = function (value)
    {
        _iMoltiplier = value;
    };
    this.getArray = function ()
    {
      return _aPlanet;  
    };
    this.stopMoving = function ()
    {
        _bMoving = false;
    };
    this.getLastPlanetIndex = function ()
    {
      return _iLastPlanetIndex;  
    };
    this.update = function ()
    {
        if (_bMoving)
        {
       for (var i = 0; i < _aPlanet.length; i++) {
           var pt = s_oGameContainer.localToLocal(0,_aPlanet[i].getContainer().y,s_oStage);
           if (pt.y  >= CANVAS_HEIGHT + 440)
           {
              
                _aPlanet[i].changeType();
                radiusSum = _aPlanet[i].getRadius() + _aPlanet[_iLastPlanetIndex].getRadius();
                 _aPlanet[i].getContainer().y = _aPlanet[_iLastPlanetIndex].getContainer().y - randomFloatBetween(_iMinYDistance, _iMaxYDistance) -radiusSum - s_iDistanceDifficulty;
               _aPlanet[i].getContainer().x = randomFloatBetween(_iMinXDistance, _iMaxXDistance)*_aPlanet[i].getScale();
                _iLastPlanetIndex = i;

           }
           _aPlanet[i].updateRotation();
        }
    }
    };
    this.init();
}
var s_oPlanetManager;
var s_iDistanceDifficulty;
