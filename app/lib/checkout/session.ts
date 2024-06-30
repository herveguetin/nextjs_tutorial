import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';
import { UUID } from "node:crypto";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

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

export async function assertCart() {
  const session = await getSessionData()
  if (!session?.cart?.id) {
    session.cart = { id: uuidv4() }
    await session.save();
  }
}
