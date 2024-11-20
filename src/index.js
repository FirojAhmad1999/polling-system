import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import db from './config/db.js';
import pollRoutes from './routes/pollRoutes.js';
import startWebSocketServer from './websocket/websocket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/api', pollRoutes);

startWebSocketServer(server);

const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();
  const PORT = process.env.PORT || 3002;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server shut down.');
    process.exit(0);
  });
});
