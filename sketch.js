var trex, trex_running, trex_collide
var ground, ground_image
var invisible_ground, cloud_image


var obstacle1 
var obstacle2 
var obstacle3 
var obstacle4 
var obstacle5 
var obstacle6 

var cactusGroup,cloudsGroup 

var play = 1
var end  = 0
var gameState = play

var restart, restart_image
var gameover, gameover_image

var checkpoint
var die
var jump

var score = 0
var high_score = 0

function preload() {
  trex_running = loadAnimation("trex1.png" , "trex3.png" , "trex4.png")
  trex_collide = loadAnimation("trex_collided.png")
  ground_image = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  restart_image = loadImage("restart.png")
  gameover_image = loadImage("gameOver.png")
  
  checkpoint= loadSound("checkPoint.mp3")
  die = loadSound ("die.mp3")
  jump = loadSound ("jump.mp3")
}





function setup() {
  createCanvas(600, 200);
  trex = createSprite (35, 171, 10, 10);
  trex.addAnimation ("trexrun" , trex_running)
  trex.addAnimation ("trex_collide", trex_collide)
  trex.scale = 0.4;
  
  ground = createSprite (300, 180, 600, 20);
  ground.addImage (ground_image)
  ground.velocityX = -4;
  
  invisible_ground = createSprite (300, 185, 600, 5);
  invisible_ground.visible = false;
 
  cactusGroup = new Group()
  cloudsGroup = new Group()  
  
  restart = createSprite (300, 100, 10, 10);
  restart.addImage (restart_image)
  restart.scale = 0.5 
  
  gameover = createSprite (300, 50, 10, 10);
  gameover.addImage (gameover_image)
  
  
  
  
}

function draw() {
  background(245);
  
  trex.collide (invisible_ground); 
  
  textFont("georgia")
  text("Score: " + score, 30, 30, )
  
  text("High Score: " + high_score, 90, 30)
 
  if (gameState === play) {
    if (ground.x < 0) {
    ground.x = 300;
  }
    
    if (score% 100==0 && score > 0) {
      checkpoint.play();
    }
    
    ground.velocityX = -4;
    
    score= score + Math.round(getFrameRate() / 60)
    
    if (keyDown("space") && trex.y > 163) {
    trex.velocityY = -10;
      jump.play()
  }
    trex.velocityY = trex.velocityY + 0.5;
    spawnclouds();
    spawncactus();
    
    if (trex.isTouching(cactusGroup)) {
      gameState = end; 
      die.play()
    }
    
    restart.visible = false;
    gameover.visible = false;
  }
  
  else if (gameState === end) {
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("trex_collide", trex_collide)
    
    cactusGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach (0);
    
    cactusGroup.setLifetimeEach (-1);
    cloudsGroup.setLifetimeEach (-1);
    
    restart.visible = true;
    gameover.visible = true;
    
    if (score > high_score) {
      high_score = score
    }
    
  if (mousePressedOver(restart)){
      cactusGroup.destroyEach();
    cloudsGroup.destroyEach();
    trex.changeAnimation("trexrun" , trex_running)
    score = 0
      gameState = play
    }
    
  }

  drawSprites();
}

function spawnclouds() {
  if (frameCount % 60 == 0) {
    var clouds = createSprite (610, random(50, 100), 10,10);
    clouds.velocityX = -4;
    clouds.addImage(cloud_image);
    clouds.scale = 0.5;
    clouds.lifetime = 170;
    clouds.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloudsGroup.add(clouds);
  } 
}

function spawncactus() {
  if (frameCount % 80 == 0) {
    var cactus = createSprite (610, 170, 5, 5);
    cactus.velocityX = -4; 
    cactus.scale = 0.5;
    cactus.lifetime = 170;
    var choice =Math.round( random (1, 6));
    switch(choice) {
      case 1:cactus.addImage(obstacle1);
        break
        case 2:cactus.addImage(obstacle2);
        break
        case 3:cactus.addImage(obstacle3);
        break
        case 4:cactus.addImage(obstacle4);
        break
        case 5:cactus.addImage(obstacle5);
        break
        case 6:cactus.addImage(obstacle6);
        break
         }
        cactusGroup.add(cactus);
  }
}








