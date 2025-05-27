// https://www.youtube.com/watch?app=desktop&v=HmnYA7zlalI
// https://www.youtube.com/watch?v=sQceAJmO4RM
// https://p5play.org/learn/index.html
// https://p5js.org/reference/#/p5

let rakete;

let siena;
let siena2;

let akmens;

let punkti = 0;
let hp = 2;
let limenis = 1;

let lodes;

let stavoklis = 0;

let startaPoga;
let noteikumuPoga;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // rakete
  rakete = new Sprite(20, windowHeight - 20, 10, 10);
  rakete.img = loadImage('images/rakete1.png');
  rakete.rotationLock = true;
  
  // sienas
  siena = new Sprite(-10, 0, 10, windowHeight * 2, STA);
  siena2 = new Sprite(windowWidth + 10, 0, 10, windowHeight * 2, STA);
  
  // asteroīds
  akmens = new Sprite();
  akmens.img = loadImage('images/akmens.png');
  akmens.y = 10;
  akmens.direction = 90;
  akmens.speed = random(1.5, 2.5);
  akmens.x = random(0, width);

  // pogas
  startaPoga  = new Sprite(width / 2, height / 3, 100, 50, 'k');
  startaPoga.text = "Sākt spēli";

  noteikumuPoga = new Sprite(width / 2, height / 3 + 100, 100, 50, 'k');
  noteikumuPoga.text = "Noteikumi";

  // grupas inicializācija
  lodes = new Group();
}

function draw() {
  if (stavoklis == 0) {
    background("lightblue");
    if (startaPoga.mouse.pressed()) {
      stavoklis = 1;
      startaPoga.remove();
      noteikumuPoga.remove();
    }

    if (noteikumuPoga.mouse.pressed()) {
      stavoklis = 2;
      noteikumuPoga.remove();
    }
  }

  else if (stavoklis == 1) {
    background("black");

    // Iestata statisku y raketei
    rakete.y = windowHeight - 20;

    // raketes kustība
    if (kb.pressing('left')) {
      rakete.vel.x = -5;
    } 
    else if (kb.pressing('right')) {
      rakete.vel.x = 5;
    } 
    else {
      rakete.vel.x = 0;
    }

    // sadursme ar akmeni
    if (rakete.collide(akmens)) {
      hp -= 1;
    }

    // spēles beigas - zaudējums
    if (hp <= 0 || punkti < 0) {
      background("red");
      textSize(50);
      textAlign(CENTER, CENTER);
      fill("white");
      text("Spēle beigusies", width / 2, height / 2);
      rakete.remove();
      akmens.remove();
      noLoop();
    }

    // spēles beigas - uzvara
    if (punkti >= 40) {
      background("darkgreen");
      textSize(32);
      textAlign(CENTER, CENTER);
      fill("white");
      text("Tu uzvarēji", width / 2, height / 2);
      rakete.remove();
      akmens.remove();
      noLoop();
    }

    // uzdevums izpildīts, ja akmens nonāk ārpus augšas
    if (akmens.y <= -20) {
      background("blue");
      textSize(50);
      textAlign(CENTER, CENTER);
      fill("white");
      text("Misija izpildīta", width / 2, height / 2);
      rakete.remove();
      akmens.remove();
      noLoop();
    }

    // punktu, hp un līmeņa attēlošana
    textSize(16);
    fill("White");
    text("Punkti: " + punkti, 50, 30);
    text("Dzīvības: " + hp, 50, 60);
    text("Līmenis: " + limenis, 50, 90);

    // līmeņa pārslēgšana
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

    // šauj lodes
    if (kb.presses('space')) {
      let lode = new lodes.Sprite(rakete.x, rakete.y, 5, 5);
      lode.vel.y = -10;
      lode.rotationLock = true;
      lode.d = 5;
      lode.color = color("lightblue");
    }

    // sadursme starp katru lodēm un akmeni
    for (let i = lodes.length - 1; i >= 0; i--) {
      let lode = lodes[i];

      // ja lode iziet no ekrāna
      if (lode.y < 0) {
        lode.remove();
        continue;
      }

      // ja lode trāpa akmenim
      if (akmens.collide(lode)) {
        lode.remove();
        akmens.y = 10;
        akmens.x = random(0, width);
        punkti += 1;
      }
    }

    // ja akmens iziet no apakšas
    if (akmens.y > height) {
      akmens.y = 0;
      akmens.x = random(0, width);
      akmens.direction = 90;
      akmens.speed = random(1.5, 2.5);
      punkti -= 1;
    }
  }

  else if (stavoklis == 2) {
    background("lightblue");
    textSize(16);
    textAlign(CENTER, CENTER);
    fill("black");
    text("Izvairies no asteroīdiem un šauj tos ar sprāgstvielu.", width / 2, height / 2 + 20);
    text("Lai sāktu spēli, nospied 'Sākt spēli'.", width / 2, height / 2 + 50);

    if (startaPoga.mouse.pressed()) {
      stavoklis = 1;
      startaPoga.remove();
    }
  }
}
