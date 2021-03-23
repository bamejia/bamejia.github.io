import Action from "/enum/action.js";
import Direction from "/enum/direction.js";

let gCount = 0;  //For testing

const ARROW_KEY_NAMES = new Map([
    ["ARROW_UP", "arrowup"],
    ["ARROW_RIGHT", "arrowright"],
    ["ARROW_DOWN", "arrowdown"],
    ["ARROW_LEFT", "arrowleft"]
]);
// {
//     ARROW_UP: "arrowup",
//     ARROW_RIGHT: "arrowright",
//     ARROW_DOWN: "arrowdown",
//     ARROW_LEFT: "arrowleft"
// };

export class KeyInputHandler{
    constructor(){
        this.keysDown = new Map();
        document.addEventListener("keydown", (event) =>{
            let key = event.key.toLowerCase();
            // this.keysDown[key] = key;
            this.keysDown.set(key, key);
            // alert(event.key);
            // this.keysDown.add(event.key);
        });
        document.addEventListener("keyup", (event) =>{
            // this.keysDown.delete(event.key);
            // this.keysDown = this.keysDown.filter(k => k != event.key);
            let key = event.key.toLowerCase();
            // this.keysDown[key] = null;
            this.keysDown.set(key, null);
        });
    }

    getDirection(){
        let chosenDirection = null;
        // let directionKeys = Object.values(this.keysDown).filter(
        //     key => Object.values(ARROW_KEY_NAMES).some(kName => key == kName)
        // );
        let directionKeys = [...this.keysDown.values()].filter(
            value => [...ARROW_KEY_NAMES.values()].some(kName => value == kName)
        );
        // let chosenDirections = [...this.keysDown]; 

        if(directionKeys.length == 1){
        // if(this.keysDown.length == 1){
            switch(directionKeys[0]){
                case ARROW_KEY_NAMES.get("ARROW_UP"):  // ArrowUp
                    chosenDirection = Direction.NORTH;
                    break;
                case ARROW_KEY_NAMES.get("ARROW_RIGHT"):  // ArrowRight
                    chosenDirection = Direction.EAST;
                    break;
                case ARROW_KEY_NAMES.get("ARROW_DOWN"):  // ArrowDown
                    chosenDirection = Direction.SOUTH;
                    break;
                case ARROW_KEY_NAMES.get("ARROW_LEFT"):  // ArrowLeft
                    chosenDirection = Direction.WEST;
                    break;
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
        let actionKeys = [...this.keysDown.values()];
        
        // if(gCount == 0) { console.log(this.keysDown);}
        // gCount = (gCount + 1) % 100;

        actionKeys.forEach((value) => {
            // if(gCount == 0) { console.log(key);}
            // gCount = (gCount + 1) % 100;
            switch(value){
                case "x":
                    actions.push(Action.BOOST);
                    break;
                case "z":
                    actions.push(Action.SHOOT);
                    break;
                case "s":
                    actions.push(Action.STOP);
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