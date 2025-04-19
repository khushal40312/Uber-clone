// userService/rpc/getUserRides.js
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function getCaptainNear(payload) {
  const conn = await amqp.connect(process.env.AMQP_URL);
  const channel = await conn.createChannel();

  const replyQueue = await channel.assertQueue('', { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const captain = JSON.parse(msg.content.toString());
          resolve(captain);
          conn.close(); // Close connection after response
        }
      },
      { noAck: true }
    );

    channel.sendToQueue('get_captain', Buffer.from(JSON.stringify(payload)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}

module.exports = getCaptainNear;
