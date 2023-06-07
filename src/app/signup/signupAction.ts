"use server";

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function signupAction({ email, password }: any) {
  const prisma = new PrismaClient();
  const encryptedPassword = await bcrypt.hash(password, 10);
  //TODO check for dupe
  const { id } = await prisma.users.create({
    data: {
      email,
      password: encryptedPassword,
    },
  });
  return id;
}
