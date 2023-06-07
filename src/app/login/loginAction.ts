"use server";

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { asyncSignToken } from "@/server/common/asyncJWT";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction({ email, password }: any) {
  const prisma = new PrismaClient();
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Auth failed");
  }
  const { password: hashPassword } = user;
  const isValidPassword = await bcrypt.compare(password, hashPassword);
  if (!isValidPassword) {
    throw new Error("Auth failed");
  }
  const token = await asyncSignToken(user.id);
  cookies().set({ name: "token", value: token, httpOnly: true });
  redirect("/");
}
