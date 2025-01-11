function CPaytablePortrait(oParentContainer){
    CPaytablePanelBase.call(this, oParentContainer);
    
    this._init();
    
    var oPosNext = {x:CANVAS_WIDTH - 520,y:CANVAS_HEIGHT/2};
    var oPosPrev = {x:520,y:CANVAS_HEIGHT/2};
    this.attachButs(oPosPrev,oPosNext);
}

CPaytablePortrait.prototype = Object.create(CPaytablePanelBase.prototype);

CPaytablePortrait.prototype._init = function(){
    CPaytablePanelBase.prototype._init.call(this);
    
    //ATTACH PAGE 1
    var oContainerPage = new createjs.Container();
    this._oContainer.addChild(oContainerPage);
    
    var oSpriteBg = s_oSpriteLibrary.getSprite('paytable1_portrait');
    var oBg = createBitmap(oSpriteBg);
    oBg.x = CANVAS_WIDTH/2;
    oBg.y = CANVAS_HEIGHT/2;
    oBg.regX = oSpriteBg.width/2;
    oBg.regY = oSpriteBg.height/2;
    oContainerPage.addChild(oBg);
    
    var oText = new CTLText(oContainerPage, 	
                   CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2-oSpriteBg.height/2+104, 600, 46, 	
                    46, "center", "#fff", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_PAYTABLE,	
                    true, true, false,	
                    false );	
    
    //LIST OF COMBO TEXT
    this._createPayouts(oContainerPage);

    this._aPages[0] = oContainerPage;

    //ATTACH PAGE 2
    oContainerPage = new createjs.Container();
    oContainerPage.visible = false;
    this._oContainer.addChild(oContainerPage);

    var oSpriteBg = s_oSpriteLibrary.getSprite('paytable2_portrait');
    var oBg = createBitmap(oSpriteBg);
    oBg.x = CANVAS_WIDTH/2;
    oBg.y = CANVAS_HEIGHT/2;
    oBg.regX = oSpriteBg.width/2;
    oBg.regY = oSpriteBg.height/2;
    oContainerPage.addChild(oBg);
    
    var oText = new CTLText(oContainerPage, 	
                   CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2-oSpriteBg.height/2+104, 600, 46, 	
                    46, "center", "#fff", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_PAYLINES,	
                    true, true, false,	
                    false );	
                    
    this._aPages[1] = oContainerPage;


    //ATTACH PAGE 3
    oContainerPage = new createjs.Container();
    oContainerPage.visible = false;
    this._oContainer.addChild(oContainerPage);

    var oSpriteBg = s_oSpriteLibrary.getSprite('paytable3_portrait');
    var oBg = createBitmap(oSpriteBg);
    oBg.x = CANVAS_WIDTH/2;
    oBg.y = CANVAS_HEIGHT/2;
    oBg.regX = oSpriteBg.width/2;
    oBg.regY = oSpriteBg.height/2;
    oContainerPage.addChild(oBg);
    
    var oText = new CTLText(oContainerPage, 	
                   CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2-oSpriteBg.height/2+104, 600, 46, 	
                    46, "center", "#fff", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_BONUS,	
                    true, true, false,	
                    false );
                    
    var oText = new CTLText(oContainerPage, 
                690, 664, 546, 118, 
                36, "center", "#dab977", FONT_GAME_1, 1,
                0, 0,
                TEXT_HELP_BONUS1,
                true, true, true,
                false );


    var oText2 = new CTLText(oContainerPage, 
                690, 1154, 546, 280, 
                36, "center", "#dab977", FONT_GAME_1, 1,
                0, 0,
                TEXT_HELP_BONUS2,
                true, true, true,
                false );


    this._aPages[2] = oContainerPage;

    //ATTACH PAGE 4
    oContainerPage = new createjs.Container();
    oContainerPage.visible = false;
    this._oContainer.addChild(oContainerPage);

    var oSpriteBg = s_oSpriteLibrary.getSprite('paytable4_portrait');
    var oBg = createBitmap(oSpriteBg);
    oBg.x = CANVAS_WIDTH/2;
    oBg.y = CANVAS_HEIGHT/2;
    oBg.regX = oSpriteBg.width/2;
    oBg.regY = oSpriteBg.height/2;
    oContainerPage.addChild(oBg);

    var oText = new CTLText(oContainerPage, 	
                   CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2-oSpriteBg.height/2+104, 600, 46, 	
                    46, "center", "#fff", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_FREESPINS,	
                    true, true, false,	
                    false );
                    
    var iYPos = 750;
    for(var j=0;j<3;j++){
        var oText = new createjs.Text((j+3)+"X  "+NUM_FREESPIN[j],"40px "+FONT_GAME_1, "#dab977");
        oText.textAlign = "left";
        oText.x = CANVAS_WIDTH/2+44;
        oText.y = iYPos;
        oText.textBaseline = "alphabetic";
        oContainerPage.addChild(oText);

        iYPos += 42;
    }

    var oText = new CTLText(oContainerPage, 
                CANVAS_WIDTH/2-280, 910, 560, 270, 
                56, "center", "#dab977", FONT_GAME_1, 1,
                0, 0,
                TEXT_HELP_FREESPIN,
                true, true, true,
                false );


    this._aPages[3] = oContainerPage;

    this._oCurPage = this._aPages[this._iCurPage];
};

CPaytablePortrait.prototype._createPayouts = function(oContainerPage){
    this._aNumSymbolComboText = new Array();
    this._aWinComboText = new Array();

    var aPos = [{x:990,y:1220},{x:1164,y:1026},{x:804,y:1026},{x:1164,y:828},{x:804,y:828},{x:1164,y:628},{x:804,y:628}];
    var iCurPos = 0;
    for(var i=0;i<PAYTABLE_VALUES.length;i++){
        var aSymbolPayouts = PAYTABLE_VALUES[i];
        do{
            var iIndex = aSymbolPayouts.indexOf(0);
            if(iIndex !== -1){
                aSymbolPayouts.splice(iIndex, 1);
            }

        }while(iIndex !== -1);

        var iLen = aSymbolPayouts.length;

        if(iLen === 0){
            continue;
        }

        var iOffsetY = 40;
        if(iLen === 4){
            iOffsetY = 32;
        }

        var iYPos = aPos[iCurPos].y;
        this._aNumSymbolComboText[i] = new Array();
        this._aWinComboText[i] = new Array();

        for(var j=0;j<iLen;j++){
            var oTextMult = new createjs.Text("X"+(5-j),"40px "+FONT_GAME_1, "#ffffff");
            oTextMult.textAlign = "center";
            oTextMult.x = aPos[iCurPos].x;
            oTextMult.y = iYPos;
            oTextMult.textBaseline = "alphabetic";
            oContainerPage.addChild(oTextMult);

            this._aNumSymbolComboText[i][j] = oTextMult;

            var oText = new createjs.Text(aSymbolPayouts[iLen-j-1],"40px "+FONT_GAME_1, "#dab977");
            oText.textAlign = "center";
            oText.x = oTextMult.x + 70;
            oText.y = oTextMult.y;
            oText.textBaseline = "alphabetic";
            oContainerPage.addChild(oText);

            this._aWinComboText[i][j] = oText;

            iYPos += iOffsetY;
        }

        iCurPos++;
    }
};