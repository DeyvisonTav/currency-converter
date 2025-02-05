import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { ConversionHistory } from './history.entity';
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionHistory])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
