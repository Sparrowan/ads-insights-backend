import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { PrometheusModule } from './prometheus/prometheus.module';
import { MetricsController } from './prometheus/metrics.controller';
import { JobsModule } from './jobs/jobs.module';
import { RedisService } from './common/redis.service';
import { RedisModule } from './common/redis.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    ScheduleModule.forRoot(),
    AdsModule,
    AuthModule,
    UsersModule,
    PrometheusModule,
    JobsModule,
    RedisModule,
  ],
  controllers: [MetricsController],
  providers: [WebsocketGateway, RedisService],
  exports: [WebsocketGateway, RedisService],
})
export class AppModule {}
