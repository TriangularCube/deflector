const http = require('http')

// TODO Load Game State

// Fire off scheduling
require('./schedule')

const {subscribe, submit} = require('./subscriptionHandler')

const server = http.createServer((req, res) => {

    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        })

        res.end()
        return
    }

    if (req.method === 'GET' && req.url === '/subscribe') {
        subscribe(req, res)
        return
    }

    if (req.method === 'POST' && req.url === '/submit') {
        console.log('Post detected')
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
