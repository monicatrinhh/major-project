let storageSize = 4;
function displayGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            noStroke();
            rect((x * cellWidth) - SCENE_W, (y * cellHeight) - SCENE_H, cellWidth, cellHeight);
            image(grass, (x * cellWidth) - SCENE_W, (y * cellHeight) - SCENE_H, cellWidth, cellHeight);

        }
    }
}

function displayHomeGrid() {
    for (let y = 0; y < homeGridSize; y++) {
        for (let x = 0; x < homeGridSize; x++) {
            // noStroke();
            rect((x * cellHomeWidth) + widthBuffer, (y * cellHomeHeight) + heightBuffer, cellHomeWidth, cellHomeHeight);
            if (grid[y][x] === 2) {
                fill(255);
                image(tileSet[tileCount], (x * cellHomeWidth) + widthBuffer, (y * cellHomeHeight) + heightBuffer, cellHomeWidth, cellHomeHeight);
            }
        }
    }
}

function displayStorage() {
    stroke(0);
    for (let y = 0; y < floor(storageSize * 3 / 4); y++) {
        for (let x = 0; x < storageSize; x++) {
            fill(255, 255, 255, 70);
            rect(playerFemale.position.x + x * cellStorageWidth + playerFemale.width / 2, playerFemale.position.y - y * cellStorageHeight, cellStorageWidth, cellStorageHeight);
            fill(255);
            circle(playerFemale.position.x + playerFemale.width / 2 + x * cellStorageWidth, playerFemale.position.y + cellStorageHeight - y * cellStorageHeight, 20);
            messageText(width / 120, 0, fishRodCount, playerFemale.position.x + playerFemale.width / 2, playerFemale.position.y - cellStorageHeight + 5);
            messageText(width / 120, 0, bugNetCount, playerFemale.position.x + playerFemale.width / 2 + cellStorageWidth, playerFemale.position.y - cellStorageHeight + 5);
        }
    }
}

function buildStorageDisplay() {
    stroke(0);
    for (let y = 0; y < floor(storageSize * 3 / 4); y++) {
        for (let x = 0; x < 2; x++) {
            fill(255, 255, 255, 100);
            rect(widthBuffer / 4 + x * (width - widthBuffer), heightBuffer + y * height / 5 + cellStorageHeight, cellStorageWidth, cellStorageHeight);
        }
    }
}

function createEmptyArray(rows, cols) {
    let board = [];
    for (let y = 0; y < rows; y++) {
        board.push([]);
        for (let x = 0; x < cols; x++) {
            board[y].push(2);
        }
    }
    return board;
}

