// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

let grass; let grassPale;
let water;
let blathers, isabelle, kk, tomNook;
let bellImg, coin;
let bell;
let fishImg, fishFunction;
let shopImg, theShop;

let player;
let SCENE_W;
let SCENE_H;


function preload() {
  grass = loadImage("assets/background/grass.png");
  grassPale = loadImage("assets/background/grass2.jpg");

  // currency and functions
  bellImg = loadImage("assets/currency/BellBag.png");
  coin = loadImage("assets/currency/BellCoin.png");
  fishImg = loadImage("assets/spaces/fish.png");
  shopImg = loadImage("assets/spaces/shop.png");
  // water = loadSound('assets/sound/waterSplash.wav'); 

  // villagers
  blathers = loadImage("assets/villagers/blathers.png");
  isabelle = loadImage("assets/villagers/isabelle.png");
  kk = loadImage("assets/villagers/KK.png");
  tomNook = loadImage("assets/villagers/tomNook.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 2;
  SCENE_H = height * 2;
}

function draw() {
  background("#d9ead3");
  rect(mouseX, mouseY, 50, 50);

  if (mouseIsPressed) {
    camera.zoom = 2;
  }

  else {
    camera.zoom = 1;
  }


  //set the camera position to the ghost position
  camera.position.x = mouseX;
  camera.position.y = mouseY;
}


