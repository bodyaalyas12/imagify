import {Body, Controller, Get, Query} from '@nestjs/common';
import {ImageService} from './image.service';
import {HistoryService} from '../history/history.service';

@Controller('images')
export class ImageController {
	constructor(private readonly imageService: ImageService, private readonly historyService: HistoryService) {
	}

	@Get()
	async getImages(@Body('userId') userId: number, @Query('search') search: string):
		Promise<{ url: string, id: number, isLiked: boolean }[]> {
		await this.historyService.addHistoryItem({search, userId});
		return this.imageService.getPublicImages(search, userId);
	}
}
