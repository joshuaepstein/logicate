import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { generateLogicateSessionId } from '@/lib/id'
import { notFound, redirect } from 'next/navigation'
import { Item } from '../../ui/canvas/types'

const createDatabaseSession = async (userId: string) => {
  'use server'
  const response = await prisma.logicateSession.create({
    data: {
      id: generateLogicateSessionId(),
      items: [],
      wires: [],
      ownerId: userId,
    },
  })
  return {
    ...response,
    isNew: true,
  }
}

export default async function Home() {
  const session = await getSession()
  const logicateSession = await createDatabaseSession(session.user.id)
  if (!logicateSession) {
    notFound()
  }
  redirect(`/canvas/${logicateSession.id}?isNew=${logicateSession.isNew ? 'true' : 'false'}`)
}
