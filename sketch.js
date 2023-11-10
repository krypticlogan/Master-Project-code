var mode = 0;
var gameMode = 0;
var circleGame, mazeGame, keyboardGame;
const GAMEBOARD_LEN = 1250;
const GAMEBOARD_HEIGHT = 500;
 //buttons
 var instructionExit;
 var restart;
 var backButton = createButton("Back");

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  colorMode(RGB);
//game boards - for display
  circleGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  mazeGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  keyboardGame = createGraphics(GAMEBOARD_LEN,GAMEBOARD_HEIGHT);

  // circleGame.background(0,0,0);
  circleMode(circleGame); 
  keyboardMode(keyboardGame);
  mazeMode(mazeGame);

}

function draw() {
  background(48,25,52);
  //home screen
  if(mode == 0) {
    createHomeGui();
    loadGame();
  }


  //game screens
  else {
    createGameGui(gameMode);
    // image(mazeGame,displayWidth/2-625, displayHeight/2-300);
  }  
  
}

function createHomeGui() { //HOME GUI
  //header
  fill(19,68,50);//dark green
  rect(0,0,displayWidth, 100);

  //Title
  fill(255,255,255);
  textAlign(CENTER, TOP);
  textSize(40);
  text("Home", displayWidth/2, 30); //Home Text

  //welcome message
  textSize(25);
  text("Welcome to Motor Mender! \nThe program to help your motor functions.", displayWidth/2, 150);

  //app frames
  fill(255,255,255);
  square(displayWidth/4-125, displayHeight/3,250);

  square((displayWidth)/2-125, displayHeight/3,250);

  square(displayWidth*3/4-125, displayHeight/3,250);

  //game descriptions
  fill(255,255,255);
  textSize(18);
  text("Keyboard Game", displayWidth/4, displayHeight/3 + 280);
  text("Maze Game", displayWidth/2, displayHeight/3 + 280);
  text("Circle Game", displayWidth*3/4, displayHeight/3 + 280);
}


function createGameGui(gameMode){ //GAME GUI
  //header
  fill(19,68,50);//dark green
  rect(0,0, displayWidth, 100);

  //Title
  fill(255,255,255);
  textAlign(CENTER, TOP);
  textSize(40);
  text("TITLE", displayWidth/2, 30);


  //game board
  fill(255,255,255);
  rect(displayWidth/2-625, displayHeight/2-300, 1250, 500);

  // //instructions
  // fill(48,25,52); //lightblue
  // square(displayWidth/2-175, displayHeight/2-220, 350);
  // fill(19,68,50);
  // rect(displayWidth/2-175, displayHeight/2-220,350,75);
  // fill(255);
  // textSize(25);
  // text("Instructions", displayWidth/2, displayHeight/2-200); //Instructions Title
  // textSize(15);
  // fill(255);
  // text("Place Instructions Here:", displayWidth/2, displayHeight/2-100); //Instructions Text

    backButton = createButton("Back");
    backButton.position(100,displayHeight/2+210);
    backButton.size(100,30);
    backButton.mousePressed(back);

  // var backButton;
  // var instructionExit;
  // var restart;
 
  // instructionExit = createButton("X");
  // instructionExit.size(25,25);
  // instructionExit.position(displayWidth/2-160, displayHeight/2-210);
  // instructionExit.mousePressed();
  switch(gameMode){
    case 1: image(keyboardGame,displayWidth/2-625, displayHeight/2-300);
    break;
    case 2: image(mazeGame,displayWidth/2-625, displayHeight/2-300);
    break;
    case 3: image(circleGame,displayWidth/2-625, displayHeight/2-300);
    break;
  }
  
}

function back(){
  if(mode == 1){
    mode = 0;
    backButton.remove();
    }
}
function loadGame(){
  if(mouseIsPressed){
    let x = mouseX;
    let y = mouseY;

    //game 1

    if((x >= displayWidth/4-125 && x<= displayWidth/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)){
      mode = 1;
      gameMode = 1;
    }

    //game 2
    if((x >= displayWidth/2-125 && x <= displayWidth/2+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
      gameMode =2;
    }
    
    //game 3
    if((x >= displayWidth*3/4-125 && x <= displayWidth*3/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
      gameMode = 3;
      // circleMode();
    }
  }
}

function keyboardMode(g){
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);
  g.text("WORDS HERE", GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2);
}

function mazeMode(g){
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);
  g.text("MAZE HERE", GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2);
}

 function circleMode(g) {
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);
  g.text("CIRCLES HERE", GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2);
 }
//  let mode = 0;
//  let circles = [];
//  let startTime;
//  let gameDuration = 20; // Game duration in seconds;
//  let gameButtons = []; // Array to store game buttons
 
//  function setup() {
//    createCanvas(displayWidth - 20, displayHeight - 140);
//    colorMode(RGB);
//    createHomeGui();
//  }
 
//  function draw() {
//    background(48, 25, 52);
 
//    if (mode === 0) {
//      createHomeGui();
//    } else if (mode === 1) {
//      createGameGui();
//      if (circles.length === 0) {
//        beginButton.show();
//      }
//      playCircleGame();
//    }
//  }
 
//  function createHomeGui() {
//    // Header
//    fill(19, 68, 50); // Dark green
//    rect(0, 0, displayWidth, 100);
 
//    // Title
//    fill(255, 255, 255);
//    textAlign(CENTER, TOP);
//    textSize(40);
//    text("Home", displayWidth / 2, 30); // Home Text
 
//    // Welcome message
//    //textSize(25);
//    //text("Welcome to Motor Mender! The program to help your motor functions.", displayWidth / 2, 150);
 
//    // Game descriptions
//    fill(255, 255, 255);
//    textSize(18);
//    text("Circle Game", displayWidth / 4, displayHeight / 3 + 280);
//    text("Keyboard Game", displayWidth / 2, displayHeight / 3 + 280);
//    text("Maze Game", displayWidth * 3 / 4, displayHeight / 3 + 280);
 
//    // Create game buttons
//    createGameButton("Start Circle Game", displayWidth / 4 - 125, displayHeight / 3, startCircleGame);
//    createGameButton("Start Maze Game", displayWidth / 2 - 125, displayHeight / 3, startMazeGame);
//    createGameButton("Start Keyboard Game", displayWidth * 3 / 4 - 125, displayHeight / 3, startKeyboardGame);
//  }
 
//  function createGameButton(label, x, y, callback) {
//    let button = createButton(label);
//    button.position(x, y);
//    button.size(250, 250); // Make the button square
//    button.style("font-size", "20px"); // Adjust the font size
//    button.mousePressed(() => {
//      for (let b of gameButtons) {
//        b.hide();
//      }
//      callback();
//    });
//    gameButtons.push(button);
//  }
 
//  function createGameGui() {
//    // Your game screen GUI code here
//    // ...
//  }
 
//  function startCircleGame() {
//    mode = 1;
//    createCircles(10); // Create 10 circles for the game
//  }
 
//  function startMazeGame() {
//    // Add maze game initialization logic here
//  }
 
//  function startKeyboardGame() {
//    // Add keyboard game initialization logic here
//  }
 
//  function playCircleGame() {
//    let currentTime = (millis() - startTime) / 1000; // Calculate elapsed time in seconds
//    if (currentTime >= gameDuration) {
//      endGame();
//    } else {
//      for (let i = circles.length - 1; i >= 0; i--) {
//        let circle = circles[i];
//        circle.display();
//        let d = dist(mouseX, mouseY, circle.x, circle.y);
//        if (d < circle.radius / 2 && circle.isBlue && mouseIsPressed) {
//          circles.splice(i, 1); // Remove the clicked circle
//        }
//      }
//    }
//  }
 
//  function endGame() {
//    mode = 0;
//    circles = [];
//    // Your end game logic here
//    // For example, show a game-over message.
//  }
 
//  const desiredSpacing = 20; // Adjust the desired spacing between circles
 
//  function createCircles(num) {
//    for (let i = 0; i < num; i++) {
//      let valid = false;
//      let x, y, radius, isBlue;
 
//      while (!valid) {
//        valid = true;
//        x = random(300, 1400);
//        y = random(300, 1000);
//        radius = random(20, 50);
//        isBlue = random() < 0.5;
 
//        for (let circle of circles) {
//          let d = dist(x, y, circle.x, circle.y);
//          if (d < radius + circle.radius + desiredSpacing) {
//            valid = false;
//            break;
//          }
//        }
//      }
 
//      circles.push(new Circle(x, y, radius, isBlue));
//    }
//  }
 
//  class Circle {
//    constructor(x, y, radius, isBlue) {
//      this.x = x;
//      this.y = y;
//      this.radius = radius;
//      this.isBlue = isBlue;
//    }
 
//    display() {
//      if (this.isBlue) {
//        fill(0, 0, 255);
//      } else {
//        fill(255);
//      }
//      ellipse(this.x, this.y, this.radius);
//    }
//  }