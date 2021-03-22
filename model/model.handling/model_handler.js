import Action from "/enum/action.js";
import Direction from "/enum/direction.js";
import CollisionAndBoundaries from "/model/model.handling/collision_and_boundaries.js";
import {ACTION_LENGTH} from "/global_variables.js";
import PlayerTrail from "/model/player_trail.js";

let gCount = 0;

export default class ModelHandler{

    constructor(){
        this.cb = new CollisionAndBoundaries();
    }

    dynamicModelHandling(dynamicModel, dynamicModels, staticModels, input_direction, input_actions, deltaTime){

        // Sets delta x and delta y (xSpeed and ySpeed) based on directions chosen by the player
        this.directionHandler(dynamicModel, input_direction);

        // Adjusts delta x and delta y according to time passed
        dynamicModel.xSpeed /= deltaTime;
        dynamicModel.ySpeed /= deltaTime;
        
        // Checks to see what actions were chosen by the player
        this.actionHandler(dynamicModel, input_actions, deltaTime);

        // Sets the trail a player leaves behind
        this.playerTrailHandler(dynamicModel, staticModels);

        // Updates dynamic model's location
        dynamicModel.x += dynamicModel.xSpeed;
        dynamicModel.y += dynamicModel.ySpeed;

        this.collision_and_boundary_handler(dynamicModel, dynamicModels)
    }

    directionHandler(dynamicModel, input_direction){
        if(input_direction != Direction.getOpposite(dynamicModel.direction)){
            if(input_direction != Direction.NONE){ dynamicModel.direction = input_direction; }
        }
        switch(dynamicModel.direction){
            case Direction.NORTH:
                dynamicModel.ySpeed = -dynamicModel.topYSpeed;
                dynamicModel.xSpeed = 0;
                break;
            case Direction.NORTHEAST:
                dynamicModel.ySpeed = -dynamicModel.topYSpeed;
                dynamicModel.xSpeed = dynamicModel.topXSpeed;
                break;
            case Direction.EAST:
                dynamicModel.ySpeed = 0;
                dynamicModel.xSpeed = dynamicModel.topXSpeed;
                break;
            case Direction.SOUTHEAST:
                dynamicModel.ySpeed = dynamicModel.topYSpeed;
                dynamicModel.xSpeed = dynamicModel.topXSpeed;
                break;
            case Direction.SOUTH:
                dynamicModel.ySpeed = dynamicModel.topYSpeed;
                dynamicModel.xSpeed = 0;
                break;
            case Direction.SOUTHWEST:
                dynamicModel.ySpeed = dynamicModel.topYSpeed;
                dynamicModel.xSpeed = -dynamicModel.topXSpeed;
                break;
            case Direction.WEST:
                dynamicModel.ySpeed = 0;
                dynamicModel.xSpeed = -dynamicModel.topXSpeed;
                break;
            case Direction.NORTHWEST:
                dynamicModel.ySpeed = -dynamicModel.topYSpeed;
                dynamicModel.xSpeed = -dynamicModel.topXSpeed;
                break;
            case Direction.STOP:
                dynamicModel.ySpeed = 0;
                dynamicModel.xSpeed = 0;
                break;
            case Direction.NONE:
                break;
            default:
                // console.warn("direction is null");
                dynamicModel.direction = Direction.STOP;
                dynamicModel.ySpeed = 0;
                dynamicModel.xSpeed = 0;
                break;
        }
    }

    actionHandler(dynamicModel, input_actions, deltaTime){

        // Updates current actions based on player inputs and previously made actions
        input_actions.forEach(action => {
            switch(action){
                case Action.SHOOT:
                    // console.log("SHOOTING");
                    break;
                case Action.BOOST:
                    let boostsLeft = dynamicModel.actionsLeft.get(action);
                    if(boostsLeft > 0){  // Checks to see if player has boosts left
                        if(dynamicModel.currentActions.get(action) == undefined || dynamicModel.currentActions.get(action) <= 0){
                            dynamicModel.currentActions.set(action, ACTION_LENGTH.get(action));
                            boostsLeft -= 1;  // Uses up a boost
                            dynamicModel.actionsLeft.set(action, boostsLeft);
                        }
                    }
                    break;
                case Action.STOP:
                    dynamicModel.direction = Direction.STOP;
                    break;
                case Action.NONE:
                    break;
                default:
                    console.warn("action is null");
                    break;
            }
        });
        
        // Performs currentActions saved in dynamicModel
        for(let [key, value] of dynamicModel.currentActions){
            if(value > 0){
                switch(key){
                    case Action.SHOOT:
                        console.log("SHOOTING");
                        break;
                    case Action.BOOST:
                        if(Math.abs(dynamicModel.xSpeed) != dynamicModel.topXSpeed * 2){ dynamicModel.xSpeed *= 2.8; }
                        if(Math.abs(dynamicModel.ySpeed) != dynamicModel.topYSpeed * 2){ dynamicModel.ySpeed *= 2.8; }
                        break;
                    case Action.NONE:
                        break;
                    default:
                        console.warn("action is null");
                        break;
                }
                dynamicModel.currentActions.set(key, value-(5/deltaTime));
            }
        }
    }

    playerTrailHandler(dynamicModel, staticModels){
        let xLoc = 0;
        let yLoc = 0;
        let width = 0;
        let height = 0;
        switch(dynamicModel.direction){
            case Direction.NORTH:
                xLoc = dynamicModel.x;
                yLoc = dynamicModel.y + dynamicModel.h;
                width = dynamicModel.w;
                height = dynamicModel.ySpeed;
                break;
            case Direction.EAST:
                xLoc = dynamicModel.x;
                yLoc = dynamicModel.y;
                width = dynamicModel.xSpeed;
                height = dynamicModel.h;
                break;
            case Direction.SOUTH:
                xLoc = dynamicModel.x;
                yLoc = dynamicModel.y;
                width = dynamicModel.w;
                height = dynamicModel.ySpeed;
                break;
            case Direction.WEST:
                xLoc = dynamicModel.x  + dynamicModel.w;
                yLoc = dynamicModel.y;
                width = dynamicModel.xSpeed;
                height = dynamicModel.h;
                break;
            case Direction.STOP:
                xLoc = dynamicModel.x;
                yLoc = dynamicModel.y;
                width = dynamicModel.xSpeed;
                height = dynamicModel.ySpeed;
                break;
            default:
                console.warn("Unhandled direction is assigned");
                break;
        }

        let createNewTrailObject = true;
        if(staticModels.length > 0){
            let lastStaticModel = staticModels[staticModels.length - 1];

            if(lastStaticModel.direction == dynamicModel.direction || dynamicModel.direction == Direction.STOP){ // make even better when direction == stop, right now makes a new path object with direction == Direction.STOP
                createNewTrailObject = false;

                if(xLoc == lastStaticModel.x){
                    lastStaticModel.h = Math.round(lastStaticModel.h + height);
                }else if(yLoc == lastStaticModel.y){
                    lastStaticModel.w = Math.round(lastStaticModel.w + width);
                }else{
                    console.warn("Last path does not equal current x or y");
                }
            }else{ // round makes path catch up to car, fix it here
                
            }
        }

        if(gCount == 0) { console.log(staticModels.length);}
        gCount = (gCount + 1) % 100; 
        
        if(createNewTrailObject){
            staticModels.push(new PlayerTrail({x:xLoc, y:yLoc, w:Math.round(width), h:Math.round(height), 
                color:dynamicModel.color, modelType:dynamicModel.modelType, direction:dynamicModel.direction}));
        }
    }

    collision_and_boundary_handler(dynamicModel, other_dynamicModels){
        // let collided_dynamicModel = this.cb.check_all_collision(dynamicModel, other_dynamicModels);
        // while(collided_dynamicModel != null){
        //     let collided_reaction_ratio = 2 / 13;
        //     let dynamicModel_reaction_ratio = 10 / 13;

        //     let old_collided_x = collided_dynamicModel.x;
        //     let old_collided_y = collided_dynamicModel.y;

        //     collided_dynamicModel.reaction_x_vel = dynamicModel.cur_x_vel * collided_reaction_ratio;
        //     collided_dynamicModel.reaction_y_vel = (dynamicModel.cur_y_vel - gv.TRAFFIC_SPEED) * collided_reaction_ratio;

        //     dynamicModel.reaction_x_vel = collided_dynamicModel.cur_x_vel * dynamicModel_reaction_ratio;
        //     dynamicModel.reaction_y_vel = (collided_dynamicModel.cur_y_vel - gv.TRAFFIC_SPEED) * dynamicModel_reaction_ratio;

        //     extra_var = 1;

        //     // prevents cars from going into each other
        //     if(dynamicModel.x > collided_dynamicModel.x){
        //         if(dynamicModel.y > collided_dynamicModel.y){
        //             if(abs(dynamicModel.x - (collided_dynamicModel.x + collided_dynamicModel.w)) >
        //                     abs(dynamicModel.y - (collided_dynamicModel.y + collided_dynamicModel.h))){
        //                 collided_dynamicModel.y = dynamicModel.y - collided_dynamicModel.h - extra_var;
        //                 dynamicModel.y = old_collided_y + collided_dynamicModel.h + extra_var;
        //             }
        //             else{
        //                 collided_dynamicModel.x = dynamicModel.x - collided_dynamicModel.w - extra_var;
        //                 dynamicModel.x = old_collided_x + collided_dynamicModel.w + extra_var;
        //             }
        //         }
        //         else{
        //             if(abs(dynamicModel.x - (collided_dynamicModel.x + collided_dynamicModel.w)) >
        //                     abs((dynamicModel.y + dynamicModel.h) - collided_dynamicModel.y)){
        //                 collided_dynamicModel.y = dynamicModel.y + dynamicModel.h + extra_var;
        //                 dynamicModel.y = old_collided_y - dynamicModel.h - extra_var;
        //             }
        //             else{
        //                 collided_dynamicModel.x = dynamicModel.x - collided_dynamicModel.w - extra_var;
        //                 dynamicModel.x = old_collided_x + collided_dynamicModel.w + extra_var;
        //             }
        //         }
        //     }
        //     else{
        //         if(dynamicModel.y > collided_dynamicModel.y){
        //             if(abs((dynamicModel.x + dynamicModel.w) - collided_dynamicModel.x) >
        //                     abs(dynamicModel.y - (collided_dynamicModel.y + collided_dynamicModel.h))){
        //                 collided_dynamicModel.y = dynamicModel.y - collided_dynamicModel.h - extra_var;
        //                 dynamicModel.y = old_collided_y + collided_dynamicModel.h + extra_var;
        //             }
        //             else{
        //                 collided_dynamicModel.x = dynamicModel.x + dynamicModel.w + extra_var;
        //                 dynamicModel.x = old_collided_x - dynamicModel.w - extra_var;
        //             }
        //         }
        //         else{
        //             if(abs((dynamicModel.x + dynamicModel.w) - collided_dynamicModel.x) >
        //                     abs((dynamicModel.y + dynamicModel.h) - collided_dynamicModel.y)){
        //                 collided_dynamicModel.y = dynamicModel.y + dynamicModel.h + extra_var;
        //                 dynamicModel.y = old_collided_y - dynamicModel.h - extra_var;
        //             }
        //             else{
        //                 collided_dynamicModel.x = dynamicModel.x + dynamicModel.w + extra_var;
        //                 dynamicModel.x = old_collided_x - dynamicModel.w - extra_var;
        //             }
        //         }
        //     }
        //     dynamicModel.health -= 1;
        //     collided_dynamicModel.health -= 1;

        //     // checks to make sure new placement is not inside another dynamicModel
        //     collided_dynamicModel = this.cb.check_all_collision(dynamicModel, other_dynamicModels);
        // }

        // Check dynamicModel to remain within boundaries
        this.cb.check_boundary(dynamicModel);

        // if(!this.cb.check_on_road(dynamicModel)){ // Check if off road to add more friction
        //     dynamicModel.off_road_on_input_y_vel(0.5);
        //     // dynamicModel.reaction_y_vel += 1
        // }
    }
}