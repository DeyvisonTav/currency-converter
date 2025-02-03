import { Module } from '@nestjs/common';
import { CurrencyApiModule } from './clients/providers/integrations/currency-api/currency-api.module';
import { AppController } from './app.controller';
import { ConversionModule } from './modules/conversion/conversion.module';

@Module({
  imports: [CurrencyApiModule, ConversionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
