import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { ConversionHistory } from './history.entity';
import { HistoryController } from './history.controller';
import { StorageModule } from 'src/core/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionHistory]), StorageModule],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
