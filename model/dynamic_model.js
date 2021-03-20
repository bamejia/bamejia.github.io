import Direction from "/enum/direction.js";

export default class DynamicModel{
    // x = 1;
    // y = 0;
    // w = 100;
    // h = 100;
    // xSpeed = 1;
    // ySpeed = 0;
    // color = "#ff00aa";

    constructor({x=50, y=50, w=50, h=50, xSpeed=0, ySpeed=0, topXSpeed=5, topYSpeed=5, 
                totalXSpeed=0, totalYSpeed=0, direction=Direction.NONE, currentActions=null, color="#ff00aa"}){
        if(this.constructor == DynamicModel){
            throw new Error(" Object of Abstract Class cannot be created");
        }else{
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.topXSpeed = topXSpeed;
            this.topYSpeed = topYSpeed;
            this.totalXSpeed = totalXSpeed;
            this.totalYSpeed = totalYSpeed;
            this.direction = direction;
            if(currentActions == null) {currentActions = new Map()}
            this.currentActions = currentActions;
            this.color = color;
        }
        
    }
    update(){
        throw new Error("Abstract Method has no implementation");
    }
    draw(ctx){
        throw new Error("Abstract Method has no implementation");
    }
}