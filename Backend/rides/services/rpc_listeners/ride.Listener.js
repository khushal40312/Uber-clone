// rideService/rpc/rideListener.js
const amqp = require('amqplib');
const rideModel = require('../../models/ride.model'); // your Mongoose model
require('dotenv').config();


const RIDE_QUEUE = 'get_user_rides';
async function startRideRPCServer() {
  
  const conn = await amqp.connect(process.env.AMQP_URL);
  const channel = await conn.createChannel();

  await channel.assertQueue(RIDE_QUEUE, { durable: false });

  channel.consume(RIDE_QUEUE, async (msg) => {
    try {
      const { role, id } = JSON.parse(msg.content.toString());

      let rides;
console.log(id)
      if (role === 'user') {
        rides = await rideModel.find({ user: id });
      } else if (role === 'captain') {
        rides = await rideModel.find({ captain: id });
      } else {
        rides = [];
      }

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(rides)),
        { correlationId: msg.properties.correlationId }
      );

      channel.ack(msg);
    } catch (error) {
      console.error('🚨 Error in rideListener:', error);
      channel.ack(msg);
    }
  });

  console.log(`🚀 Ride RPC Server is listening on queue "${RIDE_QUEUE}"`);
}

module.exports = startRideRPCServer;
