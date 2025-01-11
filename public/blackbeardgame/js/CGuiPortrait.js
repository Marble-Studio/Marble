function CGuiPortrait(iCurBet,oParentContainer){
    this._pStartPos;
    
    CGuiBase.call(this, oParentContainer);
    
    this._init(iCurBet);
};

CGuiPortrait.prototype = Object.create(CGuiBase.prototype);

CGuiPortrait.prototype._init = function(iCurBet){
    
    var oSpriteBig = s_oSpriteLibrary.getSprite('but_text_big'); 
    var oSprite = s_oSpriteLibrary.getSprite('but_text');

    this._pStartPos = {x:CANVAS_WIDTH+oSprite.width/4-20,y:CANVAS_HEIGHT-oSprite.height/2};

    this._oContainer = new createjs.Container();
    this._oContainer.x = this._pStartPos.x
    this._oContainer.y = this._pStartPos.y;
    this._oParentContainer.addChild(this._oContainer);

    var iYPos = 0;

    this._oInfoBut = new CSpriteSheetTextButton(0,iYPos,oSprite,TEXT_PAYTABLE,FONT_GAME_1,"#fff",34,this._oContainer);        
    this._oInfoBut.addEventListener(ON_MOUSE_UP, s_oInterface._onInfo, s_oInterface);

    this._oBetCoinBut = new CSpriteSheetTextButton(oSprite.width/2+20, iYPos,oSprite,TEXT_COIN +" " + formatEntries(iCurBet),FONT_GAME_1,"#fff",34,this._oContainer);      
    this._oBetCoinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onBet, s_oInterface);

    iYPos += oSprite.height+20
    this._oAddLineBut = new CSpriteSheetTextButton(0,iYPos,oSprite,TEXT_LINES + " " + NUM_PAYLINES,FONT_GAME_1,"#fff",34,this._oContainer);
    this._oAddLineBut.addEventListener(ON_MOUSE_UP, s_oInterface._onAddLine, s_oInterface);

    this._oAutoSpinBut = new CSpriteSheetTextButton(oSprite.width/2+20,iYPos,oSprite,TEXT_AUTO_SPIN,FONT_GAME_1,"#fff",34,this._oContainer);
    this._oAutoSpinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onAutoSpin, s_oInterface);


    iYPos += oSprite.height*2+20;
    this._oSpinBut = new CSpriteSheetTextButton(oSprite.width/4,iYPos,oSpriteBig,TEXT_SPIN,FONT_GAME_1,"#fff",68,this._oContainer);
    this._oSpinBut.addEventListener(ON_MOUSE_UP, s_oInterface._onSpin, s_oInterface);

    this._oContainer.regX = this._oContainer.getBounds().width
    this._oContainer.regY = this._oContainer.getBounds().height ;

};

CGuiPortrait.prototype.refreshPos = function(){
    this._oContainer.x = this._pStartPos.x-s_iOffsetX;
    this._oContainer.y = this._pStartPos.y-s_iOffsetY;

    this._oContainer.scale = REEL_SCALE;
    if(this._oContainer.scale < 0.9){
        this._oContainer.scale = 0.9;
    }
};
