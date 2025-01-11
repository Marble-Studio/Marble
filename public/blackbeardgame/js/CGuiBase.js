function CGuiBase(oParentContainer){
    this._oInfoBut;
    this._oBetCoinBut;
    this._oAddLineBut;
    this._oAutoSpinBut;
    this._oSpinBut;
    
    this._oContainer;
    this._oParentContainer = oParentContainer;
}

CGuiBase.prototype._init = function(iCurBet){
    
};

CGuiBase.prototype.unload = function(){
    this._oInfoBut.unload();
    this._oBetCoinBut.unload();
    this._oAddLineBut.unload();
    this._oAutoSpinBut.unload();
    this._oSpinBut.unload();
};

CGuiBase.prototype.setVisible = function(bVisible){
    this._oContainer.visible = bVisible;
};

CGuiBase.prototype.enableGuiButtons = function(){
    this._oSpinBut.enable();
    this._oAutoSpinBut.enable();
    this._oBetCoinBut.enable();
    this._oAddLineBut.enable();
    this._oInfoBut.enable();

    if(!s_bMobile){
        document.onkeyup   = this.onKeyUp;
    }
};

CGuiBase.prototype.enableSpin = function(bAutoSpin){
    this._oSpinBut.enable();
    if(bAutoSpin){
       this._oAutoSpinBut.enable();
    }

    if(!s_bMobile){
        document.onkeyup   = this.onKeyUp;
    }
};

CGuiBase.prototype.disableSpin = function(bAutoSpin){
    this._oSpinBut.disable();

    if(bAutoSpin){
        this._oAutoSpinBut.disable();
    }

    if(!s_bMobile){
        document.onkeyup   = null;
    }
};

CGuiBase.prototype.disableGuiButtons = function(bAutoSpin,bFreespin){	
    if(!s_bMobile){	
        document.onkeyup   = null;	
    }	

    if(!bFreespin){	
        if(bAutoSpin){	
            this._oSpinBut.disable();	
            this._oAutoSpinBut.setText(TEXT_STOP_AUTO);	
        }else{	
            this._oAutoSpinBut.disable();	
            this._oSpinBut.setText(TEXT_SKIP)	
        }	

    }else{	
        this._oAutoSpinBut.disable();	
        this.disableSpin(true);	
    }	


    this._oBetCoinBut.disable();	
    this._oAddLineBut.disable();	
    this._oInfoBut.disable();	
};

CGuiBase.prototype.setAutoSpinState = function(szText){
    this._oAutoSpinBut.setText(szText);
};

CGuiBase.prototype.setSpinState = function(szText){	
    this._oSpinBut.setText(szText);	
};

CGuiBase.prototype.setSpinText = function(szText){
    this._oSpinBut.setText(szText);	
};

CGuiBase.prototype.setAutoSpinText = function(szText){
    this._oAutoSpinBut.setText(szText);	
};

CGuiBase.prototype.setLineText = function(szText){
    this._oAddLineBut.setText(szText);
};

CGuiBase.prototype.setBetText = function(szText){
    this._oBetCoinBut.setText(szText);
};