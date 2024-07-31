import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/googleClient";
import { DataSourceKeys } from "@/data/platforms";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.expiry_date) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!state) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const decodedState = Buffer.from(state, "base64url").toString();

    const { user_id, property_id } = JSON.parse(decodedState);

    if (!user_id) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const gaConnectionExist = await prisma.dataSourceConnection.findUnique({
      where: { id: user.id, data_source_key: DataSourceKeys.GOOGLE_ANALYTICS },
    });

    if (gaConnectionExist) {
      await prisma.dataSourceConnection.update({
        where: { id: gaConnectionExist.id },
        data: {
          access_token: tokens.access_token,
          expiry_date: tokens.expiry_date,
          id_token: tokens.id_token,
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          token_type: tokens.token_type,
        },
      });
    } else {
      await prisma.dataSourceConnection.create({
        data: {
          data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
          user_id: user.id,
          access_token: tokens.access_token,
          expiry_date: tokens.expiry_date,
          id_token: tokens.id_token,
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          token_type: tokens.token_type,
          property_id: property_id,
        },
      });
    }

    return NextResponse.redirect(new URL("/data-sources", request.url)); // Redirect user to the dashboard or a relevant page
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return NextResponse.json(
      { error: "Error retrieving access token" },
      { status: 500 }
    );
  }
}
