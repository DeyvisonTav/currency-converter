import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ConversionHistory } from './history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async saveConversion(@Body() conversionData: Partial<ConversionHistory>) {
    return this.historyService.saveConversion(conversionData);
  }

  @Get()
  async getHistory() {
    return this.historyService.getAllHistory();
  }

  @Get('filter')
  async getFilteredHistory(
    @Query('base') base: string,
    @Query('target') target: string,
  ) {
    return this.historyService.getHistoryByBaseAndTarget(base, target);
  }
}
