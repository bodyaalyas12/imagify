import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { asyncVerifyToken } from "@/server/common/asyncJWT";

export const getHistoryData = async () => {
  const cookieStore = cookies();
  const tokenObject = cookieStore.get("token");
  if (!tokenObject) {
    throw new Error("no token");
  }
  const userId = await asyncVerifyToken(tokenObject.value);
  console.log(userId);
  const prisma = new PrismaClient();
  return prisma.history.findMany({
    where: { userId },
  });
};
