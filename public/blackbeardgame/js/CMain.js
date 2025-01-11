function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);  
        
        s_oAttachSection = new createjs.Container();
        s_oStage.addChild(s_oAttachSection);
        s_oStage.preventSelection = false;
        
        s_bMobile = isMobile();

        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);   
        }else{
            createjs.Touch.enable(s_oStage, true);
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.framerate = FPS;
	createjs.Ticker.addEventListener("tick", this._update);
	
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        this._loadImages();
        if( (DISABLE_SOUND_DESKTOP === false && s_bMobile === false) ||
                                            s_bMobile === true &&  DISABLE_SOUND_MOBILE === false  ){
            this._initSounds();
        }
        
        
        
        _bUpdate = true;
    };

    this.soundLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);
        
        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './sounds/',filename:'ambience_game',loop:true,volume:1, ingamename: 'ambience_game'});
        s_aSoundsInfo.push({path: './sounds/',filename:'press_but',loop:false,volume:1, ingamename: 'press_but'});
        s_aSoundsInfo.push({path: './sounds/',filename:'reel_stop',loop:false,volume:1, ingamename: 'reel_stop'});
        s_aSoundsInfo.push({path: './sounds/',filename:'reel_stop_bonus',loop:false,volume:1, ingamename: 'reel_stop_bonus'});
        s_aSoundsInfo.push({path: './sounds/',filename:'reel_stop_freespin',loop:false,volume:1, ingamename: 'reel_stop_freespin'});
        s_aSoundsInfo.push({path: './sounds/',filename:'start_reel',loop:false,volume:1, ingamename: 'start_reel'});
        s_aSoundsInfo.push({path: './sounds/',filename:'spin_but',loop:false,volume:1, ingamename: 'spin_but'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol0',loop:false,volume:1, ingamename: 'symbol0'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol1',loop:false,volume:1, ingamename: 'symbol1'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol2',loop:false,volume:1, ingamename: 'symbol2'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol3',loop:false,volume:1, ingamename: 'symbol3'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol4',loop:false,volume:1, ingamename: 'symbol4'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol5',loop:false,volume:1, ingamename: 'symbol5'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol6',loop:false,volume:1, ingamename: 'symbol6'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol7',loop:false,volume:1, ingamename: 'symbol7'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol8',loop:false,volume:1, ingamename: 'symbol8'});
        s_aSoundsInfo.push({path: './sounds/',filename:'symbol9',loop:false,volume:1, ingamename: 'symbol9'});
        s_aSoundsInfo.push({path: './sounds/',filename:'avatar_win_0',loop:false,volume:1, ingamename: 'avatar_win_0'});
        s_aSoundsInfo.push({path: './sounds/',filename:'avatar_win_1',loop:false,volume:1, ingamename: 'avatar_win_1'});
        s_aSoundsInfo.push({path: './sounds/',filename:'end_bonus',loop:false,volume:1, ingamename: 'end_bonus'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_soundtrack',loop:true,volume:1, ingamename: 'bonus_soundtrack'});
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack_menu',loop:true,volume:1, ingamename: 'soundtrack_menu'});
        s_aSoundsInfo.push({path: './sounds/',filename:'freespin_soundtrack',loop:true,volume:1, ingamename: 'freespin_soundtrack'}); 
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_game_cannon_fire',loop:false,volume:1, ingamename: 'bonus_game_cannon_fire'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_game_enemy_hit',loop:false,volume:1, ingamename: 'bonus_game_enemy_hit'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_game_water_splash',loop:false,volume:1, ingamename: 'bonus_game_water_splash'});
        s_aSoundsInfo.push({path: './sounds/',filename:'avatar_start_freespins',loop:false,volume:1, ingamename: 'avatar_start_freespins'});
        s_aSoundsInfo.push({path: './sounds/',filename:'score_counter',loop:false,volume:1, ingamename: 'score_counter'});
        s_aSoundsInfo.push({path: './sounds/',filename:'suspance',loop:true,volume:1, ingamename: 'suspance'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_game_enemy_scream_0',loop:false,volume:1, ingamename: 'bonus_game_enemy_scream_0'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_game_enemy_scream_1',loop:false,volume:1, ingamename: 'bonus_game_enemy_scream_1'});
        s_aSoundsInfo.push({path: './sounds/',filename:'bonus_notify_lose',loop:false,volume:1, ingamename: 'bonus_notify_lose'});
        s_aSoundsInfo.push({path: './sounds/',filename:'start_bonus',loop:false,volume:1, ingamename: 'start_bonus'});
        
        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
        
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
        
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                    if ( s_aSounds[s_aSoundsInfo[i].ingamename]._sounds.length>0 && szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                        s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                        break;
                                                                                    }else{
                                                                                        document.querySelector("#block_game").style.display = "none";
                                                                                    }
                                                                               }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "ambience_game" && s_oGame !== null){
                                                                                                setVolume("ambience_game",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
        
        
    };

    
    this._loadImages = function(){
        
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1_landscape","./sprites/paytable1_landscape.png");
        s_oSpriteLibrary.addSprite("paytable2_landscape","./sprites/paytable2_landscape.png");
        s_oSpriteLibrary.addSprite("paytable3_landscape","./sprites/paytable3_landscape.png");
        s_oSpriteLibrary.addSprite("paytable4_landscape","./sprites/paytable4_landscape.png");
        s_oSpriteLibrary.addSprite("paytable1_portrait","./sprites/paytable1_portrait.png");
        s_oSpriteLibrary.addSprite("paytable2_portrait","./sprites/paytable2_portrait.png");
        s_oSpriteLibrary.addSprite("paytable3_portrait","./sprites/paytable3_portrait.png");
        s_oSpriteLibrary.addSprite("paytable4_portrait","./sprites/paytable4_portrait.png");
        s_oSpriteLibrary.addSprite("mask_slot","./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("mask_slot_freespins","./sprites/mask_slot_freespins.png"); 
        s_oSpriteLibrary.addSprite("win_frame_anim","./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_text","./sprites/but_text.png");
        s_oSpriteLibrary.addSprite("but_text_big","./sprites/but_text_big.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_small","./sprites/msg_box_small.png");
        s_oSpriteLibrary.addSprite("msg_box_win","./sprites/msg_box_win.png");
        s_oSpriteLibrary.addSprite("but_arrow_next","./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev","./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("logo","./sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus","./sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("but_exit_info","./sprites/but_exit_info.png");
        s_oSpriteLibrary.addSprite("bg_ship_0","./sprites/bg_ship_0.png");
        s_oSpriteLibrary.addSprite("bg_ship_1","./sprites/bg_ship_1.jpg");
        s_oSpriteLibrary.addSprite("bg_ship_freespin","./sprites/bg_ship_freespin.png");
        s_oSpriteLibrary.addSprite("bg_freespin","./sprites/bg_freespin.jpg");
        s_oSpriteLibrary.addSprite("bg_cable_freespin","./sprites/bg_cable_freespin.png");
        s_oSpriteLibrary.addSprite("bg_cable","./sprites/bg_cable.png");
        s_oSpriteLibrary.addSprite("amount_freespins","./sprites/amount_freespins.png");
        s_oSpriteLibrary.addSprite("amount_freespin_win","./sprites/amount_freespin_win.png");
        s_oSpriteLibrary.addSprite("amount_bonus_win","./sprites/amount_bonus_win.png");
        
        
       for(var t=0;t<NUM_SYMBOLS;t++){
           s_oSpriteLibrary.addSprite("symbol_"+t,"./sprites/symbol_"+t+".png");
           for(var k=0;k<9;k++){
               s_oSpriteLibrary.addSprite("symbol_"+t+"_"+k,"./sprites/symbols/symbol_"+t+"_"+k+".jpg");
           }
       }
       
       for(var t=0;t<17;t++){
           s_oSpriteLibrary.addSprite("win_frame_anim_big_"+t,"./sprites/win_frame_anim_big_"+t+".png");
       }
       
        s_oSpriteLibrary.addSprite("bet_but","./sprites/paylines/bet_but.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_delete_savings","./sprites/but_delete_savings.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_no","./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_yes","./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_loading_bonus_text","./sprites/bg_loading_bonus_text.png");
        
        for(var k=0;k<5;k++){
            s_oSpriteLibrary.addSprite("logo_menu-"+k,"./sprites/logo_menu-"+k+".png");
        }
        
        s_oSpriteLibrary.addSprite("bg_avatar_portrait","./sprites/bg_avatar_portrait.jpg");
        s_oSpriteLibrary.addSprite("bg_avatar_portrait_freespin","./sprites/bg_avatar_portrait_freespin.jpg");
        
        for(var j=1;j<NUM_PAYLINES+1;j++){
            s_oSpriteLibrary.addSprite("payline_"+j,"./sprites/paylines/payline_"+j+".png");
            
        }
        
        for(var t=0;t<20;t++){
            s_oSpriteLibrary.addSprite("avatar-"+t,"./sprites/avatar/avatar-"+t+".png");
        }
        
        for(var t=0;t<6;t++){
            s_oSpriteLibrary.addSprite("suspance_reel_"+t,"./sprites/suspance_reel_"+t+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

    };
    
    this._onAllImagesLoaded = function(){
        
    };
    

    this._onRemovePreloader = function(){
        APIgetSlotInfos(this.settingPhase,this);
    };
    

    this.settingPhase = function( oInfos){
        try{
            saveItem(LOCALSTORAGE_STRING+"ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
        s_oGameSettings = new CSlotSettings();
        s_oMsgBox = new CMsgBox();
        
        _oPreloader.unload();
        
 
        COIN_BET = oInfos.bets;
        START_BET = oInfos.start_bet;
        MIN_BET  = oInfos.bets[0];
        MIN_REEL_LOOPS = _oData.min_reel_loop;
        REEL_DELAY = _oData.reel_delay;
        TIME_SHOW_WIN = _oData.time_show_win;
        TIME_SHOW_ALL_WINS = _oData.time_show_all_wins;
        //TOTAL_MONEY = oInfos.start_money;  
        ENABLE_FULLSCREEN = oData.fullscreen;
        SHOW_CREDITS = oData.show_credits;
        ENABLE_CHECK_ORIENTATION = oData.check_orientation;
        PAYTABLE_VALUES = oInfos.paytable;

        playSound("soundtrack_menu",0,true);
        this.gotoMenu();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };
    
   this.stopUpdateNoBlock = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false; 
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
                
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);
    };
    
    s_oMain = this;
    _oData = oData;
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;
    NUM_SPIN_FOR_ADS = oData.num_spin_for_ads;
    RESTART_CREDIT = oData.restart_credit;
    s_bAudioActive = oData.audio_enable_on_startup;
    TOTAL_MONEY = START_MONEY = oData.start_credit;
    WIN_OCCURRENCE = oData.win_occurrence;
    FREESPIN_OCCURRENCE = oData.freespin_occur;
    BONUS_OCCURRENCE = oData.bonus_occur;
    SLOT_CASH = oData.slot_cash;

    NUM_FREESPIN = oData.num_freespin;
    BONUS_PRIZE = oData.bonus_prize;
    BONUS_PRIZE_OCCURRENCE = oData.bonus_prize_occur;
    COIN_BETS = oData.coin_bets;
    PAYTABLE_VALUES = oData.paytable;
    FREESPIN_NUM_OCCUR = oData.freespin_num_occur;
            
    initAPI();
    
    this.initContainer();
}

var s_bMobile;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oAttachSection;
var s_oMain;
var s_oSpriteLibrary;
var s_oMsgBox;
var s_oGameSettings;
var s_aSounds;
var s_aSoundsInfo;
var s_bStorageAvailable = true;