const captainModel = require('../models/captain.model')

module.exports.createUser = async ({
    firstname, lastname, email, password, vehicle

}) => {
    if (!firstname, !email, !password, !vehicle) {
        throw new Error('All fields are required')

    }
    const captain = captainModel.create({

        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle

    })
    return captain;


}