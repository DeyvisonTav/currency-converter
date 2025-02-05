import { Injectable } from '@nestjs/common';
import { CurrencyApiService } from '../../clients/providers/integrations/currency-api/currency-api.service';
import { HistoryService } from '../history/history.service';
import { ConversionResponse } from './conversion.interfaces';

@Injectable()
export class ConversionService {
  constructor(
    private readonly currencyApiService: CurrencyApiService,
    private readonly historyService: HistoryService,
  ) {}

  async convertCurrency(
    amount: number,
    base: string,
    target: string,
  ): Promise<ConversionResponse> {
    const rate = await this.currencyApiService.getExchangeRate(base, target);
    const conversionResult: ConversionResponse = {
      base,
      target,
      amount,
      convertedAmount: amount * rate,
      rate,
    };

    await this.historyService.saveConversion(conversionResult);
    return conversionResult;
  }

  async getConversionHistory() {
    return this.historyService.getAllHistory();
  }
}
