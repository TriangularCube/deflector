const deepcopy = require('deepcopy')

const rotateQuad = (quad, times) => {
    const newQuad = deepcopy(quad)

    // Rotate quad X times based on position
    for (let i = 0; i < times; i++) {
        // For each wall
        newQuad.walls.forEach(wall => {
            // For each coordinate in a wall pair
            wall.forEach((coord, index, thisArray) => {
                // Modify the coordinate
                thisArray[index] = rotateCoord(coord)
            })
        })

        newQuad.goals.forEach((goal, index, thisArray) => {
            thisArray[index].coordinate = rotateCoord(goal.coordinate)
        })

        newQuad.notValid.forEach((element, index, thisArray) => {
            thisArray[index] = rotateCoord(element)
        })
    }

    return newQuad
}

const rotateCoord = coord => {
    // Clockwise rotation is [ 7 - y, x ]
    return [7 - coord[1], coord[0]]
}

const shiftQuad = (quad, x, y) => {
    const newQuad = deepcopy(quad)

    // For each wall
    newQuad.walls.forEach(wall => {
        // For each coordinate in a wall pair
        wall.forEach((coord, index, thisArray) => {
            // Modify the coordinate
            thisArray[index] = shiftCoord(coord, x, y)
        })
    })

    newQuad.goals.forEach((goal, index, thisArray) => {
        thisArray[index].coordinate = shiftCoord(goal.coordinate, x, y)
    })

    newQuad.notValid.forEach((element, index, thisArray) => {
        thisArray[index] = shiftCoord(element, x, y)
    })

    return newQuad
}

const shiftCoord = (coord, x, y) => {
    return [coord[0] + x, coord[1] + y]
}

module.exports = {
    rotateQuad,
    shiftQuad,
}
