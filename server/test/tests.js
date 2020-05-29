const {generateBoard} = require('../src/data/boardGenerators/v1/creator.js')
const {generatePuzzleFromBoard} = require('../src/data/puzzleGenerators/v1')

// console.log(generatePuzzleFromBoard(generateBoard()))

const test = async () => {
    const board = generateBoard()
    const puzzle = generatePuzzleFromBoard(board)

    console.log(board, puzzle)
}
test()

