var database;
var dogImg, happyDogImg, milkImg;
var dog, happyDog;
var foodObj;
var lastFed = "";
var stockFull = false;

function preload(){
    dogImg = loadImage("assets/Dog.png");
    happyDogImg = loadImage("assets/happydog.png");
    milkImg = loadImage("assets/Milk.png")
}

function setup(){
    var canvas = createCanvas(800,500);
    database = firebase.database();

    dog = createSprite(600,250);
    dog.addImage(dogImg);
    dog.scale = 0.2;

    foodObj = new Food();
    foodObj.getStock();

    var feedPet = createButton("Feed Shifu");
    var addFood = createButton("Restock Milk");

    feedPet.position(650, 80);
    addFood.position(750, 80);

    feedPet.mousePressed(()=>{
        stockFull = false;
        foodObj.deductFood();
        foodObj.updateStock(foodObj.foodStock);
    })

    addFood.mousePressed(()=>{
        if(foodObj.foodStock < 30){
            foodObj.foodStock += 1;
            foodObj.updateStock(foodObj.foodStock);
        } else {
            stockFull = true;
        }
    })

    database.ref("feedTime").on("value", function(snapshot){
        lastFed = snapshot.val();
    })

}

function draw(){
    background(46, 139, 87);
    drawSprites();
    
    if(foodObj.foodStock != undefined){
        foodObj.display();
    }
    if(lastFed != undefined){
        textSize(15);
        fill("white");
        text("Last Feed : " + lastFed, 200, 47);
    }
    if(foodObj.foodStock === 0){
        //console.log("Food Empty");
        textSize(25);
        fill("white");
        text("Stock is empty, please add more milk. Click on Restock to add food!", 20,100);
    }
    if(stockFull){
        //console.log("Food Empty");
        textSize(25);
        fill("white");
        text("Stock is FULL, CANNOT add more milk. Click on Feed to deduct food!", 10,100);
    }
}


