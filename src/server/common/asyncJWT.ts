import * as jwt from 'jsonwebtoken';

export const asyncSignToken = (id: number) => {
	return new Promise<string>(((resolve, reject) => {
		// @ts-ignore
		jwt.sign({id}, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES,
		}, (err, token) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(token);
		});
	}));
};

export const asyncVerifyToken = (token: string) => {
	return new Promise<number>(((resolve, reject) => {
		// @ts-ignore
		jwt.verify(token, process.env.JWT_SECRET,
			(err, decode: { id: number }) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(decode.id);
			},
		);
	}));
};
