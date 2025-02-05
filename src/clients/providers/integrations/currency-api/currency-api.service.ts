import { Injectable, HttpException } from '@nestjs/common';
import { CacheService } from 'src/core/cache/cache.service';
import axios from 'axios';

@Injectable()
export class CurrencyApiService {
  private readonly apiUrl = process.env.CURRENCY_API_URL;

  constructor(private readonly cacheService: CacheService) {}

  async getExchangeRate(base: string, target: string): Promise<number> {
    const cacheKey = `rate:${base}:${target}`;

    const cachedRate = await this.cacheService.get<number>(cacheKey);
    if (cachedRate) return cachedRate;

    try {
      const response = await axios.get(`${this.apiUrl}/${base}-${target}`);
      const rateKey = `${base}${target}`;

      if (response.data[rateKey]) {
        const rate = parseFloat(response.data[rateKey].bid);

        if (!isNaN(rate)) {
          await this.cacheService.set(cacheKey, rate, 86400);
          return rate;
        }
      }
      throw new HttpException('Invalid currency pair', 400);
    } catch (error) {
      throw new HttpException('Failed to fetch exchange rates', 500);
    }
  }
}
