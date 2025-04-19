// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const userModel = require('../../models/user.model'); // your Mongoose model
require('dotenv').config();


const USERINFO_QUEUE = 'get_userInfo';
async function startuserInfoRPCServer() {

    const conn = await amqp.connect(process.env.AMQP_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(USERINFO_QUEUE, { durable: false });

    channel.consume(USERINFO_QUEUE, async (msg) => {
        try {
            const id = msg.content.toString();
            const user = await userModel.findById(id)
            console.log(user)
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

    console.log(`🚀 Ride RPC Server is listening on queue "${USERINFO_QUEUE}"`);
}

module.exports = startuserInfoRPCServer;
