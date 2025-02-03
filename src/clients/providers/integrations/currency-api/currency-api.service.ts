import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyApiService {
  private readonly apiUrl = 'https://openexchangerates.org/api/latest.json';
  private readonly apiKey = process.env.OXR_API_KEY;

  async getExchangeRate(base: string, target: string): Promise<number> {
    try {
      const response = await axios.get(
        `${this.apiUrl}?app_id=${this.apiKey}&base=${base}`,
      );
      return response.data.rates[target];
    } catch (error) {
      throw new HttpException('Failed to fetch exchange rates', 500);
    }
  }
}
