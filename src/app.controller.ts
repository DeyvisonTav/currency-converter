import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyApiService } from './clients/providers/integrations/currency-api/currency-api.service';

@Controller('currency')
export class AppController {
  constructor(private readonly currencyApiService: CurrencyApiService) {}

  @Get('rate')
  async getRate(@Query('base') base: string, @Query('target') target: string) {
    return this.currencyApiService.getExchangeRate(base, target);
  }
}
