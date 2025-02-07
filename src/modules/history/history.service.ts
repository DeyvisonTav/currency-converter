import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionHistory } from './history.entity';
import { S3Service } from '../../core/storage/s3.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(ConversionHistory)
    private readonly historyRepository: Repository<ConversionHistory>,
    private readonly s3Service: S3Service,
  ) {}

  async saveConversion(
    data: Partial<ConversionHistory>,
  ): Promise<ConversionHistory> {
    const saved = await this.historyRepository.save(data);
    const fileName = `history/${saved.id}.json`;

    try {
      await this.s3Service.uploadFile(fileName, JSON.stringify(saved));
    } catch (error) {
      console.error(
        '⚠️ Falha ao enviar para o S3, mas a conversão foi salva no banco:',
        error,
      );
    }

    return saved;
  }

  async getHistoryByChatId(chatId: string): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      where: { chatId },
      order: { timestamp: 'DESC' },
    });
  }

  async getHistoryByUserId(userId: string): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      where: { metadata: { userId } },
      order: { timestamp: 'DESC' },
    });
  }

  async getFilteredHistoryByChatId(
    base: string,
    target: string,
    chatId: string,
  ): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      where: { base, target, metadata: { chatId } },
      order: { timestamp: 'DESC' },
    });
  }

  async getFilteredHistoryByUserId(
    base: string,
    target: string,
    userId: string,
  ): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      where: { base, target, metadata: { userId } },
      order: { timestamp: 'DESC' },
    });
  }

  async getHistoryByBaseAndTarget(
    base: string,
    target: string,
  ): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      where: { base, target },
      order: { timestamp: 'DESC' },
    });
  }

  async getAllHistory(): Promise<ConversionHistory[]> {
    return this.historyRepository.find({
      order: { timestamp: 'DESC' },
    });
  }
}
