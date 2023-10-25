var mode = 0;
 //buttons
 var instructionExit;
 var restart;
//  backButton.position(100,displayHeight/2+200);
//  backButton.size(100,50);
//  backButton.mousePressed(back);

//  instructionExit = createButton("X");
//  instructionExit.size(25,25);
//  instructionExit.position(displayWidth/2-160, displayHeight/2-210);
//  instructionExit.mousePressed();

//  restartButton = createButton("Restart");
//  restartButton.size(100,50);
//  restartButton.position(displayWidth-200, displayHeight-200);
//  restartButton.mousePressed();

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  colorMode(RGB);
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
    createGameGui();
     
  }

  loadGame();
  
  
  
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


function createGameGui(){ //GAME GUI
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

  //instructions
  fill(48,25,52); //lightblue
  square(displayWidth/2-175, displayHeight/2-220, 350);
  fill(19,68,50);
  rect(displayWidth/2-175, displayHeight/2-220,350,75);
  fill(255);
  textSize(25);
  text("Instructions", displayWidth/2, displayHeight/2-200); //Instructions Title
  textSize(15);
  fill(255);
  text("Place Instructions Here:", displayWidth/2, displayHeight/2-100); //Instructions Text

  let backButton = createButton("Back");
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
    }

    //game 2
    if((x >= displayWidth/2-125 && x <= displayWidth/2+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
    }
    
    //game 3
    if((x >= displayWidth*3/4-125 && x <= displayWidth*3/4+125)&&(y >= displayHeight/3 && y <= displayHeight/3+250)) {
      mode = 1;
    }
  }
}

 function circleMode { 
    //instructions
  fill(80,160,205); //lightblue
  square(displayWidth/2-175, displayHeight/2-220, 350);
  fill(40,40,205);
  rect(displayWidth/2-175, displayHeight/2-220,350,75);
  fill(255);
  textSize(20);
  text("Welcome to Roundabout Revelary!", displayWidth/2, displayHeight/2-200); //Instructions Title
  textSize(15);
  fill(255);
  text("The objective of this game is to press all of the circles that are of a blue shade. A timer has been set to 20 seconds. Good Luck!", 
      displayWidth/2, displayHeight/2-100); //Circle Instructions 

      let mode = 0;
      let circles = [];
      let startTime;
      let gameDuration = 20; // Game duration in seconds
      let beginButton;
      
      function setup() {
        createCanvas(displayWidth - 20, displayHeight - 140);
        colorMode(RGB);
        createHomeGui();
      }
      
      function draw() {
        background(48, 25, 52);
      
        if (mode === 0) {
          createHomeGui();
        } else if (mode === 1) {
          createGameGui();
          if (circles.length === 0) {
            beginButton.show();
          }
          playCircleGame();
        }
      }
      function createGameGui() {
        // Your game screen GUI code here
        // ...
      }
      
      function startCircleGame() {
        mode = 1;
        createCircles(10); // Create 10 circles for the game
      }
      
      function beginCircleGame() {
        beginButton.hide();
      }
      
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
  
}  

