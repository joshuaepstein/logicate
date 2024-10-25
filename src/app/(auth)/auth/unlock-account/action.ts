"use server"

import { prisma } from "@/database"
import { Failure, Success } from "@/types/api"

export async function unlockAccount(code: string) {
  const foundUser = await prisma.user.findFirst({
    where: {
      lockedAccountUnlockCode: code,
      lockedAt: {
        not: null,
      },
      invalidLoginAttempts: {
        gt: 0,
      },
    },
  })

  if (!foundUser) {
    return Failure("Invalid code")
  }

  await prisma.user.update({
    where: {
      id: foundUser.id,
    },
    data: {
      lockedAt: null,
      invalidLoginAttempts: 0,
      lockedAccountUnlockCode: null,
    },
  })

  return Success("Unlocked account")
}
