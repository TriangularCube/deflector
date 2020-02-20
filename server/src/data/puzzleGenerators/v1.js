const generatePuzzleFromBoard = board => {

    console.log(generateRandomCoordinate(board))

    

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
