const http = require('http')

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234')
    res.end('This is it!')
})

server.listen( 3000, () => {
    console.log('Server is running')
})
