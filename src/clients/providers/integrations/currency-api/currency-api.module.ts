import { Module } from '@nestjs/common';
import { CurrencyApiService } from './currency-api.service';

@Module({
  providers: [CurrencyApiService],
  exports: [CurrencyApiService],
})
export class CurrencyApiModule {}
