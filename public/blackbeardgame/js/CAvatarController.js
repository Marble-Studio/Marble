function CAvatarController(oParentContainer){
    
    var _oAvatarPortrait;
    var _oAvatarLandscape;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _oAvatarPortrait = new CAvatarPortrait(10,CANVAS_HEIGHT-20,s_oAvatarSpritesheet,_oContainer);
        _oAvatarLandscape = new CAvatarLandscape(150,CANVAS_HEIGHT+80,s_oAvatarSpritesheet,_oContainer);
    };
    
    this.show = function(szAnim){
        _oAvatarLandscape.show(szAnim);
        _oAvatarPortrait.show(szAnim);
    };
    
    this.refreshPos = function(iSlotY){
        if(s_bLandscape){
            _oAvatarLandscape.setVisible(true);
            _oAvatarPortrait.setVisible(false);
        }else{
            _oAvatarLandscape.setVisible(false);
            _oAvatarPortrait.setVisible(true);
        }
        
        _oAvatarLandscape.refreshPos(iSlotY);
        _oAvatarPortrait.refreshPos();
    };
    
    this.startFreespin = function(){
        _oAvatarPortrait.startFreespin();
        _oAvatarLandscape.startFreespin();
    };
    
    this.hideFreespin = function(){
        _oAvatarPortrait.hideFreespin();
        _oAvatarLandscape.hideFreespin();
    };
    
    this._init();
}