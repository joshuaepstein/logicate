"use server"

import { Changelog, prisma } from "@logicate/database"
import { resend } from "@logicate/emails/resend"

export async function getChangelogs() {
  const changelogs = await prisma.changelog.findMany()
  return changelogs
}

export async function getChangelog(id: string) {
  const changelog = await prisma.changelog.findUnique({
    where: {
      id,
    },
  })
  return changelog
}

export async function createChangelog(changelog: Omit<Changelog, "id">) {
  const newChangelog = await prisma.changelog.create({
    data: changelog,
  })
  return newChangelog
}

export async function addToResend(prevState: undefined | string, formData: FormData) {
  const email = formData.get("email_address") as string
  if (process.env.RESEND_AUDIENCE_ID === undefined || typeof process.env.RESEND_AUDIENCE_ID !== "string") {
    return "Failed to subscribe"
  }
  const a = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  })
  if (a.data) {
    if (a.data.data.some((contact) => contact.email === email)) {
      return "Already subscribed"
    }
  }
  const resendAudience = await resend.contacts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID,
    email,
  })
  if (resendAudience.error) {
    return "Failed to subscribe"
  } else {
    return "Subscribed successfully"
  }
}
