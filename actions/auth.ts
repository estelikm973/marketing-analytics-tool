"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { cookieKeys } from "@/lib/keys";
import { ActionStatus } from "@/lib/status";

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

export async function signup(data: {
  email: string;
  password: string;
  name: string;
}) {
  const { email, password, name } = data;

  if (!email || !password || !name) {
    return { message: "All fields are required", status: ActionStatus.ERROR };
  }

  try {
    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return { message: "User already exist", status: ActionStatus.ERROR };
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: { email, password: passHash, name, role: "admin" },
    });

    return {
      message: "User created successfully.",
      status: ActionStatus.SUCCESS,
    };
  } catch (err) {
    console.log(err);
    return { message: "Server error", status: ActionStatus.ERROR };
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
