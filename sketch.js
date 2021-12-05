// Major Project - Animal Crossing Clone
// Monica Trinh
// November 16th, 2021

/* key/functions available: 'x' to hide menu, click on player to show menu */

let grid;
let gridSize = 30;
let cellWidth, cellHeight;
let grass, grassPale;
let blathers, isabelle, kk, tomNook;
let playerFemale;
let player;
let SCENE_W;
let SCENE_H;
let bg;
let mouseCursor;
let menu, buildMenu, cameraMenu, catchMenu, customMenu, mapMenu, shopMenu;
let chooseSound;
let penmanship, acFont;

function preload() {
  grass = loadImage("assets/background/grass.png");
  grassPale = loadImage("assets/background/grass2.jpg");
  chooseSound = loadSound('assets/sound/choose.wav');
  penmanship = loadFont('assets/background/penmanship.ttf');
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

  //load animation
  playerFemale.addAnimation('normal', 'assets/player/female/player_female.png');
  playerFemale.addAnimation('forward', 'assets/player/female/player_female1.png', 'assets/player/female/player_female2.png', 'assets/player/female/player_female3.png', 'assets/player/female/player_female4.png', 'assets/player/female/player_female5.png');
  playerFemale.addAnimation('backward', 'assets/player/femaleBack/femaleBack1.png', 'assets/player/femaleBack/femaleBack2.png', 'assets/player/femaleBack/femaleBack3.png', 'assets/player/femaleBack/femaleBack4.png');
  playerFemale.addAnimation('movingRL', "assets/player/femaleLR/femaleLR1.png", "assets/player/femaleLR/femaleLR2.png");

  // fossils
  bg = new Group();
  //create some background for visual reference
  for (let i = 0; i < 100; i++) {
    let rock = createSprite(random(-SCENE_W + cellWidth / 2, SCENE_W - cellWidth / 2), random(-SCENE_H + cellHeight / 2, SCENE_H - cellHeight / 2));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/background/fossil.png');
    bg.add(rock);
  }

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

  for (let i = 0; i < menu.length; i++) {
    menu[i].scale = width / 4000;
    menu[i].visible = false;
    menu[i].mouseActive = true;
    // menu[i].position.y = playerFemale.position.y - (i * 2) - 5;
    // menu[i].position.x = playerFemale.position.x + i * 25 + 25;
  }
}

function draw() {
  background("#73daef");

  displayGrid();

  camera.zoom = 1;
  //set the camera position to the player position
  camera.position.x = playerFemale.position.x;
  camera.position.y = playerFemale.position.y;



  drawSprites(bg);
  drawSprites(menu);
  playerMove();
  theMap();
  showMenu();


  // if (keyIsDown(UP_ARROW)) {
  //   playerFemale.scale += 0.05;
  // }

  // if (keyIsDown(DOWN_ARROW)) {
  //   playerFemale.scale -= 0.05;
  // }

  // asterisk.overlap(collectibles, collect);

}


