const { validationResult } = require('express-validator');

const rideService = require('../services/ride.service')
const mapService = require('../services/maps.service');
const { setMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');



module.exports.createRide = async (req, res, next) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {

        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 1000)
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user")


        ride.otp = ''
        captainsInRadius.map(async captain => {
            setMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            })

        })
    } catch (err) {
        return res.status(500).json({ messsage: err.message });

    }
}
module.exports.getFare = async (req, res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination)

        return res.status(200).json(fare);
    }
    catch (err) {
        return res.status(500).json({ messsage: err.message });

    }


}
let locationInterval = {};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        setMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        // Start sending location updates every 10 minutes
        locationInterval[rideId] = setInterval(async () => {
            try {
                const updatedRide = await rideModel.findById(rideId).populate("captain");
                setMessageToSocketId(ride.user.socketId, {
                    event: 'location-update',
                    data: {
                        lat: updatedRide.captain.location.ltd,
                        lng: updatedRide.captain.location.lng
                    }
                });
            } catch (err) {
                console.error("Location update error:", err);
            }
        }, 10000); // 10 minutes in ms
        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        setMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        setMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        // Clear location update interval
        if (locationInterval[rideId]) {
            clearInterval(locationInterval[rideId]);
            delete locationInterval[rideId];
        }

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};