// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

/* key/functions available: 'x' to hide menu, click on player to show menu 
  Certain items, villagers only appear at a certain time of the day

  add Golden Hour Text
  add screen transition?
*/


let grid;
let gridSize = 30;
let cellWidth, cellHeight;
let grass;
let blathers, isabelle, kk, tomNook;
let playerFemale;
let player;
let SCENE_W;
let SCENE_H;
let bg, trees, fishes;
let coins;
let mouseCursor;
let menu, buildMenu, cameraMenu, catchMenu, customMenu, mapMenu, shopMenu;
let chooseSound, coinSound;
let penmanship, acFont, digitalTech;
let gameState;
let currentTime, timeMode;
let fishingHook;
let fishDisplay;
let goldenHour = 18;
let transitionScreen;

function preload() {
  grass = loadImage("assets/background/grass.png");

  coinSound = loadSound('assets/sound/coinsfx.wav');
  chooseSound = loadSound('assets/sound/choose.wav');

  penmanship = loadFont('assets/background/penmanship.ttf');
  acFont = loadFont('assets/background/AC.ttf');
  digitalTech = loadFont('assets/background/digitalTech.ttf');
  fishDisplay = loadImage('assets/functions/carp_fish.png');
  transitionScreen = createVideo("assets/background/transition.mov");
  transitionScreen.size(width);
  transitionScreen.position(0, 0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 3;
  SCENE_H = height * 3;

  // grid
  grid = createEmptyArray(gridSize, gridSize);
  cellWidth = (SCENE_W / gridSize) * 2;
  cellHeight = (SCENE_H / gridSize) * 2;

  playerFemale = createSprite(SCENE_W / 2, SCENE_H / 2);
  playerFemale.scale = width / 2000;
  playerFemale.setCollider('rectangle', 0, 0, 200, 100);

  playerFemale.mouseActive = true;

  fishingHook = createSprite(mouseX, mouseY);
  fishingHook.scale = width / 20000;
  fishingHook.addAnimation('normal', 'assets/functions/fishHook.png');
  fishingHook.setCollider('rectangle', 0, 0, 800 / fishingHook.scale, 800 / fishingHook.scale);
  fishingHook.mouseActive = true;

  //load animation
  playerFemale.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemale.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");
  playerFemale.addAnimation('fish', 'assets/player/female/player_female_fish.png');

  // fossils
  bg = new Group();
  //create some background for visual reference
  for (let i = 0; i < 100; i++) {
    let rock = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/background/fossil.png');
    bg.add(rock);
  }

  // spawn trees
  trees = new Group();
  //create some background for visual reference
  for (let i = 0; i < random(5, 15); i++) {
    let tree = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
    tree.addAnimation('normal', 'assets/background/treeImg.png');
    tree.scale = width / 3000;
    tree.mouseActive = true;
    trees.add(tree);
  }

  // add coins
  coins = new Group();
  //spawn coins
  for (let i = 0; i < random(5, 15); i++) {
    let coin = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
    coin.addAnimation('normal', 'assets/currency/BellCoin.png');
    coin.scale = width / 1500;
    coin.mouseActive = true;
    coins.add(coin);
  }

  // menu
  menu = new Group();
  buildMenu = createSprite(playerFemale.position.y - 10, playerFemale.position.y - (cellHeight * 1.5));
  buildMenu.addImage(loadImage('assets/functions/buildF.png'));
  menu.add(buildMenu);

  cameraMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  cameraMenu.addImage(loadImage('assets/functions/cameraF.png'));
  menu.add(cameraMenu);

  catchMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  catchMenu.addImage(loadImage('assets/functions/catchF.png'));
  menu.add(catchMenu);

  customMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  customMenu.addImage(loadImage('assets/functions/customF.png'));
  menu.add(customMenu);

  shopMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  shopMenu.addImage(loadImage('assets/functions/shopF.png'));
  menu.add(shopMenu);

  mapMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  mapMenu.addImage(loadImage('assets/functions/mapF.png'));
  menu.add(mapMenu);

  // add menu
  for (let i = 0; i < menu.length; i++) {
    menu[i].scale = width / 4000;
    menu[i].visible = false;
    menu[i].mouseActive = true;
  }

  // fishes & bugs
  fishes = new Group();
  for (let i = 0; i < random(5, 20); i++) {
    let carp = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
    carp.addAnimation('normal', 'assets/functions/carp_fish.png');
    // add animation for bugs too
    carp.scale = width / 2000;
    carp.mouseActive = true;
    fishes.add(carp);

    let bitterling = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
    bitterling.addAnimation('normal', 'assets/functions/bitterling_fish.png');
    // add animation for bugs too
    bitterling.scale = width / 2000;
    bitterling.mouseActive = true;
    fishes.add(bitterling);

    // koi fishes only appear after 4pm and before 9pm
    if (hour() >= 16 && hour() <= 21) {
      let koi = createSprite(random(width / 2, width), random(height / 5 + cellHeight / 2, height - cellHeight / 2));
      koi.addAnimation('normal', 'assets/functions/koi.png');
      // add animation for bugs too
      koi.scale = width / 2000;
      koi.mouseActive = true;
      fishes.add(koi);

    }
  }

  gameState = "world";
}

function draw() {


  if (gameState === "world") {
    background("#73daef");

    camera.zoom = 1;
    //set the camera position to the player position
    camera.position.x = playerFemale.position.x;
    camera.position.y = playerFemale.position.y;
    playerFemale.scale = width / 2000;
    displayGrid();

    drawSprites(bg);
    drawSprites(trees);
    drawSprites(coins);


    drawSprites(menu);
    playerMove();

    showMenu();
    timeCount();

    playerFemale.overlap(coins, coinCollect);
    coins.collide(trees);
  }


  // if (keyIsDown(UP_ARROW)) {
  //   playerFemale.scale += 0.05;
  // }

  // if (keyIsDown(DOWN_ARROW)) {
  //   playerFemale.scale -= 0.05;
  // }

  catchFish();
}

function timeCount() {

  if (hour() >= 12) {
    timeMode = " PM";
  }
  else {
    timeMode = " AM";
  }
  currentTime = hour() + ':' + minute() + ':' + second() + timeMode;
  textFont('digitalTech');
  messageText(width / 100, 255, currentTime, playerFemale.position.x, playerFemale.position.y - cellWidth);

}

function coinCollect(collector, collected) {
  collector.changeAnimation('normal');
  coinSound.play();
  collected.remove();
}


