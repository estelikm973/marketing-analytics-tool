import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieKeys } from "./lib/keys";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Decrypt the session from the cookie
  const cookie = cookies().get(cookieKeys.SESSION)?.value;
  const session = await decrypt(cookie);

  const unAuthPaths = ["/signin", "/signup"];

  // Redirect to /login if the user is not authenticated
  if (!session?.userId && !unAuthPaths.includes(path)) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else if (
    unAuthPaths.some((el) => path.startsWith(el)) &&
    !!session?.userId
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
