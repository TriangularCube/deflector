// NOTE: Coordinates are 0 base index

/*
 * Quadrant 1 is top left
 * Quadrant 2 is top right
 * Quadrant 3 is bottom left
 * Quadrant 4 is bottom right
 *
 * Board is 16 x 16
 */

const shuffle = require('shuffle-array')
const deepcopy = require('deepcopy')

const normalize = require('../../utils/wallNormalizer.js')
const quads = require('./quads.js')

//region Utilities
const rotateQuad = (quad, times) => {
    const newQuad = deepcopy(quad)

    // Rotate quad X times based on position
    for (let i = 0; i < times; i++) {
        // For each wall
        newQuad.walls.forEach(wall => {
            // For each coordinate in a wall pair
            wall.forEach((coord, index, thisArray) => {
                // Modify the coordinate
                thisArray[index] = rotateCoord(coord)
            })
        })

        newQuad.goals.forEach((goal, index, thisArray) => {
            thisArray[index].coordinate = rotateCoord(goal.coordinate)
        })

        newQuad.notValid.forEach((element, index, thisArray) => {
            thisArray[index] = rotateCoord(element)
        })
    }

    return newQuad
}

const rotateCoord = coord => {
    // Clockwise rotation is [ 7 - y, x ]
    return [7 - coord[1], coord[0]]
}

const shiftQuad = (quad, x, y) => {
    const newQuad = deepcopy(quad)

    // For each wall
    newQuad.walls.forEach(wall => {
        // For each coordinate in a wall pair
        wall.forEach((coord, index, thisArray) => {
            // Modify the coordinate
            thisArray[index] = shiftCoord(coord, x, y)
        })
    })

    newQuad.goals.forEach((goal, index, thisArray) => {
        thisArray[index].coordinate = shiftCoord(goal.coordinate, x, y)
    })

    newQuad.notValid.forEach((element, index, thisArray) => {
        thisArray[index] = shiftCoord(element, x, y)
    })

    return newQuad
}

const shiftCoord = (coord, x, y) => {
    return [coord[0] + x, coord[1] + y]
}
//endregion

const generateBoard = () => {
    const newBoard = {}

    newBoard.size = {
        x: 16,
        y: 16,
    }

    // Randomly choose 4 boards
    const quadrants = [
        deepcopy(quads.A[Math.floor(Math.random() * quads.A.length)]),
        deepcopy(quads.B[Math.floor(Math.random() * quads.B.length)]),
        deepcopy(quads.C[Math.floor(Math.random() * quads.C.length)]),
        deepcopy(quads.D[Math.floor(Math.random() * quads.D.length)]),
    ]

    // Shuffle them
    shuffle(quadrants)

    // Then rotate them as necessary
    for (const i of [1, 2, 3]) {
        quadrants[i] = rotateQuad(quadrants[i], i)
    }

    // Shift the quadrants as needed
    quadrants[1] = shiftQuad(quadrants[1], 8, 0)
    quadrants[2] = shiftQuad(quadrants[2], 8, 8)
    quadrants[3] = shiftQuad(quadrants[3], 0, 8)

    // Pull out all walls
    const newWalls = []
    quadrants.forEach(quadrant => {
        newWalls.push(...quadrant.walls)
    })
    // Normalize All Wall Coordinates
    newWalls.forEach((wall, index) => {
        newWalls[index] = normalize(wall)
    })

    newBoard.walls = newWalls

    const newGoals = []
    quadrants.forEach(quadrant => {
        newGoals.push(...quadrant.goals)
    })
    newBoard.goals = newGoals

    const newNotValid = []
    quadrants.forEach(quadrant => {
        newNotValid.push(...quadrant.notValid)
    })
    newBoard.notValid = newNotValid

    return newBoard
}

module.exports = {
    generateBoard,
}
