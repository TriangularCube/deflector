const generatePuzzleFromBoard = board => {

    const puzzle = {}

    puzzle.target = board.goals[Math.floor(Math.random() * board.goals.length)]

    puzzle.pieces = [
        {color: 'red', coordinate: generateRandomCoordinate(board)},
        {color: 'green', coordinate: generateRandomCoordinate(board)},
        {color: 'blue', coordinate: generateRandomCoordinate(board)},
        {color: 'yellow', coordinate: generateRandomCoordinate(board)},
        {color: 'silver', coordinate: generateRandomCoordinate(board)},
    ]

    // TODO make sure generated puzzle can't be solved in less than X moves

    return puzzle

}

module.exports = {
    generatePuzzleFromBoard,
}

const generateRandomCoordinate = board => {
    let x, y

    do {
        x = Math.floor(Math.random() * board.size.x)
        y = Math.floor(Math.random() * board.size.y)
    } while (
        board.notValid.some(element => element[0] === x && element[1] === y)
        || board.goals.some(element => element[0] === x && element[1] === y)
    )

    return [x, y]
}
