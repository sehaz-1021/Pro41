var dog,happyDog,database,foodS,foodStock;
var feedPet,addDog;
var fedTime,lastFed;
var foodObj;
var readState;
var gameState = 0;
foodS = 30;
var currentTime;
var bedroomImg,washroomImg,gardenImg,livingRoom;
function preload()
{
  //load images here
dogImg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");
bedroomImg = loadImage("images/BedRoom.png");
gardenImg = loadImage("images/Garden.png");
washroomImg = loadImage("images/WashRoom.png");
livingRoom = loadImage("images/LivingRoom.png");


}

function setup() {
  database = firebase.database();
    console.log(database);
   
  createCanvas(550,650);
  readState = database.ref('gameState');
   readState.on("value",function(data){
     gameState = data.val();
   });
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 dog =  createSprite(280,550,50,50);
 dog.addImage(dogImg); 
 dog.scale = 0.2;

 
 feed = createButton("Feed the Dog")
 feed.position(500,95);
 feed.mousePressed(feedDog)

 addFood = createButton("Add Food")
addFood.position(596,95);
addFood.mousePressed(addFoods);

}


function draw() {  
background("yellow");
foodObj.display();
writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDog);
  foodObj.visible = false;
}else{
  dog.addImage(dogImg);
foodObj.visible = true;
}




currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry");
  foodObj.display();
}


fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed : 12 AM ",350,30);
  }else{
    text("Last Feed : " + lastFed + "AM ",350,30);
  }



  if(gameState!="Hungry"){
   
    dog.remove();
  foodObj.hide();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

 if(gameState===1){
   dog.addImage(dogHappy);
   dog.scale=0.175;
  dog.y=250;

 } 

 if(gameState===2){
  dog.addImage(dogImg);
  dog.scale=0.175;
  foodObj.visible=false;
 dog.y=250;
 
} 


var bath = createButton("I want to take bath");
bath.position(580,125);
 
if(bath.mousePressed(function(){
  gameState=3
  database.ref('/').update({
   'gameState':gameState 
  })
}))
if(gameState === 3){
  dog.addImage(washroomImg);
  dog.scale = 0.3;
  foodObj.visible = false;
}


var sleep = createButton("I am very sleepy");
sleep.position(710,125);
 
if(sleep.mousePressed(function(){
  gameState=4
  database.ref('/').update({
   'gameState':gameState 
  })
}))
if(gameState === 4){
  dog.addImage(bedroomImg);
  dog.scale = 0.3;
  foodObj.visible = false;
}


var play = createButton("Let's play!!!");
play.position(500,160);
 
if(play.mousePressed(function(){
  gameState=5
  database.ref('/').update({
   'gameState':gameState 
  })
}))
if(gameState === 5){
  dog.addImage(livingRoom);
  dog.scale = 0.3;
  foodObj.visible = false;
}



var playinGarden = createButton("Let's play in park");
playinGarden.position(585,160);
 
if(playinGarden.mousePressed(function(){
  gameState=6
  database.ref('/').update({
   'gameState':gameState 
  })
}))
if(gameState === 6){
  dog.addImage(gardenImg);
  dog.scale = 0.3;
  foodObj.visible = false;
}











  drawSprites();
}

function readStock(data){

foodS = data.val();
foodObj.updateFoodStock(foodS);

}
function writeStock(x){
  
  database.ref("/").update({
    Food:x
  });
}


function feedDog(){

  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
database.ref('/').update({
  gameState:state
})
}