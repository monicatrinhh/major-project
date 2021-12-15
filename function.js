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

function buildSpaces() {
    if (gameState === "build") {
        camera.off();
        fill('white');
        rect(width / 2, height / 2, 50, 50);
        displayHomeGrid();
        drawSprite(closeButton);

        playerFemale.scale = homeGridSize / 35;
        playerFemale.position.x = widthBuffer + cellHomeWidth / 2;
        playerFemale.position.y = heightBuffer + cellHomeHeight / 2;
        playerFemale.changeAnimation('forward');

        insideSpaces();
    }
}

function insideSpaces() {
    if (keyIsDown(40)) {
        playerFemale.position.y += 5;
    }
    drawSprite(playerFemale);

    if (keyIsDown(27) || closeButton.mouseIsPressed) {
        gameState = "world";
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

        // 1st rect
        fill("#EEE1C6");
        rect(width / 4, height / 5, width / 2, height / 1.5);

        // 2nd rect
        fill("white");
        rect(width / 2.8, height / 3.9, width / 3.5, height / 1.8);

        // UI/UX
        image(coinDisplay, width / 3.8, height / 5);
        textFont(digitalTech);
        messageText(width / 50, "white", "x" + coinCount, width / 10 * 2.8, height / 5.2);

        image(fishDisplay, width / 1.5 - 10, height / 5.2);
        messageText(width / 50, "white", "x" + fishCount, width / 1.458, height / 5.1);

        image(butterflyDisplay, width / 1.42, height / 5.2);
        messageText(width / 50, "white", "x" + bugCount, width / 1.38, height / 5.1);

        playerFemale.position.x = width / 4;
        playerFemale.position.y = height - height / 5 - playerFemale.height / 4.5;
        playerFemale.changeAnimation('normal');
        drawSprite(playerFemale);



        for (let i = 0; i < next.length; i++) {
            next[i].scale = width / 10000;
            next[0].position.x = width / 2 - next[i].width * 2.75;

            next[1].position.x = width / 2 + next[i].width * 2.75;
            next[0].mirrorX(-1);
            if (next[i].mouseIsPressed) {
                // shopSelectSound.play();
                next[i].scale = width / 10000 + 0.01;
            }
            drawSprites(next);
        }

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