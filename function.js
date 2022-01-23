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

function cameraFunction() {
    // if (cameraMenu.mouseIsPressed) {
    //     isCapturing = true;
    // }
    // if (isCapturing) {
    //     camera.off();
    //     gameState = "camera";
    //     image(capture, width / 2, height / 2, 360, 240);
    // }
}

function storageMenuFunction() {
    if (storageMenu.mouseIsPressed) {
        isDisplayStorage = true;
        isUsable = false;
    }
    if (isDisplayStorage) {
        // messageText(width/120,50,"Press 'G' to give items to villagers",)
        for (let i = 0; i < itemDisplayStorage.length; i++) {
            itemDisplayStorage[i].visible = true;
        }
        displayStorage();

        if (appleC > 0) {
            displayNookCranItems(0, appleC);
        }
        else {
            appleC.visible = false;
        }

        if (bookC > 0) {
            displayNookCranItems(1, bookC);
        }
        else {
            bookC.visible = false;
        }

        if (stinkyB > 0) {
            displayNookCranItems(2, stinkyB);
        }
        else {
            stinkyB.visible = false;
        }
        if (cherryC > 0) {
            displayNookCranItems(3, cherryC);
        }
        else {
            cherryC.visible = false;
        }
        if (radioC > 0) {
            displayNookCranItems(4, radioC);
        }
        else {
            radioC.visible = false;
        }
        drawSprites(nookCrannyItems);
        sellItemButton.visible = true;

    }
    sellItemButton.position.x = playerFemale.position.x + cellStorageWidth * 2 + playerFemale.width / 2;
    sellItemButton.position.y = playerFemale.position.y + cellStorageHeight * 1.8;

    drawSprite(sellItemButton);
    if (isDisplayStorage) {
        textFont(digitalTech);
        messageText(width / 100, 255, "SELL", sellItemButton.position.x, sellItemButton.position.y);
    }
    if (sellItemButton.mouseIsPressed) {
        isDisplayStorage = true;
        if (appleC > 0 && bookC > 0 && stinkyB > 0 && cherryC > 0 && radioC > 0) {
            appleC--;
            bookC--;
            stinkyB--;
            cherryC--;
            radioC--;
            chaChing.play();
            coinCount += floor(random(30, 50));
            fishCount += floor(random(30, 50));
            bugCount += floor(random(30, 50));

            for (let i = 0; i < nookCrannyItems.length; i++) {
                nookCrannyItems[i].visible = false;
            }
            storeItem('apple', appleC);
            storeItem('book', bookC);
            storeItem('stinkyB', stinkyB);
            storeItem('cherry', cherryC);
            storeItem('radioC', radioC);
            storeItem('coinCount', coinCount);
            storeItem('fishCount', fishCount);
            storeItem('bugCount', bugCount);
        }
        else {
            errorfx.play();
        }
    }
    if (mouseWentDown()) {
        isDisplayStorage = false;
        for (let i = 0; i < itemDisplayStorage.length; i++) {
            itemDisplayStorage[i].visible = false;
        }
        isUsable = true;
        sellItemButton.visible = false;
    }

    for (let i = 0; i < itemDisplayStorage.length; i++) {
        itemDisplayStorage[i].scale = width / 7000;
        itemDisplayStorage[i].position.x = playerFemale.position.x + playerFemale.width / 2 + cellStorageWidth / 2 + i * cellStorageWidth;
        itemDisplayStorage[i].position.y = playerFemale.position.y - cellStorageHeight - cellStorageHeight / 2;
    }
    drawSprites(itemDisplayStorage);
}

let theItemChosen;
let isGiven = false;
function giveItems() {
    if (!isTalking) {
        walkingsfx.pause();
        isUsable = false;

        for (let i = 0; i < nookCrannyItems.length; i++) {
            if (nookCrannyItems[i].mouseIsPressed && nookCrannyItems[i].visible) {
                chooseSound.play();
                theItemChosen = i;
            }
        }
    }
    giveItemsFriendship(appleC);
}

let counterStorage = ['apple', 'book', 'bug', 'stinkyB', 'cherry', 'radio'];
function giveItemsFriendship(counter) {

    // counter--;
    // storeItem(counterStorage[theItemChosen], counter);
    // friendshipPts += floor(random(5, 12));
    // storeItem('friendShipPts', friendshipPts);
    // isGiven = false;


    // }
}

function displayNookCranItems(i, counter) {
    if (counter > 0) {
        nookCrannyItems[i].visible = true;
    }
    else {
        nookCrannyItems[i].visible = false;
    }
    if (i < 2) {
        nookCrannyItems[i].position.x = playerFemale.position.x + playerFemale.width / 2 + cellStorageWidth / 2 + (i + 2) * cellStorageWidth;
        nookCrannyItems[i].position.y = playerFemale.position.y - cellStorageHeight - cellStorageHeight / 2;
        messageText(width / 120, 0, counter, playerFemale.position.x + playerFemale.width / 2 + (i + 2) * cellStorageWidth, playerFemale.position.y - cellStorageHeight + 5);
    }
    else {
        nookCrannyItems[i].position.x = playerFemale.position.x + playerFemale.width / 2 + cellStorageWidth / 2 + (i - 2) * cellStorageWidth;
        nookCrannyItems[i].position.y = playerFemale.position.y - cellStorageHeight / 2;
        messageText(width / 120, 0, counter, playerFemale.position.x + playerFemale.width / 2 + (i - 2) * cellStorageWidth, playerFemale.position.y + 5);

    }
}

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
let isEmmaDisplay = false, isbPDisplay = false, isJEDisplay = false;
function insideSpaces() {
    if (gameState === "build") {

        walkingsfx.pause();
        if (playerFemaleMini.position.x >= widthBuffer + cellHomeWidth / 2 && playerFemaleMini.position.y >= heightBuffer + cellHomeHeight / 0.9 && playerFemaleMini.position.x <= width - widthBuffer - cellHomeWidth / 2 && playerFemaleMini.position.y <= height - heightBuffer - cellHomeHeight / 0.8) {
            if (keyIsDown(83)) { //down arrow 

                playerFemaleMini.changeAnimation('forward');
                playerFemaleMini.position.y += 2;
            }
            else if (keyIsDown(87)) { // w arrow
                playerFemaleMini.changeAnimation('backward');
                playerFemaleMini.position.y -= 2;
            }
            else if (keyIsDown(68)) { // -->
                playerFemaleMini.changeAnimation('movingRL');
                playerFemaleMini.mirrorX(-1);
                playerFemaleMini.position.x += 2;
            }
            else if (keyIsDown(65)) {// <---
                playerFemaleMini.changeAnimation('movingRL');
                playerFemaleMini.mirrorX(1);
                playerFemaleMini.position.x -= 2;
            }
            else {
                playerFemaleMini.changeAnimation('normal');
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

        for (let i = 0; i < houseDisplay.length; i++) {
            houseDisplay[i].position.x = widthBuffer / 4 + cellStorageWidth / 2;
            houseDisplay[i].position.y = heightBuffer + i * height / 5 + cellStorageHeight + cellStorageHeight / 2;
        }

        if (isBP) {
            houseDisplay[0].visible = true;
            if (houseDisplay[0].mouseIsPressed) {
                isbPDisplay = true;
                storeItem('isbPDisplay', isbPDisplay);
                storeItem('isEmmaDisplay', isEmmaDisplay);
            }
        }
        if (isbPDisplay) {
            displayFurniture(bP);
            isEmmaDisplay = false;
            isJEDisplay = false;
            for (let i = 0; i < bP.length; i++) {
                bP[i].visible = true;
            }
        }
        else {
            for (let i = 0; i < bP.length; i++) {
                bP[i].visible = false;
            }
        }
        if (isEmma) {
            houseDisplay[1].visible = true;
            if (houseDisplay[1].mouseIsPressed) {
                isEmmaDisplay = true;
                storeItem('isEmmaDisplay', isEmmaDisplay);
            }
        }
        if (isEmmaDisplay) {
            displayFurniture(emmaS);
            isbPDisplay = false;
            isJEDisplay = false;
            for (let i = 0; i < emmaS.length; i++) {
                emmaS[i].visible = true;
            }
        }
        else {
            for (let i = 0; i < emmaS.length; i++) {
                emmaS[i].visible = false;
            }
        }
        if (isJaneE) {
            houseDisplay[2].visible = true;
            if (houseDisplay[2].mouseIsPressed) {
                isJEDisplay = true;
                storeItem('isJEDisplay', isJEDisplay);
            }
        }
        if (isJEDisplay) {
            displayFurniture(jeS);
            isbPDisplay = false;
            isEmmaDisplay = false;
            for (let i = 0; i < jeS.length; i++) {
                jeS[i].visible = true;
            }
        }
        else {
            for (let i = 0; i < jeS.length; i++) {
                jeS[i].visible = false;
            }
        }

        if (isVeneer) {
            veneerDisplay.visible = true;
            if (veneerDisplay.mouseIsPressed) {
                tileCount = 2;
            }
        }
        if (isArgyle) {
            argyleDisplay.visible = true;
            if (argyleDisplay.mouseIsPressed) {
                tileCount = 1;
            }
        }
        if (isHoneyComb) {
            honeyCDisplay.visible = true;
            if (honeyCDisplay.mouseIsPressed) {
                tileCount = 3;
            }
        }
        // draw storage img
        drawSprites(houseDisplay);

        // draw furniture sets
        drawSprites(emmaS);
        drawSprites(bP);
        drawSprites(jeS);
        drawSprite(playerFemaleMini);

        drawSprite(veneerDisplay);
        drawSprite(argyleDisplay);
        drawSprite(honeyCDisplay);


        if (keyIsDown(27) || closeButton.mouseIsPressed) {
            gameState = "world";
            if (!walkingsfx.isPlaying()) {
                walkingsfx.loop();
            }
            isUsable = false;
        }
        storeItem('isbPDisplay', isbPDisplay);
        storeItem('isEmmaDisplay', isEmmaDisplay);
        storeItem('isJEDisplay', isJEDisplay);
        storeItem('isEmma', isEmma);
        storeItem('isBP', isBP);
        storeItem('isJaneE', isJaneE);
    }
}
let xMirror = false;
let draggedSprite;
function displayFurniture(theSet, bool) {

    for (let i = 0; i < theSet.length; i++) {

        // drag furniture to organize
        theSet[i].onMousePressed = function () {
            if (draggedSprite == null) {
                draggedSprite = this;
            }
        };

        theSet[i].onMouseReleased = function () {
            if (draggedSprite == this) {
                draggedSprite = null;
            }
        };

        if (draggedSprite != null) {
            if (draggedSprite.position.x >= widthBuffer + cellHomeWidth / 2 && draggedSprite.position.y >= heightBuffer + cellHomeHeight / 0.9 && draggedSprite.position.x <= width - widthBuffer - cellHomeWidth / 2 && draggedSprite.position.y <= height - heightBuffer - cellHomeHeight / 0.8) {
                draggedSprite.position.x = mouseX;
                draggedSprite.position.y = mouseY;
            }
            else {
                draggedSprite.position.x = width / 2;
                draggedSprite.position.y = height / 2;
            }

        }
        // scale furniture
        if (keyIsDown(38)) {
            if (theSet[i].scale <= 1.5) {
                theSet[i].scale += 0.005;
            }
        }
        else if (keyIsDown(40)) {
            if (theSet[i].scale >= 1) {
                theSet[i].scale -= 0.005;
            }
        }

        playerFemaleMini.collide(theSet);
    }
}

function fishOrBug() {
    if (gameState === "selectFB") {
        camera.off();
        walkingsfx.pause();

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
            if (!walkingsfx.isPlaying()) {
                walkingsfx.loop();
            }
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
        if (hour() >= 8 && hour() <= 24) {

            walkingsfx.pause();
            gameState = "shop";
            answerYN = "no";
            shopping();
            drawSprite(closeButton);
        }
        else {
            errorfx.play();
        }
    }
}

function shopping() {
    if (gameState === "shop") {
        camera.off();
        noStroke();
        cursor('grab');
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
            if (!walkingsfx.isPlaying()) {
                walkingsfx.loop();
            }
            isUsable = false;
        }
    }

}
let theHouse = false;
let theMansion = false;
function purchaseItem() {
    if (coinCount >= itemPurchase[itemDisplay.getFrame()].price[0] && fishCount >= itemPurchase[itemDisplay.getFrame()].price[1] && bugCount >= itemPurchase[itemDisplay.getFrame()].price[2]) {
        chaChing.play();
        coinCount -= itemPurchase[itemDisplay.getFrame()].price[0];
        fishCount -= itemPurchase[itemDisplay.getFrame()].price[1];
        bugCount -= itemPurchase[itemDisplay.getFrame()].price[2];
        storeItem('coinCount', coinCount);
        storeItem('fishCount', fishCount);
        storeItem('bugCount', bugCount);
        if (itemDisplay.getFrame() === 1) {
            bugNetCount++;
            storeItem('bugNetCount', bugNetCount);
        }
        else if (itemDisplay.getFrame() === 0) {
            isBP = true;
            storeItem('isBP', isBP);
        }
        else if (itemDisplay.getFrame() === 2) {
            fishRodCount++;
            storeItem('fishRodCount', fishRodCount);
        }
        else if (itemDisplay.getFrame() === 3) {
            if (!theMansion && !theHouse) {
                theHouse = true;
                storeItem('house', theHouse);
            }
        }
        else if (itemDisplay.getFrame() === 4) {
            isJaneE = true;
            storeItem('isJaneE', isJaneE);
        }
        else if (itemDisplay.getFrame() === 5) {
            theMansion = true;
            theHouse = false;
            storeItem('mansion', theMansion);
            storeItem('house', thehouse);
        }
        else if (itemDisplay.getFrame() === 6) {
            isEmma = true;
            storeItem('isEmma', isEmma);
        }
        else if (itemDisplay.getFrame() === 7) {
            isArgyle = true;
            storeItem('argyle', isArgyle);
        }
        else if (itemDisplay.getFrame() === 8) {
            isVeneer = true;
            storeItem('veneer', isVeneer);
        }
        else if (itemDisplay.getFrame() === 9) {
            isHoneyComb = true;
            storeItem('honeyComb', isHoneyComb);
        }
    }
    else {
        errorfx.play();
    }

}

function drawRect(x, y, w, l, br1, br2, br3, br4, theColor) {
    fill(theColor);
    noStroke();
    rect(x, y, w, l, br1, br2, br3, br4);
}

function theMap() {
    // zoom in/out of the map
    if (mapMenu.mouseIsOver && mouseWentDown()) {
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
        if (fishingTimeCount < 6 && bugCatchingTimeCount > 5) {
            fishingHook.visible = true;
        }
        if (fishingTimeCount > 5) {
            if (fishRodCount > 0) {
                fishRodCount--;
                storeItem('fishRodCount', fishRodCount);
                isFishable = true;
                fishingTimeCount = 0;

            }
            else {
                fishingHook.visible = false;
                isFishable = false;
                stroke(0);
                messageText(width / 100, 255, "Uh oh...You need to purchase a new fishing rod \n (psst...Fishing Rod breaks after 5 usages)", width / 2, height / 2);
            }
        }
    }
    else if (catchState === "bug") {
        // make it appear as well when fishing hook disappears
        // no stroke on exitBox
        if (fishingTimeCount > 5 && bugCatchingTimeCount < 6) {
            fishingHook.visible = true;
        }
        if (bugCatchingTimeCount > 5) {

            if (bugNetCount > 0) {
                fishingHook.visible = true;
                bugNetCount--;
                storeItem('bugNetCount', bugNetCount);
                isBugable = true;
                bugCatchingTimeCount = 0;

            }
            else {
                fishingHook.visible = false;
                isBugable = false;
                stroke(0);
                messageText(width / 100, 255, "Uh oh...You need to purchase a new bug net \n (psst...Bug net wears out after 5 usages)", width / 2, height / 2);
            }
        }
    }

}