const { AsyncNedb } = require('nedb-async')
const db = new AsyncNedb({filename: 'games.db', autoload: true })

// Auto Compaction
db.persistence.setAutocompactionInterval(60 * 60 * 1000) // Minutes * Seconds * Milliseconds

db.getNextId = async () => {
    let id = 1
    try {
        const highest = await db.asyncFindOne({}, [['sort', {_id:-1}]])
        if(highest){
            id = highest._id + 1
        }
    } catch ( err ) {
        // Some sort of database error
    }

    return id
}

const { generateBoard } = require('./generators/v1')

const makeNewGame = async () => {
    console.log('Make New Game Triggered!')

    const newBoard = generateBoard()

    const id = await db.getNextId()
    db.insert({
        _id: id,
        time: Date.now(),
        board: newBoard
    })
}

module.exports = {
    makeNewGame,
}
