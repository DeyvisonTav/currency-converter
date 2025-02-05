import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionHistory } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(ConversionHistory)
    private readonly historyRepository: Repository<ConversionHistory>,
  ) {}

  async saveConversion(
    data: Partial<ConversionHistory>,
  ): Promise<ConversionHistory> {
    return this.historyRepository.save(data);
  }

  async getAllHistory(): Promise<ConversionHistory[]> {
    return this.historyRepository.find();
  }

  async getHistoryByBaseAndTarget(
    base: string,
    target: string,
  ): Promise<ConversionHistory[]> {
    return this.historyRepository.find({ where: { base, target } });
  }
}
