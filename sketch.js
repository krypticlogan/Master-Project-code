//global vars
var mode = 0;
var gameMode = 0;
var circleGame, mazeGame, keyboardGame;
const GAMEBOARD_LEN = 1250;
const GAMEBOARD_HEIGHT = 500;
let keyboardImg;
let circleImg;
let mazeImg;

let scaleX;
let scaleY;

 //buttons
 var instructionExit;
 var restart;
// var keyboard, maze, circleG;
var backButton;
//keyboard variables
var currentWord = "";
var word;
var words;
var letterIndex;
var wordIndex;
let userInput;
let lastKey;
let displaying = [];
let display;
var userWord;
let startKeyboardTime;
let score = 0;
let timer = 30;
let remainingTime;
  


//maze variables
var player;
let playerX;
let playerY;
let dragging = false;
let targetX;
let targetY;
let startX;
let startY;
let boundingX;
let boundingY;
let errors = 0;
let time;
let won = false;
let mazeLevel = 1;

const maze1 = [
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
];

const maze2 = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1],
];

const maze3 = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
];

const tileSize = 1250/maze1[0].length;
let start, target;
 //circle game vars
 var circles = [];
 let startCircleTime;
 let gameDuration = 20; // Game duration in seconds;
 let gameButtons = []; // Array to store game buttons
var backButton;
let circleScore = 0;

//sounds
let ding;
let buzz;
// let currentWord = "";
// let wordIndex = 0;
// let letterIndex = 0;
// let startKeyboardTime;
// let score = 0;
// let timer = 30;

function preload(){
  soundFormats('mp3');
  ding = loadSound('sounds/dingy.mp3')
  buzz = loadSound('sounds/buzzy.mp3')

  keyboardImg = loadImage('Images/keyboard game image.png');
  circleImg = loadImage('Images/Screen Shot 2023-11-14 at 7.14.44 PM.png');
  mazeImg = loadImage('Images/maze image.jpeg')
  }

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  textFont('Verdana');
  scaleX = GAMEBOARD_LEN/(displayWidth-20);
  scaleY = GAMEBOARD_HEIGHT/(displayHeight-140);
  colorMode(RGB);
  backButton = createButton("Back");
//game boards - for display
  circleGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  mazeGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  keyboardGame = createGraphics(GAMEBOARD_LEN,GAMEBOARD_HEIGHT);

  userInput = "";
  startKeyboardTime = millis();




  // circleGame.background(0,0,0);
  circleMode(circleGame); 
  // startCircleGame();
  keyboardMode(keyboardGame);
  mazeMode(mazeGame);
  
  backButton = createButton("Back");

}

function draw() {
  clear();
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
  image(keyboardImg,displayWidth/4-125, displayHeight/3,250,250);
  // square(displayWidth/4-125, displayHeight/3,250);
  image(mazeImg,(displayWidth)/2-125, displayHeight/3,250,250);
  // square((displayWidth)/2-125, displayHeight/3,250);
  image(circleImg,displayWidth*3/4-125, displayHeight/3,250,250);
  // square(displayWidth*3/4-125, displayHeight/3,250);

  //game descriptions
  fill(255,255,255);
  textSize(18);
  text("Keyboard Game", displayWidth/4, displayHeight/3 + 280);
  text("Maze Game", displayWidth/2, displayHeight/3 + 280);
  text("Circle Game", displayWidth*3/4, displayHeight/3 + 280);

  fill(255);
  rect(displayWidth-200,displayHeight/2+210,100,30);
  textSize(15);
  fill(0);
  text("Credits", displayWidth-160,displayHeight/2+220)
}


function createGameGui(gameMode){ //GAME GUI
  //header
  fill(19,68,50);//dark green
  rect(0,0, displayWidth, 100);

  //Title
  fill(255,255,255);
  textAlign(CENTER, TOP);
  textSize(40);
  if (gameMode == 1) {
    text("Keyboard Game", displayWidth/2, 30);
  }
  if (gameMode == 2) {
    text("Maze Game", displayWidth/2, 30);
  }
  if (gameMode == 3) {
    text("Circle Game", displayWidth/2, 30);
  }
  


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
    
    case 1: 
    // startKeyboardTime = millis();

   
    image(keyboardGame,displayWidth/2-625, displayHeight/2-300);
      keyboardGame.fill(30,70,100);
      keyboardGame.textSize(20);
      keyboardGame.text(currentWord, GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2 + 70);
      displayWord(keyboardGame);
      checkWord(keyboardGame);
      gameTimer(keyboardGame);
      gameOver(keyboardGame);
    break;
    case 2: image(mazeGame,displayWidth/2-625, displayHeight/2-300);
    mazeGame.background(0,0,0);
      player = new Player(mazeGame, playerX, playerY, 'white');
      if(dragging){
        playerX = player.relX + player.offsetX;
        playerY = player.relY + player.offsetY;
 
      }
      
      
      
      // ^^ move player logic ^^
      
      
      mazeGame.background(255);

      drawMaze(mazeLevel);

      if ((playerX >= targetX && playerX <= targetX + tileSize) && (playerY >= targetY && playerY <= targetY + tileSize)){
        mazeLevel++;
        findStartAndTarget(mazeLevel);
        dragging = false;
      }

     


      // Draw starting point
      mazeGame.stroke('green')
      mazeGame.fill(0, 255, 0); // Green
      mazeGame.ellipse(start.x * tileSize + tileSize / 2, start.y * tileSize + tileSize / 2, tileSize * 0.8);

      // Draw target
      mazeGame.stroke('red')
      mazeGame.fill(255, 0, 0); // Red
      mazeGame.rect(target.x * tileSize, target.y * tileSize, tileSize, tileSize);

      
      //drawing player
      mazeGame.fill('blue');
      mazeGame.stroke('blue');
      mazeGame.circle(playerX, playerY, player.r);
      

      //
        break;
    case 3: image(circleGame,displayWidth/2-625, displayHeight/2-300);
      playCircleGame(circleGame);
      circleGameTimer(circleGame);
    break;
  }
  
}



function back(){
  if(mode == 1){
    mode = 0;
    // backButton.hide();
    circleGame.background(0,0,0);
    restartCircles();
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
      gameMode = 2;
      playerX = startX + tileSize/2;
      playerY = startY + tileSize/2;
    }
    
    //game 3
    if((x >= displayWidth*3/4-125 && x <= displayWidth*3/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
      gameMode = 3;
      startCircleGame();
      // circleMode();
    }
  }
}



function keyboardMode(g){
//game layout
  g.background(255,255,255);
  g.textAlign(CENTER);
  g.push();
  g.fill(30,70,100);
  g.textSize(20);

  g.frameRate(60);

  // generateWord();
  // let drawing = new drawKeyboardGame(g);
  words = ["apple", "banana", "cherry", "date", "elderberry", "abundant", "benevolent", "cacophony", "divergent", "eccentric", "facetious", "gargantuan", "hapless", "ineffable", "juxtapose", "kindle", "luminous", "mellifluous", "nebulous", "object", "palimpsest", "worm"];
  currentWord = ""; // Index of the current letter being typed
  wordIndex = 0;
  nextWord(words, wordIndex);
  g.pop()

  }

//   var word;
//   var words;
//   var letterIndex;
//   var wordIndex;
// let userInput = "";
// let lastKey;
// let displaying = [];


  function nextWord(array, index){
    let wordIndex = index;
    let words = array;
    let word = words[wordIndex];
    letterIndex = 0;
    currentWord = word; 
  }

function checkWord(){
    // Check if the word is completed
  if (letterIndex >= currentWord.length) {
    ding.play();
    score++;
    wordIndex++;
    keyboardGame.clear();
    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
    nextWord(words, wordIndex);
  }
}

function displayWord(g){
  for (let i = 0; i < currentWord.length; i++) {
        if (i === letterIndex) {
          if (currentWord[i] === key) {
            g.fill(0, 255, 0); // Correct letter, green
          } else {
            g.fill(255, 0, 0); // Incorrect letter, red
          }
        } else if (i < letterIndex) {
          g.fill(0, 255, 0); // Previously correct letter, green
        } else {
         g.fill(0);
        }
        g.text(currentWord[i], GAMEBOARD_LEN / 2 - (currentWord.length / 2 - i) * 20, GAMEBOARD_HEIGHT / 2 + 40);
      }
}
function gameOver(g){
if (remainingTime <= 1) {
  g.background(255,255,255); // Set the background to white
  g.textSize(32);
  g.fill(0);
  g.text("Game Over", GAMEBOARD_LEN / 2, GAMEBOARD_HEIGHT / 2 - 20);
  g.text("Your Score: " + score, GAMEBOARD_LEN / 2, GAMEBOARD_HEIGHT / 2 + 20);
  g.noLoop();
}
}

function keyPressed() {
  if (keyCode >= 65 && keyCode <= 90) { // Check if it's a valid letter key
    let currentLetter = currentWord[letterIndex];
    if (key === currentLetter) {
      letterIndex++;
    }
    else{
      buzz.play();
    }
  }
}


function gameTimer(g){//   // Display score and timer
  g.textSize(32);
  g.fill(0);
  g.text("Score: " + score, 70, 30);
  remainingTime = max(timer - int((millis() - startKeyboardTime) / 1000), 0);
  g.fill(255,255,255);
  g.noStroke();
  g.rect(GAMEBOARD_LEN - 101,5, 1000,20);
  g.fill(0,0,0);
  g.text("Time: " + remainingTime, GAMEBOARD_LEN - 65, 30);


  // displaying.splice(0,displaying.length-2);
  // displaying.push(time);
}

function mousePressed(){
  if(mode == 1){
    return;
  }
  else if (mode == 2){
    return;
  } 
  else if (mode == 3){
    return;
  } 
}


// keyboard game ends

//maze game starts here
class Player {
  constructor(g,pX,pY,pColor){
    this.g = g;
    this.x = pX;
    this.y = pY;
    this.color = pColor;
    this.r = 40;
    this.dragging = false;
    this.touching = false;
    this.relX = mouseX-(displayWidth/2-625);
    this.relY = mouseY-(displayHeight/2-300);
    this.offsetX = 0;
    this.offsetY = 0;
  }

  // show(){
  //   if(this.dragging){
  //     this.g.fill(200,0,200);
  //   } else {
  //     this.g.fill(255,255,255);
  //   }
  //   this.g.circle(this.x,this.y,this.r);
  // }
}




    
  function findStartAndTarget(level) {
            // Found an empty space, set it as the starting point
            if(level === 1){
              start = createVector(0, 0);    
              target = createVector(6,3);
            }
            else if (level === 2){
              start = createVector(1, 4);    
              target = createVector(1, 0);
            } 
            else if(level === 3){
              start = createVector(11,2);
              target = createVector(0,0);
            }
            
            startX = start.x *tileSize;
            startY = start.y *tileSize;
            // Find a random empty space for the target
              targetX = target.x *tileSize;
              targetY = target.y *tileSize;

            restartPlayer();
              return;
            }

    function drawMaze(level){
      let maze;

      if(level === 1){
        maze = maze1;
      }
      else if (level === 2){
        maze = maze2;
      } 
      else if(level === 3){
        maze = maze3;
      }
        for (let i = 0; i < maze.length; i++) {
          for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 1) {
              mazeGame.stroke('black');
              mazeGame.fill(0); // Wall
              mazeGame.rect(j * tileSize, i * tileSize, tileSize, tileSize);
              boundingX = j * tileSize;
              boundingY = i * tileSize;
              if ((playerX+player.r/2 >= boundingX && playerX-player.r/2 <= boundingX + tileSize) && (playerY+player.r/2 >= boundingY && playerY-player.r/2 <= boundingY + tileSize)){
                restartPlayer();
                dragging = false;
              }
              // console.log(i + " " + j);
              // mazeGame.fill('pink');
              // mazeGame.circle(boundingX,boundingY,20);
            } else {
              mazeGame.stroke('white');
              mazeGame.fill(255); // Path
              mazeGame.rect(j * tileSize, i * tileSize, tileSize, tileSize);
            }
          }
        }
    }

    function restartPlayer(){
      playerX = startX + tileSize/2;
      playerY = startY + tileSize/2;
    }


function mazeMode(g){
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);

  //game logic starts here
  findStartAndTarget(mazeLevel);
}



  
//maze game ends here

// circle game starts here

 function circleMode(g) {
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);
  }
 function startCircleGame() {
   createCircles(20); // Create 10 circles for the game
   console.log(circles);
 }

 function playCircleGame(g) {
  // g.background(48, 25, 52);      
   let currentTime = (millis() - startCircleTime) / 1000; // Calculate elapsed time in seconds
   if (currentTime >= gameDuration) {
     endGame();
   } else {
     for (let i = circles.length - 1; i >= 0; i--) {
       let circle = circles[i];
       circle.display(g);
       let adjX = mouseX-(displayWidth/2-625);
       let adjY = mouseY-(displayHeight/2-300);
       let d = dist(adjX, adjY, circle.x, circle.y);
       if (d < circle.radius / 2){
        if(!circle.isBlue){
          circle.isRed = true;
          buzz.play();
          circleScore-=.05;
        }
        else if(mouseIsPressed) {
         circles.splice(i, 1); // Remove the clicked circle
         g.background(0,0,0);
         circleScore+=2      
         ding.play();
       }
      }
     }
   }
 }
 
 function endGame() {
   circles = [];
   // Your end game logic here
   // For example, show a game-over message.
 }
 
 const desiredSpacing = 2; // Adjust the desired spacing between circles
 
 function createCircles(num) {
   for (let i = 0; i < num; i++) {
     let valid = false;
     let x, y, radius, isBlue;
 
     while (!valid) {
       valid = true;
       x = random(51, GAMEBOARD_LEN-50);
       y = random(51, GAMEBOARD_HEIGHT-100);
       radius = random(20, 50);
       isBlue = random() <= 0.4;
       
 
       for (let circle of circles) {
         let d = dist(x, y, circle.x, circle.y);
         if (d < radius + circle.radius + desiredSpacing) {
           valid = false;
           break;
         }
       }
     }
 
     circles.push(new Circle(x, y, radius, isBlue));
   }
 }
 
 class Circle {
   constructor(x, y, radius, isBlue, isRed) {
     this.x = x;
     this.y = y;
     this.radius = radius;
     this.isBlue = isBlue;
     this.isRed = isRed;
   }
 
   display(g) {
     if (this.isBlue) {
       g.fill(0, 0, 255);
     } 
     else if(this.isRed){
      g.fill(255,0,0);
     } else {
       g.fill(255);
     }
     g.ellipse(this.x, this.y, this.radius);
   }
 }

 function circleGameTimer(g){//   // Display score and timer
  g.fill(0,0,0);
  g.noStroke();
  g.rect(0,5, 1000,20);
  g.textSize(32);
  g.fill(255,255,255);
  g.text("Score: " + Math.ceil(circleScore), 70, 30);
  remainingTime = max(timer - int((millis() - startKeyboardTime) / 1000), 0);
  g.fill(0,0,0);
  g.noStroke();
  g.rect(GAMEBOARD_LEN - 101,5, 1000,20);
  g.fill(255,255,255);
  g.text("Time: " + remainingTime, GAMEBOARD_LEN - 60, 30);


  // displaying.splice(0,displaying.length-2);
  // displaying.push(time);
}

 function restartCircles(){
  circles = [];
  circleScore = 0;
 }
