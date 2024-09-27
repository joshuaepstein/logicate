import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { prisma } from '@logicate/database'
import Link from 'next/link'

async function getAllCanvas() {
  'use server'
  const canvas = await prisma.logicateSession.findMany()
  return canvas
}

export default async function CanvasPage({}) {
  const canvas = await getAllCanvas()

  return (
    <>
      <Navbar />
      {canvas.map((c) => (
        <Link href={`/canvas/${c.id}`} key={c.id}>
          {c.id}
        </Link>
      ))}
      <Footer />
    </>
  )
}
