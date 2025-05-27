// https://www.youtube.com/watch?app=desktop&v=HmnYA7zlalI
// https://p5play.org/learn/index.html
// https://p5js.org/reference/#/p5

let player;

let siena;
let siena2;

let akmeni;
let akmens;

let punkti = 0;
let hp = 2;
let limenis = 1;

let lode;

let state = 0;

let startaPoga;
let noteikumuPoga;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // player
  player = new Sprite(20, windowHeight -20, 10, 10);
  player.img = loadImage('images/player1.png');
  player.rotationLock = true;
  
  //sienas
  siena = new Sprite(-10, 0, 10, windowHeight * 2, STA);
  siena2 = new Sprite(windowWidth + 10, 0, 10, windowHeight * 2, STA);
  
  // Asteroīdi
  akmens = new Sprite();
  akmens.img = loadImage('images/akmens.png');
  akmens.y = 10;
  akmens.direction = 90;
  akmens.speed = random(1.5, 2.5);
  akmens.x = random(0, width);

  // lode
  lode = new Sprite(player.x, player.y, 5, 5);
  lode.vel.y = -10;
  lode.rotationLock = true;
  lode.d = 5;
  lode.color = color("lightblue");
  lode.remove();

  startaPoga  = new Sprite(width / 2, height / 3, 100, 50, 'k');
  startaPoga.text = "Sākt spēli";

  noteikumuPoga = new Sprite(width / 2, height / 3 + 100, 100, 50, 'k');
  noteikumuPoga.text = "Noteikumi";
}


function draw() {
  if (state == 0) {
    background("lightblue");
    if (startaPoga.mouse.pressed()){
      state = 1;
      startaPoga.remove();
      noteikumuPoga.remove();
    }

    if (noteikumuPoga.mouse.pressed()){
      state = 2;
      // startaPoga.remove();
      noteikumuPoga.remove();
    }
  }
  else if (state == 1){
    background("white");

  // Iestata statisku y player
  player.y = windowHeight - 20;

  // Player kustība
  if (kb.pressing('left')){
    player.vel.x = -5;
  } 
  else if (kb.pressing('right')) {
    player.vel.x = 5;
  }
  else {
    player.vel.x = 0;
  }

  //Sadursme ar akmeņiem
  if (player.collide (akmens)) {
    hp -= 1;
  }

  // Spēles beigas zaudējums
  if (hp <= 0) {
    background("red");
    textSize(50);
    textAlign(CENTER, CENTER);
    fill("white");
    text("Spēle beigusies", width / 2, height / 2);
    player.remove();
    akmens.remove();
    noLoop();
  }

  // Spēles beigas uzvara
  if (punkti >= 40) {
    background("darkgreen");
    textSize(32);
    textAlign(CENTER, CENTER);
    fill("white");
    text("Tu uzvarēji", width / 2, height / 2);
    player.remove();
    akmens.remove();
    noLoop();
  }


  if (punkti < 0) {
    background("red");
    textSize(50);
    textAlign(CENTER, CENTER);
    fill("white");
    text("Spēle beigusies", width / 2, height / 2);
    player.remove();
    akmens.remove();
    noLoop();
  }

  if (akmens.y <= -20) {
    background("blue");
    textSize(50);
    textAlign(CENTER, CENTER);
    fill("white");
    text("Misija izpildīta", width / 2, height / 2);
    player.remove();
    akmens.remove();
    noLoop();
    
  }

  //parāda punktu skaitu
  textSize(16); 
  textColor("White");
  text("Punkti " + punkti, 50, 30);
  

  //parāda hp skaitu
  textSize(16);
  textColor("White");
  text("Dzīvības " + hp, 50, 60);

  //parāda līmeni
  if (punkti >= 5 && punkti < 10) {
    limenis = 2;
    akmens.speed = random(2.5, 3.5);
    akmens.size = 50;
  }
  else if (punkti >= 10 && punkti < 15) {
    limenis = 3;
    akmens.speed = random(3.5, 4.5);
  }
  else if (punkti >= 15) {
    limenis = 4;
    akmens.speed = random(4.5, 5.5);
  }
  textSize(16);
  textColor("White");
  text("Līmenis " + limenis, 50, 90);

  //šauj lodes
  if (kb.presses('space')){
    lode = new Sprite(player.x, player.y, 5, 5);
    lode.vel.y = -10;
    lode.rotationLock = true;
    lode.d = 5;
    lode.color = color("lightblue");
  }

  //Lodes sadursme ar akmeni
  if (akmens.collide(lode)) {
    lode.remove();
    akmens.y = 10;
    akmens.x = random(0, width);
    punkti += 1;
  }

  //Akmens pārvietošana uz augšu
  if (akmens.y > height) {
    akmens.y = 0;
    akmens.x = random(0, width);
    akmens.direction = 90;
    akmens.speed = random(1.5, 2.5);
    punkti -= 1;
  }

  }
  else if (state == 2){
    background("lightblue");
    textSize(20);
    textAlign(CENTER, CENTER);
    fill("black");
    textSize(16);
    text("Izvairies no asteorīdiem un šauj tos ar sprāgstvielu", width / 2, height / 2 + 20);
    text("Lai sāktu spēli nospied 'Sākt spēli'", width / 2, height / 2 + 50);
    if (startaPoga.mouse.pressed()){
      state = 1;
      startaPoga.remove();
      noteikumuPoga.remove();
    }
  }
}
