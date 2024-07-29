// googleClient.js
import "server-only";
import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = `http://localhost:3000/api/auth/google-analytics/callback`;

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
};

export const analyticsDataClient = (access_token: string) => {
  const authClient: any = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

  authClient.setCredentials({ access_token });

  return new BetaAnalyticsDataClient({ authClient });
};
