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
        drawSprite(closeButton);

        fill(255);
        whileFishing();

        if (fishes.length === 0) {
            generateFishes();
        }

        if (hour() === goldenHour) {
            // add golden hour text here
        }
        image(fishDisplay, width / 50, height / 50);

        if (keyIsDown(27)) {
            if (fishes.length > 0) {
                for (let i = fishes.length - 1; i >= 0; i--) {
                    fishes[i].remove();
                }
            }
            generateFishes();
            for (let i = fishes.length - 1; i >= 0; i--) {
                fishes[i].velocity.x = 0;
            }
            gameState = "world";
        }
    }

}

function whileFishing() {
    // line(width / 2, height / 5 - playerFemale.height / 2, width / 2, height / 5);
    noStroke();
    push();
    translate(playerFemale.position.x, playerFemale.position.y);
    let theta = (mouseY, mouseX);
    if (mouseX <= width / 2 - 100) {
        rotate(60);
    }
    else if (mouseX >= width / 2 + 100) {
        rotate(-60);
    }
    else {
        rotate(-mouseX);
    }

    fill("white");
    rect(0, 0, 2, height / 4);
    pop();
    carpFish();
    drawSprite(fishingHook);
    fishingHook.position.x = mouseX;
    fishingHook.position.y = mouseY;

    if (fishingHook.position.y <= height / 5 + fishingHook.height / 2) {
        fishingHook.position.y = height / 5 + fishingHook.height / 2;
    }
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

function generateFishes() {
    let numberOfFishes = random(5, 20);
    for (let i = numberOfFishes; i >= 0; i--) {
        let carp = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
        carp.addAnimation('normal', 'assets/functions/carp_fish.png');
        // add animation for bugs too
        carp.scale = width / 2000;
        carp.mouseActive = true;
        fishes.add(carp);

        let bitterling = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
        bitterling.addAnimation('normal', 'assets/functions/bitterling_fish.png');
        // add animation for bugs too
        bitterling.scale = width / 2000;
        bitterling.mouseActive = true;
        fishes.add(bitterling);

        // koi fishes only appear after 4pm and before 9pm
        if (hour() >= 16 && hour() <= 21) {
            let koi = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
            koi.addAnimation('normal', 'assets/functions/koi.png');
            // add animation for bugs too
            koi.scale = width / 2000;
            koi.mouseActive = true;
            fishes.add(koi);

        }
    }
}