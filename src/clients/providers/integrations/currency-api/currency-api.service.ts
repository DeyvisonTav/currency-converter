import { Injectable, Inject, HttpException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import Redis from 'ioredis';

@Injectable()
export class CurrencyApiService {
  private readonly apiUrl = process.env.CURRENCY_API_URL;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async getExchangeRate(base: string, target: string): Promise<number> {
    const cacheKey = `rate:${base}:${target}`;

    const cachedRate = await this.cacheManager.get<number>(cacheKey);
    if (cachedRate) return cachedRate;

    try {
      const response = await axios.get(`${this.apiUrl}/${base}-${target}`);
      const rateKey = `${base}${target}`;

      if (response.data[rateKey]) {
        const rate = parseFloat(response.data[rateKey].bid);

        if (!isNaN(rate)) {
          await this.redisClient.set(cacheKey, rate.toString(), 'EX', 86400);
          return rate;
        }
      }
      throw new HttpException('Invalid currency pair', 400);
    } catch (error) {
      throw new HttpException('Failed to fetch exchange rates', 500);
    }
  }
}
