import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsResolver } from './ads.resolver';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { RedisService } from 'src/common/redis.service';
import { RedisModule } from 'src/common/redis.module';

@Module({
  imports: [RedisModule],
  providers: [AdsService, AdsResolver, WebsocketGateway, RedisService],
  exports: [AdsService],
})
export class AdsModule {}
