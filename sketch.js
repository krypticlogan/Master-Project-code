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
var userWord;

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  colorMode(RGB);
  backButton = createButton("Back");
//game boards - for display
  circleGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  mazeGame = createGraphics(GAMEBOARD_LEN, GAMEBOARD_HEIGHT);
  keyboardGame = createGraphics(GAMEBOARD_LEN,GAMEBOARD_HEIGHT);

  userInput = "";
  userWord = createDiv(userInput);


  // circleGame.background(0,0,0);
  circleMode(circleGame); 
  keyboard = new keyboardMode(keyboardGame);
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
      
      var display = createDiv(userInput);
      display.position(width/2,height/2);
      display.size(50,10);
      display.hide();
      displaying.push(display);
      for(let i = 0; i < displaying.length; i++){
        displaying[i].show();
      }
      
      if(userInput === word){
        wordIndex++;
        word = nextWord(words, wordIndex);
      }
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
  let drawing = new drawKeyboardGame(g);

  g.pop()

  }

//   var word;
//   var words;
//   var letterIndex;
//   var wordIndex;
// let userInput = "";
// let lastKey;
// let displaying = [];


  function drawKeyboardGame(g){
    // generateWord();
    letterIndex = 0; // Index of the current letter being typed
    words = ["apple", "banana", "cherry", "date", "elderberry"];
    
    var startTime = millis();
    var score = 0;
    var timer = 30;
    wordIndex = 0;

    // let word = words[wordIndex];
    word = nextWord(words, wordIndex);
    g.text(word, GAMEBOARD_LEN/2, GAMEBOARD_HEIGHT/2 + 70);

    //   // Display user input with appropriate colors
    // for (let i = 0; i < word.length; i++) {
    //   g.fill(i < letterIndex ? (lastKey === word[i]) ? color(0, 255, 0) : color(255, 0, 0) : color(0));
    //   g.text(word[i], GAMEBOARD_LEN / 2 - (word.length / 2 - i) * 20, GAMEBOARD_HEIGHT / 2 + 40);
    //   }

//       var userWord = createDiv(userInput);
      // userWord.position(GAMEBOARD_LEN/2,GAMEBOARD_HEIGHT/2);
      // userWord.size(20,5);
      // userWord.hide();
      // displaying.push(userWord);
      // for(let i = 0; i < displaying.length; i++){
      //   displaying[i].show();
      // }

        // Display score and timer
    g.textSize(16);
    g.fill(0);
    g.text("Score: " + score, 50, 20);
    let remainingTime = max(timer - int((millis() - startTime) / 1000), 0);
    g.text("Time: " + remainingTime, GAMEBOARD_LEN - 50, 20);

      // Check if the word is completed
    if (letterIndex >= word.length) {
      score++;
      wordIndex++;
      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
      currentWord = nextWord(words, wordIndex);
    }

      // Check for game over
  if (remainingTime <= 0) {
    g.background(220);
    g.textSize(32);
    g.fill(0);
    g.text("Game Over", GAMEBOARD_LEN / 2, GAMEBOARD_HEIGHT / 2 - 20);
    g.text("Your Score: " + score, GAMEBOARD_LEN / 2, GAMEBOARD_HEIGHT / 2 + 20);
    g.noLoop();
  }
}

  function nextWord(array, index){
    let wordIndex = index;
    let words = array;
    let word = words[wordIndex];
    return word; 
    
  }



// function keyPressed() {
//   let word = nextWord(words, wordIndex);
//   lastKey = key;
//   if (keyCode >= 65 && keyCode <= 90) { // Check if it's a valid letter key
//     let currentLetter = word[letterIndex];
//     if (key === currentLetter) {
//       letterIndex++;
//     }
//   }

// }
function keyPressed(){
  lastKey = key;
  userInput+=lastKey;
  letterIndex++;
  console.log(userInput);
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