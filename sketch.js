
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var player,obstacle;
var playerImg;
var bgImg;
var zombie,zombieImg;
var zombieGroup;
var gameover = false;
var bullet;
var bulletImg;
var bulletG;
var gamOverImg;
var score = 0;

function preload(){
  playerImg = loadImage("nim437_5_man_shooting_rifle_person-512.webp");
  bgImg = loadImage("siluet2.jpg");
  zombieImg = loadImage("zombie-clipart-transparent.png");
  gamOverImg = loadImage("game_over_PNG55.png");
  bulletImg = loadImage("bullet-png-pictures-1.png");
}

function setup()
{
  createCanvas(1000,400);
  engine = Engine.create();
  world = engine.world;

  player = createSprite(100,250,45,55);
  player.addImage(playerImg);
  player.scale = 0.4;

  
  
 zombieGroup = new Group();
 bulletG = new Group();


}

function draw() 
{
  background(bgImg);
  fill("white");
  textSize(35);
  text("Score: "+score,50,50);

  
  fill("white");
  textSize(25);
  text("Bullets will have random height to make game more difficult",200,30);


  if(gameover === false){
  if(frameCount%50 === 0){
    zombie = createSprite(Math.round(random(300,800)),250,45,55);
    zombie.addImage(zombieImg)
    zombie.scale = 0.2;
    zombie.lifetime = 400;
    zombie.velocityX = -(frameCount/90*0.1)
    zombieGroup.add(zombie);
  }

  if(keyDown("space")){
    
    bullet = createSprite(player.x,200,15,15);
    bullet.y = Math.round(random(200,150));
    bullet.velocityX = 5;
    bullet.addImage(bulletImg);
    bullet.scale = 0.08
    bulletG.add(bullet);   
  }

bulletG.overlap(zombieGroup,hit);

  
}
  
  if(player.isTouching(zombieGroup)){
    gameover = true;
  }
  if(gameover){
    
    image(gamOverImg,width/2-120,height/2);
    player.destroy();
    zombieGroup.destroyEach();
    bulletG.destroyEach();
    console.log("game over");
  }

 drawSprites();
}

function hit(bullet,zombie){
     bullet.destroy();
     zombie.destroy();
     score = score+5;
     console.log("hited");
}

