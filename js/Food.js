class Food{
    constructor(){
        this.foodStock = null;
        this.lastFed = null;
    }

    getStock(){
        database.ref("food").on("value", (snapshot)=>{
            console.log(snapshot.val());
            this.foodStock = snapshot.val();
        })
    }

    updateStock(stock){
        database.ref("/").update({
            food: stock
        })
    }

    deductFood(){
        if(this.foodStock > 0){
            dog.addImage(happyDogImg);
            this.foodStock -= 1;
            this.lastFed = hour();
            console.log(this.lastFed);
            if (int(this.lastFed) > 12) {
                this.lastFed = int(this.lastFed) - 12 + " PM";
            } else {
                this.lastFed = this.lastFed + " AM";
            }
            database.ref("/").update({
                feedTime: this.lastFed 
            })
        } 
    }

    display(){
        var x = 30;
        var y = 50;
        for(var i=0; i<this.foodStock; i++){
            if(i % 10 === 0){
                x = 30;
                y += 100;
            }
            image(milkImg, x, y, 40, 60);
            x += 30;
        }
    }
}