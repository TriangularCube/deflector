const uuid = require('uuid/v1')

const listOfConnections = {}

const connect = (req, res) => {
    // Get tokens in request
    const tokens = req.url.split('/').slice(2)

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
    let message = `event: initial\nretry: 5000\ndata: ${JSON.stringify(null)}\n\n\n`
    res.write(message)

    // DEBUG
    const tickID = setInterval( () => res.write(`event: tick\ndata: ${Date.now()}\n\n\n`), 1000)

    // Ping every 20 seconds to keep connection alive
    //  There doesn't need to be an actual handler for this event
    const pingID = setInterval(() => res.write(`event: ping\n\n\n`), 20000)

    req.on('close', () => {
        console.log(`Client ${clientID} has closed its connection`)

        // On connection close, kill the ping and remove from connection list
        delete listOfConnections[clientID]
        clearInterval(pingID)
    })
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
        res.writeHead(400, {
            'Access-Control-Allow-Origin': '*',
        })
        res.end(`Error decoding request. Messages: ${err}`)
    })
}

module.exports = {
    connect,
    submit
}
