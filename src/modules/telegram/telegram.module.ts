import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram.bot';
import { ConversionModule } from '../conversion/conversion.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [ConversionModule, HistoryModule],
  providers: [TelegramBotService],
})
export class TelegramModule {}
