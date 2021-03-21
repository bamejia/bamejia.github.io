export default class StaticModel{
    
    constructor({x=50, y=50, w=50, h=50, color="#ff00aa"}){

        if(this.constructor == StaticModel){
            throw new Error("Object of Abstract Class cannot be created");
        }else{
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = color;
        }
        
    }
}