const generateRandomCoordinate = (board, blacklist) => {
    let x, y

    do {
        x = Math.floor(Math.random() * board.size.x)
        y = Math.floor(Math.random() * board.size.y)
    } while (
        board.notValid.some(element => element[0] === x && element[1] === y) ||
        board.goals.some(element => element[0] === x && element[1] === y) ||
        (blacklist &&
            blacklist.some(element => element[0] === x && element[1] === y))
    )

    return [x, y]
}

const generatePuzzleFromBoard = board => {
    const puzzle = {}

    puzzle.target = board.goals[Math.floor(Math.random() * board.goals.length)]

    puzzle.pieces = []

    for (const colour of ['red', 'green', 'blue', 'yellow', 'silver']) {
        const blacklist = puzzle.pieces.map(element => element.coordinate)
        blacklist.push(puzzle.target.coordinate)

        puzzle.pieces.push({
            colour,
            coordinate: generateRandomCoordinate(board, blacklist),
        })
    }

    // TODO make sure generated puzzle can't be solved in less than X moves

    return puzzle
}

module.exports = {
    generatePuzzleFromBoard,
}
