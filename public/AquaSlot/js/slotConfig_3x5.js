// 3x5 aqua

var slotConfig_3x5 = {
    symbolSizeY: 243, 
    spinTime: 2000,                 // time, milliseconds
    winShowTime: 3000,              // time, milliseconds
    showWinCoinsMessage : false,    // displaying a message with the amount of money won
    winMessageTime: 2400,           // win message show time
    minWin : 200,                      // to show big, mega, huge popup
    useBigWinCongratulation : true,    // to show big, mega, huge popup
    showWinFreeSpinsMessage : true,    // show free spin message
    showFreeGameMessage : true,

    symbAnimFrameRate: 22,      // symbols animation frame rate
    frameWidth : 264,           // frame width
    frameHeight : 243,          // frame height

    playSpinSound: false,

    lineColor : 0xFFEA31,       // line color
    showWinLines : true,

    lineBetMaxValue: 20,        // slot line bet maxvalue
    useWild: true,              // use wild flag, wild can be substitute for any symbol to create winning combinations (exclude first reel)
    wild: 'Wild',               // wild symbol name
    useScatter: true,           // use scatter flag - we will use the scatter functionality
    scatter: 'Scatter',         // scatter symbol name
    selectedLines: 'all',       //'all' / 'first' - selectad lines at start

    useWildInFirstPosition: false,              // substitute of the first symbol not allowed
    useLineBetMultiplier: true,                 // win multiplied by bet
    useLineBetFreeSpinMultiplier: false,        // free spins win multiplied by bet
    //defaultCoins: 100000,                       // default player credit 100 000

    localOffsetX: 0,                            // x offset from center for all scene objects
    localOffsetY: 70,                           // y offset from center for all scene objects

    maxHold: 2,                                 // the maximum number of slot reels that can be held
    
    fonts: [
        {
            fontName: 'gameFont_0',
            filePNG:  'fonts/blogger_0.png',
            fileXML:  'fonts/blogger_0.xml'
        },

        {
            fontName: 'gameFont_1',
            filePNG:  'fonts/blogger_1.png',
            fileXML:  'fonts/blogger_1.xml'
        },
        {
            fontName: 'gameFont_2',
            filePNG:  'fonts/blogger_2.png',
            fileXML:  'fonts/blogger_2.xml'
        },
        /*
        {
            fontName: 'gameFont_3',
            filePNG:  'fonts/*.png',
            fileXML:  'fonts/*.xml'
        },
        */
    ],

    sprites: [
        // debug reference
        {
            fileName: null,
            name: 'debugreference'
        },

        // common sprites 
        {
            fileName: 'SlotMachine_3x5.png',
            name: 'slot'
        },
        {
            fileName: 'ReelBorder.png',
            name: 'reelborder'
        },
        {
            fileName: null,
            name: 'paneljackpot'
        },
        {
            fileName: 'ButtonPlus.png',
            name: 'button_plus'
        },
        {
            fileName: 'ButtonPlusHover.png',
            name: 'button_plus_hover'
        },
        {
            fileName: 'ButtonMinus.png',
            name: 'button_minus'
        },
        {
            fileName: 'ButtonMinusHover.png',
            name: 'button_minus_hover'
        },
        {
            fileName: 'PanelTotalBet.png',
            name: 'panel_totalbet'
        },
        {
            fileName: 'PanelWin.png',
            name: 'panel_win'
        },
        {
            fileName: 'PanelLines.png',
            name: 'panel_lines'
        },
        {
            fileName: 'PanelBalance.png',
            name: 'panel_balance'
        },
        {
            fileName: null,
            name: 'panel_menu'
        },
        {
            fileName: null,
            name: 'button_lines'
        },
        {
            fileName: null,
            name: 'button_lines_hover'
        },
        {
            fileName: null,
            name: 'button_maxbet'
        },
        {
            fileName: null,
            name: 'button_maxbet_hover'
        },
        {
            fileName: 'ButtonSpin.png',
            name: 'button_spin'
        },
        {
            fileName: 'ButtonSpinHover.png',
            name: 'button_spin_hover'
        },
        {
            fileName: null,
            name: 'button_autospin'
        },
        {
            fileName: null,
            name: 'button_autospin_hover'
        },
        {
            fileName: null,
            name: 'line_button'
        },
        {
            fileName: null,
            name: 'line_button_hover'
        },
        {
            fileName: 'ButtonHold.png',
            name: 'button_hold'
        },
        {
            fileName: 'ButtonHoldHover.png',
            name: 'button_hold_on'
        },
        {
            fileName: null,
            name: 'progress_base'
        },
        {
            fileName: null,
            name: 'progress_fill'
        },
        {
            fileName: null,
            name: 'progress_spot'
        },

        // common gui sprites 
        {
            fileName: 'ButtonMenu.png',
            name: 'button_menu'
        },
        {
            fileName: 'ButtonMenuHover.png',
            name: 'button_menu_hover'
        },
        {
            fileName: 'ButtonInfo.png',
            name: 'button_info'
        },
        {
            fileName: 'ButtonInfoHover.png',
            name: 'button_info_hover'
        },
        {
            fileName: 'ButtonSettings.png',
            name: 'button_settings'
        },
        {
            fileName: 'ButtonSettingsHover.png',
            name: 'button_settings_hover'
        },
        {
            fileName: 'ButtonRules.png',
            name: 'button_rules'
        },
        {
            fileName: 'ButtonRulesHover.png',
            name: 'button_rules_hover'
        },
        {
            fileName: 'gui/ButtonOn.png',
            name: 'button_on'
        },
        {
            fileName: 'gui/ButtonOff.png',
            name: 'button_off'
        },
        {
            fileName: 'gui/MessagePanel.png',
            name: 'message_panel'
        },   
        {
            fileName: 'gui/SmallMessagePanel.png',
            name: 'small_message_panel'
        }, 
        {
            fileName: 'gui/AboutPanel.png',
            name: 'about_panel'
        },  
        {
            fileName: 'gui/SettingsPanel.png',
            name: 'settings_panel'
        }, 
        {
            fileName: 'gui/FreeSpinPanel.png',
            name: 'freespin_panel'
        }, 
        {
            fileName: 'gui/BigWinPanel.png',
            name: 'bigwin_panel'
        }, 
        {
            fileName: 'gui/HugeWinPanel.png',
            name: 'hugewin_panel'
        }, 
        {
            fileName: 'gui/MegaWinPanel.png',
            name: 'megawin_panel'
        }, 
        {
            fileName: null,
            name: 'settings_title'
        },
        {
            fileName: 'gui/PayLinesTable.png',
            name: 'paylines_table'
        },
        {
            fileName: null,
            name: 'minor_title'
        },
        {
            fileName: null,
            name: 'major_title'
        },
        {
            fileName: null,
            name: 'rules_title'
        },
        {
            fileName: null,
            name: 'special_title'
        },
        {
            fileName: 'gui/SymbolPlate.png',
            name: 'symbol_plate'
        },
        {
            fileName: 'gui/SpecSymbolPlate.png',
            name: 'specsymbol_plate'
        },
        {
            fileName: 'gui/Logo.png',
            name: 'logo'
        }, 
        {
            fileName: 'gui/ExitButton.png',
            name: 'exit_button'
        }, 
        {
            fileName: 'gui/ExitButtonHover.png',
            name: 'exit_button_hover'
        },   
        {
            fileName: null, 
            name: 'middle_button'
        }, 
        {
            fileName: null, 
            name: 'middle_button_hover'
        },   
        {
            fileName: 'gui/LongButton.png', 
            name: 'long_button'
        }, 
        {
            fileName: 'gui/LongButtonHover.png', 
            name: 'long_button_hover'
        }, 
        {
            fileName: 'gui/ExtraLongButton.png', 
            name: 'extralong_button'
        }, 
        {
            fileName: 'gui/ExtraLongButtonHover.png', 
            name: 'extralong_button_hover'
        },
        {
            fileName: 'gui/SmallButton.png', 
            name: 'small_button'
        }, 
        {
            fileName: 'gui/SmallButtonHover.png', 
            name: 'small_button_hover'
        }, 
        {
            fileName: 'gui/InfoPanel.png', 
            name: 'info_panel'
        },  
        {
            fileName: null, 
            name: 'help_title'
        },  
        {
            fileName: 'gui/JackpotWinPanel.png', 
            name: 'jackpotwin_panel'
        },   
        {
            fileName: null, 
            name: 'jackpotwin_title'
        }, 
        {
            fileName: 'gui/popUpBkg.png', 
            name: 'pu_background'
        },   
        {
            fileName: 'gui/grayBkg_01.png', 
            name: 'gray_01'
        }, 
        {
            fileName: 'gui/NextButtonHover.png', 
            name: 'next_button_hover'
        },
        {
            fileName: 'gui/NextButton.png', 
            name: 'next_button'
        },  
        {
            fileName: 'gui/PrevButtonHover.png', 
            name: 'prev_button_hover'
        },   
        {
            fileName: 'gui/PrevButton.png', 
            name: 'prev_button'
        },        
        {
            fileName: 'gui/SoundOn.png',  
            name: 'soundon'
        },  
        {
            fileName: 'gui/SoundOff.png',  
            name: 'soundoff'
        }, 
        {
            fileName: 'gui/MusicOn.png', 
            name: 'musicon'
        }, 
        {
            fileName: 'gui/MusicOff.png',
            name: 'musicoff'
        },  
        {
            fileName: null, 
            name: 'symbol_plate'
        },   
        {
            fileName: null, 
            name: 'specsymbol_plate'
        },   
        {
            fileName: 'gui/NaviMarker.png', 
            name: 'navi_dot'
        },    
        {
            fileName: 'gui/NaviMarkerActive.png', 
            name: 'navi_dot_active'
        },   
        {
            fileName: 'gui/LampOff.png', 
            name: 'lamp_off'
        },  
        {
            fileName: 'gui/LampOn.png', 
            name: 'lamp_on'
        },  
        {
            fileName: 'gui/ChestGamePanel.png', 
            name: 'chestgame_panel'
        }, 
        {
            fileName: 'gui/ChestGameSmallPanel.png', 
            name: 'chestgamesmall_panel'
        }, 
        {
            fileName: 'gui/ChestOpened.png', 
            name: 'chest_opened'
        }, 
        {
            fileName: 'gui/ChestClosed.png', 
            name: 'chest_closed'
        }, 
        {
            fileName: 'gui/ChestGameCoin.png', 
            name: 'chestgame_coin'
        }, 
    ],

    symbols:
    [
        {
            fileName: 'Crab.png',                      // filename or null
            name: 'Crab',                              // sprite name
            fileNameBlurred: 'CrabBlurred.png',        // blurry symbol file name, folder png/SymbolsBlurred
            animation: 'CrabSheet.png',                // animation sheet file name, folder png/SymbolsSheet
            useWildSubstitute: true                     // use wild substitute for the symbol
        },
        {
            fileName: 'Hedgehog.png',           
            name: 'Hedgehog',                   
            fileNameBlurred: 'HedgehogBlurred.png', 
            animation: 'HedgehogSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Asymb.png',          
            name: 'Asymb',                   
            fileNameBlurred: 'AsymbBlurred.png', 
            animation: 'AsymbSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Turtle.png',          
            name: 'Turtle',                   
            fileNameBlurred: 'TurtleBlurred.png', 
            animation: 'TurtleSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Jellyfish.png',          
            name: 'Jellyfish',                   
            fileNameBlurred: 'JellyfishBlurred.png', 
            animation: 'JellyfishSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Jsymb.png',          
            name: 'Jsymb',                   
            fileNameBlurred: 'JsymbBlurred.png', 
            animation: 'JsymbSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Ksymb.png',          
            name: 'Ksymb',                   
            fileNameBlurred: 'KsymbBlurred.png', 
            animation: 'KsymbSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Qsymb.png',          
            name: 'Qsymb',                   
            fileNameBlurred: 'QsymbBlurred.png', 
            animation: 'QsymbSheet.png',
            useWildSubstitute: true
        },
        {
            fileName: 'Wild.png',          
            name: 'Wild',                   
            fileNameBlurred: 'WildBlurred.png', 
            animation: 'WildSheet.png',
            useWildSubstitute: false
        },
        {
            fileName: 'Scatter.png',          
            name: 'Scatter',                   
            fileNameBlurred: 'ScatterBlurred.png', 
            animation: 'ScatterSheet.png',
            useWildSubstitute: false
        },
        {
            fileName: 'Jackpot.png',          
            name: 'Jackpot',                   
            fileNameBlurred: 'JackpotBlurred.png', 
            animation: 'JackpotSheet.png',
            useWildSubstitute: false
        }
    ],

    reels:[
        {//0
            symbolImages: ['Hedgehog', 'Jellyfish', 'Jsymb', 'Hedgehog', 'Qsymb', 'Crab', 'Turtle', 'Ksymb', 'Hedgehog', 'Asymb', 'Scatter', 'Crab'], 
            offsetX: -544,
            offsetY: -116,
            windowImage: 'reel',    // not used
            windowsCount: 3,    
            addSpinTime: 0, // additional spin time for reel milliseconds   
        },
        {//1
            symbolImages: ['Hedgehog', 'Crab', 'Hedgehog','Qsymb', 'Jellyfish', 'Jsymb', 'Crab', 'Ksymb','Asymb', 'Turtle', 'Scatter', 'Crab', 'Hedgehog', 'Jellyfish', 'Turtle', 'Crab'], 
            offsetX: -272,
            offsetY: -116,
            windowImage: 'reel',        // not used
            windowsCount: 3,    
            addSpinTime: 100, // additional spin time for reel milliseconds   
        },
        { // 2
            symbolImages: ['Scatter', 'Hedgehog', 'Ksymb', 'Crab', 'Qsymb', 'Crab', 'Jellyfish', 'Jsymb', 'Asymb', 'Hedgehog', 'Turtle'],
            offsetX: 0,
            offsetY: -116,
            windowImage: 'reel',        // not used
            windowsCount: 3,
            addSpinTime: 200, // additional spin time for reel milliseconds   
        },
        { // 3
            symbolImages: ['Crab', 'Jellyfish', 'Jsymb', 'Qsymb', 'Hedgehog', 'Crab', 'Ksymb', 'Asymb', 'Hedgehog', 'Scatter', 'Crab', 'Hedgehog','Turtle'],
            offsetX: 272,
            offsetY: -116,
            windowImage: 'reel',        // not used
            windowsCount: 3,
            addSpinTime: 300, // additional spin time for reel milliseconds     
        },
        { // 4
            symbolImages: ['Crab', 'Hedgehog', 'Crab', 'Jellyfish', 'Jsymb', 'Crab', 'Qsymb', 'Asymb', 'Scatter','Hedgehog', 'Ksymb', 'Turtle'],
            offsetX: 544,
            offsetY: -116,
            windowImage: 'reel',        // not used
            windowsCount: 3,
            addSpinTime: 400, // additional spin time for reel milliseconds     
        }
    ],

    // reels_simulate: [0, 0, -1, -1, -1],              // -1 avoid reel simulate
    // reels_simulate: [10, 10, -1, -1, 8],             // >=3 scatter win 

/*
// just uncomment this piece of code and you will get 20 slot lines
lines: [				// predefined  slot lines positions 0 - most bottom window on reels
		[1,1,1,1,1],	// line 0 
		[2,2,2,2,2],	// line 1 
		[0,0,0,0,0],	// line 2 
		[2,1,0,1,2],	// line 3 
		[0,1,2,1,0],	// line 4 
		[1,2,1,2,1],	// line 5 
		[1,0,1,0,1],	// line 6 
		[2,2,1,0,0],	// line 7 
		[0,0,1,2,2],	// line 8 
		[1,0,1,2,1],	// line 9 
		[1,2,1,0,1],	// line 10 
		[2,1,1,1,2],	// line 11 
		[0,1,1,1,0],	// line 12 
		[2,1,2,1,2],	// line 13 
		[0,1,0,1,0],	// line 14 
		[1,1,2,1,1],	// line 15 
		[1,1,0,1,1],	// line 16 
		[2,2,0,2,2],	// line 17 
		[0,0,2,0,0],	// line 18 
		[2,0,0,0,2],	// line 19 
],
*/

    payLines:[
        {
            line: ['Crab', 'Crab', 'Crab', 'Crab', 'Crab'],
            pay: 3,
            freeSpins: 0
        },
        {
            line: ['Crab', 'Crab', 'Crab', 'Crab', 'any'],
            pay: 2,
            freeSpins: 0
        },
        {
            line: ['Crab', 'Crab', 'Crab', 'any', 'any'],
            pay: 1,
            freeSpins: 0
        },
        {
            line: ['Hedgehog', 'Hedgehog', 'Hedgehog', 'Hedgehog', 'Hedgehog'],
            pay: 5,
            freeSpins: 0
        },
        {
            line: ['Hedgehog', 'Hedgehog', 'Hedgehog', 'Hedgehog', 'any'],
            pay: 3,
            freeSpins: 0
        },
        {
            line: ['Hedgehog', 'Hedgehog', 'Hedgehog', 'any', 'any'],
            pay: 1,
            freeSpins: 0
        },
        {
            line: ['Jellyfish', 'Jellyfish', 'Jellyfish', 'Jellyfish', 'Jellyfish'],
            pay: 7,
            freeSpins: 0
        },
        {
            line: ['Jellyfish', 'Jellyfish', 'Jellyfish', 'Jellyfish', 'any'],
            pay: 3,
            freeSpins: 0
        },
        {
            line: ['Jellyfish', 'Jellyfish', 'Jellyfish', 'any', 'any'],
            pay: 2,
            freeSpins: 0
        },
        {
            line: ['Turtle', 'Turtle', 'Turtle', 'Turtle', 'Turtle'],
            pay: 8,
            freeSpins: 0
        },
        {
            line: ['Turtle', 'Turtle', 'Turtle', 'Turtle', 'any'],
            pay: 3,
            freeSpins: 0
        },
        {
            line: ['Turtle', 'Turtle', 'Turtle', 'any', 'any'],
            pay: 2,
            freeSpins: 0
        },
        {
            line: ['Jsymb', 'Jsymb', 'Jsymb', 'Jsymb', 'Jsymb'],
            pay: 17,
            freeSpins: 0
        },
        {
            line: ['Jsymb', 'Jsymb', 'Jsymb', 'Jsymb', 'any'],
            pay: 13,
            freeSpins: 0
        },
        {
            line: ['Jsymb', 'Jsymb', 'Jsymb', 'any', 'any'],
            pay: 11,
            freeSpins: 0
        },
        {
            line: ['Qsymb', 'Qsymb', 'Qsymb', 'Qsymb', 'Qsymb'],
            pay: 19,
            freeSpins: 0
        },
        {
            line: ['Qsymb', 'Qsymb', 'Qsymb', 'Qsymb', 'any'],
            pay: 13,
            freeSpins: 0
        },
        {
            line: ['Qsymb', 'Qsymb', 'Qsymb', 'any', 'any'],
            pay: 11,
            freeSpins: 0
        },
        {
            line: ['Ksymb', 'Ksymb', 'Ksymb', 'Ksymb', 'Ksymb'],
            pay: 20,
            freeSpins: 0
        },
        {
            line: ['Ksymb', 'Ksymb', 'Ksymb', 'Ksymb', 'any'],
            pay: 14,
            freeSpins: 0
        },
        {
            line: ['Ksymb', 'Ksymb', 'Ksymb', 'any', 'any'],
            pay: 11,
            freeSpins: 0
        },
        {
            line: ['Asymb', 'Asymb', 'Asymb', 'Asymb', 'Asymb'],
            pay: 25,
            freeSpins: 0
        },
        {
            line: ['Asymb', 'Asymb', 'Asymb', 'Asymb', 'any'],
            pay: 15,
            freeSpins: 0
        },
        {
            line: ['Asymb', 'Asymb', 'Asymb', 'any', 'any'],
            pay: 11,
            freeSpins: 0
        },
    ],
    
    scatterPayTable:[
        {
            scattersCount: 3,
            pay: 0,
            freeSpins: 3,
            winEventString: null // this method will be called when winnings are shown (slotGame-> *winShowC)
        },
        {
            scattersCount: 4,
            pay: 0,
            freeSpins: 0,
            winEventString: 'slotConfig.showChestsPU_4' // this method will be called when winnings are shown (slotGame-> *winShowC) - small mini-game
        },
        {
            scattersCount: 5,
            pay: 0,
            freeSpins: 0,
            winEventString: 'slotConfig.showChestsPU_5' // this method will be called when winnings are shown (slotGame-> *winShowC) - big mini-game
        }    
    ],
    
    // jackpot settings - not used
    jackpot:
        {
            symbolName: null,
            symbolsCount: 6,
            defaultAmount: 1000,        // coins amout at start
            increaseValue: 1,           // jackpot increment after spin
        },

    createSlotGraphic: function(scene){
        // scene.background =  scene.addSpriteLocPos('background', 0, 0); //?.setScale(1.5);
        // scene.background.depth = -5;

        /*
        scene.debugreference =  scene.addSpriteLocPos('debugreference', 0, -67); //?.setScale(1.5);
        scene.debugreference.depth = 2000;
        scene.debugreference.setAlpha(0.0);
        */

        scene.slot =  scene.addSpriteLocPos('slot', 0, -116); 
        scene.slot.depth = -1;
        // scene.paneljackpot =  scene.addSpriteLocPos('paneljackpot', 0, -450);    
        scene.reelborder =  scene.addSpriteLocPos('reelborder', 30, -160); 
    },

    createReels: function(scene) {
        var _reels = [];
        for(var ri = 0; ri < this.reels.length; ri++)
        {
            _reels.push(new Reel(scene, this.reels[ri], ri, this.symbolSizeY, this.reels[ri].windowsCount, true, this.spinTime, this.symbAnimFrameRate));
        }
        return _reels;
    },

    createControls: function(scene, slotControls) {
        let depth = 11;
        slotControls.spinTextString = 'Spin';

        // panels
        slotControls.linesPanel = scene.addSpriteLocPos('panel_lines', -700, 410); 
        slotControls.linesPanel.setDepth(depth); 
        slotControls.totalbetPanel = scene.addSpriteLocPos('panel_totalbet', -373, 410);
        slotControls.totalbetPanel.setDepth(depth); 
        slotControls.balancePanel = scene.addSpriteLocPos('panel_balance', 373, 410); 
        slotControls.balancePanel.setDepth(depth); 
        slotControls.winPanel = scene.addSpriteLocPos('panel_win', 700, 410); 
        slotControls.winPanel.setDepth(depth); 
        // slotControls.menuPanel = scene.addSpriteLocPos('panel_menu', -730, -230); 
        // slotControls.menuPanel.setDepth(depth); 
        // slotControls.menuPanel.setVisible(false);

        // totalbet minus button
        slotControls.totalBetMinusButton = new SceneButton(scene, 'button_minus','button_minus_hover', false);   
        slotControls.buttons.push(slotControls.totalBetMinusButton);
        slotControls.totalBetMinusButton.create(-373 - 102, 401, 0.5, 0.5);
        slotControls.totalBetMinusButton.addClickEvent(slotControls.lineBetMinus_Click, slotControls);
        slotControls.totalBetMinusButton.setDepth(depth); 
 
        // totalbet plus button
        slotControls.totalBetPlusButton = new SceneButton(scene, 'button_plus','button_plus_hover', false);   
        slotControls.buttons.push(slotControls.totalBetPlusButton);
        slotControls.totalBetPlusButton.create(-373 + 100, 401, 0.5, 0.5);
        slotControls.totalBetPlusButton.addClickEvent(slotControls.lineBetPlus_Click, slotControls);
        slotControls.totalBetPlusButton.setDepth(depth);        

        // maxbet button - not used
        /*
        slotControls.slotMaxBetButton = new SceneButton(scene, 'button_maxbet', 'button_maxbet_hover', false);   
        slotControls.buttons.push(slotControls.slotMaxBetButton);
        slotControls.slotMaxBetButton.create(-100, 178 + 238, 0.5, 0.5);
        slotControls.slotMaxBetButton.addClickEvent(slotControls.maxBet_Click, slotControls);     
        slotControls.slotMaxBetButton.setDepth(depth); 
        */ 

        // autoSpin button - not used
        slotControls.slotAutoSpinButton = new SceneButton(scene, 'button_autospin', 'button_autospin_hover', true); 
        slotControls.buttons.push(slotControls.slotAutoSpinButton);
        slotControls.slotAutoSpinButton.create(100, 178 + 238, 0.5, 0.5);
        slotControls.slotAutoSpinButton.button.setVisible(false);   
        slotControls.changeAutoSpinModeEvent.add((autoSpin)=>
        {
            if (!autoSpin)
            {
                slotControls.slotAutoSpinButton.release();
            }
        }, this);
        slotControls.slotAutoSpinButton.setDepth(depth); 

        // spin button
        slotControls.slotSpinButton = new SpinButton(scene, 'button_spin', 'button_spin_hover', false);   
        slotControls.buttons.push(slotControls.slotSpinButton);
        slotControls.slotSpinButton.create(0, 380, 0.5, 0.5);    
        slotControls.slotSpinButton.clickEvent.add(scene.handleAnimation, scene);  
        slotControls.slotSpinButton.setDepth(depth); 

        // menu button
        slotControls.menuButton = new SceneButton(scene, 'button_menu', 'button_menu_hover', true);   
        slotControls.buttons.push(slotControls.menuButton);
        slotControls.menuButton.create(-846, -438, 0.5, 0.5);
        slotControls.menuButton.addClickEvent(()=>{ 
            console.log('menu click');
            slotControls.settingsButton.button.setVisible(!slotControls.settingsButton.button.visible);  
            slotControls.rulesButton.button.setVisible(!slotControls.rulesButton.button.visible); 
            slotControls.slotInfoButton.button.setVisible(!slotControls.slotInfoButton.button.visible); 
            // slotControls.menuPanel.setVisible(!slotControls.menuPanel.visible); 
            scene.soundController.playClip('button_click');}, this);
        slotControls.menuButton.button.setVisible(true); 
        slotControls.menuButton.setDepth(depth); 

        // settings button
        slotControls.settingsButton = new SceneButton(scene, 'button_settings', 'button_settings_hover', false);   
        slotControls.buttons.push(slotControls.settingsButton);
        slotControls.settingsButton.create(-846, -297, 0.5, 0.5);
        slotControls.settingsButton.addClickEvent(()=>{ 
            console.log('settings click');
            var pu = scene.guiController.showPopUp(this.createSettingsPUHandler);
            scene.soundController.playClip('button_click');}, this);
        slotControls.settingsButton.button.setVisible(false);  
        slotControls.settingsButton.setDepth(depth); 

               // rules button
       slotControls.rulesButton = new SceneButton(scene, 'button_rules', 'button_rules_hover', false);   
       slotControls.buttons.push(slotControls.rulesButton);
       slotControls.rulesButton.create(-846, -156, 0.5, 0.5);
       slotControls.rulesButton.addClickEvent(()=>{
           var pu = scene.guiController.showPopUp(this.createInfoPUHandler);
           scene.soundController.playClip('button_click');
       }, this);   
       slotControls.rulesButton.button.setVisible(false); 
       slotControls.rulesButton.setDepth(depth); 

       // info button
       slotControls.slotInfoButton = new SceneButton(scene, 'button_info', 'button_info_hover', false);   
       slotControls.buttons.push(slotControls.slotInfoButton);
       slotControls.slotInfoButton.create(-846, -15, 0.5, 0.5);
       slotControls.slotInfoButton.addClickEvent(()=>{
            console.log('info click');
           var pu = scene.guiController.showPopUp(this.createAboutPUHandler);
           scene.soundController.playClip('button_click');
       }, this);   
       slotControls.slotInfoButton.button.setVisible(false); 
       slotControls.slotInfoButton.setDepth(depth); 

        // sound button
        // slotControls.soundButton = new SceneButton(scene, 'button_on', 'button_off', true);   
        // slotControls.buttons.push(slotControls.soundButton);
        // slotControls.soundButton.create(-860, -300, 0.5, 0.5);
        // slotControls.soundButton.addClickEvent(()=>{scene.soundController.soundOn(!scene.soundController._soundOn);}, scene);
        // slotControls.soundButton.button.setVisible(true); 

        // lines loop button - not used
        // slotControls.slotLinesLoopButton = new SceneButton(scene, 'button_lines', 'button_lines_hover', false);   
        // slotControls.buttons.push(slotControls.slotLinesLoopButton);
        // slotControls.slotLinesLoopButton.create(-700, 212 + 220, 0.5, 0.5);
        // slotControls.slotLinesLoopButton.addClickEvent(slotControls.linesLoop_Click, slotControls);

        // lines minus button - not used
        // slotControls.linesMinusButton = new SceneButton(scene, 'button_minus','button_minus_hover', false);   
        // slotControls.buttons.push(slotControls.linesMinusButton);
        // slotControls.linesMinusButton.create(-700 - 102, 401, 0.5, 0.5);
        // slotControls.linesMinusButton.addClickEvent(slotControls.linesMinus_Click, slotControls);
        // slotControls.linesMinusButton.setDepth(depth); 
         
        // lines plus button - not used
        // slotControls.linesPlusButton = new SceneButton(scene, 'button_plus','button_plus_hover', false);   
        // slotControls.buttons.push(slotControls.linesPlusButton);
        // slotControls.linesPlusButton.create(-700 + 100, 401, 0.5, 0.5);
        // slotControls.linesPlusButton.addClickEvent(slotControls.linesPlus_Click, slotControls);
        // slotControls.linesPlusButton.setDepth(depth); 

        // adding the text fields
        slotControls.linesText = scene.add.bitmapText(scene.centerX - 700, scene.centerY + 327, 'gameFont_2', 'Lines', 64, 1).setOrigin(0.5);
        slotControls.linesText.depth = depth;
        slotControls.linesCountText = scene.add.bitmapText(scene.centerX - 700, scene.centerY + 410, 'gameFont_0', slotControls.selectedLinesCount, 64, 1).setOrigin(0.5);
        slotControls.linesCountText.tint = 0x9b7efd;
        slotControls.linesCountText.depth = depth;

        slotControls.lineBetAmountText = scene.add.bitmapText(scene.centerX - 373, scene.centerY + 125 + 220, 'gameFont_2', slotControls.lineBet, 42, 1).setOrigin(0.5);
        slotControls.lineBetAmountText.setVisible(false);
        slotControls.lineBetAmountText.depth = depth;
 
        slotControls.totalBetText = scene.add.bitmapText(scene.centerX - 373, scene.centerY + 327, 'gameFont_2', 'Total  Bet', 64, 1).setOrigin(0.5);
        slotControls.totalBetText.depth = depth;
  
        slotControls.totalBetSumText = scene.add.bitmapText(scene.centerX - 373, scene.centerY + 410, 'gameFont_0', slotControls.getTotalBet(), 64, 1).setOrigin(0.5);
        slotControls.totalBetSumText.tint = 0x9b7efd;
        slotControls.totalBetSumText.depth = depth;
 
        slotControls.creditText = scene.add.bitmapText(scene.centerX + 373, scene.centerY + 327, 'gameFont_2', 'Balance', 64, 1).setOrigin(0.5);
        slotControls.creditText.depth = depth;

        slotControls.creditSumText = scene.add.bitmapText(scene.centerX + 373, scene.centerY + 410, 'gameFont_0', '' + scene.slotPlayer.coins, 64, 1).setOrigin(0.5);
        slotControls.creditSumText.tint = 0x9b7efd;
        slotControls.creditSumText.depth = depth;
         
        slotControls.winText = scene.add.bitmapText(scene.centerX + 700, scene.centerY + 327, 'gameFont_2', 'Your  Win', 64, 1).setOrigin(0.5);
        slotControls.winText.depth = depth;

        slotControls.winAmountText = scene.add.bitmapText(scene.centerX + 700, scene.centerY + 410, 'gameFont_0', '0', 64, 1).setOrigin(0.5);
        slotControls.winAmountText.tint = 0x9b7efd;
        slotControls.winAmountText.depth = depth;

        slotControls.jackpotAmountText = scene.add.bitmapText(scene.centerX + 0, scene.centerY - 687 + 220, 'gameFont_2', '0', 42, 1).setOrigin(0.5);
        slotControls.jackpotAmountText.setVisible(false);
        slotControls.jackpotAmountText.depth = depth;

        slotControls.autoSpinText = scene.add.bitmapText(scene.centerX + 122, scene.centerY + 163 + 220, 'gameFont_2', 'AUTO', 37, 1).setOrigin(0.5);
        slotControls.autoSpinText.setLetterSpacing(-5);
        slotControls.autoSpinText.depth = depth;
        slotControls.autoSpinText.setVisible(false);

        slotControls.autoSpinText1 = scene.add.bitmapText(scene.centerX + 122, scene.centerY + 190 + 220, 'gameFont_2', 'SPIN', 37, 1).setOrigin(0.5);
        slotControls.autoSpinText1.setLetterSpacing(-1);
        slotControls.autoSpinText1.depth = depth;
        slotControls.autoSpinText1.setVisible(false);

        slotControls.maxBetText = scene.add.bitmapText(scene.centerX - 122, scene.centerY + 163 + 220, 'gameFont_2', 'MAX', 37, 1).setOrigin(0.5);
        slotControls.maxBetText.setLetterSpacing(-6);
        slotControls.maxBetText.depth = depth;
        slotControls.maxBetText.setVisible(false);

        slotControls.maxBetText1 = scene.add.bitmapText(scene.centerX - 124, scene.centerY + 190 + 220, 'gameFont_2', 'BET', 37, 1).setOrigin(0.5);
        slotControls.maxBetText1.setLetterSpacing(4);
        slotControls.maxBetText1.depth = depth;
        slotControls.maxBetText1.setVisible(false);
        
        slotControls.spinText = scene.add.bitmapText(scene.centerX - 0, scene.centerY + 375, 'gameFont_1', slotControls.spinTextString, 84, 1).setOrigin(0.5);
        slotControls.spinText.setLetterSpacing(5);
        slotControls.spinText.depth = depth;

        slotControls.infoText = scene.add.bitmapText(scene.centerX, scene.centerY + 400 + 200, 'gameFont_2', 'info', 30, 1).setOrigin(0.5);
        slotControls.infoText.setVisible(false);
        slotControls.infoText.depth = depth;

        slotControls.freeSpinCountText = scene.add.bitmapText(scene.centerX, scene.centerY + 400 + 200, 'gameFont_1', '99', 130, 1).setOrigin(0.5); // not used
        slotControls.freeSpinCountText.setVisible(false);
        slotControls.freeSpinCountText.depth = depth;

        // hold feature
        slotControls.holdButtons = [];
        for(var ri = 0; ri < this.reels.length; ri++)
        {
            var butt = 'holdButton' + ri;
            slotControls[butt] = new SceneButton(scene, 'button_hold', 'button_hold_on', true);   
            slotControls.buttons.push(slotControls[butt]);
            slotControls.holdButtons.push(slotControls[butt]);
            slotControls[butt].create(-544 + ri * 272, -512, 0.5, 0.5);
            slotControls[butt].setDepth(depth); 
            slotControls[butt].button.setVisible(true); 
            slotControls[butt].reelNumber = ri;
        }

         slotControls.holdMultiplierTextL = scene.add.bitmapText(scene.centerX - 760, scene.centerY - 130, 'gameFont_2', 'x 1', 100, 1).setOrigin(1, 0.5);      // left side text
         slotControls.holdMultiplierTextL.setVisible(true);
         slotControls.holdMultiplierTextL.depth = depth -1;
         slotControls.holdMultiplierTextR = scene.add.bitmapText(scene.centerX + 770, scene.centerY - 130, 'gameFont_2', 'x 1', 100, 1).setOrigin(0, 0.5);      // right side text
         slotControls.holdMultiplierTextR.setVisible(true);
         slotControls.holdMultiplierTextR.depth = depth - 1;

         slotControls.hold = new HoldFeature(scene, slotControls.holdButtons, this.maxHold); // create hold feature 
    },
   
    createInfoPUHandler: function(popup)
    {
        function createSymbolPlate5x (popup, parentContainer, symbSpriteName, posX, posY, price3x,price4x, price5x)
        {
            let symbContainer = popup.scene.add.container(posX, posY);
            parentContainer.add(symbContainer);
            let symbPanel = popup.scene.add.sprite(30, 0, 'symbol_plate').setOrigin(0.5);
            symbContainer.add(symbPanel);
            let symbIcon = popup.scene.add.sprite(-100, 0, symbSpriteName).setOrigin(0.5).setScale(0.8);
            symbContainer.add(symbIcon);
    
            let textXPos = -0;
            let text3x = popup.scene.add.bitmapText(textXPos, 40, 'gameFont_0', '3X', 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text3x);
            let text3x1 = popup.scene.add.bitmapText(textXPos + 55, 40, 'gameFont_1', '- ' + price3x, 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text3x1);
    
            let text4x = popup.scene.add.bitmapText(textXPos, 0, 'gameFont_0', '4X', 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text4x);
            let text4x1 = popup.scene.add.bitmapText(textXPos + 55, 0, 'gameFont_1', '- ' + price4x, 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text4x1);

            let text5x = popup.scene.add.bitmapText(textXPos, -40, 'gameFont_0', '5X', 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text5x);
            let text5x1 = popup.scene.add.bitmapText(textXPos + 55, -40, 'gameFont_1', '- ' + price5x, 42, 1).setOrigin(0, 0.5);
            symbContainer.add(text5x1);
        };

        function createSpecSymbolPlate(popup, parentContainer, symbSpriteName, posX, posY, info)
        {
            let symbContainer = popup.scene.add.container(posX, posY);
            parentContainer.add(symbContainer);
            let symbIcon = popup.scene.add.sprite(0, 0, symbSpriteName).setOrigin(0.5, 0.5).setScale(0.8);
            symbContainer.add(symbIcon);
    
            let textInfo = popup.scene.add.bitmapText(145, 0, 'gameFont_0', info, 34, 0).setOrigin(0, 0.5);
            // textInfo.tint = 0xd675dc;
            symbContainer.add(textInfo);
        };
    
        function refreshInfoPu (containers, selectors, index)
        {
            for(let i = 0; i < containers.length; i++)
            {
                containers[i].visible = (index === i);
                if(popup.scene.textures.exists('navi_dot_active') && popup.scene.textures.exists('navi_dot'))
                {
                    selectors[i].setTexture((index === i) ? 'navi_dot_active' : 'navi_dot');
                }
            }
        };

        let index = 0;
        let containers = [];
        let selectors = [];
        let offsetY = -70;

        // add background and panel
        let backGround = popup.scene.add.sprite(0, -20 + offsetY, 'pu_background').setOrigin(0.5).setScale(1, 1.05);
        backGround.setInteractive(); // block bottom controls

        popup.add(backGround);
        let panel = popup.scene.add.sprite(0, -33 + offsetY, 'info_panel').setOrigin(0.5);
        popup.add(panel);

        // let title = popup.scene.add.sprite(0, -388 + offsetY, 'help_title').setOrigin(0.5);
        // popup.add(title);

        popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 400, -290 + offsetY);
        popup.addButton('nextButton','next_button', 'next_button_hover', false, 690, 0 + offsetY);
        popup.addButton('prevButton','prev_button', 'prev_button_hover', false, -690, 0 + offsetY);
        popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['nextButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['prevButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);

        popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});

        popup['nextButton'].clickEvent.add(()=>
        {
            if(index < containers.length - 1) index++;
            else index = 0;
            refreshInfoPu(containers, selectors, index);
        }, this);

        popup['prevButton'].clickEvent.add(()=>
        {
            if(index > 0) index--;
            else index = containers.length - 1;
            refreshInfoPu(containers, selectors, index);
        }, this);

        // create paylines panel
        let linesContainer = popup.scene.add.container(0, 0 + offsetY);
        containers.push(linesContainer);
        popup.add(linesContainer);
        let linesTitle = popup.scene.add.bitmapText(0, -305, 'gameFont_2', 'Pay Lines', 84, 1).setOrigin(0.5); // text  popup.scene.add.sprite(0, -305, 'paylines_title').setOrigin(0.5);
        linesContainer.add(linesTitle);
        // let linesTable =  popup.scene.add.sprite(0, 30, 'paylines_table').setOrigin(0.5);
        // linesContainer.add(linesTable);
        let linesText = popup.scene.add.bitmapText(0, -30, 'gameFont_0', 
        'All paylines!\nSame symbols pay left to right along pay lines.\n'+
        'Only the highest win is paid for each combination of symbols.\n'+
        'Minimum bet for playing is 243 coins. Wins are multiplied by the bet multiplier.', 34, 1).setOrigin(0.5);
        linesContainer.add(linesText);

        // create minor symbols panel
        let minorContainer = popup.scene.add.container(0, 0 + offsetY);
        containers.push(minorContainer);
        popup.add(minorContainer);
        let minorTitle = popup.scene.add.bitmapText(0, -305, 'gameFont_2', 'Minor Symbols', 84, 1).setOrigin(0.5); // popup.scene.add.sprite(0, -410, 'minor_title').setOrigin(0.5); // image
        minorContainer.add(minorTitle);

        let row1Y = -100;
        let row2Y = row1Y + 240;
        let col1X = -395;
        let colDist = 440;
        let col2X = col1X + colDist;
        let col3X = col2X + colDist;

        // minor row 1
        createSymbolPlate5x(popup, minorContainer, 'Crab',  col1X + 0.5 * colDist, row1Y, 1, 2, 3);
        createSymbolPlate5x(popup, minorContainer, 'Hedgehog', col2X + 0.5 * colDist, row1Y, 1, 3, 5);

        // minor row 2
        createSymbolPlate5x(popup, minorContainer, 'Jellyfish', col1X + 0.5 * colDist, row2Y, 2, 3, 7);
        createSymbolPlate5x(popup, minorContainer, 'Turtle', col2X + 0.5 * colDist, row2Y, 2, 3, 8);
        minorContainer.visible = false;

        // create major symbols panel
        let majorContainer = popup.scene.add.container(0, 0 + offsetY);
        containers.push(majorContainer);
        popup.add(majorContainer);
        let majorTitle = popup.scene.add.bitmapText(0, -305, 'gameFont_2', 'Major  Symbols', 84, 1).setOrigin(0.5); // popup.scene.add.sprite(0, -410, 'major_title').setOrigin(0.5); // image
        majorContainer.add(majorTitle);

        // major row 1
        createSymbolPlate5x(popup, majorContainer , 'Jsymb', col1X + 0.5 * colDist, row1Y, 11, 13, 17);
        createSymbolPlate5x(popup, majorContainer , 'Qsymb', col2X + 0.5 * colDist, row1Y, 11, 13, 19);

        // major row 2
        createSymbolPlate5x(popup, majorContainer , 'Ksymb', col1X + 0.5 * colDist, row2Y, 11, 14, 20);
        createSymbolPlate5x(popup, majorContainer , 'Asymb', col2X + 0.5 * colDist, row2Y, 11, 15, 25);
        majorContainer.visible = false;

        // create special symbols panel
        let specialContainer = popup.scene.add.container(0, 0 + offsetY);
        containers.push(specialContainer);
        popup.add(specialContainer);
        let specialTitle = popup.scene.add.bitmapText(0, -305, 'gameFont_2', 'Special  Symbols', 84, 1).setOrigin(0.5); // popup.scene.add.sprite(0, -410, 'special_title').setOrigin(0.5); // image
        specialContainer.add(specialTitle);
    
        // special row 1
        createSpecSymbolPlate(popup, specialContainer, 'Wild', -423, -80, 'Wild can be used with any symbols on the reels to create \nwinning combinations (exclude first reel).');
        createSpecSymbolPlate(popup, specialContainer, 'Scatter', -423 , 155 , 
        'Any 5 scatter symbols on the screen trigger a big mini-game.\n'+
        'Any 4 scatter symbols on the screen trigger a small mini-game.\n'+
        'Any 3 scatter on the screen give the player 3 free spins.');
        // createSpecSymbolPlate(popup, specialContainer, 'Jackpot', -490 , 225 + 10 , 'Any 6 jackot symbols scattered on the screen = Jackpot Win.');
        specialContainer.visible = false;

        // create rules panel
        let rulesContainer = popup.scene.add.container(0, 0 + offsetY);
        containers.push(rulesContainer);
        popup.add(rulesContainer);
        let rulesTitle =  popup.scene.add.bitmapText(0, -305, 'gameFont_2', 'Rules', 84, 1).setOrigin(0.5); //popup.scene.add.sprite(0, -410, 'rules_title').setOrigin(0.5); // image
        rulesContainer.add(rulesTitle);

        let aboutTitle = popup.scene.add.bitmapText(-540, -140, 'gameFont_1', 'About the game', 50, 0).setOrigin(0,0.5); // text
        rulesContainer.add(aboutTitle);
        let aboutText = popup.scene.add.bitmapText(-540, -110, 'gameFont_0',
        'Aqua slot is a pack of Slot Games with 5 reels and 243 paylines oriented from left to right. \n'+
        'The games have 8 regular symbols that win if three or  more  are  lined  up in sequence  \n'+
        'on  a  payline, beginning from the leftmost  position. The 4  high  pay symbols  and the \n'+
        '4 low pay symbols. Aqua slot also includes 2 mini games.', 34, 0).setOrigin(0, 0); // text
        rulesContainer.add(aboutText);


        let howTitle = popup.scene.add.bitmapText(-540, 100, 'gameFont_1', 'How to play', 50, 0).setOrigin(0,0.5); // text
        rulesContainer.add(howTitle);
        let howText = popup.scene.add.bitmapText(-540, 130, 'gameFont_0',
        '- Place your bet \n- Press the Spin button to start game \n- You can also use Max Bet button to auto bet', 34, 0).setOrigin(0, 0); // text
        rulesContainer.add(howText);

        // create navi selectors
        let dotDist = 50;
        let offsetDots = dotDist * (containers.length - 1) / 2;
        if(popup.scene.textures.exists('navi_dot_active') && popup.scene.textures.exists('navi_dot'))
        {
            for(let i = 0; i < containers.length; i++)
            {
                var selector = popup.scene.add.sprite(-offsetDots + i * dotDist, 440 + offsetY, 'navi_dot').setOrigin(0.5);
                selectors.push(selector);
                popup.add(selector);
            }
        }
        refreshInfoPu(containers, selectors, index);
    },

    createAboutPUHandler: function(popup)
    {     
        let yOffset = -70;
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);

        let panel = popup.scene.add.sprite(0, 0 + yOffset, 'about_panel').setOrigin(0.5);
        popup.add(panel);

        // add title
        // popup.title = popup.scene.add.bitmapText(0, -145 + yOffset, 'gameFont_1', 'About', 80, 1).setOrigin(0.5);
        // popup.add(popup.title);

        // add logo
        let logo = popup.scene.add.sprite(0, -13 + yOffset, 'logo').setOrigin(0.5);
        popup.add(logo);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 150 + yOffset, 'gameFont_0', 'Need Help?', 34, 1).setOrigin(0.5);
        popup.messageText.setLetterSpacing(5);
        popup.add(popup.messageText);

        // add buttons
        popup.addButton('supportButton','long_button', 'long_button_hover', false, 0, 220 + yOffset);
        popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 200, -210  + yOffset);

        popup['supportButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['supportButton'].clickEvent.add(()=>{window.open("#"); }, popup);
        
        popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});

        // add support button text
        popup.supText = popup.scene.add.bitmapText(0, 223 + yOffset, 'gameFont_1', 'Support', 68, 1).setOrigin(0.5);
        popup.supText.setLetterSpacing(6);
        popup.add(popup.supText);
    },

    createSettingsPUHandler: function(popup)
    {    
        function refreshIcons (popup)
        {
            popup.soundIcon.setTexture( popup.scene.soundController._soundOn ? 'soundon' : 'soundoff');
            popup.musicIcon.setTexture( popup.scene.soundController._musicOn ? 'musicon' : 'musicoff');
            // console.log('refresh');
        }

        let yOffset = -70;   
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0+ yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);

        let panel = popup.scene.add.sprite(0, -13 + yOffset, 'settings_panel').setOrigin(0.5);
        popup.add(panel);

        // add title
        // let title = popup.scene.add.sprite(0, -300 + yOffset, 'settings_title').setOrigin(0.5);
        // popup.add(title);

        // sound and music text
        //popup.soundText = popup.scene.add.bitmapText(-92, -120 + yOffset, 'gameFont_2', 'Sounds', 42, 1).setOrigin(0.5);
        //popup.add(popup.soundText);

        //popup.musicText = popup.scene.add.bitmapText(90, -120 + yOffset, 'gameFont_2', 'Music', 42, 1).setOrigin(0.5);
        //popup.add(popup.musicText);

        // sound and music buttons
        popup.addButton('soundButton','button_on', 'button_off', true, -96, -80 + yOffset);
        popup.addButton('musicButton','button_on', 'button_off', true,  190, -80 + yOffset);

        popup['soundButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['soundButton'].clickEvent.add(()=>{popup.scene.soundController.soundOn(!popup.scene.soundController._soundOn);refreshIcons (popup);}, popup);
        if(!popup.scene.soundController._soundOn) popup['soundButton'].setPressed();

        popup['musicButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['musicButton'].clickEvent.add(()=>{popup.scene.soundController.musicOn(!popup.scene.soundController._musicOn);refreshIcons (popup);}, popup);
        if(!popup.scene.soundController._musicOn) popup['musicButton'].setPressed();

        popup.soundIcon = popup.scene.add.sprite(-245, -68 + yOffset, 'soundon').setOrigin(0.5);
        popup.add(popup.soundIcon);
        popup.musicIcon = popup.scene.add.sprite(56, -70 + yOffset, 'musicon').setOrigin(0.5);
        popup.add(popup.musicIcon);

        // privacy ant terms buttons
        popup.addButton('privacyButton','extralong_button', 'extralong_button_hover', false, -2, 90 + yOffset);
        popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 230, -220 + yOffset);
        popup.addButton('termsButton','extralong_button', 'extralong_button_hover', false, -2, 215 + yOffset);

        popup['privacyButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['privacyButton'].clickEvent.add(()=>{window.open("#"); }, popup);
        
        popup['termsButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['termsButton'].clickEvent.add(()=>{window.open("#"); }, popup);

        popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});

        // privacy ant terms buttons text
        popup.privacyText = popup.scene.add.bitmapText(2, 97 + yOffset, 'gameFont_1', 'Privacy Policy', 54, 1).setOrigin(0.5);
        popup.privacyText.setLetterSpacing(3);
        popup.add(popup.privacyText);

        popup.termsText = popup.scene.add.bitmapText(2, 222 + yOffset, 'gameFont_1', 'Terms of use', 54, 1).setOrigin(0.5);
        popup.termsText.setLetterSpacing(3);
        popup.add(popup.termsText);
        refreshIcons(popup);
    },

    createFreeGamesPUHandler: function(popup)
    {
        let yOffset = -70;   
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        backGround.setAlpha(1);
        popup.add(backGround);
       // let panel = popup.scene.add.sprite(0, -5 + yOffset, 'freespin_panel').setOrigin(0.5);
       // popup.add(panel);

        popup.captionText = popup.scene.add.bitmapText(0, -30 + yOffset, 'gameFont_2', 'Free Spins', 94, 1).setOrigin(0.5);
        popup.captionText.setLetterSpacing(1.4);
        popup.add(popup.captionText);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 70 + yOffset, 'gameFont_1', '0', 94, 1).setOrigin(0.5);
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);
        popup.blinkTimeCoder = new TimeCoder(this, '1110011100', 200, (on)=>{popup.messageText.setAlpha(on? 1:0.01);}); 

        // add buttons
        popup.addButton('okButton','long_button', 'long_button_hover', false, 0, 210 + yOffset);
        popup['okButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['okButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});
        // add button text
        popup.okText = popup.scene.add.bitmapText(0, 213 + yOffset, 'gameFont_1', 'Start', 68, 1).setOrigin(0.5);
        popup.add(popup.okText);

         function update(time, delta) // lamps blink
         {
            popup.blinkTimeCoder.update(delta);
         }
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
         }
         popup.scene.updateEvent.add(update, this);
         popup.closeEvent.add(closeHandler, this);
    },

    createFreeSpinsWinPUHandler: function(popup)
    {
        let yOffset = -70;   
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        backGround.setAlpha(0.01);
        popup.add(backGround);
       // let panel = popup.scene.add.sprite(0, -5 + yOffset, 'freespin_panel').setOrigin(0.5);
       // popup.add(panel);

        popup.captionText = popup.scene.add.bitmapText(0, -30 + yOffset, 'gameFont_2', 'Free Spins', 94, 1).setOrigin(0.5);
        popup.captionText.setLetterSpacing(1.4);
        popup.add(popup.captionText);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 70 + yOffset, 'gameFont_1', '0', 94, 1).setOrigin(0.5);
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);
        popup.blinkTimeCoder = new TimeCoder(this, '111000111000', 100, (on)=>{popup.messageText.setAlpha(on? 1:0.01);}); 

         function update(time, delta) // lamps blink
         {
            popup.blinkTimeCoder.update(delta);
         }
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
         }

       popup.scene.updateEvent.add(update, this);
       popup.closeEvent.add(closeHandler, this);

    },

    createBigWinPUHandler: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'bigwin_panel').setOrigin(0.5); // -110
        popup.add(panel);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 30 + yOffset, 'gameFont_1', '0', 68, 1).setOrigin(0.5); // 190
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);
        popup.scene.updateEvent.add(update, this);

        // popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 200, -210  + yOffset);
        // popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});

         // add lamps
         let lampsArray = [];
         function addLamp(posX, posY)
         {
            var lamp = new Lamp (popup.scene, posX, posY, false, 'lamp_off', 'lamp_on', panel.depth + 1);  // ,
            popup.add(lamp.lamp);
            lampsArray.push(lamp);
         }
     
         addLamp(164, -115); addLamp(166, -56); addLamp(139, 9);
         addLamp(-164, -115); addLamp(-160, -56); addLamp(-137, 10);

    
         popup.lampsTimeCoder = new TimeCoder(this, '010111010111', 200, (on)=>{lampsArray.forEach((l)=>{l.setOn(on);})}); 

         function update(time, delta) // lamps blink
         {
            popup.lampsTimeCoder.update(delta);
         }
 
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
             // console.log('stop big win Update')
         }
 
         popup.closeEvent.add(closeHandler, this);
    },

    createHugeWinPUHandler: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'hugewin_panel').setOrigin(0.5); // -110
        popup.add(panel);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 30 + yOffset, 'gameFont_1', '0', 68, 1).setOrigin(0.5); // 190
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);
        popup.scene.updateEvent.add(update, this);

         // add lamps
         let lampsArray = [];
         function addLamp(posX, posY)
         {
            var lamp = new Lamp (popup.scene, posX, posY, false, 'lamp_off', 'lamp_on', panel.depth + 1);  // ,
            popup.add(lamp.lamp);
            lampsArray.push(lamp);
         }
     
         addLamp(-57, -240); addLamp(0, -250); addLamp(57, -240);
         addLamp(164, -115); addLamp(166, -56); addLamp(139, 9);
         addLamp(-164, -115); addLamp(-160, -56); addLamp(-137, 10);

    
         popup.lampsTimeCoder = new TimeCoder(this, '010111010111', 200, (on)=>{lampsArray.forEach((l)=>{l.setOn(on);})}); 

         function update(time, delta) // lamps blink
         {
            popup.lampsTimeCoder.update(delta);
         }
 
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
         }
 
         popup.closeEvent.add(closeHandler, this);
    },

    createMegaWinPUHandler: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'megawin_panel').setOrigin(0.5); // -110
        popup.add(panel);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 30 + yOffset, 'gameFont_1', '0', 68, 1).setOrigin(0.5); // 190
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);

         // add lamps
         let lampsArray = [];
         function addLamp(posX, posY)
         {
            var lamp = new Lamp (popup.scene, posX, posY, false, 'lamp_off', 'lamp_on', panel.depth + 1);  // ,
            popup.add(lamp.lamp);
            lampsArray.push(lamp);
         }
     
         addLamp(-145, -168); addLamp(-110, -213); addLamp(110, -213);addLamp(145, -168);
         addLamp(-57, -240); addLamp(0, -250); addLamp(57, -240);
         addLamp(164, -115); addLamp(166, -56); addLamp(139, 9);
         addLamp(-164, -115); addLamp(-160, -56); addLamp(-137, 10);
 
         popup.lampsTimeCoder = new TimeCoder(this, '010111010111', 200, (on)=>{lampsArray.forEach((l)=>{l.setOn(on);})}); 

         function update(time, delta) // lamps blink
         {
            popup.lampsTimeCoder.update(delta);
         }
 
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
         }
         popup.scene.updateEvent.add(update, this);
         popup.closeEvent.add(closeHandler, this);
    },

    createJackpotWinPUHandler: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'jackpotwin_panel').setOrigin(0.5); // -110
        popup.add(panel);

        // add message
        popup.messageText = popup.scene.add.bitmapText(0, 30 + yOffset, 'gameFont_1', '0', 68, 1).setOrigin(0.5); // 190
        popup.messageText.setLetterSpacing(1.4);
        popup.add(popup.messageText);
        popup.scene.updateEvent.add(update, this);

         // add lamps
         let lampsArray = [];
         function addLamp(posX, posY)
         {
            var lamp = new Lamp (popup.scene, posX, posY, false, 'lamp_off', 'lamp_on', panel.depth + 1);  // ,
            popup.add(lamp.lamp);
            lampsArray.push(lamp);
         }
     
         addLamp(-145, -168); addLamp(-110, -213); addLamp(110, -213);addLamp(145, -168);
         addLamp(-57, -240); addLamp(0, -250); addLamp(57, -240);
         addLamp(164, -115); addLamp(166, -56); addLamp(139, 9);
         addLamp(-164, -115); addLamp(-160, -56); addLamp(-137, 10);
 
         popup.lampsTimeCoder = new TimeCoder(this, '010111010111', 200, (on)=>{lampsArray.forEach((l)=>{l.setOn(on);})}); 

         function update(time, delta) // lamps blink
         {
            popup.lampsTimeCoder.update(delta);
         }
 
         function closeHandler()
         {
             popup.scene.updateEvent.remove(update);
         }
 
         popup.closeEvent.add(closeHandler, this);
    },

    // just for blocking controls
    createEmptyPUHandler: function(popup)
    {
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0, 'gray_01').setOrigin(0.5).setScale(1000);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);

      // popup.debugText = popup.scene.add.bitmapText(0, 0, 'gameFont_2', 'EMPTY PU', 55, 1).setOrigin(0.5);
      // popup.add(popup.debugText);
    },

    // // there are a lot of coins in the 6 chests
    createChestGamePUHandler_5: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'chestgame_panel').setOrigin(0.5); // -110
        popup.add(panel);
        popup.closeEvent.add(()=>{popup.scene.showCoins(false);}, this);

        let chestArray = [];
        function addChest(chestName, posX, posY, coins)
        {
            // create chest button
            popup.addButton(chestName,'chest_closed', 'chest_opened', true, posX, posY + yOffset);
            popup[chestName].coins = coins;
            chestArray.push(popup[chestName]);
            popup['coinimage_'+ chestName] = popup.scene.add.sprite(-40 + posX, -5 + yOffset + posY, 'chestgame_coin').setOrigin(0.5);
            popup.add(popup['coinimage_'+ chestName]);
            popup['coinimage_'+ chestName].setVisible(false);
            popup['mess_'+ chestName] = popup.scene.add.bitmapText(-10 + posX, -10 + yOffset + posY, 'gameFont_2', coins, 34, 1).setOrigin(0, 0.5); 
            popup.add(popup['mess_'+ chestName]);
            popup['mess_'+ chestName].setVisible(false);
            
            // add click event
            popup[chestName].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
            popup[chestName].clickEvent.add(()=>{
                popup['mess_'+ chestName].setVisible(true); 
                popup.scene.showCoins(true);
                popup['coinimage_'+ chestName].setVisible(true);
               
                chestArray.forEach((chest)=>
                {
                    chest.setInteractable(false);
                });
                new SimpleTweenFloat(this, 0, 1, 3000, (p, dp) =>{ },  ()=>
                {
                    popup.scene.slotPlayer.addCoins(popup[chestName].coins);
                    popup.scene.guiController.closePopUp(popup);
                }); // just delay action   before close
/**/
            }, popup);
        }

        function shuffle(array){ 
            for (let i = array.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [array[i], array[j]] = [array[j], array[i]]; 
            } 
            return array; 
          };  

        let chestCoins = [10, 20, 50, 100, 150, 200];
        let shufflechestCoins = shuffle(chestCoins); 

        var rowY1= -25;
        var rowY2= 200;
        addChest('chest_2', -240, rowY1, shufflechestCoins[0]); addChest('chest_1', 0, rowY1, shufflechestCoins[1]);  addChest('chest_3', 240, rowY1, shufflechestCoins[2]);
        addChest('chest_5', -240, rowY2, shufflechestCoins[3]); addChest('chest_4', 0, rowY2, shufflechestCoins[4]); addChest('chest_6', 240, rowY2, shufflechestCoins[5]);
    },
    
    // // there are few coins in the 3 chests
    createChestGamePUHandler_4: function(popup)
    {
        let yOffset = -70; 
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
        backGround.setInteractive(); // block bottom controls
        popup.add(backGround);
 
        let panel = popup.scene.add.sprite(0, -5 + yOffset, 'chestgamesmall_panel').setOrigin(0.5); // -110
        popup.add(panel);
        popup.closeEvent.add(()=>{popup.scene.showCoins(false);}, this);

        let chestArray = [];
        function addChest(chestName, posX, posY, coins)
        {
            // create chest button
            popup.addButton(chestName,'chest_closed', 'chest_opened', true, posX, posY + yOffset);
            popup[chestName].coins = coins;
            chestArray.push(popup[chestName]);
            popup['coinimage_'+ chestName] = popup.scene.add.sprite(-40 + posX, -5 + yOffset + posY, 'chestgame_coin').setOrigin(0.5);
            popup.add(popup['coinimage_'+ chestName]);
            popup['coinimage_'+ chestName].setVisible(false);
            popup['mess_'+ chestName] = popup.scene.add.bitmapText(-10 + posX, -10 + yOffset + posY, 'gameFont_2', coins, 34, 1).setOrigin(0, 0.5); 
            popup.add(popup['mess_'+ chestName]);
            popup['mess_'+ chestName].setVisible(false);
            
            // add click event
            popup[chestName].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
            popup[chestName].clickEvent.add(()=>{
                popup['mess_'+ chestName].setVisible(true); 
                popup.scene.showCoins(true);
                popup['coinimage_'+ chestName].setVisible(true);
               
                chestArray.forEach((chest)=>
                {
                    chest.setInteractable(false);
                });
                new SimpleTweenFloat(this, 0, 1, 3000, (p, dp) =>{ },  ()=>
                {
                    popup.scene.slotPlayer.addCoins(popup[chestName].coins);
                    popup.scene.guiController.closePopUp(popup);
                }); // just delay action   before close
/**/
            }, popup);
        }

        function shuffle(array){ 
            for (let i = array.length - 1; i > 0; i--) { 
              const j = Math.floor(Math.random() * (i + 1)); 
              [array[i], array[j]] = [array[j], array[i]]; 
            } 
            return array; 
          };  

        let chestCoins = [1, 2, 3, 4, 5, 6];
        let shufflechestCoins = shuffle(chestCoins); 

        var rowY1= 75;
        addChest('chest_2', -240, rowY1, shufflechestCoins[0]); addChest('chest_1', 0, rowY1, shufflechestCoins[1]);  addChest('chest_3', 240, rowY1, shufflechestCoins[2]);
    },

    // there are a lot of coins in the 6 chests
    showChestsPU_5: function(scene)
    {
        scene.guiController.showPopUp(slotConfig.createChestGamePUHandler_5); 
    },

    // there are few coins in the 3 chests
    showChestsPU_4: function(scene)
    {
        scene.guiController.showPopUp(slotConfig.createChestGamePUHandler_4); 
    },
}

class AnimatedCoinParticle extends Phaser.GameObjects.Particles.Particle
{
    constructor (emitter)
    {
        super(emitter);

        this.t = 0;
        this.i = 0;
        this.framesCount = 6;
    }
	
    update (delta, step, processors)
    {
        var result = super.update(delta, step, processors);
        this.t += delta;

        if (this.t >= coinSpinAnim.msPerFrame)
        {
            this.i++;
            if (this.i > this.framesCount-1)
            {
                this.i = 0;
            }
            this.frame = coinSpinAnim.frames[this.i].frame;
            this.t -= coinSpinAnim.msPerFrame;
        }
        return result;
    }
}

class ProgressSlider
{
    constructor(scene, baseLocPosX, baseLocPosY, baseSprite, fillLocPosX, fillLocPosY, fillSprite, spotSprite, depth)
    {
        this.fillAmount = 0;
        this.scene = scene;
        this.fillLocPosX = fillLocPosX;
        this.fillLocPosY = fillLocPosY;
        this.baseSprite = scene.addSpriteLocPos(baseSprite, baseLocPosX, baseLocPosY); 
        this.baseSprite.setDepth(depth);
        this.fillSprite = scene.addSpriteLocPos(fillSprite, fillLocPosX, fillLocPosY); 
        this.fillSprite.setDepth(depth + 1);

        this.sizeX = this.fillSprite.width;
        this.sizeY = this.fillSprite.height;
        // console.log('mask sizeX: ' + sizeX  + ' ;mask sizeY: ' + sizeY);

        this.spotSprite = scene.addSpriteLocPos(spotSprite, fillLocPosX - this.sizeX / 2, fillLocPosY); 
        this.spotSprite.setDepth(depth + 2);

        this.shapePosX = scene.centerX + fillLocPosX - this.sizeX / 2;
        this.shapePosY = scene.centerY + fillLocPosY + this.sizeY / 2;
        this.shape = scene.add.graphics();
        this.shape.fillStyle(0xffffff);
        this.shape.beginPath();
        this.shape.fillRect(this.shapePosX, this.shapePosY, this.sizeX, -this.sizeY);
        this.shape.depth = depth + 2;
        this.shape.setVisible(false);

        this.gMask = this.shape.createGeometryMask();
        this.fillSprite.setMask(this.gMask);   

        this.setFillAmount(this.fillAmount);
    }

    setFillAmount(amount)
    {
        if(amount > 1) amount = 1;
        if(amount < 0) amount = 0;
        this.fillAmount = amount;
        var _sizeX = this.sizeX * amount;
        this.shape.clear();
        this.shape.fillRect(this.shapePosX, this.shapePosY, _sizeX, -this.sizeY);  
        this.spotSprite.setPosition(this.shapePosX +_sizeX, this.scene.centerY + this.fillLocPosY);
        this.spotSprite.setVisible(this.fillAmount > 0);
    }
}
