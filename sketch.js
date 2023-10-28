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

    //instructions
  // fill(80,160,205); //lightblue
  // square(displayWidth/2-175, displayHeight/2-220, 350);
  // fill(40,40,205);
  // rect(displayWidth/2-175, displayHeight/2-220,350,75);
  // fill(255);
  // textSize(20);
  

  // let title = text("Welcome to Roundabout Revelary!" /*,displayWidth/2, displayHeight/2-200*/); //Instructions Title
  // // textSize(15);
  // // fill(255);
  // let description = text("The objective of this game is to press all of the circles that are of a blue shade.\n A timer has been set to 20 seconds. \nGood Luck!" 
  //     /*,displayWidth/2, displayHeight/2-100*/); //Circle Instructions 
  //     let circles = [];
  //     var startTime;
  //     let gameDuration = 20; // Game duration in seconds
  //     // let beginButton;
      
  //       // if (mode === 0) {
  //       //   createHomeGui();
  //       // } else if (mode === 1) {
  //         // createGameGui();
  //         // if (circles.length === 0) {
  //         //   beginButton.show();
  //         // }
  //         playCircleGame();
}
      
      // function startCircleGame() {
      //   mode = 1;
      //   createCircles(10); // Create 10 circles for the game
      // }
      
      // function beginCircleGame() {
      //   beginButton.hide();
      // }
      
      function playCircleGame() {
        let currentTime = (millis() - startTime) / 1000; // Calculate elapsed time in seconds
        if (currentTime >= gameDuration) {
          endGame();
        } else {
          for (let i = circles.length - 1; i >= 0; i--) {
            let circle = circles[i];
            circle.display();
            let d = dist(mouseX, mouseY, circle.x, circle.y);
            if (d < circle.radius / 2 && circle.isBlue) {
              circles.splice(i, 1); // Remove the clicked circle
            }
          }
        }
      }
      
      function endGame() {
        mode = 0;
        circles = [];
        // Your end game logic here
        // For example, show a game-over message.
      }
      
      function createCircles(num) {
        for (let i = 0; i < num; i++) {
          let x = random(width);
          let y = random(height);
          let radius = random(20, 50);
          let isBlue = random() < 0.5; // 50% chance of being blue
          circles.push(new Circle(x, y, radius, isBlue));
        }
      }
      
      class Circle {
        constructor(x, y, radius, isBlue) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.isBlue = isBlue;
        }
      
        display() {
          if (this.isBlue) {
            fill(0, 0, 255);
          } else {
            fill(255);
          }
          ellipse(this.x, this.y, this.radius);
        }
      }

