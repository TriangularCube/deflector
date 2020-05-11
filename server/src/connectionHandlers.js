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
        gameID: tokens[1],
    }

    console.log(`Client ${clientID} has connected`)

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

const broadcastNewGame = gameID => {
    for (const entry of Object.values(listOfConnections)) {
        entry.connection.write(`event: newGame\ndata: ${gameID}`)
    }
}

const submit = (req, res) => {
    // A solution has been submitted!

    // Gather data chunks
    const chunks = []
    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', () => {
        // Get the final JSON
        const data = JSON.parse(chunks.join())

        // TODO: do something with data

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
    broadcastNewGame,
}

const badRequest = (res, message) => {
    res.writeHead(400, {
        'Access-Control-Allow-Origin': '*',
    })
    res.end(message)
}
