// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

let grid;
let gridSize = 30;
let cellWidth, cellHeight;
let grass, grassPale;
let water;
let blathers, isabelle, kk, tomNook;
let bellImg, coin;
let bell;
let fishImg, fishFunction;
let shopImg, theShop;
let playerFemale;
let player;
let SCENE_W;
let SCENE_H;
let bg;

function preload() {
  grass = loadImage("assets/background/grass.png");
  grassPale = loadImage("assets/background/grass2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 3;
  SCENE_H = height * 3;

  grid = createEmptyArray(gridSize, gridSize);
  cellWidth = (SCENE_W / gridSize) * 2;
  cellHeight = (SCENE_H / gridSize) * 2;

  playerFemale = createSprite(SCENE_W / 2, SCENE_H / 2);


  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');

  playerFemale.addAnimation('movingRL', "assets/player/female/player_female.png");


  bg = new Group();

  //create some background for visual reference
  for (let i = 0; i < 100; i++) {
    //create a sprite and add the 3 animations
    let rock = createSprite(random(-SCENE_W, SCENE_W), random(-SCENE_H, SCENE_H));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/background/fossil.png');
    bg.add(rock);
  }
}

function draw() {
  background("#73daef");

  displayGrid();

  playerFemale.velocity.x = ((camera.mouseX - playerFemale.position.x) / 20);
  playerFemale.velocity.y = ((camera.mouseY - playerFemale.position.y) / 20);



  if (playerFemale.position.x < -SCENE_W) {
    playerFemale.position.x = -SCENE_W;
  }

  if (playerFemale.position.y <= -SCENE_H) {
    playerFemale.position.y = -SCENE_H;
  }

  if (playerFemale.position.x > SCENE_W) {
    playerFemale.position.x = SCENE_W;
  }

  if (playerFemale.position.y > SCENE_H) {
    playerFemale.position.y = SCENE_H;
  }

  if (playerFemale.velocity.y > 0) {
    playerFemale.changeAnimation('forward');
  }
  else if (playerFemale.velocity.y < 0) {
    playerFemale.changeAnimation('backward');
  }
  if (playerFemale.velocity.x < 0 && playerFemale.velocity.y > 0) {
    playerFemale.changeAnimation('movingRL');
    // playerFemale.mirror(-1);
  }

  // else if (mouseY < playerFemale.position.y) {
  //   playerFemale.changeAnimation('movingRL');
  // }
  // else if (mouseX < playerFemale.position.x) {
  //   playerFemale.changeAnimation('movingRL');
  // }

  if (mouseIsPressed) {
    camera.zoom = 2;
  }
  else if (keyCode === 32) {
    camera.zoom = 0.1;
  }
  else if (keyCode === 27) {
    camera.zoom = 1;
  }

  //set the camera position to the ghost position
  camera.position.x = playerFemale.position.x;
  camera.position.y = playerFemale.position.y;

  // if (keyIsDown(UP_ARROW)) {
  //   playerFemale.scale += 0.05;
  // }

  // if (keyIsDown(DOWN_ARROW)) {
  //   playerFemale.scale -= 0.05;
  // }


  drawSprites(bg);
  drawSprite(playerFemale);



}


