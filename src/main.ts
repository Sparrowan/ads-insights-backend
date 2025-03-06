import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

async function bootstrap() {
  globalThis.crypto = crypto as any;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies, authentication headers
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
  Logger.log('🚀 Server running on http://localhost:8080', 'Bootstrap');
}

bootstrap();
