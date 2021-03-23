import DynamicModelHandler from "/model/model.handling/model_handler.js";
import Player from "/model/player.js";
import Direction from "/enum/direction.js";

export default class GameModel{
    constructor(canvasWidth, canvasHeight){
        this.dynamicModels = [];
        this.player = new Player({x:200});  // Destructuring
        
        this.dynamicModels.push(this.player);
        
        this.staticModels = [];

        let numXIndexes = Math.floor(canvasWidth/this.player.w);
        let numYIndexes = Math.floor(canvasHeight/this.player.h);
        this.gameGrid = {  // Keeps the players' movements to the grid based of their width and height
            x: new Set(Array.from(Array(numXIndexes),(v,k)=>k*this.player.w)),
            y: new Set(Array.from(Array(numYIndexes),(v,k)=>k*this.player.h))
        }
    }
    update(input_direction, input_actions, deltaTime){

        let dmHandler = new DynamicModelHandler();
        dmHandler.dynamicModelHandling(this.player, this.dynamicModels, this.staticModels, 
            input_direction, input_actions, this.gameGrid, deltaTime);

        let models = {dynamic_models: this.dynamicModels, static_models: this.staticModels};
        return models;
    }
}