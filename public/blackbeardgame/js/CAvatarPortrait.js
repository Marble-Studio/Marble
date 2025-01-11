function CAvatarPortrait(iX,iY,oSpriteSheet,oParentContainer){
    var _pStartPosAvatar;
    
    var _oBgFreespin;
    var _oSpriteAvatar;
    var _oWinningFrameBig;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY,oSpriteSheet){
        _pStartPosAvatar = {x:iX,y:iY};
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_avatar_portrait"));
        oBg.x = 95;
        oBg.y = 124;
        _oContainer.addChild(oBg);
        
        _oBgFreespin = createBitmap(s_oSpriteLibrary.getSprite("bg_avatar_portrait_freespin"));
        _oBgFreespin.alpha = 0;
        _oBgFreespin.x = 95;
        _oBgFreespin.y = 124;
        _oContainer.addChild(_oBgFreespin);
        
        var aSprites = new Array();
        for(var t=0;t<17;t++){
            aSprites.push(s_oSpriteLibrary.getSprite("win_frame_anim_big_"+t));
        }
        var oData = {   // image to use
                        images:aSprites, 
                        framerate:FPS,
                        // width, height & registration point of each sprite
                        frames: {width: WIN_BIG_ANIM_WIDTH, height: WIN_BIG_ANIM_HEIGHT}, 
                        animations: {  static: 0,anim:[0,64] }
        };

        var oSpriteSheetFrame = new createjs.SpriteSheet(oData);
        _oWinningFrameBig = createSprite(oSpriteSheetFrame, "static",0,0,WIN_BIG_ANIM_WIDTH,WIN_BIG_ANIM_HEIGHT);               
        _oContainer.addChild(_oWinningFrameBig);
        
        
        _oSpriteAvatar =  createSprite(oSpriteSheet, "start");    
        _oSpriteAvatar.scale = 2.4;
        _oSpriteAvatar.x = WIN_BIG_ANIM_WIDTH/2;
        _oSpriteAvatar.y = WIN_BIG_ANIM_HEIGHT*1.5;
        _oSpriteAvatar.on("animationend",this._onAnimationEnd,this);
        _oContainer.addChild(_oSpriteAvatar);
        
        _oContainer.regY = WIN_BIG_ANIM_HEIGHT;
        
        var oMask = new createjs.Shape();
        oMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(-WIN_BIG_ANIM_HEIGHT, -WIN_BIG_ANIM_WIDTH, WIN_BIG_ANIM_WIDTH*3,WIN_BIG_ANIM_HEIGHT+542);
        _oContainer.addChild(oMask);
        
        _oSpriteAvatar.mask = oMask;
    };
    
    this._hideAllAnims = function(){
   
    };
    
    this.refreshPos = function(){
            _oContainer.x = _pStartPosAvatar.x+s_iOffsetX;
            _oContainer.y = _pStartPosAvatar.y - s_iOffsetY;
            _oContainer.scale = REEL_SCALE;
            if(_oContainer.scale>0.72){
                _oContainer.scale = 0.72;
            }
            
    };
    
    this.show = function(szAnim){
        if(!s_bLandscape && szAnim === "start_freespin"){
            playSound("avatar_start_freespins",1,false);
        }
        
        _oSpriteAvatar.gotoAndPlay(szAnim);
    };
    
    this.startFreespin = function(){
        _oSpriteAvatar.framerate = 30;
        createjs.Tween.get(_oBgFreespin).to({alpha: 1}, 1500, createjs.Ease.cubicOut);
    };
    
    this.hideFreespin = function(){
        _oSpriteAvatar.framerate = 40;
        createjs.Tween.get(_oBgFreespin).to({alpha: 0}, 1500, createjs.Ease.cubicOut);
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this._onAnimationEnd = function(evt){
        if(evt.currentTarget.currentAnimation === "start_freespin"){
           
        }
    };
    
    _oParentContainer = oParentContainer;
    
    this._init(iX,iY,oSpriteSheet);
}