import Direction from "/enum/direction.js";
import Action from "/enum/action.js";


// W: 1024,
// H: 768,
export const CANVAS = {
    NAME: "FL Tron",
    X: 300,
    Y: 100,
    W: 800,
    H: 600,
    W_RATIO: 5/8,
    H_RATIO: 7/8
}


export const DYNAMIC_MODEL_TYPE = {
    PLAYER_1: 0,
    PLAYER_2: 1
}

export const MAX_NUM_PLAYERS = 2;

export const DYNAMIC_MODEL_INDEX = new Map(
    Object.entries(DYNAMIC_MODEL_TYPE).map(model_type =>
        [model_type[1], model_type[0]]
    )
);

export const DYNAMIC_IMAGE_PATH = new Map([
    [DYNAMIC_MODEL_TYPE.PLAYER_1, "/dynamic.model.images/red car exotic.png"],
    [DYNAMIC_MODEL_TYPE.PLAYER_2, "/dynamic.model.images/true beauty.jpg"]
])

// W: 160,
// H: 80,

// Default Player Values
export const PLAYER_DEFAULT = {
    X: 40,
    Y: 40,
    W: 10,  //40   //22
    H: 10,

    X_SPEED: 0,
    Y_SPEED: 0,
    TOP_X_SPEED: 10,
    TOP_Y_SPEED: 10,
    TOTAL_X_SPEED: 0,
    TOTAL_Y_SPEED: 0,

    DIRECTION: Direction.STOP,
    CURRENT_ACTIONS: new Map(),
    COLOR: "#ff0099",
    MODEL_TYPE: DYNAMIC_MODEL_TYPE.PLAYER_1,
    ACTIONS_LEFT: new Map([[Action.BOOST, 3], [Action.SHOOT, 5]])
}

export const ACTION_LENGTH = new Map(
    Object.values(Action).map(action => {
        switch(action){
            case Action.BOOST:
                return [action, 50];
            default:
                return [action, 50];
        }
    })
);

export const PLAYER_TRAIL_DEFAULT = {
    X: PLAYER_DEFAULT.X,
    Y: PLAYER_DEFAULT.Y,
    W: PLAYER_DEFAULT.W,
    H: PLAYER_DEFAULT.H,

    COLOR: "#ff00aa", //PLAYER_DEFAULT.COLOR,
    MODEL_TYPE: PLAYER_DEFAULT.MODEL_TYPE,
    DIRECTION: PLAYER_DEFAULT.DIRECTION
}

// For Testing
export const BOTTOM_BORDER = true;