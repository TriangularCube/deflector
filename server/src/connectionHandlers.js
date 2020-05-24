const { v1: uuid } = require('uuid')

const { gameTypes } = require('./gameTypes/gameTypes.js')

const listOfConnections = {}

const latest = async (req, res) => {
    // Get tokens in request
    const tokens = req.url.split('/').slice(2)

    // Get Game Type
    const type = gameTypes[tokens[0]]
    if (!type) {
        badRequest(res, 'No such game type')
        return
    }

    const latest = await type.getNewestId()
    if (!latest) {
        res.writeHead(500, {
            'Access-Control-Allow-Origin': '*',
        })
        res.end('No games exist for this type')
        return
    }

    // Return a 200 OKAY message
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
    })
    res.end(latest.toString())
}

const connect = async (req, res) => {
    // Get tokens in request
    const tokens = req.url.split('/').slice(2)

    // Get Game Type
    const type = gameTypes[tokens[0]]
    if (!type) {
        badRequest(res, 'No such game type')
        return
    }

    // Get the game
    const gameID = parseInt(tokens[1])
    if (!gameID) {
        badRequest(res, `ID can't be parsed`)
        return
    }
    const game = await type.getGame(gameID)
    if (!game) {
        badRequest(res, 'No such game ID')
        return
    }

    // Generate an ID for client
    const clientID = uuid()

    // First add connection to the list
    listOfConnections[clientID] = {
        connection: res,
        gameType: tokens[0],
        gameID: parseInt(tokens[1]),
    }

    console.log(`Client ${clientID} has connected for ${tokens[0]} ${tokens[1]}`)

    // Headers necessary to use SSE
    res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',

        // Turn off buffering on Nginx
        // https://serverfault.com/questions/801628/for-server-sent-events-sse-what-nginx-proxy-configuration-is-appropriate
        'X-Accel-Buffering': 'no',
    })

    // Then send current state over
    const message = `event: initial\nretry: 5000\ndata: ${JSON.stringify(
        game
    )}\n\n\n`
    res.write(message)

    // Ping every 20 seconds to keep connection alive
    //  There doesn't need to be an actual handler for this event
    const heartbeatID = setInterval(() => {
        res.write(`event: heartbeat\n\n\n`)
    }, 20000)

    req.on('close', () => {
        console.log(`Client ${clientID} has closed its connection`)

        // On connection close, kill the ping and remove from connection list
        delete listOfConnections[clientID]
        clearInterval(heartbeatID)
    })
}

const submit = (req, res) => {
    // A solution has been submitted!

    // Gather data chunks
    const chunks = []
    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', async () => {
        // Get the final JSON
        const data = JSON.parse(chunks.join())

        // TODO: do something with data
        const gameType = gameTypes[data.gameType]

        if (gameType == null) {
            badRequest(res, "No such game type")
            return
        }

        const dataToInsert = {
            moveHistory: data.moveHistory,
            name: data.name.length < 1 ? 'Anonymous' : data.name,
            time: new Date()
        }

        const success = await gameType.addNewSolution(data.gameId, dataToInsert)

        if (!success) {
            res.writeHead(500, {
                'Access-Control-Allow-Origin': '*',
            })
            res.end('Server Side Error')
            return
        }

        const game = await gameType.getGame(data.gameId)
        const leaderboard = game.leaderboard

        // TODO: Notify
        const filtered = Object.values(listOfConnections).filter(element =>
            element.gameType === data.gameType && element.gameID === data.gameId)

        filtered.forEach(conn => {
            conn.connection.write(`event: leaderboard\ndata: ${JSON.stringify(leaderboard)}\n\n`)
        })

        // Return a 200 OKAY message
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
        })
        res.end('Okay!')
    })

    // TODO: Preliminary error code for now
    req.on('error', err => {
        badRequest(res, `Error decoding body, ${err}`)
    })
}

module.exports = {
    latest,
    connect,
    submit,
}

const badRequest = (res, message) => {
    res.writeHead(400, {
        'Access-Control-Allow-Origin': '*',
    })
    res.end(message)
}
