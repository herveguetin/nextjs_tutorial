import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';
import { UUID } from "node:crypto";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!, cookieName: process.env.SESSION_COOKIE_NAME!, cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface SessionData {
  cart: {
    id: UUID
  };
}

export async function getSessionData() {
  return await getIronSession<SessionData>(cookies(), sessionOptions);
}
