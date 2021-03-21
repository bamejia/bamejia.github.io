import Action from "/enum/action.js";

export default class HUDView{
    constructor(gameView){
        this.gameView = gameView;
        this.boost_width = 5;
        this.boost_height = 5;
        this.max_boosts = 5;
    }

    drawHUD(dynamicModels){
        let boostsLeft = [...Array(dynamicModels[0].actionsLeft.get(Action.BOOST)).keys()];

        let boostX = this.gameView.width * 33 / 40;
        let boostY = this.gameView.height * 1 / 40;
        
        this.gameView.ctx.fillStyle = "#000000";
        this.gameView.ctx.fillRect(boostX - this.boost_width / 2, boostY - this.boost_height / 2, 
                    this.boost_width * 2 * this.max_boosts + this.boost_width / 2, this.boost_height + this.boost_height);

        this.gameView.ctx.fillStyle = "#ff0000";  // Hard code to be refactoredd
        for(let i of boostsLeft){
            this.gameView.ctx.fillRect(boostX + this.boost_width*2*i, boostY, this.boost_width, this.boost_height);
        }

    }
}