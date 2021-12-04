class Bell {
    constructor() {
        this.x = cellWidth / 6;
        this.y = cellHeight / 6;
    }
    display() {
        image(bellImg, this.x, this.y, cellWidth, cellWidth);
    }
}

class Shop {
    constructor() {
        this.x = width - (cellWidth * (3.5 / 2));
        this.y = width / 6 + cellHeight / 6;
    }
    display() {
        image(shopImg, this.x, this.y, cellWidth * 1.5, cellHeight * 1.5);
    }
}

class Fish {
    constructor() {
        this.x = width - (cellWidth * (3 / 2));
        this.y = height / 5;
    }
    display() {
        image(fishImg, this.x, this.y);
    }

    switchGame() {

    }
}

function mouseClicked() {

}

function fishDisplay() {
    fishFunction.display();
}

function bellCurrency() {
    bell.display();
}
function shopDisplay() {
    theShop.display();
}