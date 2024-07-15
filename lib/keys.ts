import "server-only";

export const cookieKeys = {
  SESSION: "session",
};

export const cookieExpTimes = {
  SESSION: 604800, // 7 days
};

export const sessionSecretKey = process.env.SESSION_SECRET;
