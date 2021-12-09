// Bitterling and Carp fish appears all day, Koi fish only appears from 4-9PM
let fishCount = 0;
let bugCount = 0;
let tryToExit = false;
let catchState;

function catchFish() {
    if (gameState === "catch") {

        // draw bg
        background("#73daef");
        camera.off();

        if (catchState === "bug") {
            for (let i = 0; i < fishes.length; i++) {
                fishes[i].changeAnimation('bug');
            }
        }
        if (catchState === "fish") {
            fill("green");
            rect(0, 0, width, height / 5);
            playerFemale.changeAnimation('fish');
        }
        else if (catchState === "bug") {
            fill("green");
            rect(0, 0, width, height);
            playerFemale.changeAnimation('fish');
        }

        playerFemale.position.x = width / 2;
        playerFemale.position.y = height / 5 - playerFemale.height / 2;
        playerFemale.scale = width / 3000;

        drawSprite(playerFemale);
        drawSprite(closeButton);

        // make fishing rod move
        fill(255);
        whileFishing();

        // add fishes if all gone/catched
        if (fishes.length === 0) {
            generateFishes();
        }

        if (hour() === goldenHour) {
            // add golden hour text here
        }

        if (catchState === "fish") {
            image(fishDisplay, width / 50, height / 50);
            textFont(digitalTech);
            messageText(width / 70, "white", "x" + fishCount, width / 12, height / 15);
        }
        else if (catchState === "bug") {
            image(butterflyDisplay, width / 50, height / 50);
            textFont(digitalTech);
            messageText(width / 70, "white", "x" + bugCount, width / 12, height / 15);
        }


        // press "esc" / X button to escape
        if (keyIsDown(27) || closeButton.mouseIsPressed) {
            gameState = "notif";
            tryToExit = true;
            exitBox();

        }

    }
    // exit game
    if (answerYN === "yes") {
        if (fishes.length > 0) {
            for (let i = fishes.length - 1; i >= 0; i--) {
                fishes[i].remove();
            }
        }
        for (let i = fishes.length - 1; i >= 0; i--) {
            fishes[i].velocity.x = 0;
        }
        gameState = "world";
    }

    // continut to game
    if (tryToExit && keyIsDown(78)) {
        gameState = "catch";
        tryToExit = false;
    }
}

function whileFishing() {
    noStroke();


    if (catchState === "fish") {
        // set/limit fishing rod string rotation
        push();
        translate(playerFemale.position.x, playerFemale.position.y);
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
    }

    if (catchState === "fish") {
        fishingHook.changeAnimation('fish');
        fishingHook.mirrorX(1);
    }
    else if (catchState === "bug") {
        fishingHook.changeAnimation('bug');
        fishingHook.scale = width / 15000;
        fishingHook.mirrorX(-1);
    }
    drawSprite(fishingHook);
    carpFish();

    fishingHook.position.x = mouseX;
    fishingHook.position.y = mouseY;

    // fishing hook cant go pass the green area
    if (catchState === "fish") {
        if (fishingHook.position.y <= height / 5 + fishingHook.height / 2) {
            fishingHook.position.y = height / 5 + fishingHook.height / 2;
        }
    }

}

function carpFish() {
    // generate andcatch fish
    for (let i = fishes.length - 1; i >= 0; i--) {

        fishes[i].velocity.x = random(-3, -5);

        if (catchState === "bug") {
            fishes[i].velocity.y = random(-3, -5);
        }


        if (fishes[i].position.x <= -fishes[i].height || fishes[i].position.y <= -fishes[i].height) {
            fishes[i].remove();
        }
        // remove fish if catch or disappears
        else if (fishes[i].mouseIsPressed && fishes[i].overlap(fishingHook)) {
            if (catchState === "fish") {
                catchFishSound.play();
                if (hour() === goldenHour) {
                    fishCount += 2;
                }
                else {
                    fishCount++;
                }
            }
            if (catchState === "bug") {
                // catchFishSound.play();
                if (hour() === goldenHour) {
                    bugCount += 2;
                }
                else {
                    bugCount++;
                }
            }

            fishes[i].remove();
        }
    }
    drawSprites(fishes);

}

function generateFishes() {
    let numberOfFishes = random(5, 20);
    for (let i = numberOfFishes; i >= 0; i--) {
        let carp = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
        carp.addAnimation('fish', 'assets/functions/carp_fish.png');
        carp.addAnimation('bug', 'assets/functions/purpleButterfly.png');
        // add animation for bugs too
        carp.scale = width / 2000;
        carp.mouseActive = true;
        fishes.add(carp);

        let bitterling = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
        bitterling.addAnimation('fish', 'assets/functions/bitterling_fish.png');
        bitterling.addAnimation('bug', 'assets/functions/rajah.png');
        // add animation for bugs too
        bitterling.scale = width / 2000;
        bitterling.mouseActive = true;
        fishes.add(bitterling);

        // koi fishes only appear after 4pm and before 9pm
        if (hour() >= 16 && hour() <= 21) {
            let koi = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
            koi.addAnimation('fish', 'assets/functions/koi.png');
            koi.addAnimation('bug', 'assets/functions/orchidM.png');
            // add animation for bugs too
            koi.scale = width / 2000;
            koi.mouseActive = true;
            fishes.add(koi);

        }
    }
}