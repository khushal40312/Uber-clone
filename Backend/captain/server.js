const http = require('http')
const app = require("./app")
const startCaptainRPCServer = require('./services/rpc/captain.Listener')

const port = process.env.PORT||3002


const server = http.createServer(app)
startCaptainRPCServer()



server.listen(port, () => {


    console.log(`captain service is listening on ${port}`)
})