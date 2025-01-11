function CGuiLandscape(iCurBet,oParentContainer){
    CGuiBase.call(this, oParentContainer);
    
    this._init(iCurBet);
};

CGuiLandscape.prototype = Object.create(CGuiBase.prototype);
    
CGuiLandscape.prototype._init = function(iCurBet){
    this._oContainer = new createjs.Container();
    this._oParentContainer.addChild(this._oContainer);

    var oSprite = s_oSpriteLibrary.getSprite('but_text');
    this._oInfoBut = new CSpriteSheetTextButton(364,894,oSprite,TEXT_PAYTABLE,FONT_GAME_1,"#fff",34,this._oContainer);        
    this._oInfoBut.addEventListener(ON_MOUSE_UP, s_oInterface._onInfo, s_oInterface);

    this._oBetCoinBut = new CSpriteSheetTextButton(612, 894,oSprite,TEXT_COIN +" " + formatEntries(iCurBet),FONT_GAME_1,"#fff",34,this._oContainer);      
    this._oBetCoinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onBet, s_oInterface);

    this._oAddLineBut = new CSpriteSheetTextButton(859,894,oSprite,TEXT_LINES + " " + NUM_PAYLINES,FONT_GAME_1,"#fff",34,this._oContainer);
    this._oAddLineBut.addEventListener(ON_MOUSE_UP, s_oInterface._onAddLine, s_oInterface);

    this._oAutoSpinBut = new CSpriteSheetTextButton(1106,894,oSprite,TEXT_AUTO_SPIN,FONT_GAME_1,"#fff",34,this._oContainer);
    this._oAutoSpinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onAutoSpin, s_oInterface);

    this._oSpinBut = new CSpriteSheetTextButton(1354,894,oSprite,TEXT_SPIN,FONT_GAME_1,"#fff",34,this._oContainer);
    this._oSpinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onSpin, s_oInterface);
};