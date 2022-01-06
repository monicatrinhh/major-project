let isItInside = true;
let fishingTimeCount = 0;
let bugCatchingTimeCount = 0;
let isDisplayStorage = false;
let isFishable = true, isBugable = true;

function catchMenuFunction() {
    if (catchMenu.mouseIsPressed) {
        answerYN = "no";
        gameState = "selectFB";
    }
}
function buildMenuFunction() {
    if (buildMenu.mouseIsPressed) {
        answerYN = "no";
        gameState = "build";
    }
}

function storageMenuFunction() {
    if (storageMenu.mouseIsPressed) {
        isDisplayStorage = true;
    }
    if (isDisplayStorage) {
        displayStorage();
        // for (let i = 0; i < itemDisplayStorage.length; i++) {
        //     itemDisplayStorage[i].visible = true;
        // }
        // for (let y = 0; y < floor(storageSize * 3 / 4); y++) {
        //     for (let x = 0; x < 2; x++) {
        //         for (let i = 0; i < itemDisplayStorage.length; i++) {
        //             itemDisplayStorage[i].position.x = playerFemale.position.x + x * cellStorageWidth;
        //             itemDisplayStorage[i].position.y = playerFemale.position.y + y * cellStorageHeight;
        //         }

        //     }

        // }

    }
    if (mouseWentDown()) {
        isDisplayStorage = false;
        for (let i = 0; i < itemDisplayStorage.length; i++) {
            itemDisplayStorage[i].visible = false;
        }

    }
    drawSprites(itemDisplayStorage);
}

// mouseX > playerFemale.position.x + storageSize * cellStorageWidth + playerFemale.width / 2 && mouseX < playerFemale.position.x + playerFemale.width / 2 && mouseY < playerFemale.position.y - cellStorageHeight && mouseY > playerFemale.position.y + cellStorageHeight


function buildSpaces() {
    if (gameState === "build") {
        camera.off();

        if (timeState === "day") {
            background(bgDay);
        }
        else if (timeState === "afternoon") {
            background(bgAfternoon);
        }
        else {
            background(bgNight);
        }


        fill('white');
        displayHomeGrid();
        drawSprite(closeButton);
        // move player and place items
        insideSpaces();
        buildStorageDisplay();
    }
}

function insideSpaces() {
    if (gameState === "build") {


        if (playerFemaleMini.position.x >= widthBuffer + cellHomeWidth / 2 && playerFemaleMini.position.y >= heightBuffer + cellHomeHeight / 0.9 && playerFemaleMini.position.x <= width - widthBuffer - cellHomeWidth / 2 && playerFemaleMini.position.y <= height - heightBuffer - cellHomeHeight / 0.8) {
            if (keyIsDown(40)) { //down arrow 

                playerFemaleMini.changeAnimation('forward');
                playerFemaleMini.position.y += 2;
            }
            else if (keyIsDown(38)) { // up arrow
                playerFemaleMini.changeAnimation('backward');
                playerFemaleMini.position.y -= 2;
            }
            else if (keyIsDown(39)) { // -->
                playerFemaleMini.changeAnimation('movingRL');
                playerFemaleMini.mirrorX(-1);
                playerFemaleMini.position.x += 2;
            }
            else if (keyIsDown(37)) {// <---
                playerFemaleMini.changeAnimation('movingRL');
                playerFemaleMini.mirrorX(1);
                playerFemaleMini.position.x -= 2;
            }

        }
        else {
            if (playerFemaleMini.position.x <= widthBuffer + cellHomeWidth / 2) {
                playerFemaleMini.position.x += 1;
            }
            if (playerFemaleMini.position.y <= heightBuffer + cellHomeHeight / 0.9) {
                playerFemaleMini.position.y += 1;
            }
            if (playerFemaleMini.position.x >= width - widthBuffer - cellHomeWidth / 2) {
                playerFemaleMini.position.x -= 1;
            }
            if (playerFemaleMini.position.y >= height - heightBuffer - cellHomeHeight / 0.8) {
                playerFemaleMini.position.y -= 1;
            }
        }
        drawSprite(playerFemaleMini);


        if (keyIsDown(27) || closeButton.mouseIsPressed) {
            gameState = "world";
        }
    }
}

function fishOrBug() {
    if (gameState === "selectFB") {
        camera.off();
        textFont(acFont);
        messageText(width / 50, 255, 'Would you like to catch \n Fish or Bug?', width / 2, height / 2);
        messageText(width / 80, 255, "Press Esc to exit Catch mode", width / 2, height / 2 + cellWidth);
        drawSprites(fishOrBugDisplay);

        for (let i = 0; i < fishOrBugDisplay.length; i++) {
            fishOrBugDisplay[i].scale = width / 1000;
            if (fishOrBugDisplay[i].mouseIsOver) {
                fishOrBugDisplay[i].scale = width / 1000 + 0.2;
            }
        }
        if (keyIsDown(27)) {
            gameState = "world";

        }
        if (fishOrBugDisplay[0].mouseIsPressed) {
            chooseSound.play();
            catchState = "fish";
            gameState = "catch";
            catchFish();
            generateFishes();
            fishingTimeCount++;
        }
        else if (fishOrBugDisplay[1].mouseIsPressed) {
            chooseSound.play();
            catchState = "bug";
            gameState = "catch";
            catchFish();
            generateFishes();
            bugCatchingTimeCount++;
        }
    }
}

function shopMenuFunction() {
    if (shopMenu.mouseIsPressed) {
        if (hour() >= 8 && hour() <= 23) {
            gameState = "shop";
            answerYN = "no";
            shopping();
            drawSprite(closeButton);
        }
        // a bubble text from player
    }
}

function shopping() {
    if (gameState === "shop") {
        camera.off();
        noStroke();

        // 1st rect
        fill("#EEE1C6");
        rect(width / 4, height / 5, width / 2, height / 1.5);

        // 2nd rect
        fill("white");
        rect(width / 2.8, height / 3.9, width / 3.5, height / 1.8);

        // UI/UX
        image(coinDisplay, width / 3.8, height / 5);
        textFont(digitalTech);

        drawRect(width / 4, height / 5 - 30, cellWidth / 3, 30, 0, 10, 0, 0, "#EEE1C6");
        messageText(width / 50, "white", "x" + coinCount, width / 10 * 2.8, height / 5.2);
        drawRect(width - width / 4 - 170, height / 5 - 30, 95, 30, 0, 10, 0, 0, "#EEE1C6");
        image(fishDisplay, width / 1.5 - 10, height / 5.2);
        drawRect(width - width / 4 - 75, height / 5 - 30, 75, 30, 0, 10, 0, 0, "#EEE1C6");
        messageText(width / 50, "white", "x" + fishCount, width / 1.488, height / 5.1);

        image(butterflyDisplay, width / 1.42, height / 5.2);
        messageText(width / 50, "white", "x" + bugCount, width / 1.38, height / 5.1);


        playerFemale.position.x = width / 4;
        playerFemale.position.y = height - height / 5 - playerFemale.height / 4.5;
        playerFemale.changeAnimation('normal');
        drawSprite(playerFemale);



        if (purchaseButton.mouseIsPressed) {
            purchaseButton.scale = width / 1500 + 0.1;
        }
        else {
            purchaseButton.scale = width / 1500;
        }


        // interact with <- -> button 
        for (let i = 0; i < next.length; i++) {
            next[i].scale = width / 10000;
            next[0].position.x = width / 2 - next[i].width * 2.75;
            next[1].position.x = width / 2 + next[i].width * 2.75;
            next[0].mirrorX(-1);

            // pop up button
            if (next[i].mouseIsOver) {
                // shopSelectSound.play();
                next[i].scale = width / 10000 + 0.01;
            }
            drawSprites(next);
        }

        if (next[1].mouseIsOver && mouseWentDown()) {
            itemDisplay.nextFrame();
        }
        else if (next[0].mouseIsOver && mouseWentDown()) {
            itemDisplay.previousFrame();
        }

        drawSprite(nameBox);
        animation(itemDisplay, width / 2, height / 2);
        textFont(acFont);
        messageText(width / 50, "orange", itemPurchase[itemDisplay.getFrame()].name, width / 2, height / 4 + 10);
        textFont(digitalTech);

        // drawRect(width / 2.5, height - height / 3, width / 5, height / 8, 10, 10, 10, 10, "orange");
        messageText(width / 100, 100, itemPurchase[itemDisplay.getFrame()].description, width / 2, height - height / 3.5);

        drawRect(width / 4 - 20, height / 3.7, width / 10, width / 30, 0, 20, 20, 0, "orange");
        drawRect(width / 1.5 - 10, height / 3.7, width / 10, width / 30, 20, 0, 0, 20, "orange");
        // pricing in coins, fish, bugs
        messageText(width / 60, 255, "Price: x" + itemPurchase[itemDisplay.getFrame()].price[0], width / 3.5, height / 3.2);
        messageText(width / 60, 255, "x" + itemPurchase[itemDisplay.getFrame()].price[1], width / 1.5 + cellWidth / 10, height / 3.2);
        messageText(width / 60, 255, "x" + itemPurchase[itemDisplay.getFrame()].price[2], width / 1.5 + cellWidth / 3.2, height / 3.2);

        purchaseButton.position.y = height - (height / 5.2);
        drawSprite(purchaseButton);
        messageText(width / 70, 255, "PURCHASE", width / 2, height - (height / 5.2));

        if (purchaseButton.mouseIsOver && mouseWentDown()) {
            purchaseItem();
        }

        if (keyIsDown(27) || closeButton.mouseIsPressed) {
            gameState = "world";
        }
    }

}

function purchaseItem() {
    if (coinCount >= itemPurchase[itemDisplay.getFrame()].price[0] && fishCount >= itemPurchase[itemDisplay.getFrame()].price[1] && bugCount >= itemPurchase[itemDisplay.getFrame()].price[2]) {
        coinCount -= itemPurchase[itemDisplay.getFrame()].price[0];
        fishCount -= itemPurchase[itemDisplay.getFrame()].price[1];
        bugCount -= itemPurchase[itemDisplay.getFrame()].price[2];
        if (itemDisplay.getFrame() === 1) {
            bugNetCount++;
        }
        else if (itemDisplay.getFrame() === 2) {
            fishRodCount++;
        }
    }
    else {
        // appear message you don't have enough fund
    }

}

function drawRect(x, y, w, l, br1, br2, br3, br4, theColor) {
    fill(theColor);
    noStroke();
    rect(x, y, w, l, br1, br2, br3, br4);
}

function theMap() {
    // zoom in/out of the map
    if (mapMenu.mouseIsPressed) {
        zoomOut = true;
    }
    if (zoomOut) {
        camera.zoom = 0.1;
        textFont(digitalTech);
        messageText(width / 8, 200, 'Press on player to zoom in', playerFemale.position.x, playerFemale.position.y - cellWidth);
    }
}

function replaceTool() {
    if (catchState === "fish") {
        if (fishingTimeCount > 5) {
            if (fishRodCount > 0) {
                fishingHook.visible = true;
                fishRodCount--;
                fishingTimeCount = 0;
                isFishable = true;
            }
            else {
                fishingHook.visible = false;
                isFishable = false;
                stroke(0);
                messageText(width / 100, 255, "Uh Oh...You need to replace your fishing rod \n (psst...Fishing Rod breaks after 5 usages)", width / 2, height / 2);
            }
        }
    }
    else if (catchState === "bug") {
        // make it appear as well when fishing hook disappears
        // no stroke on exitBox
        if (bugCatchingTimeCount > 5) {
            if (bugNetCount > 0) {
                fishingHook.visible = true;
                bugNetCount--;
                bugCatchingTimeCount = 0;
                isBugable = true;
            }
            else {
                fishingHook.visible = false;
                isBugable = false;
                stroke(0);
                messageText(width / 100, 255, "Uh Oh...You need to replace your bug net \n (psst...Bug net wears out after 5 usages)", width / 2, height / 2);
            }
        }
    }

}