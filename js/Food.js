 class Food{
    constructor(foodStock,lastFed){
        var options = {
            isStatic : true
        }
        
        this.image = loadImage("images/Milk.png");

     
    }
  updateFoodStock(foodStock){
this.foodStock = foodStock
  }
  getFedTime(lastFed){
this.lastFed = lastFed
  }
  deductFood(){
      if(this.foodStock > 0){
          this.foodStock = foodStock-1;
      }
  }
  getFoodStock(){
      return this.foodStock;
  }
  
    display(){
   var x = 80,y=100;
    imageMode(CENTER);
    //image(this.image,440,260,100,100);
    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++){
            if(i%10==0){
                x = 80;
                y = y+60;
            }
            image(this.image,x,y,70,70);
            x = x+35;
        }
    }

    }
    
    bedroom(){
        background(bedroomImg,550,500);
    }
    
    garden(){
        background(gardenImg,550,500);
    }
    
    washroom(){
        background(washroomImg,550,500);
    }
    
}