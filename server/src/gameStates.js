const { AsyncNedb } = require('nedb-async')
const db = new AsyncNedb({filename: 'games.db', autoload: true })

// Auto Compaction
db.persistence.setAutocompactionInterval(60 * 60 * 1000) // Minutes * Seconds * Milliseconds

// TODO: Load games from DB

const { generateGameBoard } = require('./boardGenerator')

const makeNewGame = () => {
    console.log('Make New Game Triggered!')
    console.log(generateGameBoard())
    // TODO
}

module.exports = {
    makeNewGame,
}
