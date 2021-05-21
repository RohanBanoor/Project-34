var dog, dogIMG, happyDog
var database
var foodS, foodStock

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250, 300);
  dog.addImage(dogIMG);
  dog.scale = 0.20;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() { 
  background(46, 139, 87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
}

  drawSprites();

  stroke("black");
  fill("white");
  text("Food Remaining: " + foodS, 190,190);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}


