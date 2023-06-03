import { User } from "./user.model";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UsersService {
  async createNew({ email, password }: User): Promise<User["id"]> {
    const prisma = new PrismaClient();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const { id } = await prisma.users.create({
      data: {
        email,
        password: encryptedPassword,
      },
    });
    return id;
  }

  async checkAuth({ email, password }: User): Promise<User["id"]> {
    const prisma = new PrismaClient();
    const user: User | null = await prisma.users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException("Auth failed", HttpStatus.EXPECTATION_FAILED);
    }
    const { password: hashPassword } = user;
    const isValidPassword = await bcrypt.compare(password, hashPassword);
    if (!isValidPassword) {
      throw new HttpException("Auth failed", HttpStatus.EXPECTATION_FAILED);
    }
    return user.id;
  }
}
