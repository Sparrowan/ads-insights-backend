import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('🚀 WebSocket server initialized on port 8080');
  }

  handleConnection(client: Socket) {
    console.log(`✅ Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }
  sendUpdate(data: any) {
    console.log('Socket data updated', data);
    this.server.emit('adsDataUpdate', data);
  }
}
