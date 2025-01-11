function CStarManager ()
{
    var _aStars;
    
    var _bRearrange;
    
    var _iPattern;
    var _iSineCounter = 0;
    var _iOffsetSine = 0;
    
    var _vLineVector;
    this.init = function ()
    {
        s_oStarManager = this;
        _aStars = [];
        _bRearrange = false;
        _iPattern = 0;
        _vLineVector = new CVector2();
        for (var i = 0; i < 5; i++) 
        {
            oStar = new CStar(-1000,-1000);
            _aStars.push(oStar);
        }
    };
    
    
    this.spawnStars = function (oPlanet, oSecondPlanet)
    {
        _iPattern = randomIntBetween(0,2);
        switch (_iPattern) {
            case STAR_PATTERN_LINE:
                
                var pt1 = {x: oPlanet.getX(), y: oPlanet.getY()};
                var pt2 = {x: oSecondPlanet.getX(), y: oSecondPlanet.getY()};
                var dx = pt2.x - pt1.x;
                var dy = pt2.y - pt1.y;
                var numPoints = 9;
                var stepX = dx / numPoints;
                var stepY = dy / numPoints;
                var px = pt1.x;
                var py = pt1.y - 51 - oPlanet.getRadius();
                
                for (var i = 0; i < 4; i++) {



                    iType = oPlanet.getType();
                    _aStars[i].spawn(px, py, iType);
                    px += stepX;
                    py += stepY;

                }
                break;

            case STAR_PATTERN_CIRCUMFERENCE:
                var x0 = oPlanet.getX() - 10;
                var y0 = oPlanet.getY() - 10;
                var r = oPlanet.getRadius() * 1.5;
                for (var i = 0; i < _aStars.length; i++){    
                var x = x0 - r * Math.cos(2 * Math.PI * i / _aStars.length); 
                var y = y0 - r * Math.sin(2 * Math.PI * i / _aStars.length);
                iType = oPlanet.getType();
                _aStars[i].spawn(x,y, iType);
                }
                break;
                
            case STAR_PATTERN_VERTICAL_LINE:
                for (var i = 0; i < 4; i++) {

                var pt1 = {x: oPlanet.getX(), y: oPlanet.getY()};
                var pt2 = {x: oPlanet.getX(), y: oPlanet.getY() - oPlanet.getRadius() - 250 };  

                _vLineVector.set(pt1.x, pt1.y);
                vPointBVector = new CVector2(pt2.x, pt2.y);
                _vLineVector.subtract(vPointBVector);
                _vLineVector.normalize();
                _vLineVector.scalarProduct((70 * i));
                iType = oPlanet.getType();
                 _aStars[i].spawn (_vLineVector.getX() + pt2.x, _vLineVector.getY() + pt2.y, iType);
                 
             }
                break;

            default:
                
                break;
        }
    };
    
    this.update = function ()
    {
       
         for (var i = 0; i < _aStars.length; i++) {      
            iHeroX = s_oCharacter.getX();
            iHeroY = s_oCharacter.getY();
            iStarX = _aStars[i].getX();
            iStarY = _aStars[i].getY();
            iHeroRadius = s_oCharacter.getRadius();
            iStarRadius = _aStars[i].getRadius();
            iMaxDistance = (iHeroRadius + iStarRadius) * (iHeroRadius + iStarRadius);
            distance = distanceBetween2Points(iHeroX, iHeroY, iStarX, iStarY);
            
             if (distance < iMaxDistance)
            {          
               _aStars[i].onCharacterCollision();
            }
            
           
        }  
        

    };
    this.init();
}
var s_oStarManager;