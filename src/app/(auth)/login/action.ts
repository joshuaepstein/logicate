"use server"

import { signIn } from "@/lib/auth"
import { Failure, Success } from "@/types/api"
import { AuthError } from "next-auth"

export async function loginAction(email: string, password: string, next: string | null): Promise<Failure<string> | Success<any>> {
  try {
    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      ...(next ? { callbackUrl: next } : {}),
    })
    return Success(signInRes)
  } catch (err) {
    if (err instanceof AuthError) {
      return Failure(err.message.split(".")[0])
    }
    throw err
  }
}
