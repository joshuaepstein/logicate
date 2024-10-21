'use server'

import { prisma, LogicateSession } from '@logicate/database'

export async function updateSessionName(sessionId: LogicateSession['id'], name: LogicateSession['name']) {
  const session = await prisma.logicateSession.update({
    where: { id: sessionId },
    data: { name },
  })

  return session
}
