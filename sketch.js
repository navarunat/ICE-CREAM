var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup,cloudImage;
var ObstaclesGroup,Obstacle1 ,Obstacle2 ,Obstacle3 ,Obstacle4 ,Obstacle5, Obstacle6 ;
var score;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  Obstacle1=loadImage("obstacle1.png")
  Obstacle2=loadImage("obstacle2.png")
  Obstacle3=loadImage("obstacle3.png")
  Obstacle4=loadImage("obstacle4.png")
  Obstacle5=loadImage("obstacle5.png")
  Obstacle6=loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup=new Group();
  ObstaclesGroup=new Group();
  score=0;
}

function draw() {
  background(220);
  score=score+Math.round(getFrameRate()/60)
  text("score"+score,500,50)
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloudsGroup.add(cloud)
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var Obstacle = createSprite(600,165,10,40);
    Obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){ 
      case 1:Obstacle.addImage(Obstacle1) ;
      break;
      case 2:Obstacle.addImage(Obstacle2) ;
      break;
      case 3:Obstacle.addImage(Obstacle3) ;
      break;
      case 4:Obstacle.addImage(Obstacle4) ;
      break;
      case 5:Obstacle.addImage(Obstacle5) ;
      break; 
      case 6:Obstacle.addImage(Obstacle6) ;
      break;
      default:break;
    }
    ObstaclesGroup.add(Obstacle)
    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.5;
    Obstacle.lifetime = 100;
  }
}