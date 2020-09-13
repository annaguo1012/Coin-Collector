// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global textAlign, LEFT, CENTER, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, length */

let brushHue,
  backgroundColor,
  coinX,
  coinY,
  coinX2,
  coinY2,
  coinX3,
  coinY3,
  score,
  time,
  gameIsOver,
  hit,
  hitCoin,
  hitIndex,
  refreshImg;
let coins = [];

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  time = 500;
  score = 0;
  gameIsOver = false;
  hit = false;
  hitIndex = 0;
  refreshImg = loadImage(
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Refresh_icon.png"
  );
}

function draw() {
  background(backgroundColor);

  fill(0, 0, 100);
  ellipse(mouseX, mouseY, 20);
  fill(0, 0, 0);

  textAlign(LEFT);
  text(`Your score: ${score}`, 20, 20);
  text(`Time remaining: ${time}`, 20, 40);
  handleTime();
  if (time % 20 == 0 && !gameIsOver) {
    coins.push(new Coin("P", 20));
    console.log("new coin generated");
  }
  hit = false;
  for (var i = 0; i < coins.length; i++) {
    coins[i].draw();
    if (!hit) {
      hit = collideCircleCircle(
        mouseX,
        mouseY,
        20,
        coins[i].x,
        coins[i].y,
        coins[i].diameter
      );
      if (hit) {
        hitCoin = coins[i];
        hitIndex = i;
      }
    }
  }
  if (hit && !gameIsOver) {
    handleCollision();
  }
  if (gameIsOver) {
    console.log('refresh button appears');
    image(refreshImg, height / 2 - 40, width / 2 - 40, 80, 80);
  }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  console.log(`You got a hit at ${mouseX}, ${mouseY}!`);
  score++;
  coins.splice(hitIndex, 1);
  /*
  hitCoin.x = random(20, width);
  hitCoin.y = random(40, height);
  */
}

function handleTime() {
  // We'll write code to handle the time.
  //adjust the time variable
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
  }
}

function mousePressed(){
  if(gameIsOver && mouseX > height / 2 - 40 && mouseX < height / 2 + 40 && mouseY > width / 2 - 40 && mouseY < width / 2 + 40){
    score = 0;
    time = 500;
    gameIsOver = false;
    background(backgroundColor);
    coins = [];
  }
}
class Coin {
  constructor(type, diameter) {
    this.x = random(20, width);
    this.y = random(40, height);
    this.type = type;
    this.diameter = diameter;
  }

  draw() {
    fill(40, 95, 60);
    ellipse(this.x, this.y, this.diameter);
    fill(0, 0, 0);
    textAlign(CENTER);
    text(this.type, this.x, this.y + this.diameter / 4);
  }
}
