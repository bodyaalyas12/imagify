import * as sqlite3 from 'sqlite3';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDatabase = () => new sqlite3.Database(
	'database.db',
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err: string) => {
		if (err) {
			console.error(err);
		}
		console.log('Connected to the database.');
	});
