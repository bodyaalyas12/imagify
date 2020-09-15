import {User} from './user.model';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {getDatabase} from '../common/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	async createNew({email, password}: User): Promise<number> {
		return new Promise<number>(async (resolve, reject) => { //TODO create reusable DB accessor function
			const database = getDatabase();
			const encryptedPassword = await bcrypt.hash(password, 10);

			database.run(`INSERT INTO users(email,password) VALUES(?,?)`, [email, encryptedPassword], function (err: string) {
				if (err) {
					reject(err);
				}
				// @ts-ignore
				resolve(this.lastID);
			});

			database.close();
		});
	}

	async checkAuth({email, password}: User): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			const database = getDatabase();
			database.get('SELECT * FROM USERS WHERE email = ?', [email], async (err: string, row: { id: number, password: string }) => {
				if (err) {
					reject(new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR));
					return;
				}
				if (!row) {
					reject(new HttpException('Auth failed', HttpStatus.EXPECTATION_FAILED));
					return;
				}
				const {id, password: hashPassword} = row;
				const isValidPassword = await bcrypt.compare(password, hashPassword);
				if (!isValidPassword) {
					reject(new HttpException('Auth failed', HttpStatus.EXPECTATION_FAILED));
				}
				resolve(id);
			});
		});
	}
}
