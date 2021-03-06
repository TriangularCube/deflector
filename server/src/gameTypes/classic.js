const { getDB } = require('./dbInterface')
const db = getDB('classic')
const { generateBoard } = require('../data/boardGenerators/v1/creator.js')
const { generatePuzzleFromBoard } = require('../data/puzzleGenerators/v1.js')

const getNewestId = async () => {
    return await db.getHighestId()
}

const getGame = async id => {
    const game = await db.asyncFindOne({ _id: id })
    if (!game) {
        return null
    }

    game.type = 'classic'
    return game
}

const makeNewGame = async () => {
    const newBoard = generateBoard()

    const id = await db.getNextId()

    await db.asyncInsert({
        _id: id,
        time: Date.now(),
        board: newBoard,
        leaderboard: [],
        puzzle: generatePuzzleFromBoard(newBoard),
    })

    return id
}

const addNewSolution = async (id, solution) => {
    try {
        await db.asyncUpdate({_id: id}, {'$push': {leaderboard: solution}})
        return true
    } catch ( e ) {
        return false
    }
}

module.exports = {
    makeNewGame,
    getNewestId,
    getGame,
    addNewSolution,
}
