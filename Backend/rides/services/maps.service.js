
const axios = require('axios');
const getCaptainNear = require('./getCaptain');
const captainModel = ''
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`


    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const results = response.data.results;
console.log(results)
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
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const data = JSON.stringify({
        origin: { address: origin },
        destination: { address: destination }
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://routes.gomaps.pro/directions/v2:computeRoutes',
        headers: {

            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey
        },
        data: data
    };

    try {
        const response = await axios(config);

        const leg = response.data.routes[0].legs[0];

        const legStart = leg.startLocation.latLng;
        const legEnd = leg.endLocation.latLng;
        const legDistance = leg.distanceMeters;
        const duration = Number(leg.duration.split("s")[0]);





        return {
            leg: {
                start: legStart,
                end: legEnd,
                distanceMeters: legDistance,
                duration

            },

        };
    } catch (error) {
        console.error("Error fetching route data:", error.message);
        throw error;
    }
};
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
    const captains = await getCaptainNear({lat,lng,radius})
  

    console.log("Found captains:", captains);
    return captains;
};