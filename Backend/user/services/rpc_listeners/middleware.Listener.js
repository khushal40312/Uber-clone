// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const jwt = require('jsonwebtoken');

const blacklistTokenModel = require('../../models/blacklistToken.model');
const userModel = require('../../models/user.model');
require('dotenv').config();


const MIDDLEWARE_QUEUE = 'get_user';
async function startMiddlewareRPCServer() {

    const conn = await amqp.connect(process.env.AMQP_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(MIDDLEWARE_QUEUE, { durable: false });

    channel.consume(MIDDLEWARE_QUEUE, async (msg) => {
        try {
            const token = msg.content.toString();
            
            const isBlacklisted = await blacklistTokenModel.findOne({ token })
           
            if (isBlacklisted) {
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'Unauthorized' })),
                    { correlationId: msg.properties.correlationId }
                );

                channel.ack(msg);
                return;
            }


            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded._id);

            if (!user) {
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify({ message: 'User not found' })),
                    { correlationId: msg.properties.correlationId }
                );
            } else {
                channel.sendToQueue(
                    msg.properties.replyTo,
                    Buffer.from(JSON.stringify(user)),
                    { correlationId: msg.properties.correlationId }
                );
            }
            channel.ack(msg);
        } catch (error) {
            console.error('🚨 Error in rideListener:', error);
            channel.sendToQueue(
                msg.properties.replyTo,
                Buffer.from(JSON.stringify({ message: 'Invalid or expired token' })),
                { correlationId: msg.properties.correlationId }
            );
            channel.ack(msg);

        }
    });

    console.log(`🚀 Middleware RPC Server is listening on queue "${MIDDLEWARE_QUEUE}"`);
}

module.exports = startMiddlewareRPCServer;
