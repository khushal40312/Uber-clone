const http = require('http')
const app = require("./app")
const startMiddlewareRPCServer = require('./services/rpc/middleware.Listener')
const startuserInfoRPCServer = require('./services/rpc/userInfoListener')
const startupdateSocketRPCServer = require('./services/rpc/socketUpdateListener')

const port = process.env.PORT || 3001


const server = http.createServer(app)
startMiddlewareRPCServer()

startuserInfoRPCServer()
startupdateSocketRPCServer();

server.listen(port, () => {


    console.log(`server is listening on ${port}`)
})