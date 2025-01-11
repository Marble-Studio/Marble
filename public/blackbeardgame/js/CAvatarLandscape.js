function CAvatarLandscape(iX,iY,oSpriteSheet,oParentContainer){
    var _pStartPosAvatarLandscape;
    
    var _oSpriteAvatar;

    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY,oSpriteSheet){
        _pStartPosAvatarLandscape = {x:iX,y:iY};
        
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosAvatarLandscape.x;
        _oContainer.y = _pStartPosAvatarLandscape.y;
        _oParentContainer.addChild(_oContainer);

        _oSpriteAvatar =  createSprite(oSpriteSheet, "start");    
        _oSpriteAvatar.on("animationend",this._onAnimationEnd,this);
        _oContainer.addChild(_oSpriteAvatar);


    };
    
    this._hideAllAnims = function(){
   
    };
    
    this.refreshPos = function(iSlotY){
        _oContainer.x = _pStartPosAvatarLandscape.x+s_iOffsetX;
        _oContainer.y = iSlotY;
        _oContainer.scale = REEL_SCALE*1.43;
    };
    
    this.show = function(szAnim){
        if(s_bLandscape && szAnim === "start_freespin"){
            playSound("avatar_start_freespins",1,false);
        }
        
        _oSpriteAvatar.gotoAndPlay(szAnim);
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this._onAnimationEnd = function(evt){
        if(evt.currentTarget.currentAnimation === "start_freespin"){
            
        }
    };
    
    this.startFreespin = function(){
        _oSpriteAvatar.framerate = 30;
    };
    
    this.hideFreespin = function(){
        _oSpriteAvatar.framerate = 40;
    };
    
    _oParentContainer = oParentContainer;
    
    this._init(iX,iY,oSpriteSheet);
}