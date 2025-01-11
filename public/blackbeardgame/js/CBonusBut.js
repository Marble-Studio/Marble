function CBonusBut(iIndex,oSpriteSheet,iXPos,iYPos,pButPos,oParentContainer){
    var _bDisabled;
    var _iIndex = iIndex;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerDown;
    var _oListenerUp;
    var _oListenerOver;
    
    var _oContainer;
    var _oHitArea;
    var _oCannonSprite;
    var _oButSelect;
    var _oParentContainer = oParentContainer;
    
    var _oParent;
    
    this._init =function(oSpriteSheet,iXPos,iYPos,pButPos){
        _bDisabled = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);
  
        _oCannonSprite = createSprite(oSpriteSheet, "idle");
        _oCannonSprite.on("animationend",this._onCannonAnimEnd,this);
        _oContainer.addChild(_oCannonSprite);        
        

        _oButSelect = new CGfxButton(pButPos.x,pButPos.y,s_oSpriteLibrary.getSprite("but_fire"),_oContainer);
        _oButSelect.pulseAnimation();
        _oButSelect.addEventListener(ON_MOUSE_UP,this.buttonRelease,this);

    };
    
    this.unload = function(){
        _oButSelect.unload();
        
       _oParentContainer.removeChild(_oContainer);
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this.setButVisible = function(bVisible){
        _oButSelect.setVisible(bVisible);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisabled){
            return;
        }

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_iIndex);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisabled){
            return;
        }

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setX = function(iX){
        _oContainer.x = iX;
    };
    
    this.playAnim = function(){
        _oCannonSprite.gotoAndPlay("anim");
    };
    
    this._onCannonAnimEnd = function(evt){
        if (evt.name !== "anim"){
            return;
        }
        
        if(_aCbCompleted[ON_CANNON_ANIM_END]){
           _aCbCompleted[ON_CANNON_ANIM_END].call(_aCbOwner[ON_CANNON_ANIM_END],_iIndex);
       }
    };
    
    _oParent = this;
    this._init(oSpriteSheet,iXPos,iYPos,pButPos);
}