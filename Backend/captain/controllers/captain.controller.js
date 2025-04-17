const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email })
    if (isCaptainAlreadyExist) {
        res.status(401).json({ message: "Captian already exists " })
    }
    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            vehicleType: vehicle.vehicleType,
            capacity: vehicle.capacity
        }

    })
    const token = captain.generateAuthToken();
    res.cookie('token', token)

    res.status(201).json({ token, captain })


}
module.exports.loginCaptian = async (req, res) => {


    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({ token, captain })
}
module.exports.getCaptainProfile = async (req, res) => {
console.log("ex:",req.captain._id )
    const rides = await rideModel.find({ captain: req.captain._id });

    res.status(200).json({
        captain: req.captain,
        rides

    })
}
module.exports.logoutCaptain = async (req, res, next) => {

    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({
        token
    });
    res.status(200).json({ message: 'Logged out' });
}