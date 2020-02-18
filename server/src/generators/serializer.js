const serializeGameBoard = board => {

    let serializedString = ''

    board.walls.forEach( wall => {

        const wall1 = wall[0]
        const wall2 = wall[1]

        serializedString += wall1[0].toString(16)
        serializedString += wall1[1].toString(16)

        serializedString += wall2[0].toString(16)
        serializedString += wall2[1].toString(16)

    })

    serializedString += '+'

    board.goals.forEach( goal => {

        serializedString += goal.coordinate[0].toString(16)
        serializedString += goal.coordinate[1].toString(16)

        serializedString += goal.colour

    })

    serializedString += '+'

    board.notValid.forEach( coord => {

        serializedString += coord[0].toString(16)
        serializedString += coord[1].toString(16)

    })

    return serializedString

}

module.exports = {
    serializeGameBoard
}
