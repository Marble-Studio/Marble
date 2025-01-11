function CPaytablePanelBase(){
    this._iCurPage;
    this._aNumSymbolComboText;
    this._aWinComboText;
    this._aPages;
    this._pStartPosExit;

    this._oCurPage;
    
    this._oButExit;
    this._oButArrowNext;
    this._oButArrowPrev;
    this._oContainer;
}

CPaytablePanelBase.prototype._init = function(){
    this._iCurPage = 0;
    this._aPages = new Array();

    this._oContainer = new createjs.Container();
    this._oContainer.on("click",function(){});
    this._oContainer.visible = false;
    s_oAttachSection.addChild(this._oContainer);
    
    var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    this._oContainer.addChild(oBg);
    
    var oShipBg0 = createBitmap(s_oSpriteLibrary.getSprite("bg_ship_0"));
    this._oContainer.addChild(oShipBg0);

    var oShipBg1 = createBitmap(s_oSpriteLibrary.getSprite("bg_ship_1"));
    oShipBg1.y = 750;
    this._oContainer.addChild(oShipBg1);
    
};

CPaytablePanelBase.prototype.attachButs = function(oPosPrev,oPosNext){
    //ATTACH ARROW
    this._oButArrowNext = new CGfxButton(oPosNext.x,oPosNext.y,s_oSpriteLibrary.getSprite('but_arrow_next'),this._oContainer);
    this._oButArrowNext.addEventListener(ON_MOUSE_UP, this._onNext, this);

    this._oButArrowPrev = new CGfxButton(oPosPrev.x,oPosPrev.y,s_oSpriteLibrary.getSprite('but_arrow_prev'),this._oContainer);
    this._oButArrowPrev.addEventListener(ON_MOUSE_UP, this._onPrev, this);

    var oSprite = s_oSpriteLibrary.getSprite('but_exit');
    this._pStartPosExit = {x:CANVAS_WIDTH-oSprite.width/2-10,y:oSprite.height/2+10};
    this._oButExit = new CGfxButton(this._pStartPosExit.x, this._pStartPosExit.y, oSprite, this._oContainer);
    this._oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
};

CPaytablePanelBase.prototype.unload = function(){
    return;
    this._oContainer.off("click",function(){});
    this._oButExit.unload();

    this._oButArrowNext.unload();
    this._oButArrowPrev.unload();

    s_oAttachSection.removeChild(this._oContainer);

    for(var i=0;i<this._aNumSymbolComboText.length;i++){
        this._oContainer.removeChild(this._aNumSymbolComboText[i]);
    }

    for(var j=0;j<_aWinComboText.length;j++){
        this._oContainer.removeChild(this._aWinComboText[j]);
    }
};

CPaytablePanelBase.prototype._onNext = function(){
    if(this._iCurPage === this._aPages.length-1){
        this._iCurPage = 0;
    }else{
        this._iCurPage++;
    }

    console.log("BASE "+this._iCurPage)
    this._oCurPage.visible = false;
    this._aPages[this._iCurPage].visible = true;
    this._oCurPage = this._aPages[this._iCurPage];
};

CPaytablePanelBase.prototype._onPrev = function(){
    if(this._iCurPage === 0){
        this._iCurPage = this._aPages.length -1;
    }else{
        this._iCurPage--;
    }


    this._oCurPage.visible = false;
    this._aPages[this._iCurPage].visible = true;
    this._oCurPage = this._aPages[this._iCurPage];
};


CPaytablePanelBase.prototype.refreshButtonPos = function(){
    this._oButExit.setPosition(this._pStartPosExit.x-s_iOffsetX,this._pStartPosExit.y+s_iOffsetY);
};

CPaytablePanelBase.prototype.show = function(iPage){
    this._iCurPage = iPage;
    
    this._oCurPage.visible = false;
    this._aPages[this._iCurPage].visible = true;
    this._oCurPage = this._aPages[this._iCurPage];

    this._oContainer.visible = true;
};

CPaytablePanelBase.prototype.hide = function(){
    this._oContainer.visible = false;
};

CPaytablePanelBase.prototype.resetHighlightCombo = function(){
    for(var i=0;i<this._aNumSymbolComboText.length;i++){
        if(this._aNumSymbolComboText[i] !== undefined){
            for(var j=0;j<this._aNumSymbolComboText[i].length;j++){
                this._aNumSymbolComboText[i][j].color = "#ffffff";
                this._aWinComboText[i][j].color = "#ffff00";
                createjs.Tween.removeTweens(this._aWinComboText[i][j]);
                this._aWinComboText[i][j].alpha = 1;
            }
        }

    } 
};

CPaytablePanelBase.prototype.highlightCombo = function(iSymbolValue,iNumCombo){

    this._aWinComboText[iSymbolValue][NUM_REELS-iNumCombo].color = "#ff9000";

    this.tweenAlpha(this._aWinComboText[iSymbolValue][NUM_REELS-iNumCombo],0);

};

CPaytablePanelBase.prototype.tweenAlpha = function(oText,iAlpha){
    createjs.Tween.get(oText,{loop:-1}).to({alpha:0}, 200).to({alpha:1},200);
};

CPaytablePanelBase.prototype._onExit = function(){
    s_oGame.hidePayTable();
};

CPaytablePanelBase.prototype.isVisible = function(){
    return this._oContainer.visible;
};

CPaytablePanelBase.prototype.getCurPage = function(){
    return this._iCurPage;
};