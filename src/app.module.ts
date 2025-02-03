import { Module } from '@nestjs/common';
import { CurrencyApiModule } from './clients/providers/integrations/currency-api/currency-api.module';

@Module({
  imports: [CurrencyApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
