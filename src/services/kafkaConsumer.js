import { Kafka } from 'kafkajs';
import pool from '../config/db.js';

const kafka = new Kafka({
  clientId: 'polling-system',
  brokers: ['kafka:9092'], // Ensure this is accessible in your environment
});

const consumer = kafka.consumer({ groupId: 'poll-group' });

// Retry mechanism for Kafka consumer connection
const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka consumer connected');
  } catch (error) {
    console.error('Error connecting to Kafka:', error.message);
    setTimeout(connectConsumer, 5000); // Retry every 5 seconds
  }
};

connectConsumer();

// Function to consume messages
const consumeMessages = async (topic, wss) => {
  try {
    await consumer.subscribe({ topic });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { pollId, optionId } = JSON.parse(message.value.toString());

        try {
          // Update poll option votes in the database
          await pool.query(
            'UPDATE poll_options SET votes = votes + 1 WHERE id = $1',
            [optionId]
          );

          // Fetch poll and options from the database
          const pollResult = await pool.query(
            'SELECT id, question FROM polls WHERE id = $1',
            [pollId]
          );

          const options = await pool.query(
            'SELECT id, option_text, votes FROM poll_options WHERE poll_id = $1',
            [pollId]
          );

          const updatedPollData = {
            poll: pollResult.rows[0],
            options: options.rows,
          };

          // Broadcast updated poll data to WebSocket clients
          wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              try {
                client.send(JSON.stringify(updatedPollData));
              } catch (wsError) {
                console.error('WebSocket message send failed:', wsError.message);
              }
            }
          });
        } catch (error) {
          console.error('Error processing message:', error.message);
        }
      },
    });
  } catch (error) {
    console.error('Error consuming messages:', error.message);
  }
};

// Graceful shutdown for Kafka consumer on process termination
process.on('SIGINT', async () => {
  console.log('Shutting down Kafka consumer...');
  try {
    await consumer.disconnect();
    console.log('Kafka consumer disconnected');
  } catch (error) {
    console.error('Error disconnecting Kafka consumer:', error.message);
  }
  process.exit(0);
});

export default consumeMessages;
