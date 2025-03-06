import { Module } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';
import { JobScheduler } from './job.scheduler';
import { AdsService } from '../ads/ads.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { RedisModule } from 'src/common/redis.module';

@Module({
  imports: [ScheduleModule.forRoot(), WebsocketModule, RedisModule], // Enable cron jobs
  providers: [PrometheusService, JobScheduler, AdsService],
})
export class JobsModule {}
