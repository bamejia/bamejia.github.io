import DynamicModelHandler from "/model/model.handling/model_handler.js";
import Player from "/model/player.js";
import Direction from "/enum/direction.js";

export default class GameModel{
    constructor(){
        this.dynamicModels = [];
        this.player = new Player({x:200});  // Destructuring
        
        this.dynamicModels.push(this.player);
        
        this.staticModels = [];
    }
    update(input_direction, input_actions, deltaTime){

        let dmHandler = new DynamicModelHandler();
        dmHandler.dynamicModelHandling(this.player, this.dynamicModels, this.staticModels, input_direction, input_actions, deltaTime);

        let models = {dynamic_models: this.dynamicModels, static_models: this.staticModels};
        return models;
    }
}