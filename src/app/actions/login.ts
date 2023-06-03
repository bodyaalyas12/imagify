"use server";

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function loginAction({ email, password }: any) {
  const prisma = new PrismaClient();
  console.log(email, password);
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
  if (!user) {
    throw new Error("Auth failed");
  }
  const { password: hashPassword } = user;
  const isValidPassword = await bcrypt.compare(password, hashPassword);
  if (!isValidPassword) {
    throw new Error("Auth failed");
  }
}
