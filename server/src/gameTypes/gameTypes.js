const gameTypes = {
    classic: require('./classic'),
}

const ensureAllTypesExist = async () => {
    for (const type of Object.values(gameTypes)) {
        if ((await type.getNewestId()) === null) {
            await type.makeNewGame()
        }
    }
}

module.exports = {
    gameTypes,
    ensureAllTypesExist,
}
