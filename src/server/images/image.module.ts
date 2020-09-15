import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { LikesService } from '../likes/likes.service';
import { HistoryService } from '../history/history.service';

@Module({
  providers: [ImageService, LikesService, HistoryService],
  controllers: [ImageController],
})
export class ImageModule {
}
