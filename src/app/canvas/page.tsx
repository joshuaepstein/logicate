import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { getSession } from '@/lib/auth/utils'
import { prisma } from '@logicate/database'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

const getAllCanvas = unstable_cache(
  async (userId: string) => {
    return prisma.logicateSession.findMany({
      where: {
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

export default async function CanvasPage({}) {
  const session = await getSession()
  const canvas = await getAllCanvas(session.user.id)

  return (
    <ul>
      {canvas.map((c) => (
        <li key={c.id}>
          <Link href={`/canvas/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  )
}
