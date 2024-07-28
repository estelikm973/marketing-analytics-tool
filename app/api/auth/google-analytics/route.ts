import { getAuthUrl } from "@/lib/googleClient";
import { NextResponse } from "next/server";

export async function GET() {
  const authUrl = getAuthUrl();
  return NextResponse.json({ authUrl });
}
