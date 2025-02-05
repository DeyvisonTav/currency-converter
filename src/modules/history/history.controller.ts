import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ConversionHistory } from './history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory(
    @Query('chatId') chatId?: string,
    @Query('userId') userId?: string,
  ) {
    if (chatId) {
      return this.historyService.getHistoryByChatId(chatId);
    } else if (userId) {
      return this.historyService.getHistoryByUserId(userId);
    }
    return this.historyService.getAllHistory();
  }

  @Post()
  async saveConversion(
    @Body() conversionData: Partial<ConversionHistory>,
    @Query('chatId') chatId?: string,
    @Query('userId') userId?: string,
  ) {
    // Associa o histórico ao `chatId` ou `userId`, se fornecidos
    const metadata = { chatId, userId };
    return this.historyService.saveConversion({ ...conversionData, metadata });
  }

  @Get('filter')
  async getFilteredHistory(
    @Query('base') base: string,
    @Query('target') target: string,
    @Query('chatId') chatId?: string,
    @Query('userId') userId?: string,
  ) {
    if (chatId) {
      return this.historyService.getFilteredHistoryByChatId(
        base,
        target,
        chatId,
      );
    } else if (userId) {
      return this.historyService.getFilteredHistoryByUserId(
        base,
        target,
        userId,
      );
    }
    return this.historyService.getHistoryByBaseAndTarget(base, target);
  }
}
