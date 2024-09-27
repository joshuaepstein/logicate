import { User } from '@logicate/database';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.SECRET_PASSWORD,
  })) as {
    email?: string;
    user?: User;
  };

  return session?.user;
}
