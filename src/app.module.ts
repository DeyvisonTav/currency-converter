import { Module } from '@nestjs/common';
import { CurrencyApiModule } from './clients/providers/integrations/currency-api/currency-api.module';
import { AppController } from './app.controller';

@Module({
  imports: [CurrencyApiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
