import deepcopy from 'deepcopy'

let currentGame = null

let currentPieces = null
let currentSelectedPiece = null

let moveList = []
let setMovelistInSidebar = null

export const SetupGame = (canvas, game, setMovelist) => {
    canvas.onclick = ClickHandler

    setMovelistInSidebar = setMovelist

    console.log(game)

    currentGame = game
    currentPieces = deepcopy(game.puzzle.pieces)

    requestAnimationFrame(() => Draw(canvas))
}

const Draw = canvas => {
    const context = canvas.getContext('2d')

    // TODO: If there is no game

    // Clear the Rect
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Find the Tile Sizes
    // TODO: Find tile size without resorting to only using width
    const tileSize = canvas.width / currentGame.board.size.x

    // Set Stroke and Fill styles for board
    context.strokeStyle = '#A4A4A3'
    context.lineWidth = 1

    // Loop through and paint the board
    for (let x = 0; x < currentGame.board.size.x; x++) {
        for (let y = 0; y < currentGame.board.size.y; y++) {
            // Paint the Tile
            context.fillStyle = '#F4DCBF'
            context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)

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

    // Paint the outside walls
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    context.strokeRect(0, 0, canvas.width, canvas.height)

    // Paint all invalid tiles
    context.fillStyle = '#000000'
    currentGame.board.notValid.forEach(tile => {
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
    currentGame.board.walls.forEach(wall => {
        const isHorizontal = wall[0][0] === wall[1][0]

        const referenceTile = isHorizontal
            ? wall[0][1] > wall[1][1]
                ? wall[0]
                : wall[1]
            : wall[0][0] > wall[1][0]
            ? wall[1]
            : wall[0]

        context.beginPath()
        context.moveTo(referenceTile[0] * tileSize, referenceTile[1] * tileSize)
        context.lineTo(
            (referenceTile[0] + (isHorizontal ? 1 : 0)) * tileSize,
            (referenceTile[1] + (isHorizontal ? 0 : 1)) * tileSize
        )
        context.stroke()
    })

    // Paint pieces
    context.strokeStyle = '#000000'
    context.lineWidth = 1
    drawPiece(context, currentGame.puzzle.pieces.red, '#FC5225', tileSize)
    drawPiece(context, currentGame.puzzle.pieces.yellow, '#F1F711', tileSize)
    drawPiece(context, currentGame.puzzle.pieces.green, '#25a72d', tileSize)
    drawPiece(context, currentGame.puzzle.pieces.blue, '#278cbb', tileSize)
    drawPiece(context, currentGame.puzzle.pieces.silver, '#9ea7a5', tileSize)
}

const drawPiece = (context, piece, color, tileSize) => {
    context.fillStyle = color

    context.beginPath()
    context.arc(
        piece[0] * tileSize + tileSize / 2,
        piece[1] * tileSize + tileSize / 2,
        tileSize / 2 - tileSize * 0.2,
        0,
        Math.PI * 2
    )
    context.fill()
    context.stroke()
}

const ClickHandler = evt => {
    console.log(evt.pageX, evt.pageY)
    console.log(evt.target.offsetLeft)

    const tileSize = evt.target.width / currentGame.board.size.x

    const clickedX = (evt.pageX - evt.target.offsetLeft) / tileSize
    const clickedY = (evt.pageY - evt.target.offsetTop) / tileSize



    moveList = [...moveList, { piece: 'green', direction: 'north' }]
    setMovelistInSidebar(moveList)

    // const res = await fetch(`${getTargetUrl()}/submit`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(['Data!']),
    // })
    // console.log(await res.text())
}

// Define the drawing algorithm
// const draw = timestamp => {
//     Draw(canvas, context)
//     animationID = requestAnimationFrame(draw)
// }

// Start drawing
// animationID = requestAnimationFrame(draw)

// Cancel animation on navigation away
// return () => {
// cancelAnimationFrame(animationID)
// }
