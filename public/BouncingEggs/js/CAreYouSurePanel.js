function CAreYouSurePanel(oParentContainer) {
    var _oBg;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oFade.on("click", function () {});

        _oContainer.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF + 50;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oBg);

        var iWidth = oSpriteBg.width-100;
        var iHeight = 70;
        var iX = CANVAS_WIDTH / 2;
        var iY = CANVAS_HEIGHT_HALF - 40;
        _oMsg = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    60, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    TEXT_ARE_SURE,
                    true, true, false,
                    false );
        
        _oMsg.setShadow("#df7ac7",2,2,2);
        _oButYes = new CGfxButton(CANVAS_WIDTH / 2 + 180, CANVAS_HEIGHT * 0.5 + 120, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(CANVAS_WIDTH / 2 - 180, CANVAS_HEIGHT * 0.5 + 120, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };

    this.show = function () {
        s_oGame.unpause(false);
        createjs.Tween.get(_oContainer).to({alpha: 1}, 150, createjs.quartOut).call(function () {

        });
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer).to({alpha: 0}, 150, createjs.quartOut).call(function () {
            _oParentContainer.removeChild(_oContainer, _oFade);
        });
    };

    this._onButYes = function () {
        //    createjs.Ticker.paused = false;
        this.unload();
        s_oGame.onExit();
        _oFade.removeAllEventListeners();
    };

    this._onButNo = function () {
        s_oGame.unpause(true);
        this.unload();
        _oFade.removeAllEventListeners();
    };

    _oParentContainer = oParentContainer;

    this._init();
}