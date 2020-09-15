import { Body, Controller, Delete, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {
  }

  @Post()
  addLike(@Body('id')imageId: string, @Body('userId')userId: number) {
    return this.likesService.createLike({ imageId, userId });
  }

  @Delete()
  deleteLike(@Body('id')imageId: string, @Body('userId')userId: number) {
    console.log(imageId, userId);
    return this.likesService.deleteLike({ imageId, userId });
  }

}
