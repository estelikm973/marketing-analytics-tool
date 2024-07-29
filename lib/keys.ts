import "server-only";

export const cookieKeys = {
  SESSION: "session",
  GOOGLE_ANALYTICS_ACCESS_TOKEN: "_g_a_access_token",
};

export const cookieExpTimes = {
  SESSION: 24 * 60 * 60 * 1000, // 1 day
};

export const sessionSecretKey = process.env.SESSION_SECRET;
