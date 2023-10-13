var mode = 0;

function setup() {
  createCanvas(displayWidth-20, displayHeight-140);
  colorMode(RGB);
}
function draw() {
  background(80,160,205);
  if(mode == 0){
    createHomeGui();
  }
  else{
    createGameGui();
  }
  
}

function createHomeGui() { //HOME GUI
  //header
  fill(40,40,205);//dark blue
  rect(0,0,displayWidth, 100);

  //Title
  fill(255,255,255);
  textAlign(CENTER, TOP);
  textSize(40);
  text("Home", displayWidth/2, 30);

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
  text("App 1", displayWidth/4, displayHeight/3 + 280);
  text("App 2", displayWidth/2, displayHeight/3 + 280);
  text("App 3", displayWidth*3/4, displayHeight/3 + 280);
}


function createGameGui(){ //GAME GUI
  //header
  fill(40,40,205);//dark blue
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
  fill(80,160,205); //lightblue
  square(displayWidth/2-175, displayHeight/2-220, 350);
  fill(40,40,205);
  rect(displayWidth/2-175, displayHeight/2-220,350,75);
  fill(255);
  textSize(25);
  text("Instructions", displayWidth/2, displayHeight/2-200);
  // textSize(15);
  // fill(255);
  // text("Place Instructions Here", displayWidth/2, displayHeight/2-250);

  //buttons
  var backButton;
  var instructionExit;
  var restart;

  backButton = createButton("Back");
  backButton.size(100,50);
  backButton.position(100,displayHeight-200);
  backButton.mousePressed();

  // instructionExit = createButton("Back");
  // backButton.size(100,50);
  // backButton.position(100,displayHeight-200);
  // backButton.mousePressed();
}

function mousePressed(){//changes mode when mouse is pressed
  if (mode==0) {
    mode=1;
  } else{mode = 0;}

  
}

