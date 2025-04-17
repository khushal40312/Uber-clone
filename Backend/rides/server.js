const http = require('http')
const app = require("./app")
const { initializeSocket } = require('./socket')
const port = process.env.PORT||3003 


const server = http.createServer(app)


initializeSocket(server)

server.listen(port, () => {


    console.log(`ride service is listening on ${port}`)
})