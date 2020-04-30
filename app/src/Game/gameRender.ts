import { ColourAndLocation, GameState } from './gameInterfaces'

let canvas: HTMLCanvasElement = null

export function setupRendering(
    canvasElement: HTMLCanvasElement,
    gameState: GameState
) {
    canvas = canvasElement

    draw(gameState)
}

export function draw(gameState: GameState) {
    const context = canvas.getContext('2d')

    // TODO: If there is no game

    // Clear the Rect
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Find the Tile Sizes
    // TODO: Find tile size without resorting to only using width
    const tileSize: number = canvas.width / gameState.board.size.x

    drawBoard(context, gameState, tileSize)

    drawSelection(context, gameState, tileSize)

    drawTarget(context, gameState, tileSize)

    drawWalls(context, gameState, tileSize)

    drawPieces(context, gameState, tileSize)
}

const drawBoard = (
    context: CanvasRenderingContext2D,
    gameState: GameState,
    tileSize: number
) => {
    // Set Stroke and Fill styles for board
    context.strokeStyle = '#A4A4A3'
    context.lineWidth = 1

    for (let x = 0; x < gameState.board.size.x; x++) {
        for (let y = 0; y < gameState.board.size.y; y++) {
            // Paint the Tile
            context.fillStyle = '#F4DCBF'
            context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)

            // TODO: Paint interior
            // context.fillStyle = '#ffffff'
            // context.fillRect(
            //     x * tileSize + tileSize * 0.2,
            //     y * tileSize + tileSize * 0.2,
            //     tileSize * 0.6,
            //     tileSize * 0.6
            // )

            // Paint the tile boarders
            context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)
        }
    }
}

const drawWalls = (
    context: CanvasRenderingContext2D,
    gameState: GameState,
    tileSize: number
) => {
    // Paint the outside walls
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    context.strokeRect(0, 0, canvas.width, canvas.height)

    // Paint all invalid tiles
    context.fillStyle = '#000000'
    gameState.board.notValid.forEach(tile => {
        context.fillRect(
            tile[0] * tileSize,
            tile[1] * tileSize,
            tileSize,
            tileSize
        )
    })

    // Paint walls
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    gameState.board.walls.forEach(wall => {
        const isHorizontal = wall[0][0] === wall[1][0]

        const referenceTile = isHorizontal
            ? wall[0][1] > wall[1][1]
                ? wall[0]
                : wall[1]
            : wall[0][0] > wall[1][0]
            ? wall[0]
            : wall[1]

        context.beginPath()
        context.moveTo(referenceTile[0] * tileSize, referenceTile[1] * tileSize)
        context.lineTo(
            (referenceTile[0] + (isHorizontal ? 1 : 0)) * tileSize,
            (referenceTile[1] + (isHorizontal ? 0 : 1)) * tileSize
        )
        context.stroke()
    })
}

const pieceColours = {
    red: {
        robot: '#FC5225',
        highlight: '#fc844e',
    },
    yellow: {
        robot: '#F1F711',
        highlight: '#cecb67',
    },
    green: {
        robot: '#25a72d',
        highlight: '#6ca766',
    },
    blue: {
        robot: '#278cbb',
        highlight: '#72a3bb',
    },
    silver: {
        robot: '#9ea7a5',
        highlight: '#707977',
    },
}

const drawPieces = (
    context: CanvasRenderingContext2D,
    gameState: GameState,
    tileSize: number
) => {
    context.strokeStyle = '#000000'
    context.lineWidth = 1

    gameState.pieces.forEach(piece => {
        context.fillStyle = pieceColours[piece.colour].robot

        context.beginPath()
        context.arc(
            piece.coordinate[0] * tileSize + tileSize / 2,
            piece.coordinate[1] * tileSize + tileSize / 2,
            tileSize / 2 - tileSize * 0.2,
            0,
            Math.PI * 2
        )
        context.fill()
        context.stroke()
    })
}

const drawSelection = (
    context: CanvasRenderingContext2D,
    gameState: GameState,
    tileSize: number
) => {
    if (!gameState.selection.piece || gameState.gameComplete) {
        return
    }

    const selection = gameState.selection

    context.fillStyle = pieceColours[selection.piece.colour].highlight

    context.fillRect(
        selection.piece.coordinate[0] * tileSize + 1,
        selection.piece.coordinate[1] * tileSize + 1,
        tileSize - 2,
        tileSize - 2
    )

    for (const direction of Object.values(selection.possibleMoves)) {
        direction.forEach(tile => {
            context.fillRect(
                tile[0] * tileSize + 1,
                tile[1] * tileSize + 1,
                tileSize - 2,
                tileSize - 2
            )
        })
    }
}

const drawTarget = (
    context: CanvasRenderingContext2D,
    gameState: GameState,
    tileSize: number
) => {
    if(gameState.gameComplete){
        return
    }

    const targetX = gameState.target.coordinate[0]
    const targetY = gameState.target.coordinate[1]

    context.beginPath()
    context.moveTo(targetX * tileSize + tileSize / 2, targetY * tileSize + 4)

    context.lineTo(
        targetX * tileSize + tileSize - 4,
        targetY * tileSize + tileSize / 2
    )
    context.lineTo(
        targetX * tileSize + tileSize / 2,
        targetY * tileSize + tileSize - 4
    )
    context.lineTo(targetX * tileSize + 4, targetY * tileSize + tileSize / 2)
    context.closePath()

    const gradient = context.createRadialGradient(
        targetX * tileSize + tileSize / 2,
        targetY * tileSize + tileSize / 2,
        2,
        targetX * tileSize + tileSize / 2,
        targetY * tileSize + tileSize / 2,
        tileSize / 2 - 4
    )

    if (gameState.target.colour === 'any') {
        gradient.addColorStop(0, '#FFF')
        gradient.addColorStop(1, '#000')
    } else {
        gradient.addColorStop(0, '#FFF')
        gradient.addColorStop(1, pieceColours[gameState.target.colour].robot)
    }
    context.fillStyle = gradient
    context.fill()
}
