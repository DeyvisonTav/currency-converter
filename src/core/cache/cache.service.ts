import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(private readonly redisClient: Redis) {}

  async set(key: string, value: any, ttl: number): Promise<void> {
    try {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      await this.redisClient.set(key, stringValue, 'EX', ttl);
    } catch (error) {
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redisClient.get(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      throw error;
    }
  }

  async keys(pattern = '*'): Promise<string[]> {
    try {
      const keys = await this.redisClient.keys(pattern);
      return keys;
    } catch (error) {
      throw error;
    }
  }
}
