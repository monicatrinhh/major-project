function villagersMove() {
    for (let i = 0; i < villagers.length; i++) {
        messageText(width / 100, 255, villagersData[i].name, villagers[i].position.x, villagers[i].position.y - 100);
        villagers[i].collide(playerFemale);
        if (villagers[i].position.x < -SCENE_W + cellWidth / 10) {
            villagers[i].position.x = -SCENE_W + cellWidth / 10;
        }

        if (villagers[i].position.y <= -SCENE_H) {
            villagers[i].position.y = -SCENE_H;
        }

        if (villagers[i].position.x > SCENE_W - 5) {
            villagers[i].position.x = SCENE_W - 5;
        }

        if (playerFemale.position.y > SCENE_H - (cellHeight / 2) - 10) {
            villagers[i].position.y = SCENE_H - (cellHeight / 2) - 10;
        }
    }

    drawSprites(villagers);
}
