import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { capitalise } from '@/lib'
import { prisma, User } from '@logicate/database'
import { camelCase } from 'lodash'
import Link from 'next/link'

async function getOwnedCanvas(userId: string) {
  'use server'
  const canvas = await prisma.logicateSession.findMany({
    where: {
      ownerId: userId,
    },
  })
  return canvas
}

async function getClassrooms(userId: string) {
  'use server'
  const classroom = await prisma.classroom.findMany({
    where: {
      students: {
        some: {
          id: userId,
        },
      },
    },
  })
  return classroom
}

async function getLeaderboard(classroomId: string) {
  const leaderboardUsers = await prisma.user.findMany({
    where: {
      studentClassrooms: {
        some: {
          id: classroomId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      progressLevel: true,
      publicDisplay: true,
    },
    orderBy: {
      progressLevel: 'desc',
    },
    take: 10,
  })

  return leaderboardUsers
}

export default async function StudentDashboard({ user }: { user: User }) {
  const ownedCanvases = await getOwnedCanvas(user.id)
  const classroom = await getClassrooms(user.id)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {classroom.map((classroom) => (
          <Link href={`/dashboard/${classroom.id}`} key={classroom.id} className="rounded-lg bg-white p-4">
            <h2 className="text-xl font-medium">{capitalise(classroom.name)}</h2>
          </Link>
        ))}
      </div>
    </>
  )
}
