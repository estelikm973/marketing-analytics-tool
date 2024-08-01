"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { cookieKeys } from "@/lib/keys";
import { ActionStatus } from "@/lib/status";
import { DataSourceKeys } from "@/data/platforms";
import { refreshAccessToken } from "@/lib/refreshToken";

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

export async function getGoogleAnalyticsAccessData() {
  const gaAccessToken = cookies().get(
    cookieKeys.GOOGLE_ANALYTICS_ACCESS_TOKEN
  )?.value;

  const gaPropertyName = cookies().get(
    cookieKeys.GOOGLE_ANALYTICS_PROPERTY_NAME
  )?.value;

  if (gaAccessToken && gaPropertyName) {
    return {
      access_token: gaAccessToken,
      property_name: gaPropertyName,
    };
  }

  const userId = await getUserId();

  if (!userId) return;

  const googleAnalyticsConnection = await prisma.dataSourceConnection.findFirst(
    {
      where: {
        user_id: userId,
        data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
      },
    }
  );

  if (!googleAnalyticsConnection || !googleAnalyticsConnection.refresh_token)
    return;

  if (
    googleAnalyticsConnection.access_token &&
    googleAnalyticsConnection.property_name &&
    googleAnalyticsConnection.expiry_date &&
    Number(googleAnalyticsConnection.expiry_date) > dayjs(new Date()).valueOf()
  ) {
    setGATokenCookies(
      googleAnalyticsConnection.access_token,
      Number(googleAnalyticsConnection.expiry_date)
    );
    setGAPropertyIdCookies(googleAnalyticsConnection.property_name);

    return {
      access_token: googleAnalyticsConnection.access_token,
      property_name: googleAnalyticsConnection.property_name,
    };
  }

  const credentials = await refreshAccessToken(
    googleAnalyticsConnection.refresh_token
  );

  if (!credentials.access_token || !credentials.expiry_date) return;

  const updatedGoogleAnalyticsConnection =
    await prisma.dataSourceConnection.update({
      where: { id: googleAnalyticsConnection.id },
      data: {
        access_token: credentials.access_token,
        expiry_date: credentials.expiry_date,
        refresh_token: credentials.refresh_token,
        id_token: credentials.id_token,
        scope: credentials.scope,
        token_type: credentials.token_type,
      },
    });

  setGATokenCookies(credentials.access_token, credentials.expiry_date);
  setGAPropertyIdCookies(updatedGoogleAnalyticsConnection.property_name);

  return {
    access_token: updatedGoogleAnalyticsConnection.access_token,
    property_name: updatedGoogleAnalyticsConnection.property_name,
  };
}

const setGATokenCookies = (access_token: string, expiry_date: number) => {
  cookies().set(cookieKeys.GOOGLE_ANALYTICS_ACCESS_TOKEN, access_token, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiry_date),
    sameSite: "lax",
    path: "/",
  });
};

export const setGAPropertyIdCookies = (property_name: string) => {
  cookies().set(cookieKeys.GOOGLE_ANALYTICS_PROPERTY_NAME, property_name, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
};
