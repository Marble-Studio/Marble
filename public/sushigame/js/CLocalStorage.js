var LOCALSTORAGE_SCORE = "score";
var LOCALSTORAGE_ENABLED = "enabled";
var LOCALSTORAGE_TOTALSCORE = "totalscore";

var s_aLevelScore = new Array();
var s_aLevelEnabled = new Array();
var s_iTotalScore;

var s_aHelpPanelEnabled = new Array();

function CLocalStorage(szName){
    
    var _bLocalStorage = true;
    
    this._init = function(szName){
        try{
            var bFlag = window.localStorage.getItem(szName);
            this.resetData();
            if(bFlag !== null && bFlag !== undefined){  
                this.loadData();
            }
        }catch(e){
            this.resetData();
        }        
    };

    this.isDirty = function(){
        if(s_iTotalScore > 0){
            return true;
        }
        return false;
    };

    this.isUsed = function(){
        try{
            window.localStorage.setItem("ls_available","ok");
        }catch(evt){
            _bLocalStorage = false;
        }
        
        return _bLocalStorage;
    };

    this.saveData = function(){
        var oJSONData = {};
        oJSONData[LOCALSTORAGE_SCORE] = s_aLevelScore;
        oJSONData[LOCALSTORAGE_ENABLED] = s_aLevelEnabled;
        oJSONData[LOCALSTORAGE_TOTALSCORE] = s_iTotalScore;
        
        /*ADD MORE JSON THIS WAY
        var randB = "randomboolean";
        oJSONData[randB] = true;
        oJSONData["anothernestedjson"] = {foo: 3, pippo: 10};
        */
       
       window.localStorage.setItem(szName, JSON.stringify(oJSONData));
    };

    this.loadData = function(){
       

        var szData = JSON.parse(window.localStorage.getItem(szName));
        
        var aLoadedScore = szData[LOCALSTORAGE_SCORE];
        s_aLevelScore = new Array();
        for(var i=1; i<26; i++){
            s_aLevelScore[i] = parseInt(aLoadedScore[i]);
            if(s_aLevelScore[i] > 0){
                s_aHelpPanelEnabled[i] = false;
            } else {
                s_aHelpPanelEnabled[i] = true;
            }
        }
        
        var iTotalScore = szData[LOCALSTORAGE_TOTALSCORE];
        s_iTotalScore = parseInt(iTotalScore);
        
        var aEnabledLevel = szData[LOCALSTORAGE_ENABLED];
        s_aLevelEnabled = new Array();
        for(var i=1; i<26; i++){
            s_aLevelEnabled[i] = aEnabledLevel[i];
        }
    };

    this.resetData = function(){
        s_iTotalScore = 0;
            
        for(var i=1; i<26; i++){
            s_aLevelScore[i] = 0;
            s_aLevelEnabled[i] = false;
            s_aHelpPanelEnabled[i] = true;
        }
        s_aLevelEnabled[1] = true;

    };

    this._init(szName);
    
}