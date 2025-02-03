import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyApiService {
  private readonly apiUrl = 'https://economia.awesomeapi.com.br/json/last';

  async getExchangeRate(base: string, target: string): Promise<number> {
    try {
      const response = await axios.get(`${this.apiUrl}/${base}-${target}`);
      const rateKey = `${base}${target}`;
      if (response.data[rateKey]) {
        return parseFloat(response.data[rateKey].bid);
      } else {
        throw new HttpException('Invalid currency pair', 400);
      }
    } catch (error) {
      throw new HttpException('Failed to fetch exchange rates', 500);
    }
  }
}
