class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    p1 = createSprite(100,200);
    p1.addAnimation("p1",p1_Img);
    p2 = createSprite(100,200);
    p2.addAnimation("p2",p2_Img);
    p3 = createSprite(300,200);
    p3.addAnimation("p3",p3_Img);
    p4 = createSprite(100,200);
    p4.addAnimation("p4",p4_Img);
    players = [p1, p2, p3, p4];

    gun1 = createSprite(300,200)
    gun1.addImage(gun1_img)
    gun1.scale = 0.2;
   
  gun2 = createSprite(300,300)
  gun2.addImage(gun2_img)
  gun2.scale = 0.2;

    gun3 = createSprite(300,400)
    gun3.addImage(gun3_img)
    gun3.scale = 0.2;
 
    gun4 = createSprite(300,500)
    gun4.addImage(gun4_img)
    gun4.scale = 0.2;
   
    guns = [gun1 , gun2 , gun3 , gun4]
    
 

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, -displayWidth*4,0,displayWidth*10, displayHeight*5);

      //index of the array
      var index  = 0;

      //x and y position of the cars
      var x = 100 ;
      var y = 400;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
   
    x = 50 + allPlayers[plr].distance;
    y = 50 + (index * 150) + allPlayers[plr].xPos ;
        
       // p3.x = 70 + allPlayers[plr].distance;
        //p3.y = 50 + (index * 150) + allPlayers[plr].xPos ;
  
        gun3.x = 70 + allPlayers[plr].distance;
        gun3.y = 50 + (index * 150) + allPlayers[plr].xPos ;

     guns[index-1].x = players[index-1].x
     guns[index-1].y = players[index-1].y
        //position the cars a little away from each other in x direction
       // x = x + 200;
        //use data form the database to display the cars in y direction
      // y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
        if (index === player.index){
          players[index - 1].shapeColor = "red";
         
          camera.position.x = players[index-1].x
          camera.position.y = players[index-1].y;
        }
       
      }


    }

    
    if(player.distance < 2150){
      if(keyIsDown(38)  && player.index !== null){
          yVel += 0.9;
          y+= 10
         
          if(keyIsDown(37)){
              xVel -= 0.2;
              x-=10
            
          }
          if(keyIsDown(39)){
              xVel += 0.2;
              x+=10;

             
          }
      }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
          yVel -= 0.1;
          xVel /= 0.9;

        
          
      }else{
          yVel /= 0.985;
          xVel /= 0.985;

        
      }
    }
    
    if(keyIsDown(32)&& player.index === 1){
      b1 = createSprite(100,200)
      b1.x = gun1.x 
      b1.y =   gun1.y 
      b1.velocityX = 4
      b1.addImage(b)
      b1.scale = 0.2

    //  b2 = createSprite(100,400)
     // b2.velocityX = 2
     //b2.addImage(b)
      //b2.scale = 0.2

//      b3 = createSprite(100,500)
  //    b3.velocityX = 2
    //   b3.addImage(b)
      //  b3.scale = 0.2
      
//      b4 = createSprite(100,700)
  //    b4.velocityX = 2
    //  b4.addImage(b)
      //b4.scale = 0.2

      
    }
   
    if(keyIsDown(32)&& player.index === 2){
      b2 = createSprite(100,200)
      b2.x = gun2.x 
      b2.y =   gun2.y 
      b2.velocityX += 6
      b2.addImage(b)
      b2.scale = 0.2
    }
if( player.index === 3){
camera.x=p3.x
camera.y = p3.y
}

    if(keyIsDown(32)&& player.index === 3){
      b3 = createSprite(100,200)
      b3.x = gun3.x 
      b3.y =   gun3.y 
      b3.velocityX += 6
      b3.addImage(b)
      b3.scale = 0.2
     
    }
    if(keyIsDown(32)&& player.index === 4){
      b4 = createSprite(100,200)
      b4.x = gun4.x 
      b4.y =   gun4.y 
      b4.velocityX += 6
      b4.addImage(b)
      b4.scale = 0.2
    }
 // b2 = createSprite(100,400)
  //..b3 = createSprite(100,500)
  //b4 = createSprite(100,700)
   //bullets = [b1,b2,b3,b4]
    
  player.distance += yVel;
  yVel *= 0.98;
  player.xPos += xVel;
  xVel *= 0.985;
  player.update();
  //display sprites
  drawSprites();
}
   

}