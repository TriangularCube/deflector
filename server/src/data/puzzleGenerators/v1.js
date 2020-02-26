const generatePuzzleFromBoard = board => {

    const puzzle = {}

    puzzle.target = board.goals[Math.floor(Math.random() * board.goals.length)]

    puzzle.pieces = [
        {colour: 'red', coordinate: generateRandomCoordinate(board)},
        {colour: 'green', coordinate: generateRandomCoordinate(board)},
        {colour: 'blue', coordinate: generateRandomCoordinate(board)},
        {colour: 'yellow', coordinate: generateRandomCoordinate(board)},
        {colour: 'silver', coordinate: generateRandomCoordinate(board)},
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
