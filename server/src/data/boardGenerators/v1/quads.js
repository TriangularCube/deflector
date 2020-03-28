// NOTE: Coordinates are 0 base index
/*
 * Quadrant 1 is top left
 * Quadrant 2 is top right
 * Quadrant 3 is bottom left
 * Quadrant 4 is bottom right
 *
 * Board is 16 x 16
 */

module.exports = {
    // A is Yellow Board
    A: [
        {
            id: '1A',
            walls: [
                // Side Walls
                [
                    [4, 0],
                    [5, 0],
                ],
                [
                    [0, 4],
                    [0, 5],
                ],
                // Red Target
                [
                    [2, 1],
                    [3, 1],
                ],
                [
                    [2, 1],
                    [2, 2],
                ],
                // Green Target
                [
                    [1, 3],
                    [1, 4],
                ],
                [
                    [1, 3],
                    [0, 3],
                ],
                // Yellow Target
                [
                    [6, 4],
                    [6, 3],
                ],
                [
                    [6, 4],
                    [5, 4],
                ],
                // Blue Target
                [
                    [5, 6],
                    [5, 5],
                ],
                [
                    [5, 6],
                    [6, 6],
                ],
                // Special Target
                [
                    [3, 7],
                    [3, 8],
                ],
                [
                    [3, 7],
                    [4, 7],
                ],
            ],
            goals: [
                {
                    coordinate: [2, 1],
                    colour: 'red',
                },
                {
                    coordinate: [1, 3],
                    colour: 'green',
                },
                {
                    coordinate: [6, 4],
                    colour: 'yellow',
                },
                {
                    coordinate: [5, 6],
                    colour: 'blue',
                },
                {
                    coordinate: [3, 7],
                    colour: 'any',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '2A',
            walls: [
                // Side Walls
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [0, 6],
                    [0, 7],
                ],
                // Blue Walls
                [
                    [5, 1],
                    [6, 1],
                ],
                [
                    [6, 1],
                    [6, 2],
                ],
                // Yellow Walls
                [
                    [1, 2],
                    [1, 3],
                ],
                [
                    [1, 3],
                    [2, 3],
                ],
                // Green Walls
                [
                    [5, 3],
                    [5, 4],
                ],
                [
                    [4, 4],
                    [5, 4],
                ],
                // Red Walls
                [
                    [2, 5],
                    [2, 6],
                ],
                [
                    [2, 5],
                    [3, 5],
                ],
                // Special Target
                [
                    [7, 5],
                    [7, 6],
                ],
                [
                    [7, 5],
                    [8, 5],
                ],
            ],
            goals: [
                {
                    coordinate: [6, 1],
                    colour: 'blue',
                },
                {
                    coordinate: [1, 3],
                    colour: 'yellow',
                },
                {
                    coordinate: [5, 4],
                    colour: 'green',
                },
                {
                    coordinate: [2, 5],
                    colour: 'red',
                },
                {
                    coordinate: [7, 5],
                    colour: 'any',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '3A',
            walls: [
                // Side Walls
                [
                    [2, 0],
                    [3, 0],
                ],
                [
                    [0, 3],
                    [0, 4],
                ],
                // Blue Target
                [
                    [5, 1],
                    [5, 2],
                ],
                [
                    [4, 1],
                    [5, 1],
                ],
                // Red Target
                [
                    [2, 4],
                    [2, 5],
                ],
                [
                    [2, 4],
                    [3, 4],
                ],
                // Yellow Target
                [
                    [1, 5],
                    [1, 6],
                ],
                [
                    [1, 6],
                    [2, 6],
                ],
                // Special Targ
                [
                    [7, 2],
                    [7, 3],
                ],
                [
                    [7, 2],
                    [8, 2],
                ],
            ],
            goals: [
                {
                    coordinate: [5, 1],
                    colour: 'blue',
                },
                {
                    coordinate: [1, 6],
                    colour: 'yellow',
                },
                {
                    coordinate: [3, 4],
                    colour: 'red',
                },
                {
                    coordinate: [6, 5],
                    colour: 'green',
                },
                {
                    coordinate: [7, 2],
                    colour: 'any',
                },
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
                    [4, 0],
                    [5, 0],
                ],
                [
                    [0, 4],
                    [0, 5],
                ],
                // Yellow Target
                [
                    [2, 1],
                    [2, 0],
                ],
                [
                    [1, 1],
                    [2, 1],
                ],
                // Green Target
                [
                    [1, 6],
                    [1, 7],
                ],
                [
                    [1, 6],
                    [2, 6],
                ],
                // Red Target
                [
                    [4, 5],
                    [5, 5],
                ],
                [
                    [4, 4],
                    [4, 5],
                ],
                // Blue Target
                [
                    [6, 3],
                    [6, 4],
                ],
                [
                    [5, 3],
                    [6, 3],
                ],
            ],
            goals: [
                {
                    coordinate: [2, 1],
                    colour: 'yellow',
                },
                {
                    coordinate: [1, 6],
                    colour: 'green',
                },
                {
                    coordinate: [6, 3],
                    colour: 'blue',
                },
                {
                    coordinate: [4, 5],
                    colour: 'red',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '2B',
            walls: [
                // Side Walls
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [0, 3],
                    [0, 4],
                ],
                // Green Walls
                [
                    [5, 1],
                    [6, 1],
                ],
                [
                    [5, 1],
                    [5, 2],
                ],
                // Red Walls
                [
                    [1, 2],
                    [1, 3],
                ],
                [
                    [0, 2],
                    [1, 2],
                ],
                // Yellow Walls
                [
                    [5, 3],
                    [5, 4],
                ],
                [
                    [4, 4],
                    [5, 4],
                ],
                // Blue Walls
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
                    coordinate: [5, 1],
                    colour: 'green',
                },
                {
                    coordinate: [1, 2],
                    colour: 'red',
                },
                {
                    coordinate: [6, 4],
                    colour: 'yellow',
                },
                {
                    coordinate: [2, 6],
                    colour: 'blue',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '3B',
            walls: [
                // Side Walls
                [
                    [5, 0],
                    [6, 0],
                ],
                [
                    [0, 3],
                    [0, 4],
                ],
                // Yellow Target
                [
                    [3, 1],
                    [3, 2],
                ],
                [
                    [2, 2],
                    [3, 2],
                ],
                // Red Target
                [
                    [2, 3],
                    [2, 4],
                ],
                [
                    [2, 4],
                    [3, 4],
                ],
                // Blue Target
                [
                    [5, 3],
                    [5, 4],
                ],
                [
                    [4, 3],
                    [5, 3],
                ],
                // Green Target
                [
                    [4, 5],
                    [4, 6],
                ],
                [
                    [4, 5],
                    [5, 5],
                ],
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
                    [2, 0],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                // Green Target
                [
                    [4, 0],
                    [4, 1],
                ],
                [
                    [4, 1],
                    [5, 1],
                ],
                // Red Target
                [
                    [0, 3],
                    [1, 3],
                ],
                [
                    [1, 3],
                    [1, 4],
                ],
                // Blue Target
                [
                    [3, 6],
                    [3, 7],
                ],
                [
                    [3, 6],
                    [4, 6],
                ],
                // Yellow Target
                [
                    [5, 4],
                    [5, 5],
                ],
                [
                    [4, 5],
                    [5, 5],
                ],
            ],
            goals: [
                {
                    coordinate: [4, 1],
                    colour: 'green',
                },
                {
                    coordinate: [5, 5],
                    colour: 'yellow',
                },
                {
                    coordinate: [1, 3],
                    colour: 'red',
                },
                {
                    coordinate: [3, 6],
                    colour: 'blue',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '2C',
            walls: [
                // Side Walls
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [0, 4],
                    [0, 5],
                ],
                // Blue Walls
                [
                    [5, 2],
                    [5, 3],
                ],
                [
                    [5, 2],
                    [6, 2],
                ],
                // Green Walls
                [
                    [2, 3],
                    [2, 4],
                ],
                [
                    [2, 4],
                    [3, 4],
                ],
                // Red Walls
                [
                    [7, 5],
                    [7, 6],
                ],
                [
                    [6, 5],
                    [7, 5],
                ],
                // Yellow Walls
                [
                    [1, 5],
                    [1, 6],
                ],
                [
                    [0, 6],
                    [1, 6],
                ],
            ],
            goals: [
                {
                    coordinate: [5, 2],
                    colour: 'blue',
                },
                {
                    coordinate: [2, 4],
                    colour: 'green',
                },
                {
                    coordinate: [1, 6],
                    colour: 'yellow',
                },
                {
                    coordinate: [7, 5],
                    colour: 'red',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '3C',
            walls: [
                // Side Walls
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                // Red Target
                [
                    [1, 1],
                    [1, 2],
                ],
                [
                    [0, 1],
                    [1, 1],
                ],
                // Green Target
                [
                    [6, 1],
                    [6, 2],
                ],
                [
                    [6, 2],
                    [7, 2],
                ],
                // Blue Target
                [
                    [2, 4],
                    [2, 5],
                ],
                [
                    [2, 4],
                    [3, 4],
                ],
                // Yellow Target
                [
                    [7, 5],
                    [7, 4],
                ],
                [
                    [6, 5],
                    [7, 5],
                ],
            ],
            goals: [
                {
                    coordinate: [1, 1],
                    colour: 'red',
                },
                {
                    coordinate: [6, 2],
                    colour: 'green',
                },
                {
                    coordinate: [2, 4],
                    colour: 'blue',
                },
                {
                    coordinate: [7, 5],
                    colour: 'yellow',
                },
            ],
        },
    ],
    // D is Green Board
    D: [
        {
            id: '1D',
            walls: [
                // Side Walls
                [
                    [1, 0],
                    [2, 0],
                ],
                [
                    [0, 6],
                    [0, 7],
                ],
                // Green Target
                [
                    [3, 0],
                    [3, 1],
                ],
                [
                    [2, 1],
                    [3, 1],
                ],
                // Red Target
                [
                    [1, 4],
                    [1, 5],
                ],
                [
                    [0, 4],
                    [1, 4],
                ],
                // Blue Target
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
                    coordinate: [1, 4],
                    colour: 'red',
                },
                {
                    coordinate: [6, 3],
                    colour: 'yellow',
                },
                {
                    coordinate: [3, 1],
                    colour: 'green',
                },
                {
                    coordinate: [4, 6],
                    colour: 'blue',
                },
            ],
            notValid: [[7, 7]],
        },
        {
            id: '2D',
            walls: [
                // Side Walls
                [
                    [3, 0],
                    [4, 0],
                ],
                [
                    [0, 4],
                    [0, 5],
                ],
                // Blue Target
                [
                    [5, 2],
                    [5, 3],
                ],
                [
                    [5, 2],
                    [6, 2],
                ],
                // Green Target
                [
                    [2, 3],
                    [2, 4],
                ],
                [
                    [2, 4],
                    [3, 4],
                ],
                // Yellow Target
                [
                    [1, 6],
                    [1, 5],
                ],
                [
                    [0, 6],
                    [1, 6],
                ],
                // Red Target
                [
                    [7, 5],
                    [7, 6],
                ],
                [
                    [6, 5],
                    [7, 5],
                ],
            ],
            goals: [
                {
                    coordinate: [5, 2],
                    colour: 'blue',
                },
                {
                    coordinate: [2, 4],
                    colour: 'green',
                },
                {
                    coordinate: [1, 6],
                    colour: 'yellow',
                },
                {
                    coordinate: [7, 5],
                    colour: 'red',
                },
            ],
        },
        {
            id: '3D',
            walls: [
                // Side Walls
                [
                    [4, 0],
                    [5, 0],
                ],
                [
                    [0, 5],
                    [0, 6],
                ],
                // Green target
                [
                    [1, 1],
                    [1, 2],
                ],
                [
                    [0, 2],
                    [1, 2],
                ],
                // Yellow Target
                [
                    [6, 1],
                    [7, 1],
                ],
                [
                    [6, 1],
                    [6, 2],
                ],
                // Red Target
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
                    coordinate: [1, 2],
                    colour: 'green',
                },
                {
                    coordinate: [6, 1],
                    colour: 'yellow',
                },
                {
                    coordinate: [3, 6],
                    colour: 'red',
                },
                {
                    coordinate: [6, 5],
                    colour: 'blue',
                },
            ],
        },
    ],
}
