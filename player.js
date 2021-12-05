let onBorder;

function playerMove() {

    playerFemale.velocity.x = ((camera.mouseX - playerFemale.position.x) / 20);
    playerFemale.velocity.y = ((camera.mouseY - playerFemale.position.y) / 20);



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
}

function showMenu() {
    for (let i = 0; i < menu.length; i++) {
        menu[i].position.x = playerFemale.position.x + i * 100 - cellWidth * 0.8;
        menu[i].position.y = playerFemale.position.y - (cellWidth / 2);
    }

    if (playerFemale.mouseIsPressed) {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].visible === false) {
                menu[i].visible = true;
            }
        }
    }

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].mouseIsOver) {
            if (menu[i].visible === true) {
                menu[i].scale = width / 4000 + 0.1;
                if (menu[i].mouseIsPressed) {
                    chooseSound.play();
                }
            }
        }
        else {
            menu[i].scale = width / 4000;
        }
    }

}