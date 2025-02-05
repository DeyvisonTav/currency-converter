import { Module } from '@nestjs/common';
import { CurrencyApiModule } from './clients/providers/integrations/currency-api/currency-api.module';
import { AppController } from './app.controller';
import { ConversionModule } from './modules/conversion/conversion.module';
import { DatabaseModule } from './core/ database/database.module';

@Module({
  imports: [DatabaseModule, CurrencyApiModule, ConversionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
