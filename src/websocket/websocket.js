import { WebSocketServer } from 'ws';

const startWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    ws.send('Welcome to the poll system!');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

  wss.on('error', (err) => {
    console.error('WebSocket server error:', err);
  });

  return wss;
};

export default startWebSocketServer;
