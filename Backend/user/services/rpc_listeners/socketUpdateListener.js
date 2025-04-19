// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const userModel = require('../../models/user.model'); // your Mongoose model
require('dotenv').config();


const SOCKETUPDATE_QUEUE = 'get_userSocketUpdate';
async function startupdateSocketRPCServer() {

    const conn = await amqp.connect(process.env.AMQP_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(SOCKETUPDATE_QUEUE, { durable: false });

    channel.consume(SOCKETUPDATE_QUEUE, async (msg) => {
        try {
            const { userId, socketId } = JSON.parse(msg.content.toString());

            const user = await userModel.findByIdAndUpdate(userId, {
                socketId
            })

            channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify(user)),
                { correlationId: msg.properties.correlationId }
            );

            channel.ack(msg);
        } catch (error) {
            console.error('🚨 Error in rideListener:', error);
            channel.ack(msg);
        }
    });

    console.log(`🚀 Ride RPC Server is listening on queue "${SOCKETUPDATE_QUEUE}"`);
}

module.exports = startupdateSocketRPCServer;
