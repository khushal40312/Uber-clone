const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv')

dotenv.config();
async function getCaptainRides(userId) {
  const conn = await amqp.connect(process.env.AMQP_URL);
  const channel = await conn.createChannel();

  const replyQueue = await channel.assertQueue('', { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const rides = JSON.parse(msg.content.toString());
          resolve(rides);
          conn.close();
        }
      },
      { noAck: true }
    );
    const payload = {
      role: 'captain',      // or 'captain'
      id: userId
    };
    channel.sendToQueue('get_user_rides', Buffer.from(JSON.stringify(payload)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}

module.exports = getCaptainRides;