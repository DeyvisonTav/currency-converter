import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { CacheService } from './cache.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () =>
        new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        }),
    },
    {
      provide: CacheService,
      useFactory: (redisClient: Redis) => new CacheService(redisClient),
      inject: ['REDIS_CLIENT'],
    },
  ],
  exports: ['REDIS_CLIENT', CacheService],
})
export class CacheModule {}
