// Bitterling and Carp fish appears all day, Koi fish only appears from 4-9PM
let fishCount = 0;
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
        if (hour() === goldenHour) {
            // add golden hour text here
        }
        image(fishDisplay, width / 50, height / 50);

        if (keyIsDown(27)) {
            gameState = "world";
        }
    }

}

function whileFishing() {
    line(width / 2, height / 5 - playerFemale.height / 2, width / 2, height / 5);
    carpFish();
    drawSprite(fishingHook);
    fishingHook.position.x = mouseX;
    fishingHook.position.y = mouseY;
}

function carpFish() {
    for (let i = fishes.length - 1; i >= 0; i--) {
        fishes[i].velocity.x = random(-3, -5);
        if (fishes[i].position.x <= -fishes[i].height) {
            fishes[i].remove();
        }
        else if (fishes[i].mouseIsPressed && fishes[i].overlap(fishingHook)) {
            if (hour() === goldenHour) {
                fishCount += 2;
            }
            else {
                fishCount++;
            }
            fishes[i].remove();
        }
    }
    drawSprites(fishes);
    messageText(width / 70, "white", "x" + fishCount, width / 12, height / 15);
}