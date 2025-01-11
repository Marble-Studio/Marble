function CCreditsPanel() {

    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;

    var _oHitArea;

    var _oLink;

    var _pStartPosExit;

    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.5;
        _oHitArea.on("click", this._onLogoButRelease);
        _oHitArea.cursor = "pointer";
        _oContainer.addChild(_oHitArea);

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH * 0.5 + 230, y: 410};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);

        var iWidth = oSpriteBg.width-200;
        var iHeight = 40;
        var iX = CANVAS_WIDTH / 2;
        var iY = 450;
        _oMsgText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    32, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    TEXT_CREDITS_DEVELOPED,
                    true, true, false,
                    false );
        _oMsgText.setShadow("#df7ac7",2,2,2);
        
        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width / 2;
        _oButLogo.regY = oSprite.height / 2;
        _oButLogo.x = CANVAS_WIDTH / 2;
        _oButLogo.y = 520;
        _oContainer.addChild(_oButLogo);

        var iWidth = oSpriteBg.width-200;
        var iHeight = 50;
        var iX = CANVAS_WIDTH / 2;
        var iY = 600;
        _oLink = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    42, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    " ",
                    true, true, false,
                    false );
        _oLink.setShadow("#df7ac7",2,2,2);
    };

    this.unload = function () {
        _oHitArea.removeAllEventListeners();

        _oButExit.unload();
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };

    this._onLogoButRelease = function () {
        window.open("#", "_blank");
    };

    this._init();


}


