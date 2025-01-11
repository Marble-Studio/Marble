function CSettingsLevel() {   
    
    this.createAlienOccurance=function(aOccurrance){
        var _aTemp=new Array();
        _aTemp=aOccurrance;
        var _aEvilAlienOccurance=[];
         
        for(var i=0;i<_aTemp.length;i++){
            for(var j=0;j<_aTemp[i];j++){
                _aEvilAlienOccurance.push(i);
            }
        } 
        return _aEvilAlienOccurance;  
    };
        
    this.createBonusOccurance=function(iLevel){
        var _aTemp=new Array();
        _aTemp=BONUS_OCCURENCE_PER_LEVEL[iLevel];
        var _aBonusAlienOccurance=[];
        
        for(var i=0;i<_aTemp.length;i++){
            for(var j=0;j<_aTemp[i];j++){
               _aBonusAlienOccurance.push(i);
            }
        } 
        return _aBonusAlienOccurance;  
    };

   
   this.unload=function(){
     s_oAlienSettings=null;  
   };

    
    s_oAliensSettings = this;

}
var s_oAliensSettings;