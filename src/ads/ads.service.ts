import { Injectable } from '@nestjs/common';
import { AdsInsightsResponse } from './ads.dto';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { RedisService } from 'src/common/redis.service';

@Injectable()
export class AdsService {
  private readonly CACHE_KEY = 'ads_insights';
  private readonly CACHE_TTL = 30; // Cache data for 30 seconds for ease in testing

  constructor(
    private readonly websocketGateway: WebsocketGateway,
    private readonly redisService: RedisService,
  ) {}

  async getAdsInsights(): Promise<AdsInsightsResponse> {
    // Check Redis Cache
    const cachedData = await this.redisService.get(this.CACHE_KEY);
    if (cachedData) {
      console.log('🚀 Returning cached data');
      return JSON.parse(cachedData);
    }

    // Generate new data if not cached
    const response = this.generateRandomAdsData();

    // Store in Redis with TTL
    await this.redisService.set(
      this.CACHE_KEY,
      JSON.stringify(response),
      this.CACHE_TTL,
    );
    console.log('🆕 New data generated and cached');

    // Send real-time update
    this.websocketGateway.sendUpdate(response);

    return response;
  }

  private generateRandomAdsData(): AdsInsightsResponse {
    const records = Math.floor(Math.random() * 10) + 1;
    const data = Array.from({ length: records }, () => ({
      impressions: Math.floor(Math.random() * 5000) + 500,
      date_start: this.getRandomDate(),
      date_stop: this.getRandomDate(),
    }));

    return {
      data,
      paging: {
        cursors: {
          before: 'MAZDZD',
          after: 'MAZDZD',
        },
      },
    };
  }

  private getRandomDate(): string {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return randomDate.toISOString().split('T')[0];
  }
}
