var canvas, backgroundImage;

var gameState = 0,finishedPlayers;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var p1,p2,p3,p4,players;
var track,p1_img,p2_img,p3_img,p4_img;
var gun1,gun2,gun3,gun4 ,guns, gun1_img , gun2_img , gun3_img , gun4_img ,
 b1,b2,b3,b4,bullets 
var g,f2, s1, b;
var passedFinish
var gold,b,s;

function preload()
{

  track = loadImage("b.png")
  p1_Img = loadAnimation("Capture1.png","Capture3.png","Capture4.png")
  p2_Img = loadAnimation("Capture1.png","Capture3.png","Capture4.png")
  p3_Img = loadAnimation("Capture1.png","Capture3.png","Capture4.png")
  p4_Img = loadAnimation("Capture1.png","Capture3.png","Capture4.png")
   gun1_img  = loadImage("t.png")
   gun2_img  = loadImage("t.png")
   gun3_img  = loadImage("t.png")
   gun4_img  = loadImage("t.png")
   b = loadImage("bu.png")
}

function setup() {
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();

  gameState = 0;
  distance = 0;

  yVel = 0;
  xVel = 0;

 finishedPlayers = 0
 
 // obstacles = createGroup()

  xSet = false;
 
  game = new Game();
  game.getState();
  game.start();

 // for(i = 0; i <5;i++){
   // w = random(200,950)
  //h = random(-height*4,height-300)
 //f1 = createSprite(w,h)
 //f1.addImage("obstacle",f2)
//}
}

function draw() {
 //start the game
 background(200, 200, 255);


 //start the game
 if (playerCount === 4 ) {
   game.update(1);
 }

 //start the game for real
 if (gameState === 1) {
   game.play();

 }
 if (gameState === 2) {
   console.log("End");
 }

 if(playerCount === 4 && finishedPlayers === 0){
  game.update(1)
}

if(finishedPlayers === 4){
  game.update(2)

}

if(gameState === 2  && finishedPlayers === 4){
game.displayRanks()
}
}