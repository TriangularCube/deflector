// NOTE: Coordinates are 0 base index

/*
* Quadrant 1 is top left
* Quadrant 2 is top right
* Quadrant 3 is bottom left
* Quadrant 4 is bottom right
*/

const mapToQuadrant = (quad, location) => {
    return [
        quad % 3 === 0 ? 16 - location[0] : location[0],
        quad % 2 === 0 ? 16 - location[1] : location[1],
    ]
}

const turnToHex = location => {
    return `${location[0].toString(16)}${location[1].toString(16)}`
}

const generate = () => {
    // First generate walls
    // Walls have to be between space 3 - 7 of each quadrant wall

    const walls = []

    // For each quadrant
    for(const quad in [1, 2, 3, 4]){
        // Generate X wall
        let randomWallSide1 = Math.floor(Math.random() * (5 - 2) + 2)
        let randomWallSide2 = randomWallSide1 + 1
        let wallSide1 = mapToQuadrant(quad, [randomWallSide1, 1])
        let wallSide2 = mapToQuadrant(quad, [randomWallSide2, 1])
        walls.push(`${turnToHex(wallSide1)}${turnToHex(wallSide2)}`)

        // Generate Y wall
        randomWallSide1 = Math.floor(Math.random() * (7 - 3) + 3)
        randomWallSide2 = randomWallSide1 + 1
        wallSide1 = mapToQuadrant(quad, [randomWallSide1, 1])
        wallSide2 = mapToQuadrant(quad, [randomWallSide2, 1])
        walls.push(`${turnToHex(wallSide1)}${turnToHex(wallSide2)}`)

        // TODO: Normalize wall notation
    }

    return walls
}

console.log(generate())
