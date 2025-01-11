function CPause() {

    var _oContainer;
    var _oFade;
    var _oButContinue;

    this._init = function () {
        var oContainer = new createjs.Container();
        oContainer.alpha = 0;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        var oHitArea = new createjs.Shape();
        oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oFade.hitArea = oHitArea;
        _oFade.on("click", function () {});
        oContainer.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oMsgBox = createBitmap(oSpriteBg);
        oMsgBox.x = CANVAS_WIDTH_HALF;
        oMsgBox.y = CANVAS_HEIGHT_HALF;
        oMsgBox.regX = oSpriteBg.width * 0.5;
        oMsgBox.regY = oSpriteBg.height * 0.5;
        oContainer.addChild(oMsgBox);
        
        var iWidth = oSpriteBg.width-80;
        var iHeight = 100;
        var iX = CANVAS_WIDTH * 0.5;
        var iY = CANVAS_HEIGHT * 0.5 - 70;
        var oMsgText = new CTLText(oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    80, "center", TEXT_COLOR, FONT_GAME, 1,
                    2, 2,
                    TEXT_PAUSE,
                    true, true, true,
                    false );
        oMsgText.setShadow("#df7ac7",2,2,2);
        
        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue_big");
        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, oSpriteContinue, oContainer);
        _oButContinue.addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, oContainer);
        _oButContinue.setScale(0.6);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({alpha: 1}, 300, createjs.quartOut);
    };

    this.unload = function () {
        _oFade.removeAllEventListeners();

        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oContainer);
    };

    this._onLeavePause = function (oContainer) {
        createjs.Tween.get(oContainer).to({alpha: 0}, 300, createjs.quartIn).call(function () {
            s_oInterface.unloadPause();
            s_oGame.unpause(true);
        });
    };

    this._init();

    return this;
}