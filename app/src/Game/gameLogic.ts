import deepcopy from 'deepcopy'
import { Direction, GameState, Coordinate } from './gameInterfaces'
import { draw, setupRendering } from './gameRender'

let gameState: GameState = null

let invokeSideBarUpdate = null

export function setupGame(canvas, game, raiseMoveEvent): void {
    // DEBUG
    console.log(game)

    gameState = {
        board: deepcopy(game.board),
        target: deepcopy(game.puzzle.target),
        pieces: deepcopy(game.puzzle.pieces),
        history: [
            {
                move: null,
                state: deepcopy(game.puzzle.pieces),
            },
        ],
        selection: {
            piece: null,
            possibleMoves: null,
        },
        gameComplete: false,
    }

    invokeSideBarUpdate = raiseMoveEvent
    raiseMoveEvent(gameState.history)

    canvas.onclick = ClickHandler

    requestAnimationFrame(() => setupRendering(canvas, gameState))
}

const ClickHandler = event => {
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

                gameState.selection.piece.coordinate = array[array.length - 1]

                gameState.history.push({
                    state: deepcopy(gameState.pieces),
                    move: {
                        direction: direction as Direction,
                        colour: gameState.selection.piece.colour,
                    },
                })

                // Raise a moved event in the React view
                invokeSideBarUpdate([...gameState.history])

                clickedOnMove = true

                break
            }
        }

        const currentSelectedPiece = gameState.selection.piece

        if (
            currentSelectedPiece.colour === gameState.target.colour &&
            currentSelectedPiece.coordinate[0] ===
                gameState.target.coordinate[0] &&
            currentSelectedPiece.coordinate[1] ===
                gameState.target.coordinate[1]
        ) {
            // Yup, hit our target
            gameState.gameComplete = true
        }
    }

    if (!clickedOnMove) {
        // Otherwise find if clicked on a piece
        gameState.selection.piece = gameState.pieces.find(
            element =>
                element.coordinate[0] === clickedX &&
                element.coordinate[1] === clickedY
        )
    }

    gameState.selection.possibleMoves = null

    if (gameState.selection.piece) {
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

    requestAnimationFrame(invokeDraw)
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
    const filterPieces = gameState.pieces.filter(
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
