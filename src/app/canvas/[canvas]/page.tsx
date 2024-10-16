import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Canvas from '../../ui/canvas'

const getDatabaseSession = async (canvasId: string, userId: string) => {
  return prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
      ownerId: userId,
    },
  })
}

export default async function Home({
  params: { canvas },
  searchParams: { isNew },
}: {
  params: { canvas: string }
  searchParams: { isNew: string }
}) {
  const session = await getSession()
  if (!session) notFound()
  const logicateSession = await getDatabaseSession(canvas, session.user.id)
  if (!logicateSession) {
    // TODO: Canvas not found design
    return notFound()
  }

  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      {/* <nav className="border-neutralgrey-400 h-16 w-full border-b">{session.user.name}</nav> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas sessionId={logicateSession.id} isNew={isNew === 'true'} logicateSession={logicateSession} user={session.user} />
      </Suspense>
    </div>
  )
}
