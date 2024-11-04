"use server"

import { prisma } from "@/database"
import { Failure, Success } from "@/types/api"

export async function verifyEmail(code: string) {
  const foundToken = await prisma.verificationToken.findFirst({
    where: {
      token: code,
    },
  })

  if (!foundToken) {
    return Failure("Invalid code")
  }

  const deletedToken = await prisma.verificationToken.delete({
    where: {
      id: foundToken.id,
    },
  })

  if (!deletedToken) {
    return Failure("Failed to verify email")
  }

  return Success("Verified email")
}
