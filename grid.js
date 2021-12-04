function displayGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            noStroke();
            rect(x * cellWidth + widthBuffer, y * cellHeight, cellWidth, cellHeight);
            if (grid[y][x] === 0) {
                image(grassPale, x * cellWidth + widthBuffer, y * cellHeight, cellWidth, cellHeight);
            }
            else if (grid[y][x] === 1) {
                fill("#2acaea");
            }
            else if (grid[y][x] === 2) {
                image(grass, x * cellWidth + widthBuffer, y * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}


function createEmptyArray(rows, cols) {
    let board = [];
    for (let y = 0; y < rows; y++) {
        board.push([]);
        for (let x = 0; x < cols; x++) {
            if (random(100) < 20) {
                board[y].push(1); // river
            }
            else if (random(100) < 50) {
                board[y].push(2); // dark green
            }
            else {
                board[y].push(0); // pale green
            }
            board[0][0] = 2; // player initial station
            board[0][1] = 2;

        }

    }
    return board;
}

