import { User } from "@logicate/database"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    // name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
    cookieName: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
  })) as {
    email?: string
    user?: User
  }
  return session?.user
}