const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv')

dotenv.config();
async function getMiddleware(token) {
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
        }
      },
      { noAck: true }
    );

    
    
    channel.sendToQueue('get_user', Buffer.from(token), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}
async function getCaptainMiddleware(token) {
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
        }
      },
      { noAck: true }
    );

    
    
    channel.sendToQueue('get_captain_middleware', Buffer.from(token), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}
module.exports = {getCaptainMiddleware,getMiddleware};