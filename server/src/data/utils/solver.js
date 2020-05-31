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
    West: 'west'
}
const iterate = (node, board, target) => {
    let results = []

    for ( const piece of node.pieces ) {
        for ( const direction of directions ) {

        }
    }
}

const findEndPoint = (movingPiece, startingDirection, board, allPieces) => {
    let currentCoordinate = deepcopy(movingPiece.coordinate)

    let nextDirection = startingDirection
    let nextCoordinate
    switch ( nextDirection ) {
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
    const filterNotValid = board.notValid.filter(
        deadTile => nextCoordinate[0] === deadTile[0] && nextCoordinate[1] === deadTile[1]
    )
    if (filterNotValid.length > 0) {
        return currentCoordinate
    }

    // Check for other pieces
    const filterPieces = allPieces.filter(
        piece =>
            piece.colour !== movingPiece.colour &&
            piece.coordinate[0] === nextCoordinate[0] &&
            piece.coordinate[1] === nextCoordinate[1]
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
            (wall1[0] === currentCoordinate[0] &&
                wall1[1] === currentCoordinate[1] &&
                wall2[0] === nextCoordinate[0] &&
                wall2[1] === nextCoordinate[1]) ||
            (wall1[0] === nextCoordinate[0] &&
                wall1[1] === nextCoordinate[1] &&
                wall2[0] === currentCoordinate[0] &&
                wall2[1] === currentCoordinate[1])
        )
    })
}

const findNextNode = (piece, x)

const checkWin = (node, target) => {
    const targetColour = target.colour

    if (targetColour === 'any') {
        for (const piece of node.pieces) {
            if (isPieceAtTarget(piece, target.coordinate)) {
                return true
            }
        }
    } else {
        return isPieceAtTarget(node.pieces[targetColour], target.coordinate)
    }

    return false
}

const isPieceAtTarget = (piece, targetCoordinate) => {
    if (
        piece.coordinate[0] === targetCoordinate[0] &&
        piece.coordinate[1] === targetCoordinate[1]
    ) {
        return true
    }
}

module.exports = {
    solve,
}
