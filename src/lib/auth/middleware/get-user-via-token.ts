import { User } from "@logicate/database"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function getUserViaToken(req: NextRequest) {
  console.log("Starting getUserViaToken")
  const session = (await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })) as {
    email?: string
    user?: User
  }
  console.log("Session", session)
  return session?.user
}