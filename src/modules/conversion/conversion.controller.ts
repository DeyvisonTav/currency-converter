import { Controller, Get, Query } from '@nestjs/common';
import { ConversionService } from './conversion.service';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Get()
  async convert(
    @Query('amount') amount: number,
    @Query('base') base: string,
    @Query('target') target: string,
  ) {
    return this.conversionService.convertCurrency(amount, base, target);
  }
}
