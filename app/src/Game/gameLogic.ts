import deepcopy from 'deepcopy'
import { Direction, GameState, Coordinate } from './gameInterfaces'
import { draw, setupRendering } from './gameRender'

let gameState: GameState = null

let invokeSideBarUpdate = null

export function setupGame(canvas, game, raiseMoveEvent): void {
    gameState = {
        board: deepcopy(game.board),
        target: deepcopy(game.puzzle.target),
        history: [
            {
                move: null,
                state: deepcopy(game.puzzle.pieces),
                gameComplete: false,
            },
        ],
        historyPointer: {
            index: 0,
            positions: deepcopy(game.puzzle.pieces),
            gameComplete: false,
        },
        selection: {
            piece: null,
            possibleMoves: null,
        },
    }

    invokeSideBarUpdate = raiseMoveEvent
    raiseMoveEvent(gameState.history)

    canvas.onclick = ClickHandler

    requestAnimationFrame(() => setupRendering(canvas, gameState))
}

export function setMovePointer(pointer: number) {
    if (pointer < 0 || pointer > gameState.history.length - 1) {
        throw Error('Invalid move number')
    }

    gameState.historyPointer = {
        index: pointer,
        positions: deepcopy(gameState.history[pointer].state),
        gameComplete: gameState.history[pointer].gameComplete,
    }

    if (pointer > 0 && !gameState.historyPointer.gameComplete) {
        gameState.selection.piece = gameState.historyPointer.positions.find(
            element => element.colour === gameState.history[pointer].move.colour
        )
        findPossibleMoves()
    } else {
        gameState.selection.piece = null
        gameState.selection.possibleMoves = null
    }

    requestAnimationFrame(invokeDraw)
}

const ClickHandler = event => {
    event.preventDefault()

    if (gameState.historyPointer.gameComplete) {
        return
    }

    // TODO Standardize calculating Tile Size
    const tileSize = event.target.width / gameState.board.size.x

    const clickedX = Math.floor(
        (event.pageX - event.target.offsetLeft) / tileSize
    )
    const clickedY = Math.floor(
        (event.pageY - event.target.offsetTop) / tileSize
    )

    // If clicked area is in possible moves
    let clickedOnMove = false

    if (gameState.selection.possibleMoves) {
        for (const [direction, array] of Object.entries(
            gameState.selection.possibleMoves
        )) {
            if (
                array.filter(
                    tile => tile[0] === clickedX && tile[1] === clickedY
                ).length > 0
            ) {
                // If clicked on a possible move
                clickedOnMove = true

                // Remove future entries from history
                gameState.history = gameState.history.slice(
                    0,
                    gameState.historyPointer.index + 1
                )

                const currentSelectedPiece = gameState.selection.piece

                // Move selected piece to end of direction array
                currentSelectedPiece.coordinate = array[array.length - 1]

                // Check for game completion
                let gameOver = false
                if (
                    currentSelectedPiece.colour === gameState.target.colour &&
                    currentSelectedPiece.coordinate[0] ===
                        gameState.target.coordinate[0] &&
                    currentSelectedPiece.coordinate[1] ===
                        gameState.target.coordinate[1]
                ) {
                    // Yup, hit our target
                    gameOver = true
                }

                // Push history
                gameState.history.push({
                    state: deepcopy(gameState.historyPointer.positions),
                    move: {
                        direction: direction as Direction,
                        colour: gameState.selection.piece.colour,
                    },
                    gameComplete: gameOver,
                })

                setMovePointer(++gameState.historyPointer.index)

                // Raise a moved event in the React view
                invokeSideBarUpdate([...gameState.history])

                break
            }
        }
    }

    if (!clickedOnMove) {
        // Otherwise find if clicked on a piece
        gameState.selection.piece = gameState.historyPointer.positions.find(
            element =>
                element.coordinate[0] === clickedX &&
                element.coordinate[1] === clickedY
        )
    }

    gameState.selection.possibleMoves = null

    findPossibleMoves()

    requestAnimationFrame(invokeDraw)
}

const findPossibleMoves = () => {
    if (!gameState.selection?.piece) {
        return
    }

    for (const direction of [
        'north' as Direction,
        'east' as Direction,
        'south' as Direction,
        'west' as Direction,
    ]) {
        const route = []
        let currentNode = [
            ...gameState.selection.piece.coordinate,
        ] as Coordinate

        do {
            // TODO Nope, this isn't right
            const nextNode = getNextNode(currentNode, direction)

            if (nextNode) {
                route.push(nextNode)
            }

            currentNode = nextNode
        } while (currentNode)

        if (!gameState.selection.possibleMoves) {
            gameState.selection.possibleMoves = {}
        }
        gameState.selection.possibleMoves[direction] = route
    }
}

const getNextNode = (
    currentNode: Coordinate,
    direction: Direction
): Coordinate => {
    const nextNode = deepcopy(currentNode)

    switch (direction) {
        case 'east':
            nextNode[0] += 1
            break
        case 'west':
            nextNode[0] -= 1
            break
        case 'north':
            nextNode[1] -= 1
            break
        case 'south':
            nextNode[1] += 1
            break
    }

    // Edge of Board
    if (
        nextNode[0] >= gameState.board.size.x ||
        nextNode[0] < 0 ||
        nextNode[1] >= gameState.board.size.y ||
        nextNode[1] < 0
    ) {
        return null
    }

    return isBlocked(currentNode, nextNode) ? null : nextNode
}

const isBlocked = (current, next) => {
    // Check for Non-Valid tiles
    const filterNotValid = gameState.board.notValid.filter(
        deadTile => next[0] === deadTile[0] && next[1] === deadTile[1]
    )
    if (filterNotValid.length > 0) {
        return true
    }

    // Check for other pieces
    const filterPieces = gameState.historyPointer.positions.filter(
        piece =>
            piece.colour !== gameState.selection.piece.colour &&
            piece.coordinate[0] === next[0] &&
            piece.coordinate[1] === next[1]
    )
    if (filterPieces.length > 0) {
        return true
    }

    // Check for Walls
    const filterWalls = gameState.board.walls.filter(wall => {
        const wall1 = wall[0]
        const wall2 = wall[1]

        // No guarantee of direction, so have to test both
        return (
            (wall1[0] === current[0] &&
                wall1[1] === current[1] &&
                wall2[0] === next[0] &&
                wall2[1] === next[1]) ||
            (wall1[0] === next[0] &&
                wall1[1] === next[1] &&
                wall2[0] === current[0] &&
                wall2[1] === current[1])
        )
    })

    return filterWalls.length !== 0
}

const invokeDraw = () => draw(gameState)
