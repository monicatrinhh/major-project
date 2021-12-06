// Bitterling and Carp fish appears all day, Koi fish only appears from 4-9PM

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

        fill(255);
        whileFishing();
        rect(mouseX, mouseY, 50, 50);


        if (keyIsDown(27)) {
            gameState = "world";
        }
    }

}

function whileFishing() {
    line(width / 2, height / 5 - playerFemale.height / 2, width / 2, height / 5);
}