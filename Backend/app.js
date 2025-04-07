const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cookieParser = require("cookie-parser")
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const cors = require('cors')
const captianRoutes = require('./routes/captain.routes')

connectToDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hey')

})

app.use('/users', userRoutes)
app.use('/captains', captianRoutes)




module.exports = app;