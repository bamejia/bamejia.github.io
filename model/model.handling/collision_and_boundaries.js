import { BOTTOM_BORDER, CANVAS, MAX_NUM_PLAYERS } from "/global_variables.js";

export default class CollisionAndBoundaries{
    constructor(){

    }

    check_collision(dynamicModel, other_dynamicModel){
        let step = 100;
        let current_width = 0;
        let current_length = 0;
        while(current_width <= dynamicModel.w){
            while(current_length <= dynamicModel.h){
                if(other_dynamicModel.x <= dynamicModel.x + current_width <= other_dynamicModel.x + other_dynamicModel.w &&
                        other_dynamicModel.y <= dynamicModel.y + current_length <= other_dynamicModel.y + other_dynamicModel.h){
                    return true;
                }
                if(current_length + step > dynamicModel.h && current_length != dynamicModel.h){
                    current_length = dynamicModel.h;
                }
                else{
                    current_length += step;
                }
            }
            current_length = 0;
            if(current_width + step > dynamicModel.w && current_width != dynamicModel.w){
                current_width = dynamicModel.w;
            }
            else{
                current_width += step;
            }
        }
        return false;
    }


    check_all_collision(dynamicModel, other_dynamicModels){
        let index_ignored = dynamicModel.index;
        let count = 0;
        while(count < len(other_dynamicModels)){
            if(count != index_ignored){
                if(check_collision(dynamicModel, other_dynamicModels[count])){
                    return other_dynamicModels[count];
                }
            }
            count += 1;
        }
        return null;
    }


    check_boundary(dynamicModel){
        if(dynamicModel.x < 0){
            dynamicModel.x = 0;
        }
        else if(dynamicModel.x + dynamicModel.w > CANVAS.W){
            dynamicModel.x = CANVAS.W - dynamicModel.w;
        }
        if(dynamicModel.y < -dynamicModel.h - 1){
            dynamicModel.y = -dynamicModel.h - 1;
        }
        if(dynamicModel.y < 0 && dynamicModel.modelType < MAX_NUM_PLAYERS){
            dynamicModel.y = 0;
        }
        if(BOTTOM_BORDER){
            if(dynamicModel.y + dynamicModel.h > CANVAS.H){
                dynamicModel.y = CANVAS.H - dynamicModel.h;
            }
        }
    }


    check_on_road(dynamicModel){
        if(dynamicModel.x > ROAD_X_PLACEMENT && dynamicModel.x + dynamicModel.w < ROAD_X_PLACEMENT + ROAD_W){
            return true;
        }
        return false;
    }
}