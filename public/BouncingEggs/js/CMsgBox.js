function CMsgBox(szText,oParentContainer){
    var _oMsgText;
    var _oButOk;
    var _oThis;
    var _oContainer;
    var _oParentContainer;

    this._init = function (szText) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oFade;

        oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;

        oFade.on("click", function () {});

        _oContainer.addChild(oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);

        oBg.x = CANVAS_WIDTH * 0.5;
        oBg.y = CANVAS_HEIGHT * 0.5;
        oBg.regX = oSpriteBg.width * 0.5;
        oBg.regY = oSpriteBg.height * 0.5;
        _oContainer.addChild(oBg);

        var iWidth = oSpriteBg.width-80;
        var iHeight = oSpriteBg.height-100;
        var iX = CANVAS_WIDTH / 2;
        var iY = 525;
        _oMsgText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#fff", FONT_GAME, 1,
                    2, 2,
                    szText,
                    true, true, true,
                    false );
        
       _oMsgText.setShadow("#df7ac7",2,2,2);
        _oButOk = new CGfxButton(CANVAS_WIDTH / 2, 760, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButOk.addEventListener(ON_MOUSE_UP, this._onButOk, this);
    };

    this._onButOk = function () {
        _oThis.unload();
    };

    this.unload = function () {
        _oButOk.unload();
        _oParentContainer.removeChild(_oContainer);
    };
    
    _oThis = this;
    _oParentContainer = oParentContainer;

    this._init(szText);
}