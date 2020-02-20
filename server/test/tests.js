const {generateBoard} = require('../src/data/boardGenerators/v1')
const {generatePuzzleFromBoard} = require('../src/data/puzzleGenerators/v1')

// console.log(generatePuzzleFromBoard(generateBoard()))

const {makeNewGame, getNewestGame} = require('../src/gameManagement')

makeNewGame().then(() => {
    getNewestGame().then(res => {
        console.log(res)
    })
})

