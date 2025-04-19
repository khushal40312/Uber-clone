// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const captainModel = require('../../models/captain.model');

require('dotenv').config();


const CAPTAIN_QUEUE = 'get_captain';
async function startCaptainRPCServer() {

    const conn = await amqp.connect(process.env.AMQP_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(CAPTAIN_QUEUE, { durable: false });

    channel.consume(CAPTAIN_QUEUE, async (msg) => {
        try {
            const location = JSON.parse(msg.content.toString());
            const captains = await captainModel.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [[location.lat, location.lng], location.radius / 6371]
                    }
                }
            });
            channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify(captains)),
                { correlationId: msg.properties.correlationId }
            );

            channel.ack(msg);
        } catch (error) {
            console.error('🚨 Error in rideListener:', error);
            channel.ack(msg);
        }
    });

    console.log(`🚀 Ride RPC Server is listening on queue "${CAPTAIN_QUEUE}"`);
}

module.exports = startCaptainRPCServer;
