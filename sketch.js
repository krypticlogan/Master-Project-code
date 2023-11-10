var mode = 0;
var gameMode = 0;
var circleGame, mazeGame, keyboardGame;
const GAMEBOARD_LEN = 1250;
const GAMEBOARD_HEIGHT = 500;
 //buttons
 var instructionExit;
 var restart;
var keyboard, maze, circleG;
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
let startTime;
let score = 0;
let timer = 30;
let remainingTime;

// let currentWord = "";
// let wordIndex = 0;
// let letterIndex = 0;
// let startTime;
// let score = 0;
// let timer = 30;

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  colorMode(RGB);
  backButton = createButton("Back");
//game boards - for display
  circleGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  mazeGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  keyboardGame = createGraphics(GAMEBOARD_LEN,GAMEBOARD_HEIGHT);

  userInput = "";
  startTime = millis();




  // circleGame.background(0,0,0);
  circleMode(circleGame); 
  keyboard = new keyboardMode(keyboardGame);
  mazeMode(mazeGame);

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
    
    case 1: 
    // startTime = millis();

   
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
    console.log(currentLetter + "-" +  key);
    if (key === currentLetter) {
      letterIndex++;
      console.log(key + " correct" )
    }
  }
}


function gameTimer(g){//   // Display score and timer
  g.textSize(16);
  g.fill(0);
  g.text("Score: " + score, 70, 20);
  remainingTime = max(timer - int((millis() - startTime) / 1000), 0);
  g.fill(255,255,255);
  g.noStroke();
  g.rect(GAMEBOARD_LEN - 101,5, 1000,20);
  g.fill(0,0,0);
  g.text("Time: " + remainingTime, GAMEBOARD_LEN - 50, 20);


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

//maze game starts here
var red = (170,0,0);
var white = (255,255,255);

function createPlayer(g){
  let x = GAMEBOARD_LEN/2;
  let y = GAMEBOARD_HEIGHT/2+150;
  let size = 20
  let color = white;

  g.fill(255,255,255);//white
  let player = g.circle(x,y,size);

  function changeX(newX){
    x = newX;
  }

  function changeY(newY){
    y=newY;
  }

  function changeColor(newColor){
    color = newColor;
  }

  // function isSelected(){
  //   if(mouseIsPressed()){

  //   if((mouseX >= x - 10 && mouseX < x  + 10) && (mouseY > y - 10 && mouseY < y + 10)){
  //     return true;
  //   }else{
  //     return false;}
  // }
  // }

}
function mazeMode(g){
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);

  let player = createPlayer(g);

  // if(player.isSelected()){
  //   // player.changeX(mouseX);
  //   // player.changeY(mouseY);
  //   return;
  // } 
  


  //game logic starts here

  // player.create();
  // g.text(player.idk,GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2);
}



  
//maze game ends here



 function circleMode(g) {
  g.textAlign(CENTER);
  g.push();
  g.background(0,0,0);
  g.fill(30,70,100);
  g.textSize(20);
  g.text("CIRCLES HERE", GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2);
 }