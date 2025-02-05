import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { ConversionHistory } from './history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionHistory])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
