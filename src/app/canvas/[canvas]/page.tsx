import LogicGateLoader from '@/app/ui/canvas/logic-gate-loader'
import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { Metadata } from 'next'
import { headers } from 'next/headers'
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

const getDatabaseSessionAsAdmin = async (canvasId: string) => {
  return prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
    },
    select: {
      name: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })
}

export async function generateMetadata(props: { params: Promise<{ canvas: string }> }): Promise<Metadata> {
  const params = await props.params

  const { canvas } = params

  const logicateSession = await getDatabaseSessionAsAdmin(canvas)

  return {
    title: logicateSession?.name + ' - Logicate' || 'Unnamed Canvas - Logicate',
  }
}

export default async function Home(props: { params: Promise<{ canvas: string }>; searchParams: Promise<{ isNew: string }> }) {
  const searchParams = await props.searchParams

  const { isNew } = searchParams

  const params = await props.params

  const { canvas } = params

  const session = await getSession()
  if (!session) notFound()
  const logicateSession = await getDatabaseSession(canvas, session.user.id)
  if (!logicateSession) {
    // TODO: Canvas not found design
    return notFound()
  }
  const userAgent = (await headers()).get('user-agent') || ''

  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      {/* <nav className="border-neutralgrey-400 h-16 w-full border-b">{session.user.name}</nav> */}
      <Suspense fallback={<LogicGateLoader />}>
        <Canvas
          sessionId={logicateSession.id}
          isMobile={isMobile(userAgent)}
          isNew={isNew === 'true'}
          logicateSession={logicateSession}
          user={session.user}
        />
      </Suspense>
    </div>
  )
}

const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent)
}
