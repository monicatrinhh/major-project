let menuVisible = false;
let zoomOut = false;
let isTalking = false;

function playerMove() {

    if (!isTalking) {
        playerFemale.velocity.x = ((camera.mouseX - playerFemale.position.x) / 20);
        playerFemale.velocity.y = ((camera.mouseY - playerFemale.position.y) / 20);
    }
    else {
        playerFemale.velocity.x = 0;
        playerFemale.velocity.y = 0;
    }


    // set boundary for player
    if (playerFemale.position.x < -SCENE_W + cellWidth / 10) {
        playerFemale.position.x = -SCENE_W + cellWidth / 10;
    }

    if (playerFemale.position.y <= -SCENE_H) {
        playerFemale.position.y = -SCENE_H;
    }

    if (playerFemale.position.x > SCENE_W - 5) {
        playerFemale.position.x = SCENE_W - 5;
    }

    if (playerFemale.position.y > SCENE_H - (cellHeight / 2) - 10) {
        playerFemale.position.y = SCENE_H - (cellHeight / 2) - 10;
    }

    // animate player
    if (playerFemale.velocity.x > 2 && playerFemale.velocity.y > -2 && playerFemale.velocity.y < 2 && playerFemale.velocity.y > -2 && playerFemale.velocity.y < 2) {
        playerFemale.mirrorX(-1);
        playerFemale.changeAnimation('movingRL');

    }
    else if (playerFemale.velocity.x < -2 && playerFemale.velocity.y > -2 && playerFemale.velocity.y < 2) {
        playerFemale.mirrorX(1);
        playerFemale.changeAnimation('movingRL');

    }
    else if (playerFemale.velocity.y > 2) {
        playerFemale.changeAnimation('forward');

    }
    else if (playerFemale.velocity.y < -2) {
        playerFemale.changeAnimation('backward');

    }
    drawSprite(playerFemale);
    playerFemale.collide(trees);
}
let isUsable = false;
function showMenu() {
    // adjust menu pos.
    for (let i = 0; i < menu.length; i++) {
        menu[i].position.x = playerFemale.position.x + i * 100 - cellWidth * 0.8;
        menu[i].position.y = playerFemale.position.y - (cellWidth / 2);
    }

    // show menu
    if (playerFemale.mouseIsPressed) {
        zoomOut = false;
        if (!isTalking) {
            isUsable = true;
            for (let i = 0; i < menu.length; i++) {
                menu[i].visible = true;
            }
        }


    }

    // interacting w menu
    for (let i = 0; i < menu.length - 1; i++) {
        if (menu[i].mouseIsOver) {
            menu[i].scale = width / 4000 + 0.1;
        }
        else {
            menu[i].scale = width / 4000;
        }
        if (menu[i].mouseIsPressed) {
            if (isUsable) {
                chooseSound.play();
            }

            for (let i = 0; i < menu.length; i++) {
                menu[i].visible = false;
            }
        }
        if (menu[i].visible) {
            messageText(width / 100, 255, "Press x to hide menu", playerFemale.position.x, playerFemale.position.y + cellHeight);
        }
    }
    // hide menu
    if (keyWentDown(88)) {
        for (let i = 0; i < menu.length; i++) {
            menu[i].visible = false;
        }
        isUsable = false;
    }

    if (isUsable) {
        catchFish();
        catchMenuFunction();
        shopMenuFunction();
        theMap();
        buildMenuFunction();
        buildSpaces();
    }
    storageMenuFunction();

}

function messageText(theTextSize, theColor, theMessage, x, y) {
    fill(theColor);
    textAlign(CENTER);
    textSize(theTextSize);
    text(theMessage, x, y);
}







