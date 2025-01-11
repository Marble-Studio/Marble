function CParallax(szSpritePrefix, iQuantity, bSame, bBackGround, oParentContainer, iIncrement,bMoveX)
{
    var _aParallaxImgs;
    var _aImgsWidths;
    
    var _oParallaxContainer;
    var _oParentContainer;
    
    var _iLastImgIndex;
    var _iWidth;
    var _iHeight;
    var _iSpeed;
    var _iMoltiplier;
    var _iOffsetSine = 0;
    var _iSineCounter = 0;
    var _iIncrement = iIncrement;
    
    var _bMoveX;
    var _bBackGround;
    var _bSine = true;
    this.init = function (szSpritePrefix, iQuantity, bSame, bBackGround, oParentContainer,bMoveX)
    {
        _iSpeed = 0.1;
        _iMoltiplier = 0;
        _bBackGround = bBackGround;
        _bMoveX = bMoveX;
        var iYPos = 0;
        var randY = Math.floor(randomFloatBetween(200, 600));
        var randX = randomIntBetween(200, 1000);
        _oParallaxContainer = new createjs.Container();
        _oParentContainer = oParentContainer;
        oParentContainer.addChild(_oParallaxContainer);
        _aParallaxImgs = new Array();
        _aImgsWidths = new Array();


        for (var j = 0; j < 2; j++)
        {
            for (var i = 0; i < iQuantity; i++)
            {

                if (bSame === false)
                {
                    var oSprite = s_oSpriteLibrary.getSprite(szSpritePrefix + i.toString());
                } 
                else
                {
                    var oSprite = s_oSpriteLibrary.getSprite(szSpritePrefix);
                }
                _iHeight = oSprite.height;
                _iWidth = oSprite.width;
                
                _aImgsWidths.push(_iWidth);
                if (bSame === false || bBackGround === true)
                {
                   
                        var oImg = createBitmap(oSprite);

                    oImg.y = iYPos;
                    oImg.x = 0;

                    iYPos -= _iHeight;
                    
                }
                else
                {
                    var oImg = createBitmap(oSprite);
                    
                    oImg.y = iYPos + randY;
                    oImg.x = randX;

                    randX = randomIntBetween(0, 1000)
                    iYPos -= randY;

                }


                _oParallaxContainer.addChild(oImg);
                _aParallaxImgs.push(oImg);
            }
        }


        _iLastImgIndex = _aParallaxImgs.length - 1;

    };


    this.setMoltiplier = function (iSetValue)
    {
        _iMoltiplier = iSetValue;
    };
    
    this.handleRearrangement = function ()
    {
        var randX = Math.floor(randomFloatBetween(0, 1000));
        var randY = Math.floor(randomFloatBetween(200, 500));



        for (var i = 0; i < _aParallaxImgs.length; i++)
        {
            var pt = _oParallaxContainer.localToLocal(_aParallaxImgs[i].x, _aParallaxImgs[i].y, s_oStage);
            if (pt.y > CANVAS_HEIGHT)
            {
                if (_bBackGround === true)
                {
                    _aParallaxImgs[i].y = _aParallaxImgs[_iLastImgIndex].y - _iHeight;
                }
                else
                {
                    _aParallaxImgs[i].y = _aParallaxImgs[_iLastImgIndex].y - _iHeight - randY;
                    _aParallaxImgs[i].x =  randX;
                    
                }
                     
            }
             if (_bMoveX)
                {
                    _aParallaxImgs[i].x += 1 * _iMoltiplier;
                    _aParallaxImgs[i].y = _aParallaxImgs[i].y + _iOffsetSine;
                    if (pt.x > CANVAS_WIDTH + 50)
                    {
                        _aParallaxImgs[i].x = -_iWidth;
                    }
                    if (pt.x < -_iWidth - 50)
                    {
                        _aParallaxImgs[i].x = CANVAS_WIDTH;
                    }
                }     
            _iLastImgIndex = i;
            
           
        }
    };
    
    
    this.handleSineMovement = function ()
    {
      if (_bSine)  
      {
        _iSineCounter += 0.1;
        _iOffsetSine = Math.sin(_iSineCounter) * 0.5;
      }
    };
    this.update = function ()
    {
        this.handleRearrangement();
        this.handleSineMovement();
    };
    
    this.getIncrement = function ()
    {
      return _iIncrement;  
    };
    this.getContainer = function ()
    {
        return _oParallaxContainer;
    };

    this.init(szSpritePrefix, iQuantity, bSame, bBackGround, oParentContainer,bMoveX);
}

