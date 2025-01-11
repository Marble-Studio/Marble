function CHelp(oParentContainer) {
    var _pStartPosButContinue;
    var _pStartPosButPrev;

    var _oContainer;
    var _oArrowPg1;
    var _oArrowPg2;
    var _oPage1Container = null;
    var _oPage2Container = null;
    var _oFadePage1;
    var _oFadePage2;
    var _oHitArea;
    var _oParentContainer;
    var _oButContinue;
    var _oButPrev;
    var _iPage;


    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 1;
        _oParentContainer.addChild(_oContainer);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oHitArea.on("click", function () {});
        _oHitArea.cursor = "pointer";
        _oContainer.addChild(_oHitArea);

        _oFadePage1 = createBitmap(s_oSpriteLibrary.getSprite("fade_help_0"));
        _oFadePage1.alpha = 0;
        _oFadePage1.visible = false;
        _oContainer.addChild(_oFadePage1);

        _oFadePage2 = createBitmap(s_oSpriteLibrary.getSprite("fade_help_1"));
        _oFadePage2.alpha = 0;
        _oFadePage2.visible = false;
        _oContainer.addChild(_oFadePage2);

        _pStartPosButContinue = {x: CANVAS_WIDTH * 0.5 + 340, y: CANVAS_HEIGHT * 0.5 + 440};

        var oSpriteButContinue = s_oSpriteLibrary.getSprite("but_continue_big");
        _oButContinue = new CGfxButton(_pStartPosButContinue.x, _pStartPosButContinue.y, oSpriteButContinue, _oContainer);
        _oButContinue.addEventListenerWithParams(ON_MOUSE_DOWN, this.onPressButton, this, true);
        _oButContinue.setScale(0.7);
        _oButContinue.pulseAnimation();

        _pStartPosButPrev = {x: CANVAS_WIDTH * 0.5 - 340, y: CANVAS_HEIGHT * 0.5 + 440};
        _oButPrev = new CGfxButton(_pStartPosButPrev.x, _pStartPosButPrev.y, oSpriteButContinue, _oContainer);
        _oButPrev.addEventListenerWithParams(ON_MOUSE_DOWN, this.onPressButton, this, false);
        _oButPrev.setScale(0.7);
        _oButPrev.setScaleX(-0.7);

        this.showHelp1();

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.showHelp1 = function () {
        _iPage = 1;
        if (_oPage1Container === null) {
            _oPage1Container = new createjs.Container();
            _oPage1Container.alpha = 0;
            _oContainer.addChild(_oPage1Container);

            var szText = TEXT_HELP1_DESKTOP;
            if (s_bMobile) {
                szText = TEXT_HELP1_MOBILE;
            }

            var iWidth = 400;
            var iHeight = 70;
            var iX = CANVAS_WIDTH/2;
            var iY = CANVAS_HEIGHT/2 +40;
            var oTextPg1 = new CTLText(_oPage1Container, 
                        iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                        32, "center", TEXT_COLOR, FONT_GAME, 1,
                        2, 2,
                        szText,
                        true, true, true,
                        false );

            oTextPg1.setShadow("#df7ac7",2,2,2);
            
            var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");
            _oArrowPg1 = new CArrow(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF + 190, oSpriteArrow, _oPage1Container);
            _oArrowPg1.setAngle(90);
        }
        _oButPrev.setVisible(false);

        this.leavePage2();

        createjs.Tween.get(_oPage1Container).wait(300).to({alpha: 1}, 500, createjs.Ease.cubicIn);

        _oFadePage1.visible = true;
        createjs.Tween.get(_oFadePage1).to({alpha: 1}, 500, createjs.Ease.cubicIn).call(function () {
            _oArrowPg1.setStartPosTween(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF + 190);
            _oArrowPg1.setEndPosTween(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF + 240);

            _oArrowPg1.animatePos(1000);

        });
    };

    this.showHelp2 = function () {
        _iPage = 2;
        this.leavePage1();
        if (_oPage2Container === null) {
            _oPage2Container = new createjs.Container();
            _oPage2Container.alpha = 0;
            _oContainer.addChild(_oPage2Container);

            var iWidth = 400;
            var iHeight = 70;
            var iX = CANVAS_WIDTH/2;
            var iY = CANVAS_HEIGHT/2 -230;
            var oTextPg2 = new CTLText(_oPage2Container, 
                        iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                        32, "center", TEXT_COLOR, FONT_GAME, 1,
                        2, 2,
                        TEXT_HELP2,
                        true, true, true,
                        false );
            oTextPg2.setShadow("#df7ac7",2,2,2);
            
            var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");
            _oArrowPg2 = new CArrow(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF - 170, oSpriteArrow, _oPage2Container);
            _oArrowPg2.setAngle(90);
        }
        _oButPrev.setVisible(true);

        createjs.Tween.get(_oPage2Container).wait(300).to({alpha: 1}, 500, createjs.Ease.cubicIn);

        _oFadePage2.visible = true;
        createjs.Tween.get(_oFadePage2).to({alpha: 1}, 500, createjs.Ease.cubicIn).call(function () {
            _oArrowPg2.setStartPosTween(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF - 170);
            _oArrowPg2.setEndPosTween(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF - 130);

            _oArrowPg2.animatePos(1000);
        });
    };

    this.leavePage1 = function () {
        createjs.Tween.get(_oPage1Container).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
            _oArrowPg1.removeTween();
        });

        createjs.Tween.get(_oFadePage1).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
            _oFadePage1.visible = false;
        });
    };

    this.leavePage2 = function () {
        if (_oPage2Container !== null) {
            createjs.Tween.get(_oPage2Container).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
                _oArrowPg2.removeTween();

            });

            createjs.Tween.get(_oFadePage2).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
                _oFadePage2.visible = false;
            });
        }
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButContinue.setPosition(_pStartPosButContinue.x - iNewX, _pStartPosButContinue.y - iNewY);
        _oButPrev.setPosition(_pStartPosButPrev.x + iNewX, _pStartPosButPrev.y - iNewY);
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer).to({alpha: 0}, 150, createjs.quartOut).call(function () {
            _oParentContainer.removeChild(_oContainer);
            _oButContinue.unload();
            _oButPrev.unload();
            _oButContinue = null;
            _oButPrev = null;
            _oHitArea.removeAllEventListeners();
        });
        s_oHelp = null;
    };

    this.onPressButton = function (bNextPage) {
        switch (_iPage) {
            case 1:
                this.showHelp2();
                break;
            case 2:
                if (bNextPage) {
                    this._onExit();
                } else {
                    this.showHelp1();
                }
                break;
        }
    };

    this._onExit = function () {
        s_oGame._onExitHelp();
    };

    _oParentContainer = oParentContainer;

    this._init();

    s_oHelp = this;

    return s_oHelp;
}

var s_oHelp = null;