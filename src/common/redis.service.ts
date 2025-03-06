import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: 'redis://localhost:6379' });

    this.client.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('✅ Connected to Redis');
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('🛑 Redis connection closed');
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number = 60) {
    await this.client.set(key, value, { EX: ttl }); // Set expiry time
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
