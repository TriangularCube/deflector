const {generateBoard} = require('../src/data/boardGenerators/v1/creator.js')
const {generatePuzzleFromBoard} = require('../src/data/puzzleGenerators/v1')
const {solve} = require('../src/data/utils/solver.js')

// const test = async () => {
//     const board = generateBoard()
//     const puzzle = generatePuzzleFromBoard(board)
//
//     console.log(board, puzzle)
// }
// test()

const testSolve = async () => {
    const board = generateBoard()
    const puzzle = generatePuzzleFromBoard(board)
    const solved = solve(board, puzzle, 5, 25)
}
testSolve()
