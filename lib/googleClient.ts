import "server-only";
import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { AnalyticsAdminServiceClient } from "@google-analytics/admin";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const REDIRECT_URI = `${BASE_URL}/api/auth/google-analytics/callback`;

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

export const generateAuthUrl = (userId: string) => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
    state: userId,
  });
};

export const analyticsDataClient = (access_token: string) => {
  const authClient: any = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

  authClient.setCredentials({ access_token });

  return new BetaAnalyticsDataClient({ authClient });
};

export const analyticsAdminClient = (access_token: string) => {
  const authClient: any = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

  authClient.setCredentials({ access_token });

  return new AnalyticsAdminServiceClient({ authClient });
};
