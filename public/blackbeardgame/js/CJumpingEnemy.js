function CJumpingEnemy(oInfos,oParentContainer){
    
   var _oContainer;
   var _oParentContainer = oParentContainer;
   
   this._init = function(oInfos){
       _oContainer = new createjs.Container();
       _oParentContainer.addChild(_oContainer);

       var oSprite = s_oSpriteLibrary.getSprite("enemy_pirate");
       var oEnemy = createBitmap(oSprite);
       oEnemy.x = oInfos.x;
       oEnemy.y = oInfos.y;
       if(!oInfos.left){
           oEnemy.scaleX = -1;
       }
       _oContainer.addChild(oEnemy);
       
       var iRand = Math.random()>0.5?"0":"1";
       playSound("bonus_game_enemy_scream_"+iRand,1,false);
       
       createjs.Tween.get(oEnemy).to({x: oInfos.final_x}, 1000, createjs.Ease.linear);
       createjs.Tween.get(oEnemy).to({y: oInfos.y-50}, 300, createjs.Ease.cubicOut).to({y:oInfos.final_y},oInfos.time_fall,createjs.Ease.cubicInOut).call(function(){
           new CMissShipEffect(oInfos.final_x,oInfos.final_y,false,_oParentContainer);
           _oParentContainer.removeChild(_oContainer);
       });
   };
   
   this._init(oInfos);
}