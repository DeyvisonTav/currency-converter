import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async addAlert(chatId: string, base: string, target: string): Promise<Alert> {
    const existingAlert = await this.alertRepository.findOne({
      where: { chatId, base, target },
    });

    if (existingAlert) {
      return existingAlert;
    }

    const newAlert = this.alertRepository.create({
      chatId,
      base,
      target,
      lastRate: 0,
    });
    return this.alertRepository.save(newAlert);
  }

  async getAllAlerts(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async updateLastRate(alertId: string, newRate: number): Promise<void> {
    await this.alertRepository.update(alertId, { lastRate: newRate });
  }

  async removeAlert(
    chatId: string,
    base: string,
    target: string,
  ): Promise<boolean> {
    const { affected } = await this.alertRepository.delete({
      chatId,
      base,
      target,
    });
    return affected > 0;
  }
}
