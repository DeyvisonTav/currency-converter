import { Module } from '@nestjs/common';
import { CurrencyApiService } from './currency-api.service';
import { CacheModule } from '../../../../core/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [CurrencyApiService],
  exports: [CurrencyApiService],
})
export class CurrencyApiModule {}
