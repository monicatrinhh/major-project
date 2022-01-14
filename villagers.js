let lastTimeSwitched = 0;
let theDirect = "forward";
let choosingDirection = ['forward', 'left', 'right', 'backwards'];
let thisVillager;

function villagersMove() {
    for (let i = 0; i < villagers.length; i++) {
        messageText(width / 100, 255, villagersData[i].name, villagers[i].position.x, villagers[i].position.y - 100);
        villagers[i].collide(playerFemale);
        villagers[i].collide(trees);
        villagers[i].collide(coins);

        //set boundaries
        if (villagers[i].position.x < -SCENE_W + cellWidth / 10) {
            villagers[i].position.x = -SCENE_W + cellWidth / 10;
        }

        if (villagers[i].position.y <= -SCENE_H) {
            villagers[i].position.y = -SCENE_H;
        }

        if (villagers[i].position.x > SCENE_W - 5) {
            villagers[i].position.x = SCENE_W - 5;
        }

        if (villagers[i].position.y > SCENE_H - (cellHeight / 2) - 10) {
            villagers[i].position.y = SCENE_H - (cellHeight / 2) - 10;
        }
        playerFemale.displace(villagers[i]);

        // if (playerFemale.position.x - villagers[i].position.x <= 50 || villagers[i].position.x - playerFemale.position.x <= 50 || playerFemale.position.y - villagers[i].position.y <= 50 || villagers[i].position.y - playerFemale.position.y <= 50) {

        //     if (keyIsDown(84)) {
        //         isTalking = true;
        //         thisVillager = i;
        //     }
        //     else if (keyIsDown(27)) {
        //         isTalking = false;
        //     }
        // }
        // villagersDialouge(thisVillager, 0);

    }
   
    whatDirection();
    if (!isTalking) {
        villagersDirection(1, 3);
        villagersDirection(4, -4);
    }

    drawSprites(villagers);
}

function whatDirection() {
    if (theDirect === "forward" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "right" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "backwards" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
    else if (theDirect === "left" && millis() > lastTimeSwitched + random(5000, 10000)) {
        theDirect = choosingDirection[floor(random(0, 3.9))];
        lastTimeSwitched = millis();
    }
}
function villagersDirection(i, speed) {
    if (theDirect === "forward") {
        villagers[i].position.y += speed;
    }
    else if (theDirect === "right") {
        villagers[i].position.x += speed;
    }
    else if (theDirect === "backwards") {
        villagers[i].position.y -= speed;
    }
    else if (theDirect === "left") {
        villagers[i].position.x -= speed;
    }
}


function villagersDialouge(i, theDialouge) {
    if (isTalking) {
        dialougeBox.visible = true;
        dialougeBox.position.x = playerFemale.position.x;
        dialougeBox.position.y = playerFemale.position.y + playerFemale.height;

        // villagers[i].position.x
        drawSprite(dialougeBox);
    }

}
