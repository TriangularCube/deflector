const {makeGame} = require('./game')

const games = []

// TODO: Load games from DB

const makeNewGame = () => {

    console.log('Make New Game Triggered!')
    console.log(makeGame())
    // TODO
}

module.exports = {
    currentGames: games,
    makeNewGame
}
