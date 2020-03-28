import deepcopy from 'deepcopy'

const pieceColors = {
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

let currentCanvas = null
let currentGame = null

let currentPieces = null
let currentSelectedPiece = null
const currentPossibleMoves = { north: [], east: [], south: [], west: [] }

let moveList = []
let setMovelistInSidebar = null

let gameComplete = false

export const SetupGame = (canvas, game, setMovelist) => {
    resetGame()

    canvas.onclick = ClickHandler

    moveList = []
    setMovelistInSidebar = setMovelist

    console.log(game)

    currentCanvas = canvas
    currentGame = game
    currentPieces = deepcopy(game.puzzle.pieces)

    requestAnimationFrame(() => Draw(canvas))
}

const resetGame = () => {
    moveList = []
    setMovelistInSidebar = null

    currentCanvas = null
    currentGame = null
    currentPieces = null

    currentSelectedPiece = null
    Object.keys(currentPossibleMoves).forEach(
        direction => (currentPossibleMoves[direction] = [])
    )

    gameComplete = false
}

const Draw = () => {
    if (!currentCanvas) {
        return
    }

    const context = currentCanvas.getContext('2d')

    // TODO: If there is no game

    // Clear the Rect
    context.clearRect(0, 0, currentCanvas.width, currentCanvas.height)

    // Find the Tile Sizes
    // TODO: Find tile size without resorting to only using width
    const tileSize = currentCanvas.width / currentGame.board.size.x

    // Set Stroke and Fill styles for board
    context.strokeStyle = '#A4A4A3'
    context.lineWidth = 1

    // Loop through and paint the board
    for (let x = 0; x < currentGame.board.size.x; x++) {
        for (let y = 0; y < currentGame.board.size.y; y++) {
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

    if (!gameComplete) {
        // Paint selection and moves (below walls)
        if (currentSelectedPiece) {
            context.fillStyle =
                pieceColors[currentSelectedPiece.colour].highlight
            context.fillRect(
                currentSelectedPiece.coordinate[0] * tileSize + 1,
                currentSelectedPiece.coordinate[1] * tileSize + 1,
                tileSize - 2,
                tileSize - 2
            )

            // TODO: All possible moves for this piece
            for (const direction of Object.values(currentPossibleMoves)) {
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

        // Paint Target
        const createTargetGradient = () => {
            const gradient = context.createRadialGradient(
                currentGame.puzzle.target.coordinate[0] * tileSize +
                    tileSize / 2,
                currentGame.puzzle.target.coordinate[1] * tileSize +
                    tileSize / 2,
                2,
                currentGame.puzzle.target.coordinate[0] * tileSize +
                    tileSize / 2,
                currentGame.puzzle.target.coordinate[1] * tileSize +
                    tileSize / 2,
                tileSize / 2 - 4
            )

            if (currentGame.puzzle.target.colour === 'any') {
                gradient.addColorStop(0, '#FFF')
                gradient.addColorStop(1, '#000')
            } else {
                gradient.addColorStop(0, '#FFF')
                gradient.addColorStop(
                    1,
                    pieceColors[currentGame.puzzle.target.colour].robot
                )
            }

            return gradient
        }

        {
            const targetX = currentGame.puzzle.target.coordinate[0]
            const targetY = currentGame.puzzle.target.coordinate[1]

            context.beginPath()
            context.moveTo(
                targetX * tileSize + tileSize / 2,
                targetY * tileSize + 4
            )

            context.lineTo(
                targetX * tileSize + tileSize - 4,
                targetY * tileSize + tileSize / 2
            )
            context.lineTo(
                targetX * tileSize + tileSize / 2,
                targetY * tileSize + tileSize - 4
            )
            context.lineTo(
                targetX * tileSize + 4,
                targetY * tileSize + tileSize / 2
            )
            context.closePath()

            // context.strokeStyle = '#FFF'
            // context.lineWidth = 3
            // context.stroke()

            context.fillStyle = createTargetGradient()
            context.fill()
        }
    }

    // Paint the outside walls
    context.strokeStyle = '#000000'
    context.lineWidth = 5
    context.strokeRect(0, 0, currentCanvas.width, currentCanvas.height)

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

    // Paint pieces

    const DrawPiece = (piece, color) => {
        context.fillStyle = color

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
    }
    context.strokeStyle = '#000000'
    context.lineWidth = 1

    currentPieces.forEach(piece => {
        DrawPiece(piece, pieceColors[piece.colour].robot)
    })
}

const ClickHandler = evt => {
    const tileSize = evt.target.width / currentGame.board.size.x

    const clickedX = Math.floor((evt.pageX - evt.target.offsetLeft) / tileSize)
    const clickedY = Math.floor((evt.pageY - evt.target.offsetTop) / tileSize)

    // If clicked area is in possible moves
    let clickedOnMove = null
    for (const direction of Object.keys(currentPossibleMoves)) {
        const filter = currentPossibleMoves[direction].filter(
            possibleMove =>
                possibleMove[0] === clickedX && possibleMove[1] === clickedY
        )
        if (filter.length > 0) {
            clickedOnMove = true

            // Move piece
            const line = currentPossibleMoves[direction]
            currentSelectedPiece.coordinate = line[line.length - 1]

            moveList.push({ piece: currentSelectedPiece.colour, direction })
            setMovelistInSidebar([...moveList])

            if (
                currentSelectedPiece.colour ===
                    currentGame.puzzle.target.colour &&
                currentSelectedPiece.coordinate[0] ===
                    currentGame.puzzle.target.coordinate[0] &&
                currentSelectedPiece.coordinate[1] ===
                    currentGame.puzzle.target.coordinate[1]
            ) {
                // Yup, hit our target
                gameComplete = true
            }
        }
    }

    if (!clickedOnMove) {
        // Otherwise find if clicked on piece
        currentSelectedPiece = currentPieces.find(
            element =>
                element.coordinate[0] === clickedX &&
                element.coordinate[1] === clickedY
        )
    }

    // Clear previous possible moves
    Object.keys(currentPossibleMoves).forEach(
        direction => (currentPossibleMoves[direction] = [])
    )

    calculatePossibleMoves()

    requestAnimationFrame(Draw)
}

const calculatePossibleMoves = () => {
    // Calculate all possible moves
    if (!currentSelectedPiece) {
        return
    }

    // Iterate through all 4 directions
    for (const originalDirection of Object.keys(currentPossibleMoves)) {
        // Keeping this variable for future implementation of Mirror Walls
        const currentDirection = originalDirection
        let currentNode = currentSelectedPiece.coordinate

        do {
            const nextNode = getNextNode(currentNode, currentDirection)

            if (nextNode) {
                currentPossibleMoves[originalDirection].push(nextNode)
            }

            currentNode = nextNode
        } while (currentNode)
    }
}

const getNextNode = (currentNode, direction) => {
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
        nextNode[0] >= currentGame.board.size.x ||
        nextNode[0] < 0 ||
        nextNode[1] >= currentGame.board.size.y ||
        nextNode[1] < 0
    ) {
        return null
    }

    return isBlocked(currentNode, nextNode) ? null : nextNode
}

const isBlocked = (current, next) => {
    // Check for Non-Valid tiles
    const filterNotValid = currentGame.board.notValid.filter(
        deadTile => next[0] === deadTile[0] && next[1] === deadTile[1]
    )
    if (filterNotValid.length > 0) {
        return true
    }

    // Check for other pieces
    const filterPieces = currentPieces.filter(
        piece =>
            piece.colour !== currentSelectedPiece.colour &&
            piece.coordinate[0] === next[0] &&
            piece.coordinate[1] === next[1]
    )
    if (filterPieces.length > 0) {
        return true
    }

    // Check for Walls
    const filterWalls = currentGame.board.walls.filter(wall => {
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

    if (filterWalls.length !== 0) {
        return true
    }

    return false
}
