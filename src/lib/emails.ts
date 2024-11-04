"use server"

import { prisma } from "@/database"
import { sendEmail } from "@logicate/emails/index"
import VerifyEmail from "@logicate/emails/templates/verify"

export async function sendVerificationRequest(email: string, name: string, code: string) {
  const emailRes = await sendEmail({
    email,
    subject: "Verify your email",
    react: VerifyEmail({
      user: {
        email,
        name,
      },
      verifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?code=${code}`,
    }),
  })
  if (emailRes && emailRes.error) {
    console.error(emailRes.error)
  }
  return emailRes
}

export async function sendVerificationRequestWithoutCode(email: string, name: string) {
  const code = await prisma.verificationToken.findFirst({
    where: {
      user: {
        email,
      },
      expires: {
        lte: new Date(),
      },
    },
  })

  if (!code) {
    return null
  }

  return await sendVerificationRequest(email, name, code.token)
}
