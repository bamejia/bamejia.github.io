import HUDView from "/view/hud_view.js";
import { DYNAMIC_MODEL_TYPE, DYNAMIC_IMAGE_PATH } from "/global_variables.js";
// import { DYNAMIC_IMAGE_PATH } from "/global_variables.js";
// import * as ThinkPhp from "https://github.com/thinkphp/rotate.git";

export default class GameView{
    constructor(CANVAS_WIDTH, CANVAS_HEIGHT){
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
        
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "game-screen");
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);

        let body = document.getElementById("game-body");
        body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        // dynamic model images
        this.image = new Image();
        this.image.src = DYNAMIC_IMAGE_PATH.get(DYNAMIC_MODEL_TYPE.PLAYER_1);
        
        let rotateAngle = 180;

        // ThinkPhp.Rotate(this.image, Math.PI/2);

        // this.image.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");

        // this.ctx.rotate(Math.PI/2);
        // rotateAngle = rotateAngle + 90;

        this.dynamicModelImages = [];

        this.hudView = new HUDView(this);
    }
    draw(dynamicModels, staticModels){
        this.ctx.clearRect(0, 0, this.width, this.height);

        // // Draws all static models
        // staticModels.forEach(model =>{
        //     this.ctx.fillStyle = model.color;
        //     this.ctx.fillRect(model.x, model.y, model.w, model.h);
        // });

        let index = staticModels.length;
        while(index--){
            let model = staticModels[index];
            this.ctx.fillStyle = model.color;
            this.ctx.fillRect(model.x, model.y, model.w, model.h);
        }

        // Draws all dynamic models
        dynamicModels.forEach(model => {
            this.ctx.fillStyle = model.color;
            this.ctx.fillRect(model.x, model.y, model.w, model.h);
            // this.ctx.drawImage(this.image, model.x, model.y, model.w, model.h);
        });

        this.hudView.drawHUD(dynamicModels);

    }
}