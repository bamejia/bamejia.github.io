const Direction = {
    NORTH: 0,
    NORTHEAST: 2,
    EAST: 4,
    SOUTHEAST: 6,
    SOUTH: 1,
    SOUTHWEST: 3,
    WEST: 5,
    NORTHWEST: 7,
    STOP: 8,
    NONE: 10,
    getOpposite: (direction)=>{
        if(direction % 2 == 0){ return direction + 1; }
        else{ return direction - 1; }
    }
};

export default Direction;