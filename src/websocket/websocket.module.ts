import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [WebsocketGateway],
  exports: [WebsocketGateway], // 👈 Make it available to other modules
})
export class WebsocketModule {}
