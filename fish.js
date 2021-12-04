let r, g, b;
let r2, g2, b2;
let mouseR = 30;
let score;
let margin = 160;
let timer;
let state;
let pointsGained = false;
let pointsDeduct = false;
let expand = false;
let restartImg;

const particles = []; // store particle history

function preload() {
    gameFont = loadFont('assets/RussoOne-Regular.ttf');
}

function setup() {
    state = "opening";
    createCanvas(windowWidth, windowHeight);

    beat = new Beat(); //create a new beat object
    restartImg = loadImage('assets/reset.png');
}

function fishing() {
    background(0);

    // opening state
    if (state === "opening") {
        background(0);
        fill(255);
        textAlign(CENTER)
        textSize(30);
        textFont(gameFont);
        text("Press Enter to Start", width / 2, height / 2);
        timer = 30;
        score = 0;
    }

    // gaming state
    else if (state === "game") {
        clear();
        background(0);
        // gaining points by clicking on the beat
        if (beat.contain(mouseX, mouseY)) {
            if (mouseIsPressed) {
                beat.burst();
                beat.changeColor(r2, g2, b2);
                pointsGained = true;
            }
        }

        // setting up the beat
        beat.show();
        beat.popping();
        increasePoint();
        decreasePoint();

        noCursor();
        fill(beat.c);

        // pushing the trail of particles
        for (let i = 0; i < 5; i++) {
            let p = new Particle();
            particles.push(p);
        }
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].show();
            if (particles[i].finished()) {
                // remove this particle
                particles.splice(i, 30);
            }
        }

        // setting up text
        text(timer, width / 2, 50);
        textAlign(CENTER)
        textSize(30);

        // timer
        if (frameCount % 60 === 0 && timer > 0) {
            timer--;
        }
        if (timer === 0) {
            state = "restart";
        }

    }
    // score and points popping up when timer ends
    else if (state === "restart") {
        text("Total: " + score, width / 2, height / 2 - 60);
        cursor();
        resetButton();
    }
}

// setting up mouse bubbles
class Particle {

    constructor() {
        this.x = mouseX; //xpos
        this.y = mouseY; //ypos
        this.dx = random(-1, 1); //x xpeed
        this.dy = random(-5, -1); //y speed
        this.num = 155; // number of particles
    }

    finished() {
        return this.num < 0;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.num -= 5;
    }

    show() {
        noStroke();
        fill(beat.c);
        ellipse(this.x, this.y, 16);
    }
}

// setting up the beat
class Beat {
    constructor() {
        r = random(255);
        g = random(255);
        b = random(255);

        this.x = random(margin, width - margin); //xpos
        this.y = random(margin, height - margin); //ypos
        this.r = random(60, 80); //radius
        this.c = color(r, g, b);
    }
    show() {
        fill(this.c); // random color
        circle(this.x, this.y, this.r * 2);
    }
    popping() {
        if (this.r < 110) {
            this.r++;
        }
        else {
            this.burst();
            pointsDeduct = true;
        }
    }

    contain(x2, y2) {
        let d = dist(x2, y2, this.x, this.y);
        if (d < this.r + mouseR / 2) {
            return true;
        }
        else {
            return false;
        }
    }

    changeColor(red, green, blue) {
        r2 = random(255);
        g2 = random(255);
        b2 = random(255);
        this.c = color(r2, g2, b2);
    }

    changeLocation() {
        this.x = random(margin, width - margin);
        this.y = random(margin, height - margin);
        this.r = random(60, 80);
    }

    burst() {
        this.changeLocation();
        this.changeColor(r2, g2, b2);
    }
}

function resetButton() {
    imageMode(CENTER);
    image(restartImg, width / 2, height / 2, 200, 100);
    if (state === "restart") {
        if (mouseX > width / 2 - 110 && mouseX < width / 2 + 110 && mouseY > height / 2 - 55 && mouseY < height / 2 + 55) {
            if (mouseIsPressed) {
                state = "opening";
            }
        }
    }
}

// toggle boolean to change points
function increasePoint() {
    if (pointsGained) {
        score++;
        pointsGained = !pointsGained;
    }
}

function decreasePoint() {
    if (pointsDeduct) {
        score--;
        pointsDeduct = !pointsDeduct;
    }
}

// press Enter to start
function keyPressed() {
    if (state === "opening") {
        if (keyCode === ENTER) {
            state = "game";
        }
    }
}