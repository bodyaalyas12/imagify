import {Injectable} from '@nestjs/common';
import {getDatabase} from '../common/database';

type History = {
	string: string,
	userId: number
}

@Injectable()
export class HistoryService {
	addHistoryItem({string, userId}: History): Promise<number> {
		return new Promise((resolve, reject) => {
			const database = getDatabase();
			database.run(`INSERT INTO history(string,userId) VALUES(?,?)`, [string, userId], function (err: any) {
				if (err) {
					reject(err);
				}
				// @ts-ignore
				resolve(this.lastID);
			});
		});
	}

	getHistory(userId: number): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			const database = getDatabase();
			database.all(
				`SELECT string FROM  history where userId = ?`,
				[userId],
				function (err: any, rows: { string: string; }[]) {
					if (err) {
						reject(err);
					}
					resolve(rows.map(({string}) => string));
				});
		});
	}
}
