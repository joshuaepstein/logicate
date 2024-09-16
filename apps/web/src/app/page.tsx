import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { generateLogicateSessionId } from '@logicate/utils/id'
import { notFound, redirect } from 'next/navigation'
import { Item } from './ui/canvas/types'

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
    if (locigateSessionWithLeastItems) {
      const items = locigateSessionWithLeastItems.items as Item[]
      if (items.length === 0) {
        return {
          ...locigateSessionWithLeastItems,
          isNew: false,
        }
      }
    }
  }

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
