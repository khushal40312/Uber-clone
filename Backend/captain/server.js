const http = require('http')
const app = require("./app")
const startCaptainRPCServer = require('./services/rpc_listeners/captain.Listener')
const startupdateSocketRPCServer = require('./services/rpc_listeners/socketUpdateListener')
const startMiddlewareRPCServer = require('./services/rpc_listeners/middleware.Listeners')

const port = process.env.PORT||3002


const server = http.createServer(app)
startCaptainRPCServer()
startupdateSocketRPCServer()
startMiddlewareRPCServer()


server.listen(port, () => {


    console.log(`captain service is listening on ${port}`)
})