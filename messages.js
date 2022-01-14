let answerYN;
let dialougeCounter = 0;
let isEnteringName = false;
let playerName;

function exitBox() {
    if (gameState === "notif") {
        camera.off();
        drawSprite(mpcBox);
        noStroke();
        textFont(acFont);
        messageText(mpcBox.width / 20, "orange", "Are you sure that \n you want to exit?", width / 2, height / 2 - mpcBox.height / 25);
        ellipse(width / 2 - mpcBox.width / 5, height / 2 + mpcBox.height / 20, mpcBox.width / 5, mpcBox.height / 18);
        ellipse(width / 2 + mpcBox.width / 5, height / 2 + mpcBox.height / 20, mpcBox.width / 5, mpcBox.height / 18);
        messageText(mpcBox.width / 20, "white", "Y/Yes", width / 2 - mpcBox.width / 4.95, height / 2 + mpcBox.height / 16.5);
        messageText(mpcBox.width / 20, "white", "N/No", width / 2 + mpcBox.width / 4.9, height / 2 + mpcBox.height / 16.5);
        messageText(mpcBox.width / 40, 255, "Press Y / N to select", width / 2, height / 2 + height / 5);
        if (keyIsDown(89)) {
            answerYN = "yes";
            walkingsfx.loop();
        }
        else if (keyIsDown(78)) {
            answerYN = "no";
        }
    }

}

function playerDialouge() {
    if (enterName) {
        dialougeBox.visible = true;
        textInput(nameDialouge);

    }
    if (dialougeCounter > 4) {
        dialougeBox.visible = false;
        dialougeCounter = 0;
        enterName = false;
    }
}


function textInput(aList) {
    dialougeBox.visible = true;
    dialougeBox.position.x = playerFemale.position.x;
    dialougeBox.position.y = playerFemale.position.y + playerFemale.height;
    drawSprite(dialougeBox);


    if (dialougeCounter === 2) {
        if (keyIsDown(13)) {
            dialougeCounter++;
            isEnteringName = false;
            nameInput.hide();
            playerName = nameInput.value();
            storeItem("playerName", playerName);
        }
        else {
            isEnteringName = true;
            nameInput.position(width / 2 - cellWidth / 4, height / 5, 200, 500);
        }

    }

    if (dialougeBox.mouseIsOver && mouseWentDown()) {
        if (!isEnteringName) {
            dialougeCounter++;

        }
    }
    textFont(digitalTech);
    messageText(width / 100, 50, aList[dialougeCounter], dialougeBox.position.x, dialougeBox.position.y);

}