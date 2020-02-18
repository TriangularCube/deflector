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

const {serializeGameBoard} = require('./serializer')

const quads = {
    A: [
        {
            id: '1A',
            walls: [
                [
                    [1, 0],
                    [2, 0],
                ],
                [
                    [4, 0],
                    [4, 1],
                ],
                [
                    [3, 1],
                    [4, 1],
                ],
                [
                    [1, 1],
                    [1, 2],
                ],
                [
                    [1, 2],
                    [2, 2],
                ],
                [
                    [6, 3],
                    [7, 3],
                ],
                [
                    [6, 3],
                    [6, 4],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                [
                    [3, 6],
                    [3, 7],
                ],
                [
                    [2, 6],
                    [3, 6],
                ],
            ],
            goals: [
                {
                    coordinate: [4, 1],
                    colour: 'r'
                },
                {
                    coordinate: [1,2],
                    colour: 'g'
                },
                {
                    coordinate: [6,3],
                    colour: 'y'
                },
                {
                    coordinate: [3,6],
                    colour: 'b'
                }
            ],
            notValid: [[7, 7]],
        },
        {
            id: '2A',
            walls: [
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [5, 1],
                    [5, 2],
                ],
                [
                    [5, 1],
                    [6, 1],
                ],
                [
                    [1, 2],
                    [1, 3],
                ],
                [
                    [0, 3],
                    [0, 4],
                ],
                [
                    [6, 3],
                    [6, 4],
                ],
                [
                    [5, 4],
                    [6, 4],
                ],
                [
                    [2, 5],
                    [2, 6],
                ],
                [
                    [2, 6],
                    [3, 6],
                ],
            ],
            goals: [
                {
                    coordinate: [5,1],
                    colour: 'g'
                },
                {
                    coordinate: [1,2],
                    colour: 'r'
                },
                {
                    coordinate: [6,4],
                    colour: 'y'
                },{
                    coordinate: [2,6],
                    colour: 'b'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    B: [
        {
            id: '1B',
            walls: [
                [
                    [4, 0],
                    [5, 0],
                ],
                [
                    [6, 1],
                    [7, 1],
                ],
                [
                    [6, 1],
                    [6, 2],
                ],
                [
                    [1, 1],
                    [1, 2],
                ],
                [
                    [0, 2],
                    [1, 2],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                [
                    [6, 4],
                    [6, 5],
                ],
                [
                    [6, 5],
                    [7, 5],
                ],
                [
                    [3, 6],
                    [3, 7],
                ],
                [
                    [2, 6],
                    [3, 6],
                ],
            ],
            goals: [
                {
                    coordinate:[6,1],
                    colour:'y'
                },
                {
                    coordinate:[1,2],
                    colour:'g'
                },
                {
                    coordinate:[6,5],
                    colour:'b'
                },
                {
                    coordinate:[3,6],
                    colour:'r'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    C: [
        {
            id: '1C',
            walls: [
                [
                    [1, 0],
                    [2, 0],
                ],
                [
                    [2, 1],
                    [3, 1],
                ],
                [
                    [3, 0],
                    [3, 1],
                ],
                [
                    [6, 3],
                    [7, 3],
                ],
                [
                    [6, 3],
                    [6, 4],
                ],
                [
                    [0, 4],
                    [1, 4],
                ],
                [
                    [1, 4],
                    [1, 5],
                ],
                [
                    [0, 6],
                    [0, 7],
                ],
                [
                    [4, 5],
                    [4, 6],
                ],
                [
                    [4, 6],
                    [5, 6],
                ],
            ],
            goals: [
                {
                    coordinate:[3,1],
                    colour:'g'
                },
                {
                    coordinate:[6,3],
                    colour:'y'
                },
                {
                    coordinate:[1,4],
                    colour:'r'
                },
                {
                    coordinate:[4,6],
                    colour:'b'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
    D: [
        {
            id: '1D',
            walls: [
                [
                    [5, 0],
                    [6, 0],
                ],
                [
                    [1, 2],
                    [1, 3],
                ],
                [
                    [0, 3],
                    [1, 3],
                ],
                [
                    [6, 4],
                    [7, 4],
                ],
                [
                    [6, 4],
                    [6, 5],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                [
                    [2, 5],
                    [2, 6],
                ],
                [
                    [2, 6],
                    [3, 6],
                ],
                [
                    [3, 6],
                    [3, 7],
                ],
            ],
            goals: [
                {
                    coordinate:[1,3],
                    colour:'r'
                },
                {
                    coordinate:[6,3],
                    colour:'y'
                },
                {
                    coordinate:[2,6],
                    colour:'g'
                },
                {
                    coordinate:[3,6],
                    colour:'b'
                }
            ],
            notValid: [[7, 7]],
        },
    ],
}

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

const generateBoard = () => {

    const newBoard = {}

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

    return serializeGameBoard(newBoard)

}

module.exports = {
    generateBoard,
}
