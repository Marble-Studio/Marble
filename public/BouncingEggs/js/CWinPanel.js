function CWinPanel(oSpriteBg, bEnd) {

    var _oBg;
    var _oResultText;
    var _oTitleText;
    var _oNewScoreText;
    var _oGroup;
    var _oButMenu;
    var _oButContinue;
    var _oFade;

    this._init = function (oSpriteBg, bEnd) {
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
        
        var iWidth = oSpriteBg.width-260;
        var iHeight = 40;
        var iX = CANVAS_WIDTH * 0.5;
        var iY = CANVAS_HEIGHT * 0.5 + 80;
        _oNewScoreText = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    36, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        _oNewScoreText.setShadow("#df7ac7",2,2,2);

        var oSpriteButContinue = s_oSpriteLibrary.getSprite("but_continue");
        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 210, CANVAS_HEIGHT * 0.5 + 100, oSpriteButContinue, _oGroup);
        _oButContinue.pulseAnimation();

        if (bEnd === false) {
            var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
            _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 210, CANVAS_HEIGHT * 0.5 + 100, oSpriteButHome, _oGroup);
            _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

            _oButContinue.addEventListener(ON_MOUSE_DOWN, this._onContinue, this);
        } else {
            _oButContinue.addEventListener(ON_MOUSE_DOWN, this._onEnd, this);
        }

        s_oStage.addChild(_oGroup);

    };

    this.unload = function () {

        s_oStage.removeChild(_oGroup);
        if (_oButMenu) {
            _oButMenu.unload();
            _oButMenu = null;
        }

        if (_oButContinue) {
            _oButContinue.unload();
            _oButContinue = null;
        }
    };

    this.show = function (iItemSaved, iTarget, iScore) {
        _oTitleText.refreshText( TEXT_WIN );

        _oResultText.refreshText( sprintf(TEXT_WIN_RESULT, iItemSaved, iTarget) );

        _oNewScoreText.refreshText( sprintf(TEXT_TOTAL_SCORE,iScore) );

        _oGroup.visible = true;
        _oFade.on("click", function () {});

        createjs.Tween.get(_oFade).to({alpha: 0.5}, 500, createjs.Ease.cubicOut);

        createjs.Tween.get(_oGroup).wait(250).to({y: 0}, 1250, createjs.Ease.bounceOut).call(function () {
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
        });
        
        $(s_oMain).trigger("save_score", iScore);
        $(s_oMain).trigger("share_event", iScore);
    };

    this._onContinue = function () {
        var oParent = this;
        createjs.Tween.get(_oGroup).to({y: CANVAS_HEIGHT}, 750, createjs.Ease.quartIn).call(function () {
            oParent.unload();
        });

        createjs.Tween.get(_oFade).to({alpha: 0}, 400, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oFade);
            _oFade.removeAllEventListeners();
        });

        s_oGame.onContinue();
    };

    this._onEnd = function () {
        this.unload();
        s_oGame._onEnd();
    };

    this._onExit = function () {
        this.unload();

        _oFade.removeAllEventListeners();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, bEnd);

    return this;
}