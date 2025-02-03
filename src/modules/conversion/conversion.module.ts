import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { CurrencyApiModule } from '../../clients/providers/integrations/currency-api/currency-api.module';

@Module({
  imports: [CurrencyApiModule],
  controllers: [ConversionController],
  providers: [ConversionService],
})
export class ConversionModule {}
