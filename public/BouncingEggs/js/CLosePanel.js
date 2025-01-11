function CLosePanel(oSpriteBg) {

    var _oBg;
    var _oResultText;
    var _oTitleText;
    var _oGroup;
    var _oButMenu = null;
    var _oButRestart;
    var _oFade;
    var _bClick = false;

    this._init = function (oSpriteBg) {

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.0;

        s_oStage.addChild(_oFade);

        _oGroup = new createjs.Container();
        _oGroup.alpha = 1;
        _oGroup.visible = false;
        _oGroup.y = CANVAS_HEIGHT;

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oGroup.addChild(_oBg);
       
        var iWidth = oSpriteBg.width-80;
        var iHeight = 100;
        var iX = CANVAS_WIDTH * 0.5;
        var iY = CANVAS_HEIGHT * 0.5 - 70;
        _oTitleText = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    80, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );

        _oTitleText.setShadow("#df7ac7",2,2,2);
        
        var iWidth = oSpriteBg.width-80;
        var iHeight = 40;
        var iX = CANVAS_WIDTH * 0.5;
        var iY = CANVAS_HEIGHT * 0.5 + 10;
        _oResultText = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    36, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        _oResultText.setShadow("#df7ac7",2,2,2);
        
        s_oStage.addChild(_oGroup);

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 210, CANVAS_HEIGHT * 0.5 + 100, oSpriteButHome, _oGroup);
        _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

        var oSpriteButRestart = s_oSpriteLibrary.getSprite("but_restart");
        _oButRestart = new CGfxButton(CANVAS_WIDTH * 0.5 + 210, CANVAS_HEIGHT * 0.5 + 100, oSpriteButRestart, _oGroup);
        _oButRestart.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
        _oButRestart.pulseAnimation();

    };

    this.unload = function () {
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oGroup);
            if (_oButMenu !== null) {
                _oButMenu.unload();
                _oButMenu = null;
            }

            _oFade.removeAllEventListeners();

            _oButRestart.unload();
            _oButRestart = null;
        });
    };

    this.show = function (iItemSaved, iTarget) {

        _oResultText.refreshText( sprintf(TEXT_LOSE_RESULT, iItemSaved, iTarget) );

        _oTitleText.refreshText( TEXT_LOST );

        _oGroup.visible = true;

        createjs.Tween.get(_oFade).to({alpha: 0.5}, 500, createjs.Ease.cubicOut);

        _oFade.on("click", function () {});

        createjs.Tween.get(_oGroup).wait(250).to({y: 0}, 1250, createjs.Ease.elasticOut).call(function () {
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
        });
    };

    this._onRestart = function () {
        if (_bClick) {
            return;
        }
        _bClick = true;
        this.unload();

        createjs.Tween.get(_oFade).to({alpha: 0}, 400, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oFade);
        });

        s_oGame.restartLevel();
    };

    this._onExit = function () {
        if (_bClick) {
            return;
        }
        _bClick = true;

        this.unload();
        s_oGame.onExit();
    };

    this._init(oSpriteBg);

    return this;
}