// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

/* key/functions available: 'x' to hide menu, click on player to show menu 
  Certain items only appear at a certain time of the day
  log in with name

  change bg based on time 
  Press on trees to spawn coins

  add Golden Hour Text at 12 (double fishes and bugs)

  make fishing rod, bug net breaks after 5 use
  make a place for tent

  trade fish and bugs with the owl, one trade time every hour
  shop opens from 8am - 10pm

  kk slider can play music
*/
let fishRodCount = 0, bugNetCount = 0;
let timeState;
let bgDay, bgAfternoon, bgNight, sunset;
let grid;
let gridSize = 30, homeGridSize = 15;
let cellWidth, cellHeight;
let grass, woodTile;
let blathers, isabelle, kk, tomNook;
let playerFemale, playerFemaleMini;
let player;
let SCENE_W;
let SCENE_H;
let fishCount = 0;
let bugCount = 0;
let tryToExit = false;
let catchState;
let bg, trees, fishes;
let coins, coinDisplay, coinCount = 0;
let closeButton, purchaseButton;
let menu, buildMenu, cameraMenu, catchMenu, customMenu, mapMenu, shopMenu;
let chooseSound, coinSound, catchFishSound, shopSelectSound, chaChing, errorfx;
let penmanship, acFont, digitalTech;
let gameState;
let currentTime, timeMode;
let fishingHook;
let fishDisplay, butterflyDisplay;
let goldenHour = 12;
let transitionScreen;
let mpcBox, readBox, nameBox;
let fishOrBugDisplay;
let nookCrannyImg;
let widthBuffer, heightBuffer;
let fishingRodMini, bugNetMini
let bluePeriod, fishingRod, house, janeEyre, mansion, itemDisplay, itemDisplayStorage;
let cellStorageHeight, cellStorageWidth;
let theMinute, theSecond
let capture;
let acLogo;
let isOpening = true;
let dialougeBox;
let enterName = false;

function preload() {
  grass = loadImage("assets/background/grass.png");

  coinSound = loadSound('assets/sound/coinsfx.wav');
  chooseSound = loadSound('assets/sound/choose.wav');
  catchFishSound = loadSound('assets/sound/waterSplash.wav');
  // shopSelectSound = loadSound('assets/sound/shop.wav');
  chaChing = loadSound('assets/sound/cha-ching.mp3');
  errorfx = loadSound('assets/sound/windows_error.mp3');

  penmanship = loadFont('assets/background/penmanship.ttf');
  acFont = loadFont('assets/background/AC.ttf');
  digitalTech = loadFont('assets/background/digitalTech.ttf');
  fishDisplay = loadImage('assets/functions/carp_fish.png');
  butterflyDisplay = loadImage('assets/functions/purpleButterfly.png');
  coinDisplay = loadImage('assets/currency/BellCoin.png');
  woodTile = loadImage('assets/background/woodFloor.png');
  bgDay = loadImage('assets/background/bg-day.jpeg');
  sunset = loadImage('assets/background/sunset.jpeg');
  bgNight = loadImage('assets/background/night.jpeg');
  bgAfternoon = loadImage('assets/background/afternoon.jpeg');

  transitionScreen = createVideo("assets/background/transition.mov");
  transitionScreen.size(width);
  transitionScreen.position(0, 0);

  acLogo = loadImage('assets/ac-logo.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  SCENE_W = width * 3;
  SCENE_H = height * 3;

  angleMode(DEGREES);

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  // grid
  grid = createEmptyArray(gridSize, gridSize);
  homeGrid = createEmptyArray(homeGridSize, homeGridSize);
  widthBuffer = width / 8;
  heightBuffer = height / 15;


  cellWidth = (SCENE_W / gridSize) * 2;
  cellHeight = (SCENE_H / gridSize) * 2;
  cellHomeWidth = (width - (2 * widthBuffer)) / homeGridSize;
  cellHomeHeight = (height - (2 * heightBuffer)) / homeGridSize;
  homeGridWidth = cellHomeWidth * homeGridSize;
  cellStorageWidth = cellWidth / 4;
  cellStorageHeight = cellWidth / 4;

  playerFemale = createSprite(SCENE_W / 2, SCENE_H / 2);
  playerFemale.scale = width / 2000;
  playerFemale.setCollider('rectangle', 0, 0, playerFemale.width, playerFemale.height);

  playerFemale.mouseActive = true;

  // fishing hook for fishing game
  fishingHook = createSprite(mouseX, mouseY);
  fishingHook.scale = width / 20000;
  fishingHook.addAnimation('fish', 'assets/functions/fishHook.png');
  fishingHook.addAnimation('bug', 'assets/functions/bugNet.png');
  fishingHook.setCollider('rectangle', 0, 0, fishingHook.width, fishingHook.height);
  fishingHook.mouseActive = true;

  mpcBox = createSprite(width / 2, height / 2);
  mpcBox.scale = width / 2500;
  mpcBox.addAnimation('normal', 'assets/functions/multiple.png');
  mpcBox.mouseActive = true;


  nameBox = createSprite(width / 2, height / 4);
  nameBox.scale = width / 4000;
  nameBox.addImage(loadImage("assets/functions/nameBox.png"));

  fishOrBugDisplay = new Group();
  for (let i = 0; i < 2; i++) {
    let displayFB = createSprite(width / 2, height / 2);
    displayFB.scale = width / 1000;
    displayFB.addAnimation('fish', 'assets/functions/bitterling_fish.png');
    displayFB.addAnimation('bug', 'assets/functions/purpleButterfly.png');
    displayFB.mouseActive = true;
    fishOrBugDisplay.add(displayFB);
  }

  fishOrBugDisplay[0].changeAnimation('fish');
  fishOrBugDisplay[0].position.x = width / 2 - (width / 10);
  fishOrBugDisplay[0].position.y = height / 1.7;

  fishOrBugDisplay[1].changeAnimation('bug');
  fishOrBugDisplay[1].position.x = width / 2 + (width / 11);
  fishOrBugDisplay[1].position.y = height / 1.7;

  next = new Group();
  for (let i = 0; i < 2; i++) {
    let nextButton = createSprite(width / 2, height / 2);
    nextButton.scale = width / 10000;
    nextButton.addAnimation('normal', 'assets/functions/nextButton.png');
    nextButton.mouseActive = true;
    next.add(nextButton);
  }

  // close button
  closeButton = createSprite(width - cellHeight / 2.5, height / 20);
  closeButton.scale = width / 25000;
  closeButton.addAnimation('simpleRed', 'assets/functions/closeImg.png');
  // closeButton.setCollider('rectangle', 0, 0, closeButton.width, closeButton.height);
  closeButton.mouseActive = true;

  //load animation
  playerFemale.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemale.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");
  playerFemale.addAnimation('fish', 'assets/player/female/player_female_fish.png');

  //load animation
  playerFemaleMini = createSprite(widthBuffer + cellHomeWidth / 2, heightBuffer + cellHomeHeight / 0.9);
  playerFemaleMini.setCollider('rectangle', 0, 0, playerFemaleMini.width, playerFemaleMini.height);

  playerFemaleMini.mouseActive = true;
  playerFemaleMini.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemaleMini.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemaleMini.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemaleMini.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");

  playerFemaleMini.scale = homeGridSize / 35;

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

  dialougeBox = createSprite(width / 2, height / 2);
  dialougeBox.addAnimation('normal', 'assets/dialouge-box.png');
  dialougeBox.mouseActive = true;
  dialougeBox.scale = width / 800;
  dialougeBox.visible = false;

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

  storageMenu = createSprite(SCENE_W / 2 + (cellWidth / 3), playerFemale.position.y - (cellHeight * 1.5));
  storageMenu.addImage(loadImage('assets/functions/customF.png'));
  menu.add(storageMenu);

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

  purchaseButton = createSprite(width / 2, height / 2);
  purchaseButton.addAnimation('normal', 'assets/functions/purchaseLog.png');
  purchaseButton.scale = width / 1500;
  purchaseButton.mouseActive = true;

  // fishes & bugs
  fishes = new Group();

  itemDisplay = loadAnimation('assets/items/0.png', 'assets/items/9.png');
  itemDisplay.playing = false;
  itemDisplay.scale = 20;

  itemDisplayStorage = new Group();
  fishingRodMini = createSprite(width / 2, height / 2);
  fishingRodMini.addImage(loadImage("assets/items/2.png"));
  itemDisplayStorage.add(fishingRodMini);

  bugNetMini = createSprite(width / 2, height / 2);
  bugNetMini.addImage(loadImage("assets/items/1.png"));
  itemDisplayStorage.add(bugNetMini);

  for (let i = 0; i < itemDisplayStorage.length; i++) {
    itemDisplayStorage[i].visible = false;
  }

  gameState = "world";
}

function draw() {

  if (gameState === "world") {
    if (hour() <= 15 && hour() >= 7) {
      background("#73daef");
      timeState = "day";
    }
    else if (hour() > 15 && hour() < 21) {
      background(sunset);
      timeState = "afternoon";
    }
    else {
      background(8, 17, 59);
      timeState = "night";
    }


    camera.zoom = 1;
    //set the camera position to the player position
    camera.position.x = playerFemale.position.x;
    camera.position.y = playerFemale.position.y;
    playerFemale.scale = width / 2000;

    displayGrid();

    drawSprites(bg);
    drawSprites(trees);

    playerMove();

    if (isOpening) {
      image(acLogo, playerFemale.position.x - acLogo.width / 2, playerFemale.position.y - 3 * cellHeight);
      textFont(digitalTech);
      messageText(width / 50, 255, "Press Space to Start", playerFemale.position.x, playerFemale.position.y + cellHeight * 1.5);
      if (keyIsDown(32)) {
        isOpening = !isOpening;
        enterName = true;
      }
    }
    if (!isOpening) {
      if (!enterName) {
        drawSprites(menu);
      }

      drawSprites(coins);
      showMenu();
      playerFemale.overlap(coins, coinCollect);
      coins.collide(trees);
      timeCount();
      for (let i = 0; i < trees.length; i++) {
        if (trees[i].mouseIsOver && mouseWentDown()) {
          if (coinCount <= 5) {
            spawnCoins();
          }
        }
      }
      playerDialouge();
    }

    shopping();
    catchFish();
    fishOrBug();
    exitBox();
    buildSpaces();
    insideSpaces();
    cameraFunction();
  }
}

function spawnCoins() {
  if (random(100) < 50) {
    for (let i = 0; i < random(5); i++) {
      let coin = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2 - cellHeight * 1.5));
      coin.addAnimation('normal', 'assets/currency/BellCoin.png');
      coin.scale = width / 1500;
      coin.mouseActive = true;
      coins.add(coin);
    }
  }
}

function timeCount() {

  if (hour() >= 12) {
    timeMode = " PM";
  }
  else {
    timeMode = " AM";
  }
  if (minute() < 10) {
    theMinute = "0" + minute();
  }
  else {
    theMinute = minute();
  }
  if (second() < 10) {
    theSecond = "0" + second();
  }
  else {
    theSecond = second();
  }
  currentTime = hour() + ':' + theMinute + ':' + theSecond + timeMode;
  textFont('digitalTech');
  messageText(width / 100, 255, currentTime, playerFemale.position.x, playerFemale.position.y - cellWidth);

}

function coinCollect(collector, collected) {
  if (coinCount < 1000) {
    coinCount++;
  }
  collector.changeAnimation('normal');
  coinSound.play();
  collected.remove();
}


