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

