let answerYN;

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
        // if (dialougeBox.mouseIsPressed) {
        //     dialougeBox.visible = false;
        //     enterName = !enterName;
        // }
    }
    else {
        dialougeBox.visible = false;
    }
}
function textInput(aList) {

    // for (let i = 0; i < aList.length; i++) {
    //     if (dialougeBox.mouseIsPressed) {
    //         messageText(width / 50, 50, aList[i], dialougeBox.position.x, dialougeBox.position.y);
    //     }
    // }

    dialougeBox.position.x = playerFemale.position.x;
    dialougeBox.position.y = playerFemale.position.y + playerFemale.height;
    drawSprite(dialougeBox);
}