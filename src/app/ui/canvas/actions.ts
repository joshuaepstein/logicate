'use server'

import { LogicateSession, prisma } from '@logicate/database'
import { revalidateTag } from 'next/cache'

export async function updateSessionName(sessionId: LogicateSession['id'], name: LogicateSession['name']) {
  const session = await prisma.logicateSession.update({
    where: { id: sessionId },
    data: { name },
  })

  revalidateTag('canvas')

  return session
}
