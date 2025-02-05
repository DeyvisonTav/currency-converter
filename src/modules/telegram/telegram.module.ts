import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram.bot';
import { ConversionModule } from '../conversion/conversion.module';
import { HistoryModule } from '../history/history.module';
import { AlertModule } from '../alert/alert.module';

@Module({
  imports: [ConversionModule, HistoryModule, AlertModule],
  providers: [TelegramBotService],
})
export class TelegramModule {}
