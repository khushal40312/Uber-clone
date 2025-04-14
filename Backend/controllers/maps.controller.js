const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const captainModel = require('../models/captain.model');

module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(500).json({ message: 'coordinate not found' })

    }


}
module.exports.getDistanceTime = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
 
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions)

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

    }
}
