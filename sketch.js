var oceanImg, ocean;
var coinImg, coin, coinsGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);

  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  // frog.debug = true;
  
  coinsGroup = new Group();
  climbersGroup = new Group();

}

function draw(){
  background(0);
  
  drawSprites(); 
  if (gameState === "play") {
    ocean.setVelocity(0,1);

    textSize(25);
    fill("red");
    text("Score: " + score, 220, 50);

    if(keyDown("left_arrow")){
      frog.x -= 3
    }

    if(keyDown("right_arrow")){
      frog.x += 3
    }

    if(keyDown("space")){
      frog.velocityY = -5
    }

    frog.velocityY += 0.6;

    spawnCoin();

    if(climbersGroup.isTouching(frog)){
      frog.velocityY = 0;
    }

    if(coinsGroup.isTouching(frog)){
      coinsGroup.destroyEach();
      score +=1;
    }

    if(frog.y > 450){
      frog.destroy();
      gameState = "end";
    }

  }   


  if (gameState === "end"){  
    climbersGroup.destroyEach();
    coinsGroup.destroyEach();

    ocean.velocityY = 0;

    textSize(50);
    fill("yellow");
    text("Game Over", 150, 230);
  }

  if(ocean.position.y > 300){
    ocean.position.y = height/2;
  }

}

function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    coin = createSprite(300,-70);
    coin.addImage("coin",coinImg);
    coin.scale = 0.1;
    coin.x = Math.round(random(120, 400));
    coin.velocityY = 1;
    coin.lefetime = 460;
    coinsGroup.add(coin);
    // coin.debug = true;

    climber = createSprite(300,-10);
    climber.addImage("climber",climberImg);
    climber.scale = 0.4;
    climber.x = coin.x;
    climber.velocityY = 1;
    climber.lefetime = 460;
    climbersGroup.add(climber);
    climber.setCollider("rectangle", 0, 0, 500, 50);
    // climber.debug = true;
   
  }
} 