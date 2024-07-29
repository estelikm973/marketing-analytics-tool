import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cookieExpTimes, cookieKeys } from "./keys";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const expiresAt = Date.now() + cookieExpTimes.SESSION;
  const session = await encrypt({ exp: expiresAt, userId });

  cookies().set(cookieKeys.SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt),
    sameSite: "strict",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get(cookieKeys.SESSION)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + cookieExpTimes.SESSION);
  cookies().set(cookieKeys.SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "strict",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete(cookieKeys.SESSION);
}
