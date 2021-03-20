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
    X: 50,
    Y: 50,
    W: 40,
    H: 22,

    X_SPEED: 0,
    Y_SPEED: 0,
    TOP_X_SPEED: 16,
    TOP_Y_SPEED: 16,
    TOTAL_X_SPEED: 0,
    TOTAL_Y_SPEED: 0,

    DIRECTION: Direction.NONE,
    CURRENT_ACTIONS: new Map(),
    COLOR: "#ff00aa",
    MODEL_TYPE: DYNAMIC_MODEL_TYPE.PLAYER_1,
    ACTIONS_LEFT: new Map([[Action.BOOST, 3], [Action.SHOOT, 3]])
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

// For Testing
export const BOTTOM_BORDER = true;