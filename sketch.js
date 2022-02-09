var balloon,balloonImage1,balloonImage2;
var bg;
var positions;
var database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);
  balloon = createSprite(500, 650, 50, 100);
  balloon.addAnimation('ballon_image', balloonImage2);
  balloon.scale = 0.3;
  var balloonPositions = database.ref('balloon/positions');
  balloonPositions.on('value', readPositions, showErrors);
}

// function to display UI
function draw() {
  background(bg);
  if(positions !== undefined) {
    if(keyDown('up')) {
      writePositions(0, -1);
    }
    if(keyDown('down')) {
      writePositions(0, +1);
    }
    if(keyDown('left')) {
      writePositions(-1, 0);
    }
    if(keyDown('right')) {
      writePositions(+1, 0);
    }
  }
  drawSprites();
}
function writePositions(x,y) {
  database.ref('balloon/positions').set({
    'x': positions.x + x,
    'y': positions.y + y   
  })
}
function readPositions(data) {
  positions = data.val();
  balloon.x = positions.x;
  balloon.y = positions.y;
}
function showErrors() {
  console.log('erro ao gerar a imagem');
}
