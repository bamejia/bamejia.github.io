import { CANVAS } from "/global_variables.js";
import {KeyInputHandler} from "/input/key_input.js"
import GameModel from "/model/game_model.js";
import GameView from "/view/game_view.js";


// const CANVAS_WIDTH = 800;
// const CANVAS_HEIGHT = 600;

export default class Controller{

    constructor(){
        this.keyInputHandler = new KeyInputHandler();
        this.model = new GameModel();
        this.view = new GameView(CANVAS.W, CANVAS.H);
        this.lastTime = 0;
    }

    async run(){
        window.requestAnimationFrame((timestamp) => {
            this.gameloop(timestamp, this)
        });
    }

    gameloop(timestamp, controller){
        let deltaTime = timestamp - controller.lastTime;
        controller.lastTime = timestamp;
        
        let models = controller.model.update(controller.keyInputHandler.getDirection(), controller.keyInputHandler.getActions(), deltaTime);
        controller.view.draw(models["dynamic_models"], models["static_models"]);

        window.requestAnimationFrame((timestamp) => {
            controller.gameloop(timestamp, controller);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}