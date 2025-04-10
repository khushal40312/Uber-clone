
const axios = require('axios');
const captainModel = require('../models/captain.model')
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`


    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const results = response.data.results;

            if (results.length > 0 && results[0].geometry && results[0].geometry.location) {
                const { lat, lng } = results[0].geometry.location;
                return { lat, lng };
            } else {
                throw new Error('No valid location found');
            }
        } else {
            throw new Error(`API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};
module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error('Origin and destination are required')
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`


    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {

        throw new Error('query is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;


    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            return response.data.predictions
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    console.log(`Searching within radius ${radius}km at:`, { lat, lng });

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius / 6371]
            }
        }
    });

    console.log("Found captains:", captains);
    return captains;
};


