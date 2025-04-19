// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const captainModel = require('../../models/captain.model'); // your Mongoose model
require('dotenv').config();


const SOCKETUPDATE_QUEUE = 'get_captainSocketUpdate';
async function startupdateSocketRPCServer() {

    const conn = await amqp.connect(process.env.AMQP_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(SOCKETUPDATE_QUEUE, { durable: false });

    channel.consume(SOCKETUPDATE_QUEUE, async (msg) => {
        try {
            const { userId, socketId, type,location } = JSON.parse(msg.content.toString());
            if (type === "socket-update") {

                const user = await captainModel.findByIdAndUpdate(userId, {
                    socketId
                })
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(user)),
                    { correlationId: msg.properties.correlationId }
                );

                channel.ack(msg);
                return;
            }else if (type==="location-update") {
                const user = await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    },
                })
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(user)),
                    { correlationId: msg.properties.correlationId }
                );

                channel.ack(msg);
            }


        } catch (error) {
            console.error('🚨 Error in rideListener:', error);
            channel.ack(msg);
        }
    });

    console.log(`🚀 Ride RPC Server is listening on queue "${SOCKETUPDATE_QUEUE}"`);
}

module.exports = startupdateSocketRPCServer;
