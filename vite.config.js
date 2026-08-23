import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { WebSocketServer } from 'ws'

const localChatSocketPlugin = () => ({
  name: 'local-chat-socket',
  configureServer(server) {
    if (!server.httpServer) return;
    
    const wss = new WebSocketServer({ noServer: true });
    
    server.httpServer.on('upgrade', (request, socket, head) => {
      const url = new URL(request.url, `http://${request.headers.host}`);
      if (url.pathname === '/chat-sync') {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      }
    });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        // Broadcast incoming message to all other connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) { // 1 = OPEN
            client.send(message.toString());
          }
        });
      });
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localChatSocketPlugin()],
})
