import { PLAYER_TRAIL_DEFAULT } from "/global_variables.js";
import StaticModel from "/model/static_model.js";

export default class PlayerTrail extends StaticModel{
    constructor({x=PLAYER_TRAIL_DEFAULT.X, y=PLAYER_TRAIL_DEFAULT.Y, w=PLAYER_TRAIL_DEFAULT.W, h=PLAYER_TRAIL_DEFAULT.H, 
        color=PLAYER_TRAIL_DEFAULT.COLOR, modelType=PLAYER_TRAIL_DEFAULT.MODEL_TYPE, direction=PLAYER_TRAIL_DEFAULT.DIRECTION}){
        
        super({x:x, y:y, w:w, h:h, color:color});
        
        this.modelType = modelType;
        this.direction = direction;
    }
}