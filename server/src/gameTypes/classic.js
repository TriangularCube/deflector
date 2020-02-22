const {getDB} = require('./dbInterface')
const db = getDB('classic')

const { generateBoard } = require('../data/boardGenerators/v1')
const { generatePuzzleFromBoard } = require('../data/puzzleGenerators/v1')

const getNewestId = async () => {
    return await db.getHighestId()
}

const getGame = async (id) => {
    return await db.asyncFindOne({_id:id})
}

const makeNewGame = async () => {
    const newBoard = generateBoard()

    const id = await db.getNextId()

    db.insert({
        _id: id,
        time: Date.now(),
        board: newBoard,
        puzzle: generatePuzzleFromBoard(newBoard)
    })
}

module.exports = {
    makeNewGame,
    getNewestId,
    getGame
}

// Make sure to seed the DB with at least one game
getNewestId().then(res => {
    if( !res ){
        makeNewGame()
    }
})
