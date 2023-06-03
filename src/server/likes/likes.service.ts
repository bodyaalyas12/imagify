import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

type Like = { imageId: string; userId: number };

@Injectable()
export class LikesService {
  //TODO try to inject PrismaClient
  async createLike({ imageId, userId }: Like): Promise<Like> {
    const prisma = new PrismaClient();
    return await prisma.likes.create({
      data: { imageId, userId },
    });
  }

  async getLikes(userId: number): Promise<Array<string>> {
    const prisma = new PrismaClient();
    const result = await prisma.likes.findMany({
      where: { userId },
    });
    return result.map(({ imageId }: Like) => imageId);
  }

  deleteLike({ userId, imageId }: Like) {
    const prisma = new PrismaClient();
    return prisma.likes.deleteMany({
      where: { userId, imageId },
    });
  }
}
