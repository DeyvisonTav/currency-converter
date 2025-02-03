import { Injectable } from '@nestjs/common';
import { CurrencyApiService } from '../../clients/providers/integrations/currency-api/currency-api.service';
import { ConversionResponse } from './conversion.interfaces';

@Injectable()
export class ConversionService {
  constructor(private readonly currencyApiService: CurrencyApiService) {}

  async convertCurrency(
    amount: number,
    base: string,
    target: string,
  ): Promise<ConversionResponse> {
    const rate = await this.currencyApiService.getExchangeRate(base, target);
    return {
      base,
      target,
      amount,
      convertedAmount: amount * rate,
      rate,
    };
  }
}
