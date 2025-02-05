import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { CurrencyApiModule } from '../../clients/providers/integrations/currency-api/currency-api.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [CurrencyApiModule, HistoryModule],
  controllers: [ConversionController],
  providers: [ConversionService],
  exports: [ConversionService],
})
export class ConversionModule {}
