const deepcopy = require('deepcopy')

const solve = (board, puzzle, minMoves, maxMoves) => {
    const target = puzzle.target
    let solvingQueue = [
        {
            pieces: deepcopy(puzzle.pieces),
            history: [],
        },
    ]

    for (let i = 0; i < maxMoves; ++i) {
        const returnedList = []
        while (solvingQueue.length > 0) {
            const results = iterate(solvingQueue.shift(), board, target)
            if (!results) {
                continue
            }

            for (const resultElement of results) {
                if (checkWin(resultElement, target)) {
                    if (i < minMoves) {
                        return null
                    } else {
                        return resultElement
                    }
                }
            }
            returnedList.push(...results)
        }
        solvingQueue = returnedList
    }

    // Return null if it takes greater than max moves
    return null
}

const directions = {
    North: 'north',
    South: 'south',
    East: 'east',
    West: 'west',
}
const iterate = (node, board, target) => {
    let results = []

    for (const piece of node.pieces) {
        for (const direction of directions) {
        }
    }
}

const findEndPoint = (movingPiece, startingDirection, board, allPieces) => {
    let currentCoordinate = deepcopy(movingPiece.coordinate)
    let finalCoordinate = null

    let nextDirection = startingDirection
    let nextCoordinate
    switch (nextDirection) {
        case directions.East:
            nextCoordinate = currentCoordinate[0] + 1
            break
        case directions.West:
            nextCoordinate = currentCoordinate[0] - 1
            break
        case directions.North:
            nextCoordinate = currentCoordinate[1] + 1
            break
        case directions.South:
            nextCoordinate = currentCoordinate[1] - 1
    }

    // Check for invalid
    const filterNotValid = board.notValid.filter(deadTile =>
        isCoordinateEqual(nextCoordinate, deadTile)
    )
    if (filterNotValid.length > 0) {
        return currentCoordinate
    }

    // Check for other pieces
    const filterPieces = allPieces.filter(
        piece =>
            piece.colour !== movingPiece.colour &&
            isCoordinateEqual(piece, nextCoordinate)
    )
    if (filterPieces.length > 0) {
        return currentCoordinate
    }

    // Check for Walls
    const filterWalls = board.walls.filter(wall => {
        const wall1 = wall[0]
        const wall2 = wall[1]

        // No guarantee of direction, so have to test both
        return (
            (isCoordinateEqual(wall1, currentCoordinate) &&
                isCoordinateEqual(wall2, nextCoordinate)) ||
            (isCoordinateEqual(wall2, currentCoordinate) &&
                isCoordinateEqual(wall1, nextCoordinate))
        )
    })
    if (filterWalls.length > 0) {
        return currentCoordinate
    }
}

// const findNextNode = (piece, x)

const checkWin = (node, target) => {
    const targetColour = target.colour

    if (targetColour === 'any') {
        for (const piece of node.pieces) {
            if (isCoordinateEqual(piece, target.coordinate)) {
                return true
            }
        }
    } else {
        return isCoordinateEqual(node.pieces[targetColour], target.coordinate)
    }

    return false
}

const isCoordinateEqual = (coordinate1, coordinate2) => {
    return (
        coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1]
    )
}

module.exports = {
    solve,
}
