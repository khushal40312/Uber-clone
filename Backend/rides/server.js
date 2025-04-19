const http = require('http')
const app = require("./app")
const { initializeSocket } = require('./socket')
const startRideRPCServer = require('./services/rpc_listeners/ride.Listener')
const port = process.env.PORT||3003 


const server = http.createServer(app)


initializeSocket(server)
startRideRPCServer()
server.listen(port, () => {


    console.log(`ride service is listening on ${port}`)
})