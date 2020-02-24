const http = require('http')

// TODO Load Game State

// Fire off scheduling
require('./schedule')

const {latest, connect, submit} = require('./connectionHandlers')

const server = http.createServer(async  (req, res) => {

    // Allow all OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })

        res.end()
        return
    }

    if( req.method === 'GET' ){

        // Register for all puzzle endpoints
        if (req.url.startsWith( '/puzzle' ) ) {
            connect(req, res)
            return
        }

        // Register for getting latest
        if (req.url.startsWith('/latest') ) {
            latest(req, res)
            return
        }

    }


    // Register for submit
    if (req.method === 'POST' && req.url === '/submit') {
        submit(req, res)
        return
    }

    // Else
    res.writeHead(404, {
        'Access-Control-Allow-Origin': '*'
    })
    res.end('Cannot find location')
})

server.listen(3000, () => {
    console.log('Server is running')
})
