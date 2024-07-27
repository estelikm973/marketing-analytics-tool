import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/googleClient";
import { getUserId } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { DataSourceKeys } from "@/data/platforms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log({ code });
  if (!code) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.expiry_date) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Save tokens in your database associated with the authenticated user
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const newDataConnection = await prisma.dataSourceConnection.upsert({
      where: { id: user.id },
      update: {
        access_token: tokens.access_token,
        expiry_date: tokens.expiry_date,
        id_token: tokens.id_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
      },
      create: {
        data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
        user_id: user.id,
        access_token: tokens.access_token,
        expiry_date: tokens.expiry_date,
        id_token: tokens.id_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
      },
    });

    console.log({ newDataConnection });

    return NextResponse.redirect(new URL("/data-sources", request.url)); // Redirect user to the dashboard or a relevant page
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return NextResponse.json(
      { error: "Error retrieving access token" },
      { status: 500 }
    );
  }
}
