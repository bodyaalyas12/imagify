import * as jwt from "jsonwebtoken";
import { VerifyCallback } from "jsonwebtoken";

export const asyncSignToken = (id: number) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES }, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

export const asyncVerifyToken = (token: string) => {
  return new Promise<number>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      ((err, decode: { id: number }) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decode.id);
      }) as VerifyCallback
    );
  });
};
