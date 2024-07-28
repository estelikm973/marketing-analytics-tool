import "server-only";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";

const credential = JSON.parse(
  Buffer.from(
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
    "base64"
  ).toString()
);

// TODO: Remove
export const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: credential.project_id,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
});

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const createAnalyticsDataClient = (access_token: string) => {
  const authClient: any = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

  authClient.setCredentials({ access_token });

  return new BetaAnalyticsDataClient({ authClient });
};
