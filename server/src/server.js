const http = require('http')

// TODO Load Game State

// Fire off scheduling
require('./schedule')

const {connect, submit} = require('./requestHandlers')

const server = http.createServer((req, res) => {

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

    // Register for all puzzle endpoints
    if (req.method === 'GET' && req.url.includes( '/puzzle' ) ) {
        connect(req, res)
        return
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
