function catchMenuFunction() {
    if (catchMenu.mouseIsPressed) {
        // gameState = "transition";
        answerYN = "no";
        // blackOut();
        gameState = "selectFB";
    }
}

function fishOrBug() {
    if (gameState === "selectFB") {
        camera.off();
        textFont(acFont);
        messageText(width / 50, 255, 'Would you like to catch \n Fish or Bug?', width / 2, height / 2);
        drawSprites(fishOrBugDisplay);

        if (fishOrBugDisplay[0].mouseIsPressed) {
            chooseSound.play();
            catchState = "fish";
            gameState = "catch";
            catchFish();
            generateFishes();
        }
        else if (fishOrBugDisplay[1].mouseIsPressed) {
            chooseSound.play();
            catchState = "bug";
            gameState = "catch";
            catchFish();
            generateFishes();
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
    }
}

function shopping() {
    if (gameState === "shop") {
        camera.off();
        noStroke();
        fill("#EEE1C6");
        rect(width / 4, height / 5, width / 2, height / 1.5);
        fill("white");
        rect(width / 2.8, height / 3.8, (width / 2) * 0.6, (height / 1.5) * 0.8);

        // UI/UX
        image(coinDisplay, width / 3.8, height / 5.2);
        textFont(digitalTech);
        messageText(width / 50, "white", "x" + coinCount, width / 3.2, height / 5.2);

        image(fishDisplay, width / 1.5 - 10, height / 5.2);
        messageText(width / 50, "white", "x" + fishCount, width / 1.458, height / 5.1);

        playerFemale.position.x = width / 4;
        playerFemale.position.y = height - height / 5 - playerFemale.height / 4.5;

        playerFemale.changeAnimation('forward');
        drawSprite(playerFemale);

        for (let i = 0; i < next.length; i++) {
            next[0].position.x = height / 2;

            next[1].position.x = height / 2 + width / 2;
            next[0].mirrorX(-1);

            if (next[i].mouseIsPressed) {
                // shopSelectSound.play();
            }
        }

        drawSprites(next);

        if (keyIsDown(27) || closeButton.mouseIsPressed) {
            gameState = "world";
        }
    }

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