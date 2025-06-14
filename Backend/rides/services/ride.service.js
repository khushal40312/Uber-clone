const rideModel = require('../models/ride.model')
const mapService = require('./maps.service')
const crypto = require('crypto');
const getCaptainNear = require('./rpc/getCaptain');
const getUser = require('./rpc/getUser');
async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and Destination are Required')

    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination)


    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.leg.distanceMeters / 1000) * perKmRate.auto) + ((distanceTime.leg.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.leg.distanceMeters / 1000) * perKmRate.car) + ((distanceTime.leg.duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.leg.distanceMeters / 1000) * perKmRate.moto) + ((distanceTime.leg.duration / 60) * perMinuteRate.moto))
    };

    return { fare, distanceTime };


}
module.exports.getFare = getFare;
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fareWithDistance = await getFare(pickup, destination)


    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fareWithDistance.fare[vehicleType],
        distance: fareWithDistance.distanceMeters,
        start: fareWithDistance.distanceTime.leg.start,
        end: fareWithDistance.distanceTime.leg.end,
    })


    return ride;
}
module.exports.confirmRide = async ({
    rideId, captaiN
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captaiN._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).select('+otp')
    const userInfo = await getUser(ride.user)
    const captain = await getCaptainNear({ id: captaiN._id, type: "get-captain-info" })


    if (!ride) {
        throw new Error('Ride not found');
    }

    return { ride, user: userInfo, captain };

}
module.exports.startRide = async ({ rideId, otp, captaiN }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).select('+otp')
    const userInfo = await getUser(ride.user)
    const captain = await getCaptainNear({ id: captaiN._id, type: "get-captain-info" })
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return { ride, user: userInfo, captain };

}
module.exports.endRide = async ({ rideId, captaiN }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

 
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captaiN._id

    }).select('+otp')
    const userInfo = await getUser(ride.user)
    const captain = await getCaptainNear({ id: captaiN._id, type: "get-captain-info" })
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return { ride, user: userInfo, captain };

}