import { Controller, Get } from '@nestjs/common';

@Controller('quotes')
export class QuotesController {
  @Get('hello')
  async getHello(): Promise<any> {
    return 'quotes';
  }
}
