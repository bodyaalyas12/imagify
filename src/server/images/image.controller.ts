import { Body, Controller, Get, Query } from '@nestjs/common';
import { ImageService } from './image.service';
import { HistoryService } from '../history/history.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService, private readonly historyService: HistoryService) {
  }

  @Get()
  async getImages(@Body('userId') userId: number, @Query('search') query: string):
    Promise<{ url: string, id: string, isLiked: boolean }[]> {
    await this.historyService.addHistoryItem({ string: query, userId });
    return this.imageService.getPublicImages(query, userId);
  }
}
