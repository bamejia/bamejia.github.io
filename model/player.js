import DynamicModel from "/model/dynamic_model.js";
import Direction from "/enum/direction.js";
import {PLAYER_DEFAULT, DYNAMIC_MODEL_TYPE} from "/global_variables.js"

export default class Player extends DynamicModel{
    constructor({x=PLAYER_DEFAULT.X, y=PLAYER_DEFAULT.Y, w=PLAYER_DEFAULT.W, h=PLAYER_DEFAULT.H, 
                xSpeed=PLAYER_DEFAULT.X_SPEED, ySpeed=PLAYER_DEFAULT.Y_SPEED, 
                topXSpeed=PLAYER_DEFAULT.TOP_X_SPEED, topYSpeed=PLAYER_DEFAULT.TOP_Y_SPEED, 
                totalXSpeed=PLAYER_DEFAULT.TOTAL_X_SPEED, totalYSpeed=PLAYER_DEFAULT.TOTAL_Y_SPEED, 
                direction=PLAYER_DEFAULT.DIRECTION, currentActions=PLAYER_DEFAULT.CURRENT_ACTIONS, 
                modelType=DYNAMIC_MODEL_TYPE.PLAYER_1, color=PLAYER_DEFAULT.COLOR}){
        
        super({x:x, y:y, w:w, h:h, xSpeed:xSpeed, ySpeed:ySpeed, topXSpeed:topXSpeed, 
                topYSpeed:topYSpeed, totalXSpeed:totalXSpeed, totalYSpeed:totalYSpeed, 
                direction:direction, currentActions:currentActions, color:color});
        
        this.modelType = modelType;
    }

    update(direction, commands){
        
        this.direction = direction;

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}