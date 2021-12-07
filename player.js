let menuVisible = false;
let zoomOut = false;

function playerMove() {

    playerFemale.velocity.x = ((camera.mouseX - playerFemale.position.x) / 20);
    playerFemale.velocity.y = ((camera.mouseY - playerFemale.position.y) / 20);


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
    else {
        playerFemale.changeAnimation('normal');
    }
    drawSprite(playerFemale);
    playerFemale.collide(trees);
}

function showMenu() {
    // adjust menu pos.
    for (let i = 0; i < menu.length; i++) {
        menu[i].position.x = playerFemale.position.x + i * 100 - cellWidth * 0.8;
        menu[i].position.y = playerFemale.position.y - (cellWidth / 2);
    }

    // show menu
    if (playerFemale.mouseIsPressed) {
        zoomOut = false;
        for (let i = 0; i < menu.length; i++) {
            menu[i].visible = true;
        }

    }

    // interacting w menu
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].mouseIsOver) {
            menu[i].scale = width / 4000 + 0.1;
        }
        else {
            menu[i].scale = width / 4000;
        }
        if (menu[i].mouseIsPressed) {
            chooseSound.play();
            for (let i = 0; i < menu.length; i++) {
                menu[i].visible = false;
            }
        }
        if (menu[i].visible) {
            messageText(width / 100, 255, "Press x to hide menu", playerFemale.position.x, playerFemale.position.y + cellHeight);
        }
    }
    if (keyWentDown('x')) {
        for (let i = 0; i < menu.length; i++) {
            menu[i].visible = false;
        }
    }
    catchMenuFunction();
    theMap();
}




function theMap() {
    if (mapMenu.mouseIsPressed) {
        zoomOut = true;
    }
    if (zoomOut) {
        camera.zoom = 0.1;
        messageText(width / 8, 200, 'Press on player to zoom in', playerFemale.position.x, playerFemale.position.y - cellWidth);
    }
}

function catchMenuFunction() {
    if (catchMenu.mouseIsPressed) {
        gameState = "catch";
        blackOut();
        catchFish();
        generateFishes();
    }
}

function messageText(theTextSize, theColor, theMessage, x, y) {
    fill(theColor);
    textAlign(CENTER);
    // textFont(theFont);
    textSize(theTextSize);
    text(theMessage, x, y);
}

function blackOut() {
    // for (let i = 255; i >= 0; i--) {
    //     fill(0, 0, 0, i);
    //     rect(SCENE_W, SCENE_H, SCENE_W, SCENE_H);
    // }
}





