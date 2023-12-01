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
var adjX;
var adjY;
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
let keyboardScore = 0;
let timer = 30;
let remainingTime;
var keyHiScore = 0;
  
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
let collisions = 0;
let timeElapsed = 0;
let won = false;
let mazeLevel = 1;
var bestTime = 1000;

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
 let gameDuration = 20; // Game duration in seconds;
 let gameButtons = []; // Array to store game buttons
var backButton;
let circleScore = 0;
let startCircleTime;
let playing = false;
let errors = 0;
let bestCPS = 0;
let cps; 
// let currentWord = "";
// let wordIndex = 0;
// let letterIndex = 0;
// let startKeyboardTime;
// let keyboardScore = 0;
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
  // circleGame.background(0,0,0);
  circleMode(circleGame); 
  // startCircleGame();
  keyboardMode(keyboardGame);
  mazeMode(mazeGame);
  
  backButton = createButton("Back");
}
function draw() {
  adjX = mouseX-(displayWidth/2-625);
  adjY = mouseY-(displayHeight/2-300);
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
  text("Quick Type", displayWidth/4, displayHeight/3 + 280);
  text("Maze Runner", displayWidth/2, displayHeight/3 + 280);
  text("Circle Click", displayWidth*3/4, displayHeight/3 + 280);

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
    text("Quick Type", displayWidth/2, 30);
  }
  if (gameMode == 2) {
    text("Maze Runner", displayWidth/2, 30);
  }
  if (gameMode == 3) {
    text("Circle Click", displayWidth/2, 30);
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

  switch(gameMode){
    //keyboard
    case 1: 
    // startKeyboardTime = millis();
   
    image(keyboardGame,displayWidth/2-625, displayHeight/2-300);
      keyboardGame.fill(30,70,100);
      keyboardGame.textSize(20);
      keyboardGame.text(currentWord, GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2 + 70);
      displayWord(keyboardGame);
      checkWord(keyboardGame);
      gameTimer(keyboardGame);

      keyboardGame.fill(100,100,100);
      gameOver(keyboardGame);
      if(keyboardScore > keyHiScore){
        keyHiScore = keyboardScore;
      }
    break;
    //maze game
    case 2: image(mazeGame,displayWidth/2-625, displayHeight/2-300);
      mazeGame.background(0,0,0);
      player = new Player(mazeGame, playerX, playerY, 'white');
    if(playing){
      if(dragging){
        playerX = player.relX + player.offsetX;
        playerY = player.relY + player.offsetY;
      }
      
      // ^^ move player logic ^^
      
      
      mazeGame.background(255);

      drawMaze(mazeLevel);
    
      //when the player hits the target
      if ((playerX >= targetX && playerX <= targetX + tileSize) && (playerY >= targetY && playerY <= targetY + tileSize)){
        if(mazeLevel < 3){
        mazeLevel++;
        findStartAndTarget(mazeLevel);
        dragging = false;
        }
        else{
          playing = false;
        }
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
      runTimer();

      
      }
      else{
        endMaze();
      }
        break;
    case 3: image(circleGame,displayWidth/2-625, displayHeight/2-300);
        playCircleGame(circleGame);
        if(playing){
        circleGameTimer(circleGame);
        }
    break;
    case 4:
      createCreditsGUI();
    break;
  }
  
}

function back(){
  if(mode == 1){
    mode = 0;
    backButton.remove();
    }
    if(gameMode == 2){
      mazeLevel = 1;
      findStartAndTarget(mazeLevel);
    }
  if(gameMode == 3){
    restartCircles();
  }
}

function loadGame(){
  if(mouseIsPressed){
    let x = mouseX;
    let y = mouseY;
    //game 1
    if((x >= displayWidth/4-125 && x<= displayWidth/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)){

      keyboardGame.clear();
      currentWord = ""; // Index of the current letter being typed
  wordIndex = 0;
  nextWord(words, wordIndex);
      mode = 1;
      gameMode = 1;
      startKeyboardTime = Date.now();
      keyboardScore = 0;
    }
    //game 2
    if((x >= displayWidth/2-125 && x <= displayWidth/2+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
      gameMode = 2;
      playerX = startX + tileSize/2;
      playerY = startY + tileSize/2;
      playing = true;
      mazeStartTime = Date.now();
    }
    
    //game 3
    if((x >= displayWidth*3/4-125 && x <= displayWidth*3/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
      gameMode = 3;
      startCircleTime = Date.now();
      startCircleGame();
      // circleMode();
    }
    if((x >= displayWidth-200 && x<= displayWidth-100)&&(y >= displayHeight/2+210 && y <= displayHeight/2+240)){
      mode = 1;
      gameMode = 4;
    }
  }
}
function keyboardMode(g){
//game layout
  g.background(255,255,255);
  g.textAlign(CENTER);
  g.push();
  g.fill(30,70,100);
  g.textSize(40);

  g.frameRate(60);
  // generateWord();
  // let drawing = new drawKeyboardGame(g);
  words = ["apple", "banana", "cherry", "date", "elderberry", "abundant", "benevolent", "cacophony", "divergent", "eccentric", "facetious", "gargantuan", "hapless", "ineffable", "juxtapose", "kindle", "luminous", "mellifluous", "nebulous", "object", "palimpsest", "worm"];
  currentWord = ""; // Index of the current letter being typed
  wordIndex = 0;
  nextWord(words, wordIndex);
  g.pop()
  }

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
    keyboardScore++;
    wordIndex++;
    keyboardGame.clear();
    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
    nextWord(words, wordIndex);
    ding.play();
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
  if(keyboardScore === keyHiScore){
    g.text("New High Score!\nYour Score: " + keyboardScore,GAMEBOARD_LEN/2,GAMEBOARD_HEIGHT/2 + 20);
  }else{
  g.text("Your score: " + keyboardScore, GAMEBOARD_LEN / 2, GAMEBOARD_HEIGHT / 2 + 20);
  }
  g.noLoop();
}
}

function keyPressed() {
  if (keyCode >= 65 && keyCode <= 90) { // Check if it's a valid letter key
    let currentLetter = currentWord[letterIndex];
    console.log(currentLetter + "-" +  key);
    if (key === currentLetter) {
      letterIndex++;
    }
    else{buzz.play();}
  }
}
function gameTimer(g){//   // Display keyboardScore and timer
  g.textSize(26);
  g.noStroke();
  g.fill(255);
  g.rect(0 ,5, 150 ,31);
  g.fill(0);
  g.text("Score: " + keyboardScore, 70, 30);
  remainingTime = max(timer + int((startKeyboardTime - Date.now()) / 1000), 0);
  g.fill(255);
  g.rect(GAMEBOARD_LEN/2-100,0,200,50);
  g.fill(0);
  g.text("High Score: " + keyHiScore, GAMEBOARD_LEN/2,30);
  g.fill(255,255,255);
  g.rect(GAMEBOARD_LEN - 101,5, 1000, 30);
  g.fill(0,0,0);
  g.text("Time: " + remainingTime, GAMEBOARD_LEN - 50, 30);

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
            //find coordinates for start and target
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
                collisions++;
              }

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

    function runTimer(){
      timeElapsed = (Date.now() - mazeStartTime) / 1000;
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

function endMaze(){
  mazeLevel = 1;
  mazeGame.background(0);
 if (timeElapsed < bestTime){
    bestTime = timeElapsed;
    mazeGame.fill(0,255,0);
    mazeGame.stroke(0,255,0);
    // mazeGame.text("NEW BEST TIME",GAMEBOARD_LEN/2,GAMEBOARD_HEIGHT/2-100);
     }
  mazeGame.fill(255,255,255);
  mazeGame.noStroke();
  mazeGame.text("Congratulations it took you " + timeElapsed + " seconds to complete the game! \n You made " + collisions + " mistake(s). Try Again?" , GAMEBOARD_LEN/2,GAMEBOARD_HEIGHT/2);
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
   createCircles(20,.4); // Create 10 circles for the game
 }

 function circleGameTimer(g){//   // Display score and timer
  g.textSize(26);
  g.noStroke();
  g.fill(0);
  g.rect(0 ,5, 150 ,31);
  g.fill(255);
  g.text("Score: " + circleScore, 70, 30);
  remainingTime = max(ceil(abs(startCircleTime - Date.now()) / 1000), 0);
  g.fill(0);
  g.rect(GAMEBOARD_LEN - 101,5, 1000, 30);
  g.fill(255);
  g.text("Time: " + remainingTime, GAMEBOARD_LEN - 50, 30);


}
let circleTimer = 20; //time left in seconds
let hasBlue = true;
let finishTime;
 function playCircleGame(g) {
  // g.background(48, 25, 52);      
   playing = true;
   if (!hasBlue) {//if there are no more blue circles
    // createCircles(5,.9);
    endGame();
    } else {
    hasBlue = false;
     for (let i = circles.length - 1; i >= 0; i--) { //for each circle
      let circle = circles[i];
      if(circle.isBlue){
        hasBlue = true;
      }
       circle.display(g);
      let d = dist(adjX, adjY, circle.x, circle.y);
       if (d < circle.radius / 2){
        if(!circle.isBlue){
          circle.isRed = true;
          buzz.play();
          errors++;
        }
        else if(mouseIsPressed) {
        circleScore++;
         circles.splice(i, 1); // Remove the clicked circle
         g.background(0,0,0);      
         ding.play();
       }
      }
     }
   }
 }
 
 function endGame() {
  circleGame.background(0);
   circles = [];
   cps = circleScore/remainingTime;
   if(cps >= bestCPS){
    bestCPS = cps;
    circleGame.fill(0,255,0);
    circleGame.stroke(0,255,0);
    circleGame.text("New High Score!", GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2-100);
   }
   // Your end game logic here
   // For example, show a game-over message.
   finishTime = remainingTime;
   circleGame.fill(255);
   circleGame.text("Game Over \nYou clicked "+ circleScore + " circles in " + finishTime + " seconds!\n Thats " + cps + " circles per second.\n" + "Errors: " + errors ,GAMEBOARD_LEN/2,GAMEBOARD_HEIGHT/2);
  //  circleGame.noLoop();
  playing = false;
 }
 
 const desiredSpacing = 2; // Adjust the desired spacing between circles
 
 function createCircles(num, perc) {
   for (let i = 0; i < num; i++) {
     let valid = false;
     let x, y, radius, isBlue;

     while (!valid) {
       valid = true;
       x = random(100, GAMEBOARD_LEN-50);
       y = random(100, GAMEBOARD_HEIGHT-100);
       radius = random(20, 50);
       isBlue = random() <= perc;


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
   constructor(x, y, radius, isBlue) {
     this.x = x;
     this.y = y;
     this.radius = radius;
     this.isBlue = isBlue;
     this.isRed = false;
   }

   display(g) {
     if (this.isBlue) {
       g.fill(0, 0, 255);
     }
     else if (this.isRed){
      g.fill(255,0,0);
     } else {
       g.fill(255);
     }
     g.ellipse(this.x, this.y, this.radius);
   }
 }

 //Credits
 
 
 function createCreditsGUI(){ //Credits GUI
  
      clear();
      background(48,25,52);
      fill(19,68,50);//dark green
      rect(0,0, displayWidth, 100);

     //Title
      fill(255,255,255);
      textSize(40);
      text("Credits", displayWidth/2, 35)

    //Credits
      fill(255);
      square(displayWidth/4-125, displayHeight/4-85,250);
      square((displayWidth)/2-125, displayHeight/4-85,250);
      square(displayWidth*3/4-125, displayHeight/4-85,250);
      square(displayWidth/2-325, displayHeight/2,250);
      square((displayWidth)/2+75, displayHeight/2,250);
      fill(0);
      textSize(20);
      text("Joshua Abraham",displayWidth/4-125, displayHeight/4,250);
      text("Joaquin Gentil Torres",(displayWidth)/2-125, displayHeight/4,250);
      text("Logan Jones",displayWidth*3/4-125, displayHeight/4,250);
      text("Austin Mesoke",displayWidth/2-325, displayHeight/2+100,250);
      text("Shivas Kumar",(displayWidth)/2+75, displayHeight/2+100,250);
      
 }


 function mousePressed(){
  if(gameMode == 1){
    return;
  }
  else if (gameMode == 2){
    let d = dist(player.relX,player.relY, playerX, playerY);
      if (d < player.r / 2) {
        dragging = true;
        player.offsetX = player.x - player.relX;
        player.offsetY = player.y - player.relY;
            }
            else{
              dragging = false;
            }
    // return;
    }
  else if (gameMode == 3){
    return;
  }
}

function mouseReleased(){
  if(gameMode == 1){
    return;
  }
  else if (gameMode == 2){
      dragging = false;
  } 
  else if (gameMode == 3){
    return;
  } 
 }

 function restartCircles(){
  circles = [];
  circleScore = 0;
  circleGame.background(0);
  hasBlue = true;
  errors = 0;
 }
