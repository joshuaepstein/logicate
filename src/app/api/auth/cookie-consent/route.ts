import { prisma } from "@/database"
import { parseRequestBody } from "@/lib/api/utils"
import { withSession } from "@/lib/auth/session"

export const POST = withSession(async ({ session, req }) => {
  const body = await parseRequestBody(req)
  const cookieConsent = body.cookieConsent

  if (!cookieConsent) {
    return new Response("No cookie consent provided", { status: 400 })
  }

  if (session.user.cookieConsent === cookieConsent) {
    return new Response("No changes made", { status: 400 })
  }

  const updated = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      cookieConsent,
    },
  })

  if (!updated) {
    return new Response("Failed to update cookie consent", { status: 500 })
  }

  return new Response(JSON.stringify(updated), { status: 200 })
})
