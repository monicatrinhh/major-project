let stringPosition

function catchFish() {
    if (gameState === "catch") {
        background("#73daef");
        camera.off();
        fill("green");
        rect(0, 0, width, height / 5);
        playerFemale.changeAnimation('fish');
        playerFemale.position.x = width / 2;
        playerFemale.position.y = height / 5 - playerFemale.height / 2;
        playerFemale.scale = width / 3000;
        drawSprite(playerFemale);
        if (keyCode === 27) {
            gameState = "world";
        }
    }

}

function whileFishing() {

}