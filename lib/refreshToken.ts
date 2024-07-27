import { oauth2Client } from "./googleClient";

export const refreshAccessToken = async (
  refresh_token: string
): Promise<string> => {
  oauth2Client.setCredentials({
    refresh_token,
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();

    return credentials.access_token!;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
};
