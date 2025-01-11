// --------------- MESSAGES -------------------

// message with yes, no, close buttons
function createGameMessagePUHandlerYNC(popup)
{
    let yOffset = -70; 
    // add background and panel
    let backGround = popup.scene.add.sprite(0, -40 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
    backGround.setInteractive(); // block bottom controls
    popup.add(backGround);
    let panel = popup.scene.add.sprite(0, 0 + yOffset, 'message_panel').setOrigin(0.5);
    popup.add(panel);

    // add caption
    popup.captionText = popup.scene.add.bitmapText(0, -90 + yOffset, 'gameFont_1', 'Caption', 50, 1).setOrigin(0.5);
    popup.captionText.setLetterSpacing(1.2);
    // popup.captionText.tint = 0x4f312d;
    popup.add(popup.captionText);

    // add message
    popup.messageText = popup.scene.add.bitmapText(0, 0 + yOffset, 'gameFont_0', 'Message', 34, 1).setOrigin(0.5);
    // popup.messageText.tint = 0xd675dc;
    popup.add(popup.messageText);

    // add buttons
    popup.addButton('okButton','small_button', 'small_button_hover', false, -90, 120 + yOffset);
    popup.addButton('noButton','small_button', 'small_button_hover', false, 90, 120 + yOffset);
    popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 218, -145 + yOffset);
    popup['okButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
    popup['noButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
    popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);

    // add button text
    popup.okText = popup.scene.add.bitmapText(-90, 123 + yOffset, 'gameFont_1', 'Ok', 68, 1).setOrigin(0.5);
    popup.okText.tint = 0xFFFFFF;
    popup.add(popup.okText);

    popup.noText = popup.scene.add.bitmapText(90, 123 + yOffset, 'gameFont_1', 'No', 68, 1).setOrigin(0.5);
    popup.noText.tint = 0xFFFFFF;
    popup.add(popup.noText);
}

// message with close button
function createGameMessagePUHandler(popup)
{
    let yOffset = -70; 
    // add background and panel
    let backGround = popup.scene.add.sprite(0, -40 + yOffset, 'pu_background').setOrigin(0.5).setScale(1);
    backGround.setInteractive(); // block bottom controls
    popup.add(backGround);
    backGround.setAlpha(0.01);

    let panel = popup.scene.add.sprite(0, 0 + yOffset, 'small_message_panel').setOrigin(0.5);
    popup.add(panel);

    // add caption
     popup.captionText = popup.scene.add.bitmapText(0, -130 + yOffset, 'gameFont_1', 'Caption', 50, 1).setOrigin(0.5);
    // popup.captionText.tint = 0x4f312d;
     popup.add(popup.captionText);

    // add message
    popup.messageText = popup.scene.add.bitmapText(0, 10 + yOffset, 'gameFont_0', 'Message', 34, 1).setOrigin(0.5);
    //popup.messageText.tint = 0xd675dc;
    popup.add(popup.messageText);

    // add buttons
    popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 155, -95 + yOffset);
    popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
}
