const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()


app.use('/users', expressProxy('http://localhost:3001'))
app.use('/captain', expressProxy('http://localhost:3002'))
app.use('/rides', expressProxy('http://localhost:3003'))

app.get('/',(req, res) => {
    res.send("hello")

})
app.listen(3000, () => {
    console.log('Gateway server listening on port 3000')
})