import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { revalidateTag } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Canvas from '../../ui/canvas'
import { generateRandomGate } from '@/app/ui/canvas/circuit-generator'

export default async function Home() {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      {/* <nav className="border-neutralgrey-400 h-16 w-full border-b">{session.user.name}</nav> */}
      <Canvas
        sessionId="demo"
        isNew={false}
        logicateSession={{
          id: 'demo',
          createdAt: new Date(),
          items: [],
          wires: [],
          ownerId: '',
          updatedAt: new Date(),
        }}
        user={null}
        demo
      />
    </div>
  )
}