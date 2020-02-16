const {makeGame} = require('./game')

const games = []

// TODO: Load games from DB

const updateNewGame = () => {
    games.push(makeGame())
}

module.exports = {
    currentGames: games,
    updateNewGame
}
