import {Injectable} from '@nestjs/common';
import {getDatabase} from '../common/database';

type Like = { imageId: string, userId: number }

@Injectable()
export class LikesService {
	createLike({imageId, userId}: Like): Promise<number> {
		return new Promise((resolve, reject) => {
			const database = getDatabase();
			database.run(`INSERT INTO likes(imageId,userId) VALUES(?,?)`, [imageId, userId], function (err: any) {
				if (err) {
					reject(err);
				}
				// @ts-ignore
				resolve(this.lastID);
			});
		});
	}

	getLikes(userId: number): Promise<Array<number>> {
		return new Promise((resolve, reject) => {
			const database = getDatabase();
			database.all(`SELECT imageId FROM likes where userId = ?`, [userId], function (err: any, rows: { imageId: number }[]) {
				if (err) {
					reject(err);
				}
				resolve(rows.map(({imageId}) => imageId));
			});
		});
	}

	deleteLike({userId, imageId}: Like) {
		return new Promise((resolve, reject) => {
			const database = getDatabase();
			database.run(`DELETE FROM likes where userId = ? and imageId = ?`, [userId, imageId], function (err: any) {
				if (err) {
					reject(err);
				}
				// @ts-ignore
				resolve(this.changes);
			});
		});
	}
}
