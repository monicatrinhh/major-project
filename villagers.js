let lastTimeSwitched = 0;
let theDirect = "forward";
let choosingDirection = ['forward', 'left', 'right', 'backwards'];
let thisVillager;

function villagersMove() {
    for (let i = 0; i < villagers.length; i++) {
        messageText(width / 100, 255, villagersData[i].name, villagers[i].position.x, villagers[i].position.y - 100);
        villagers[i].collide(playerFemale);
        villagers[i].collide(trees);
        villagers[i].collide(coins);

        //set boundaries
        if (villagers[i].position.x < -SCENE_W + cellWidth / 10) {
            villagers[i].position.x = -SCENE_W + cellWidth / 10;
        }

        if (villagers[i].position.y <= -SCENE_H) {
            villagers[i].position.y = -SCENE_H;
        }

        if (villagers[i].position.x > SCENE_W - 5) {
            villagers[i].position.x = SCENE_W - 5;
        }

        if (villagers[i].position.y > SCENE_H - (cellHeight / 2) - 10) {
            villagers[i].position.y = SCENE_H - (cellHeight / 2) - 10;
        }
        playerFemale.displace(villagers[i]);

        if (villagers[i].mouseIsPressed) {
            if (gameState === "world") {
                isTalking = true;
                thisVillager = i;
            }

            for (let i = 0; i < villagers.length; i++) {
                villagers[i].visible = false;
            }
            villagers[i].visible = true;
            walkingsfx.pause();

            villagers[i].position.x = playerFemale.position.x - dialougeBox.width / 4;
            villagers[i].position.y = playerFemale.position.y;

        }
    }
    if (keyIsDown(27)) {
        isTalking = false;
        for (let i = 0; i < villagers.length; i++) {
            villagers[i].visible = true;
        }
        conversationCounter = -1;
    }
    whatDirection();
    if (!isTalking) {
        villagersDirection(1, 3);
        villagersDirection(4, -4);
    }

    drawSprites(villagers);
    villagersDialouge();

}

function whatDirection() {
    if (theDirect === "forward" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "right" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "backwards" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "left" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
}
function villagersDirection(i, speed) {
    if (theDirect === "forward") {
        villagers[i].position.y += speed;
    }
    else if (theDirect === "right") {
        villagers[i].position.x += speed;
    }
    else if (theDirect === "backwards") {
        villagers[i].position.y -= speed;
    }
    else if (theDirect === "left") {
        villagers[i].position.x -= speed;
    }
}

let conversationCounter = -1;

function villagersDialouge() {
    if (isTalking) {
        isUsable = false;
        for (let i = 0; i < menu.length; i++) {
            menu[i].visible = false;
        }
        talkDisplay("default");
    }

}

// if suddenly leave without finishing conversation, friendship pts deducted. 
//friendship pts can exchange for items at Nook shop. Give stuff to villagers can exchange to frd ship pts

function talkDisplay(convoStr) {
    if (isTalking) {
        if (mouseWentDown()) {
            conversationCounter++;
        }
    }

    dialougeBox.visible = true;
    dialougeBox.position.x = playerFemale.position.x;
    dialougeBox.position.y = playerFemale.position.y + playerFemale.height;
    drawSprite(dialougeBox);

    textFont(digitalTech);
    if (conversationCounter === 0 && convoStr === "default") {
        messageText(width / 100, 50, villagersData[thisVillager].dialouge[convoStr][conversationCounter] + playerName, dialougeBox.position.x, dialougeBox.position.y);
    }
    else {
        messageText(width / 100, 50, villagersData[thisVillager].dialouge[convoStr][conversationCounter], dialougeBox.position.x, dialougeBox.position.y);

    }

    if (conversationCounter > 3 && convoStr === "default") {
        // isTalking = false;
        // conversationCounter = -1;
        // for (let i = 0; i < villagers.length; i++) {
        //     villagers[i].visible = true;
        // }

        drawRect(villagers[thisVillager].position.x - cellWidth / 1.5, villagers[thisVillager].position.y - cellHeight / 2, cellWidth / 2, cellHeight, 10, 10, 10, 10, "#EEE1C6");
        chooseOption();
    }
}

let villagerOption;

function chooseOption() {
    for (let i = 0; i < 2; i++) {
        messageText(width / 100, 50, villagersData[thisVillager].function[i], villagers[thisVillager].position.x - cellWidth / 2.5, villagers[thisVillager].position.y - cellHeight / 2 + cellWidth / 7.5 + i * cellHeight / 3);
        if (villagers[thisVillager].mouseIsOver) {
            messageText(width / 100, "red", villagersData[thisVillager].function[i], villagers[thisVillager].position.x - cellWidth / 2.5, villagers[thisVillager].position.y - cellHeight / 2 + cellWidth / 7.5 + i * cellHeight / 3);
        }
    }
    // messageText()

}