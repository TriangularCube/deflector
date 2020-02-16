const uuid = require('uuid/v1')

const {currentGames} = require('./gameStates')

const listOfConnections = {}

const subscribe = (req, res) => {
    // Generate an ID for client
    const clientID = uuid()

    // First add connection to the list
    listOfConnections[clientID] = res

    console.log(`Client ${clientID} has connected`)

    // Headers necessary to use SSE
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
    })

    // Then send current state over
    let message = `event: initial\nretry: 5000\ndata: ${JSON.stringify(currentGames)}\n\n\n`
    res.write(message)

    // Ping every 20 seconds to keep connection alive
    //  There doesn't need to be an actual handler for this event
    const pingID = setInterval(() => res.write(`event: ping\n\n\n`), 20000)

    req.on('close', () => {
        // On connection close, kill the ping and remove from connection list
        console.log(`Client ${clientID} has closed its connection`)
        delete listOfConnections[clientID]

        clearInterval(pingID)
    })
}

const submit = (req, res) => {
    const chunks = []

    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', () => {
        const data = JSON.parse(chunks.join())

        // TODO: do something with data

        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
        })
        res.end('Okay!')
    })
}

module.exports = {
    subscribe,
    submit
}
