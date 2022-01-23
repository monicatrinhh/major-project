let lastTimeSwitched = 0;
let theDirect = "forward";
let choosingDirection = ['forward', 'left', 'right', 'backwards'];
let thisVillager;
let amountTrade;
let isEnteringNum = true;
let isPlayingMusic = false;
let appleC = 0, bookC = 0, radioC = 0, cherryC = 0, stinkyB = 0;
let nookCrannySize = 3;
let nookCrannyw = 70;
let isStillTalking = false;
let isChatting = false;
let conversationCounter = -1;
let functionCounter = 0;
let isFunctioning = false;
let chattingCounter = 0;

function villagersMove() {
    for (let i = 0; i < villagers.length; i++) {
        if (!isTalking) {
            messageText(width / 100, 255, villagersData[i].name, villagers[i].position.x, villagers[i].position.y - 100);

        }
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
            if (gameState === "world" && !isOpening) {
                isTalking = true;
                thisVillager = i;
                isStillTalking = true;
                playerFemale.changeAnimation('normal');
                if (thisVillager === 4) {
                    theQuestion = floor(random(2.9));
                }
            }

            for (let i = 0; i < villagers.length; i++) {
                villagers[i].visible = false;
            }
            villagers[i].visible = true;
            walkingsfx.pause();
            villagerVoice.pause();

            villagers[i].position.x = playerFemale.position.x - dialougeBox.width / 4;
            villagers[i].position.y = playerFemale.position.y;

        }
    }
    if (keyWentDown(27)) {
        if (!isPlayingMusic) {
            isTalking = false;
            isFunctioning = false;
            isChatting = false;
            functionCounter = 0;
            for (let i = 0; i < villagers.length; i++) {
                villagers[i].visible = true;
            }
            for (let i = 0; i < nookCrannyItems.length; i++) {
                nookCrannyItems[i].visible = false;
            }
            conversationCounter = -1;
            if (!walkingsfx.isPlaying()) {
                walkingsfx.loop();
            }
            if (isStillTalking || isPlayingMusic) {
                friendshipPts--;
                storeItem('friendshipPts', friendshipPts);
            }
            isPlayingMusic = false;
            fbInput.hide();
            radio.hide();
            chattingInput.hide();
            musicButton.hide();
            pauseButton.hide();
            inputMusic.hide();
            villagerVoice.pause();
            // stop all music
            kkSong1.pause();
            kkSong2.pause();
            kkSong3.pause();

            isUsable = true;
        }

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

// if suddenly leave without finishing conversation, friendship pts deducted. 
//friendship pts can exchange for items at Nook shop. Give stuff to villagers can exchange to frd ship pts
function dialougeClicked() {
    if (isTalking) {
        if (mouseWentDown()) {
            if (!isFunctioning && !isChatting) {
                conversationCounter++;
                if (!villagerVoice.isPlaying()) {
                    villagerVoice.play();
                }
            }
            else if (isFunctioning) {
                functionCounter++;
                if (!villagerVoice.isPlaying()) {
                    villagerVoice.play();
                }
            }
            else if (isChatting) {
                chattingCounter++;
                if (!villagerVoice.isPlaying()) {
                    villagerVoice.play();
                }
            }
        }
    }
}

function villagersDialouge() {
    if (isTalking) {

        isUsable = false;
        for (let i = 0; i < menu.length; i++) {
            menu[i].visible = false;
        }
        dialougeClicked();

        dialougeBox.visible = true;
        dialougeBox.position.x = playerFemale.position.x;
        dialougeBox.position.y = playerFemale.position.y + playerFemale.height;
        drawSprite(dialougeBox);
        if (!isFunctioning) {
            textFont(digitalTech);
            if (conversationCounter === 0) {
                messageText(width / 100, 50, villagersData[thisVillager].dialouge["default"][conversationCounter] + playerName, dialougeBox.position.x, dialougeBox.position.y);
            }
            else {
                messageText(width / 100, 50, villagersData[thisVillager].dialouge["default"][conversationCounter], dialougeBox.position.x, dialougeBox.position.y);
            }
        }
        if (conversationCounter > 3) {
            // opt into function mode
            if (!isFunctioning && thisVillager !== 4 && !isChatting) {

                messageText(width / 100, 50, "Press 'A' or 'B' to select", dialougeBox.position.x, dialougeBox.position.y);
                drawRect(villagers[thisVillager].position.x - cellWidth / 1.5, villagers[thisVillager].position.y - cellHeight / 2, cellWidth / 2, cellHeight, 10, 10, 10, 10, "#EEE1C6");

                for (let i = 0; i < 2; i++) {
                    messageText(width / 100, 50, villagersData[thisVillager].function[i], villagers[thisVillager].position.x - cellWidth / 2.5, villagers[thisVillager].position.y - cellHeight / 2 + cellWidth / 7.5 + i * cellHeight / 3);
                    if (villagers[thisVillager].mouseIsOver) {
                        messageText(width / 100, "red", villagersData[thisVillager].function[i], villagers[thisVillager].position.x - cellWidth / 2.5, villagers[thisVillager].position.y - cellHeight / 2 + cellWidth / 7.5 + i * cellHeight / 3);
                    }
                }
            }
            else if (thisVillager === 4) {
                isStillTalking = true;
                isChatting = true;
            }
            chooseOption();
            chatWVillagers();
            blathersTrade();
            isabelleV();
            kkMusic();
            tomNookshop();
        }
    }

}

function chooseOption() {
    if (thisVillager === 3 && initialDebt > 0) {
        drawSprite(dialougeBox);
        isStillTalking = false;
        // pay debt button
        debtButton.position.x = dialougeBox.position.x;
        debtButton.position.y = dialougeBox.position.y + cellHeight / 4 + 20;
        drawSprite(debtButton);

        messageText(width / 100, 50, "Please pay your debt before \n you can access my abilities", dialougeBox.position.x, dialougeBox.position.y);
        messageText(width / 80, 50, initialDebt + " bells", dialougeBox.position.x, dialougeBox.position.y + cellHeight / 4 + 20);

        if (debtButton.mouseIsOver && mouseWentDown()) {
            if (coinCount >= initialDebt) {
                coinCount -= initialDebt;
                initialDebt = 0;
                chaChing.play();
                storeItem('coinCount', coinCount);
                storeItem('debt', initialDebt);
            }
            else {
                errorfx.play();
            }
        }

        if (debtButton.mouseIsOver) {
            debtButton.scale = width / 2500;
        }
        else {
            debtButton.scale = width / 3000;
        }
    }
    else {
        if (keyIsDown(65) && !isChatting) {
            isFunctioning = true;
            if (thisVillager === 0) {
                isEnteringNum = true;
            }
            isStillTalking = true;

        }
        else if (keyIsDown(66) && !isFunctioning) {
            isStillTalking = true;
            isChatting = true;
            theQuestion = floor(random(2.9));
            enterAnswer = true;
        }
    }
}

let theQuestion;
let enterAnswer = false;
function chatWVillagers() {
    if (isChatting) {
        messageText(width / 100, 50, villagersData[thisVillager].dialouge.chatting[chattingCounter], dialougeBox.position.x, dialougeBox.position.y);
        if (chattingCounter < 5) {
            enterAnswer = true;
        }
        if (chattingCounter > 5) {
            if (enterAnswer) {
                messageText(width / 100, 50, villagersData[thisVillager].dialouge.question[theQuestion], dialougeBox.position.x, dialougeBox.position.y - dialougeBox.height / 5);
                chattingInput.position(width / 2 - width / 20, height - height / 4);
                chattingInput.show();
            }
            else {
                messageText(width / 100, 50, villagersData[thisVillager].dialouge.answer[theQuestion], dialougeBox.position.x, dialougeBox.position.y);
                chattingInput.hide();

                if (mouseWentDown()) {
                    isStillTalking = false;
                    isTalking = false;
                    chattingCounter = 0;
                    for (let i = 0; i < villagers.length; i++) {
                        villagers[i].visible = true;
                    }
                    walkingsfx.loop();
                    friendshipPts += floor(random(2, 5));
                    storeItem('friendshipPts', friendshipPts);
                    chattingInput.value('');
                    isChatting = false;
                    functionCounter = 0;
                    conversationCounter = -1;
                    villagerVoice.pause();

                }
            }
            if (keyWentDown(13) && chattingInput.value() !== '') {
                enterAnswer = false;
            }
        }

    }
}
// trade fish and bug for coins, different exchange rate every time
function blathersTrade() {
    if (isFunctioning && thisVillager === 0) {
        messageText(width / 100, 50, villagersData[0].trade[functionCounter], dialougeBox.position.x, dialougeBox.position.y);
        if (functionCounter === 0) {
            messageText(width / 100, "orange", fbExchange + " fishes and bugs for 1 coin", dialougeBox.position.x, dialougeBox.position.y + width / 80);
        }
        if (functionCounter > 1 && thisVillager === 0) {
            if (isEnteringNum) {
                isStillTalking = true;
                messageText(width / 100, 50, "Please Enter the number of Fish \nand Bug you would like to trade", dialougeBox.position.x, dialougeBox.position.y - width / 80);
                fbInput.position(width / 2 - width / 20, height - height / 4.5);
                fbInput.show();
            }
            else {
                messageText(width / 100, 50, "That's lovely, " + playerName + "! I will have \n lots of fun investigating them!", dialougeBox.position.x, dialougeBox.position.y);
                fbInput.hide();
                amountTrade = fbInput.value();


                //esc and done with trading
                if (mouseWentDown()) {
                    if (amountTrade !== "" && fishCount >= amountTrade * fbExchange && bugCount >= amountTrade * fbExchange) {
                        fishCount -= floor(amountTrade) * fbExchange;
                        bugCount -= floor(amountTrade) * fbExchange;
                        coinCount += parseInt(floor(amountTrade));
                        storeItem('fishCount', fishCount);
                        storeItem('bugCount', bugCount);
                        storeItem('coinCount', coinCount);
                    }
                    isStillTalking = false;
                    isTalking = false;
                    isFunctioning = false;
                    functionCounter = 0;
                    for (let i = 0; i < villagers.length; i++) {
                        villagers[i].visible = true;
                    }
                    conversationCounter = -1;
                    walkingsfx.loop();
                    villagerVoice.pause();

                    friendshipPts += floor(random(2, 5));
                    storeItem('friendshipPts', friendshipPts);
                }
            }
            // hit enter amount
            if (keyWentDown(13)) {
                isEnteringNum = false;
            }
        }
    }
}

function isabelleV() {
    if (isFunctioning && thisVillager === 1) {
        messageText(width / 100, 50, villagersData[1].instruct[functionCounter], dialougeBox.position.x, dialougeBox.position.y);

        // done w instruction and esc
        if (functionCounter > 9) {
            isTalking = false;
            isFunctioning = false;
            for (let i = 0; i < villagers.length; i++) {
                villagers[i].visible = true;
            }
            conversationCounter = -1;
            walkingsfx.loop();
            villagerVoice.pause();
            isStillTalking = false;
            functionCounter = 0;
        }
    }

}
let insertMusic = false;
function kkMusic() {
    if (isFunctioning && thisVillager === 2) {
        messageText(width / 100, 50, villagersData[2].music[functionCounter], dialougeBox.position.x, dialougeBox.position.y);

        // choose music option
        if (functionCounter > 3) {
            messageText(width / 100, 50, "Please choose your music option", dialougeBox.position.x, dialougeBox.position.y);
            radio.show();
            radio.position(width / 2 - width / 12, height - height / 4.5);
            let val = radio.value();
            if (val) {
                if (val === "Choose my own Music") {

                    // hit enter to spawn buttons
                    if (keyWentDown(13)) {
                        inputMusic.show();
                        inputMusic.position(width / 2 - width / 15, height - height / 5.5);
                        insertMusic = true;
                    }
                    // disable texr when open file
                    if (!insertMusic) {
                        messageText(width / 100, 50, "Press hit Enter to Select", dialougeBox.position.x, dialougeBox.position.y + dialougeBox.height / 4);
                    }
                    kkSong1.pause();
                    kkSong2.pause();
                    kkSong3.pause();
                }
                if (!isPlayingMusic && val === "KK's music") {
                    insertMusic = false;
                    musicButton.hide();
                    pauseButton.hide();
                    inputMusic.hide();
                    messageText(width / 100, 50, "Press Enter to Play", dialougeBox.position.x, dialougeBox.position.y + dialougeBox.height / 4);

                    if (keyWentDown(13)) {
                        // kkSong1.play();     
                        if (random(100) < 33) {
                            kkSong1.play();
                        }
                        else if (random(100) < 66) {
                            kkSong2.play();
                        }
                        else if (random(100) < 100) {
                            kkSong3.play();
                        }
                        isStillTalking = false;
                        friendshipPts += floor(random(2, 5));
                        storeItem("friendshipPts", friendshipPts);
                    }
                }
                // play and pause button
                if (insertMusic) {
                    musicButton.mousePressed(togglePlaying);
                    musicButton.show();
                    pauseButton.mousePressed(pauseMusic);
                    pauseButton.show();
                }
            }
        }
    }
}


function tomNookshop() {
    if (isFunctioning && thisVillager === 3) {
        messageText(width / 80, 'orange', ':x' + friendshipPts, dialougeBox.position.x, dialougeBox.position.y - dialougeBox.height / 3.5);
        messageText(width / 100, 'orange', "Welcome to Nook Cranny", dialougeBox.position.x, dialougeBox.position.y - dialougeBox.height / 4.5);
        messageText(width / 130, 50, "Interact with players to gain Friendship Pts \n so you can purchase items", dialougeBox.position.x, dialougeBox.position.y + nookCrannyw * 3 / 2);
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < nookCrannySize; x++) {
                stroke(0);
                noFill();
                rect(x * nookCrannyw + dialougeBox.position.x - dialougeBox.width / 5, y * nookCrannyw + dialougeBox.position.y - dialougeBox.height / 5, nookCrannyw, nookCrannyw);

            }
        }
        for (let i = 0; i < nookCrannyItems.length; i++) {
            nookCrannyItems[i].visible = true;
        }
        drawSprites(nookCrannyItems);
        for (let i = 0; i < nookCrannyItems.length; i++) {

            nookCrannyItems[i].position.x = (i % 3) * nookCrannyw + dialougeBox.position.x - dialougeBox.width / 7;
            nookCrannyItems[i].position.y = (i % 2) * nookCrannyw + dialougeBox.position.y - dialougeBox.height / 5.5 + nookCrannyw / 2;

            if (nookCrannyItems[i].mouseIsOver) {
                drawRect(nookCrannyItems[i].position.x - nookCrannyw / 2 + 5, nookCrannyItems[i].position.y - nookCrannyw / 4, nookCrannyw, nookCrannyw / 2, 10, 10, 10, 10, '#654321');
                messageText(width / 110, 255, "x" + villagersData[3].item[i], nookCrannyItems[i].position.x, nookCrannyItems[i].position.y + 7);
            }
            if (nookCrannyItems[i].mouseIsOver && mouseWentDown()) {
                if (friendshipPts >= villagersData[3].item[i]) {
                    chaChing.play();
                    friendshipPts -= villagersData[3].item[i];
                    storeItem('friendshipPts', friendshipPts);

                    if (i === 0) {
                        appleC++;
                        storeItem('apple', appleC);
                    }
                    else if (i === 1) {
                        bookC++;
                        storeItem('book', bookC);
                    }
                    else if (i == 2) {
                        stinkyB++;
                        storeItem('stinkyB', stinkyB);
                    }

                    else if (i == 3) {
                        cherryC++;
                        storeItem('cherry', cherryC);
                    }
                    else if (i == 4) {
                        radioC++;
                        storeItem('radioC', radioC);
                    }
                    else if (i == 5) {
                        coinCount += floor(random(30, 80));
                        storeItem('coinCount', coinCount);
                    }
                    friendshipPts += floor(random(4));
                    storeItem('friendshipPts', friendshipPts);
                }
                else {
                    errorfx.play();
                }
            }
        }
        leafImg.resize(25, 25);
        image(leafImg, dialougeBox.position.x - nookCrannyw / 1.4, dialougeBox.position.y - dialougeBox.height / 2.8);
        isStillTalking = false;

    }
}
function handleFile(file) {
    if (file.type === 'audio') {
        theSound = createAudio(file.data, '');
    }
    musicButton.position(width / 2 - kk.width, height / 2 - kk.width / 1.5);
    pauseButton.position(width / 2 - kk.width + 50, height / 2 - kk.width / 1.5);
}

function togglePlaying() {

    theSound.play();
    isPlayingMusic = true;
}

function pauseMusic() {
    theSound.pause();
    isStillTalking = false;
    isPlayingMusic = false;
}
