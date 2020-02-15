const http = require('http')

// const schedule = require('node-schedule')

// let j = schedule.scheduleJob( '*/1 * * * * *', () => {
//     console.log('tick')
// })

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234 https://www.deflector.io')
    res.end('This is it!')
})

server.listen( 3000, () => {
    console.log('Server is running')
    console.log(process.env.NODE_ENV)
})
