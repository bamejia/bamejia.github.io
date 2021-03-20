import Action from "/enum/action.js";
import Direction from "/enum/direction.js";

const ARROW_KEY_NAMES = {
    ARROW_UP: "arrowup",
    ARROW_RIGHT: "arrowright",
    ARROW_DOWN: "arrowdown",
    ARROW_LEFT: "arrowleft",
    S: "s"
};

export class KeyInputHandler{
    constructor(){
        this.keysDown = {};
        document.addEventListener("keydown", (event) =>{
            let key = event.key.toLowerCase();
            this.keysDown[key] = key;
            // alert(event.key);
            // this.keysDown.add(event.key); 
        });
        document.addEventListener("keyup", (event) =>{
            // this.keysDown.delete(event.key);
            // this.keysDown = this.keysDown.filter(k => k != event.key);
            let key = event.key.toLowerCase();
            this.keysDown[key] = null;
        });
    }

    getDirection(){
        let chosenDirection = null;
        let directionKeys = Object.values(this.keysDown).filter(
            key => Object.values(ARROW_KEY_NAMES).some(kName => key == kName)
        );
        // let chosenDirections = [...this.keysDown];
        if(directionKeys.length == 1){
            switch(directionKeys[0]){
                case ARROW_KEY_NAMES["ARROW_UP"]:  // ArrowUp
                    chosenDirection = Direction.NORTH;
                    break;
                case ARROW_KEY_NAMES["ARROW_RIGHT"]:  // ArrowRight
                    chosenDirection = Direction.EAST;
                    break;
                case ARROW_KEY_NAMES["ARROW_DOWN"]:  // ArrowDown
                    chosenDirection = Direction.SOUTH;
                    break;
                case ARROW_KEY_NAMES["ARROW_LEFT"]:  // ArrowLeft
                    chosenDirection = Direction.WEST;
                    break;
                // case ARROW_KEY_NAMES["S"]:
                //     chosenDirection = Dirction.NONE;
                //     break;
                default:
                    console.warn("Incorrect keys passed filter");
                    chosenDirection = Direction.NONE;
                    break;
            }
        // }else if(directionKeys.length == 2){
        //     switch(directionKeys[0]){
        //         case ARROW_KEY_NAMES["ARROW_UP"]:  // ArrowUp
        //             switch(directionKeys[1]){
        //                 case ARROW_KEY_NAMES["ARROW_RIGHT"]:  // ArrowRight
        //                     chosenDirection = Direction.NORTHEAST;
        //                     break;
        //                 case ARROW_KEY_NAMES["ARROW_LEFT"]:  // ArrowLeft
        //                     chosenDirection = Direction.NORTHWEST;
        //                     break;
        //                 default:
        //                     chosenDirection = Direction.NONE;
        //                     break;
        //             }
        //             break;
        //         case ARROW_KEY_NAMES["ARROW_RIGHT"]:  // ArrowRight
        //             switch(directionKeys[1]){
        //                 case ARROW_KEY_NAMES["ARROW_UP"]:  // ArrowUp
        //                     chosenDirection = Direction.NORTHEAST;
        //                     break;
        //                 case ARROW_KEY_NAMES["ARROW_DOWN"]:  // ArrowDown
        //                     chosenDirection = Direction.SOUTHEAST;
        //                     break;
        //                 default:
        //                     chosenDirection = Direction.NONE;
        //                     break;
        //             }
        //             break;
        //         case ARROW_KEY_NAMES["ARROW_DOWN"]:  // ArrowDown
        //             switch(directionKeys[1]){
        //                 case ARROW_KEY_NAMES["ARROW_RIGHT"]:  // ArrowRight
        //                     chosenDirection = Direction.SOUTHEAST;
        //                     break;
        //                 case ARROW_KEY_NAMES["ARROW_LEFT"]:  // ArrowLeft
        //                     chosenDirection = Direction.SOUTHWEST;
        //                     break;
        //                 default:
        //                     chosenDirection = Direction.NONE;
        //                     break;
        //             }
        //             break;
        //         case ARROW_KEY_NAMES["ARROW_LEFT"]:  // ArrowLeft
        //             switch(directionKeys[1]){
        //                 case ARROW_KEY_NAMES["ARROW_UP"]:  // ArrowUp
        //                     chosenDirection = Direction.NORTHWEST;
        //                     break;
        //                 case ARROW_KEY_NAMES["ARROW_DOWN"]:  // ArrowDown
        //                     chosenDirection = Direction.SOUTHWEST;
        //                     break;
        //                 default:
        //                     chosenDirection = Direction.NONE;
        //                     break;
        //             }
        //             break;
        //         default:
        //             console.warn("Incorrect keys passed filter")
        //             chosenDirection = Direction.NONE;
        //             break;
        //     }
        }else{
            chosenDirection = Direction.NONE;
        }
        return chosenDirection;
    }

    getActions(){
        let actions = [];
        let actionKeys = Object.values(this.keysDown);
        
        actionKeys.forEach(key => {
            switch(key){
                case "x":
                    actions.push(Action.BOOST);
                    break;
                case "z":
                    actions.push(Action.SHOOT);
                    break;
                default:
                    break;
            }
        });
        // console.log(this.keysDown);
        // console.log(actions);
        return actions;
    }
}