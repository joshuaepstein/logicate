import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { revalidateTag, unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Canvas from '../../ui/canvas'

const getDatabaseSession = unstable_cache(
  async (canvasId: string, userId: string) => {
    return prisma.logicateSession.findUnique({
      where: {
        id: canvasId,
        ownerId: userId,
      },
    })
  },
  ['canvas'],
  {
    revalidate: 3600,
    tags: ['canvas'],
  }
)

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
