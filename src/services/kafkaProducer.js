import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'polling-system',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const produceMessage = async (topic, message) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    console.log('Message produced:', message);

    process.on('SIGINT', async () => {
      console.log('Disconnecting producer...');
      await producer.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error producing message:', error);
  }
};

export default produceMessage;
