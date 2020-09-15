import {Injectable} from '@nestjs/common';
import * as Flickr from 'flickr-sdk';
import {LikesService} from '../likes/likes.service';

type FlickrResult = {
	body: {
		photos: {
			photo: {
				farm: string; server: string; id: string; secret: string;
			}[];
		};
	};
}

@Injectable()
export class ImageService {
	constructor(private readonly likesService: LikesService,) {
	}

	async getPublicImages(search: string, userId: number): Promise<{ url: string, id: number, isLiked: boolean }[]> {
		const flickr = new Flickr(process.env.FLICKR_KEY);
		const likes = await this.likesService.getLikes(userId);
		return flickr.photos.search({text: search})
			.then((result: FlickrResult) => {
				return result.body.photos.photo.map(
					({farm, server, id, secret}) => ({
						url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
						id,
						isLiked: likes.includes(id),
					}),
				);
			});
	}
}
