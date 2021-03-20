import DynamicModelHandler from "/model/dynamic.model.handling/dynamic_model_handler.js";
import Player from "/model/player.js";
import Direction from "/enum/direction.js";

export default class GameModel{
    constructor(){
        this.dynamicModels = [];
        this.player = new Player({x:200});  // Destructuring
        
        this.dynamicModels.push(this.player);
    }
    update(direction, input_actions, deltaTime){
        if(direction != Direction.NONE){
            this.player.direction = direction;
        }

        let dmHandler = new DynamicModelHandler();
        dmHandler.dynamicModelHandling(this.player, this.dynamicModels, input_actions, deltaTime);

        return this.dynamicModels;
    }
}