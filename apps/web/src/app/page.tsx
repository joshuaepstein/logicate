import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { generateQuestionId } from '@logicate/utils/id'
import { notFound, redirect } from 'next/navigation'

const createDatabaseSession = async (userId: string) => {
  'use server'
  const getLocigateSessionCount = await prisma.logicateSession.count({
    where: {
      ownerId: userId,
    },
  })
  if (getLocigateSessionCount >= 1) {
    // find the session with the least amount of items
    const locigateSessionWithLeastItems = await prisma.logicateSession.findFirst({
      where: {
        ownerId: userId,
      },
      orderBy: {
        items: 'asc',
      },
    })
    return locigateSessionWithLeastItems
  }

  const response = await prisma.logicateSession.create({
    data: {
      id: generateQuestionId(),
      items: [],
      wires: [],
      ownerId: userId,
    },
  })
  return response
}

export default async function Home() {
  const session = await getSession()
  const logicateSession = await createDatabaseSession(session.user.id)
  if (!logicateSession) {
    notFound()
  }
  redirect(`/canvas/${logicateSession.id}`)
}
