import { Invites } from '@prisma/client'

export const checkInviteExpired = (invite: Invites) => {
  const now = new Date()
  const expires = new Date(invite.expires)
  return now > expires
}
