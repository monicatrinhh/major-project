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

    if (playerFemale.position.y > SCENE_H - cellHeight) {
        playerFemale.position.y = SCENE_H - cellHeight;
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



function mouseClicked() {
    if (mouseX < playerFemale.position.x + 10 && mouseX > playerFemale.position.x - 10 && mouseY < playerFemale.position.y + 10 && mouseY > playerFemale.position.y - 10) {
        showMenu()
    }
}

function showMenu() {

}