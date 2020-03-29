export const pieceColours = {
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

export const drawBoard = (context, board, tileSize) => {
    // Set Stroke and Fill styles for board
    context.strokeStyle = '#A4A4A3'
    context.lineWidth = 1

    for (let x = 0; x < board.size.x; x++) {
        for (let y = 0; y < board.size.y; y++) {
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

export const drawSelectedPieceAndMoves = (
    context,
    piece,
    tileSize,
    pieceColour,
    possibleMoves
) => {
    context.fillStyle = pieceColour.highlight
    context.fillRect(
        piece.coordinate[0] * tileSize + 1,
        piece.coordinate[1] * tileSize + 1,
        tileSize - 2,
        tileSize - 2
    )

    // TODO: All possible moves for this piece
    for (const direction of Object.values(possibleMoves)) {
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

export const drawTarget = (context, tileSize, target) => {
    const targetX = target.coordinate[0]
    const targetY = target.coordinate[1]

    const createTargetGradient = () => {
        const gradient = context.createRadialGradient(
            targetX * tileSize + tileSize / 2,
            targetY * tileSize + tileSize / 2,
            2,
            targetX * tileSize + tileSize / 2,
            targetY * tileSize + tileSize / 2,
            tileSize / 2 - 4
        )

        if (target.colour === 'any') {
            gradient.addColorStop(0, '#FFF')
            gradient.addColorStop(1, '#000')
        } else {
            gradient.addColorStop(0, '#FFF')
            gradient.addColorStop(1, pieceColours[target.colour].robot)
        }

        return gradient
    }

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

    // context.strokeStyle = '#FFF'
    // context.lineWidth = 3
    // context.stroke()

    context.fillStyle = createTargetGradient()
    context.fill()
}
