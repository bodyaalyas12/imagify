"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function addLikeAction({ imageId, isLiked }: { imageId: string; isLiked: boolean }) {
  const prisma = new PrismaClient();
  // const session = await getServerSession(authOptions);

  const session = await decode({
    token: cookies().get("next-auth.session-token")?.value || "",
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  if (!session) {
    return;
  }
  if (!isLiked) {
    return prisma.like.create({
      data: { userId: session?.sub as string, imageId },
    });
  } else {
    return prisma.like.delete({
      where: { imageId_userId: { userId: session?.sub as string, imageId } },
    });
  }
}
