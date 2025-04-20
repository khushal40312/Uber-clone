const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cookieParser=require("cookie-parser")
const connectToDb = require('./db/db');
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes= require('./routes/ride.routes')
const cors = require('cors');



connectToDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())



app.use('/maps', mapsRoutes)
app.use('/', rideRoutes)




module.exports = app;