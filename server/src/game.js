const { AsyncNedb } = require('nedb-async')
const classicDB = new AsyncNedb({filename: 'games.db', autoload: true })

// Auto Compaction
classicDB.persistence.setAutocompactionInterval(60 * 60 * 1000) // Minutes * Seconds * Milliseconds

classicDB.getNextId = async () => {
    let id = 1
    try {
        const highest = await classicDB.asyncFindOne({}, [['sort', {_id:-1}]])
        if(highest){
            id = highest._id + 1
        }
    } catch ( err ) {
        // Some sort of database error
    }

    return id
}

const { generateBoard } = require('./data/boardGenerators/v1')
const { generatePuzzleFromBoard } = require('./data/puzzleGenerators/v1')

const getNewestGame = async () => {
    return await classicDB.asyncFindOne({}, [['sort', {_id: -1}]])
}

const makeNewGame = async () => {
    const newBoard = generateBoard()

    const id = await classicDB.getNextId()
    classicDB.insert({
        _id: id,
        time: Date.now(),
        board: newBoard,
        puzzle: generatePuzzleFromBoard(newBoard)
    })
}

module.exports = {
    makeNewGame,
    getNewestGame
}

// Make sure to seed the DB with at least one game
getNewestGame().then(res => {
    if( !res ){
        makeNewGame()
    }
})
