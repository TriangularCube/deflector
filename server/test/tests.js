const {generateBoard} = require('../src/data/boardGenerators/v1/creator.js')
const {generatePuzzleFromBoard} = require('../src/data/puzzleGenerators/v1')

// console.log(generatePuzzleFromBoard(generateBoard()))

const {makeNewGame, getNewestGame} = require('../src/gameTypes/classic')

makeNewGame().then(() => {
    getNewestGame().then(res => {
        console.log(res)
    })
})

