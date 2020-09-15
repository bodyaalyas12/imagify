import { Controller, Get, Body } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {
  }

  @Get()
  async getHistory(@Body('userId') userId: number): Promise<string[]> {
    return await this.historyService.getHistory(userId);
  }
}
