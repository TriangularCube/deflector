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

const {normalize} = require('../utils/wallNormalizer')

const quads = {
    // A is Yellow Board
    A: [
        {
            id: '1A',
            walls: [
                // Side Walls
                [
                    [4,0],
                    [5,0]
                ],
                [
                    [0,4],
                    [0,5]
                ],
                // Red Target
                [
                    [2,1],
                    [3,1]
                ],
                [
                    [2,1],
                    [2,2]
                ],
                // Green Target
                [
                    [1,3],
                    [1,4]
                ],
                [
                    [1,3],
                    [0,3]
                ],
                // Yellow Target
                [
                    [6,4],
                    [6,3]
                ],
                [
                    [6,4],
                    [5,4]
                ],
                // Blue Target
                [
                    [5,6],
                    [5,5]
                ],
                [
                    [5,6],
                    [6,6]
                ],
                // Special Target
                [
                    [3,7],
                    [3,8]
                ],
                [
                    [3,7],
                    [4,7]
                ]
            ],
            goals: [
                {
                    coordinate: [2, 1],
                    colour: 'red'
                },
                {
                    coordinate: [1,3],
                    colour: 'green'
                },
                {
                    coordinate: [6,4],
                    colour: 'yellow'
                },
                {
                    coordinate: [5,6],
                    colour: 'blue'
                },
                {
                    coordinate: [3, 7],
                    colour: 'any'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    // B is Blue Board
    B: [
        {
            id: '1B',
            walls: [
                // Side Walls
                [
                    [4,0],
                    [5,0]
                ],
                [
                    [0,4],
                    [0,5]
                ],
                // Yellow Target
                [
                    [2,1],
                    [2,0]
                ],
                [
                    [1,1],
                    [2,1]
                ],
                // Green Target
                [
                    [1,6],
                    [1,7]
                ],
                [
                    [1,6],
                    [2,6]
                ],
                // Red Target
                [
                    [4,5],
                    [5,5]
                ],
                [
                    [4,4],
                    [4,5]
                ],
                // Blue Target
                [
                    [6,3],
                    [6,4]
                ],
                [
                    [5,3],
                    [6,3]
                ]
            ],
            goals: [
                {
                    coordinate:[2,1],
                    colour:'yellow'
                },
                {
                    coordinate:[1,6],
                    colour:'green'
                },
                {
                    coordinate:[6,3],
                    colour:'blue'
                },
                {
                    coordinate:[4,5],
                    colour:'red'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    // C is Red Board
    C: [
        {
            id: '1C',
            walls: [
                // Side Walls
                [
                    [1, 0],
                    [2, 0]
                ],
                [
                    [0, 5],
                    [0, 6]
                ],
                // Green Target
                [
                    [4,0],
                    [4,1]
                ],
                [
                    [4,1],
                    [5,1]
                ],
                // Red Target
                [
                    [0, 3],
                    [1, 3]
                ],
                [
                    [1,3],
                    [1,4]
                ],
                // Blue Target
                [
                    [3, 6],
                    [3, 7]
                ],
                [
                    [3, 6],
                    [4, 6]
                ],
                // Yellow Target
                [
                    [5,4],
                    [5,5]
                ],
                [
                    [4,5],
                    [5,5]
                ]
            ],
            goals: [
                {
                    coordinate:[4,1],
                    colour:'green'
                },
                {
                    coordinate:[5,5],
                    colour:'yellow'
                },
                {
                    coordinate:[1,3],
                    colour:'red'
                },
                {
                    coordinate:[3,6],
                    colour:'blue'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    // D is Blue Board
    D: [
        {
            id: '1D',
            walls: [
                // Side Walls
                [
                    [1,0],
                    [2,0]
                ],
                [
                    [0,6],
                    [0,7]
                ],
                // Green Target
                [
                    [3,0],
                    [3,1]
                ],
                [
                    [2,1],
                    [3,1]
                ],
                // Red Target
                [
                    [1,4],
                    [1,5]
                ],
                [
                    [0,4],
                    [1,4]
                ],
                // Blue Target
                [
                    [4,5],
                    [4,6]
                ],
                [
                    [4,6],
                    [5,6]
                ]
            ],
            goals: [
                {
                    coordinate:[1,4],
                    colour:'red'
                },
                {
                    coordinate:[6,3],
                    colour:'yellow'
                },
                {
                    coordinate:[3,1],
                    colour:'green'
                },
                {
                    coordinate:[4,6],
                    colour:'blue'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
}

//region Utilities
const rotateQuad = (quad, times) => {
    let newQuad = deepcopy(quad)

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
        y: 16
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
    for(const i of [1,2,3]){
        quadrants[i] = rotateQuad(quadrants[i], i)
    }

    // Shift the quadrants as needed
    quadrants[1] = shiftQuad(quadrants[1], 8, 0)
    quadrants[2] = shiftQuad(quadrants[2], 8, 8)
    quadrants[3] = shiftQuad(quadrants[3], 0, 8)

    // Pull out all walls
    const newWalls = []
    quadrants.forEach( quadrant => {
        newWalls.push(...quadrant.walls)
    })
    // Normalize All Wall Coordinates
    newWalls.forEach( (wall, index) => {
        newWalls[index] = normalize((wall))
    })

    newBoard.walls = newWalls

    const newGoals = []
    quadrants.forEach(quadrant => {
        newGoals.push(...quadrant.goals)
    })
    newBoard.goals = newGoals

    const newNotValid = []
    quadrants.forEach( quadrant => {
        newNotValid.push(...quadrant.notValid)
    })
    newBoard.notValid = newNotValid

    return newBoard

}

module.exports = {
    generateBoard,
}
