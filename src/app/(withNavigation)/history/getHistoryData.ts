import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getHistoryData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return [];
  }
  const prisma = new PrismaClient();
  return prisma.history.findMany({
    where: { userId: session.user.userId },
  });
};
