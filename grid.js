function displayGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            noStroke();
            rect((x * cellWidth) - SCENE_W, (y * cellHeight) - SCENE_H, cellWidth, cellHeight);
            if (grid[y][x] === 0) {
                image(grassPale, (x * cellWidth) - SCENE_W, (y * cellHeight) - SCENE_H, cellWidth, cellHeight);
            }
            else if (grid[y][x] === 1) {
                fill("#2acaea");
            }
            else if (grid[y][x] === 2) {
                image(grass, (x * cellWidth) - SCENE_W, (y * cellHeight) - SCENE_H, cellWidth, cellHeight);
            }
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
                image(woodTile, (x * cellHomeWidth) + widthBuffer, (y * cellHomeHeight) + heightBuffer, cellHomeWidth, cellHomeHeight);
            }
        }
    }
}
let storageSize = 4;
function displayStorage() {
    stroke(0);
    for (let y = 0; y < floor(storageSize * 3 / 4); y++) {
        for (let x = 0; x < storageSize; x++) {
            fill(255, 255, 255, 70);
            rect(playerFemale.position.x + x * cellStorageWidth + playerFemale.width / 2, playerFemale.position.y - y * cellStorageHeight, cellStorageWidth, cellStorageHeight);
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

