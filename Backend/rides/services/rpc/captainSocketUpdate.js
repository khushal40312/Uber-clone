const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv')

dotenv.config();
async function captainSocketUpdate(payload) {
   
  const conn = await amqp.connect(process.env.AMQP_URL);
  const channel = await conn.createChannel();

  const replyQueue = await channel.assertQueue('', { exclusive: true });
  const correlationId = uuidv4();

  return new Promise((resolve) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const user = JSON.parse(msg.content.toString());
          resolve(user);
          conn.close();
        }
      },
      { noAck: true }
    );
  
    channel.sendToQueue('get_captainSocketUpdate', Buffer.from(JSON.stringify(payload)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}

module.exports = captainSocketUpdate;