"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { cookieKeys } from "@/lib/keys";

export async function signin(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { error: "Invalid password" };
    }

    // authenticate
    await createSession(user.id);
    return { error: null };
  } catch (err) {
    console.log(err);
    return { error: "Server error" };
  }
}

export async function logout() {
  deleteSession();
  redirect("/signin");
}

export async function getUserId() {
  const cookie = cookies().get(cookieKeys.SESSION)?.value;
  const session = await decrypt(cookie);

  if (session?.userId) {
    return session.userId as string;
  }

  return undefined;
}
