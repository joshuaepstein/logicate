import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { prisma, User } from '@logicate/database'

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

export default async function StudentDashboard({ user }: { user: User }) {
  const ownedCanvases = await getOwnedCanvas(user.id)
  const classroom = await getClassrooms(user.id)

  return (
    <>
      {classroom.map((classroom) => {
        return (
          <div key={classroom.id}>
            <h1>{classroom.name}</h1>
            <p>{classroom.id}</p>
          </div>
        )
      })}
    </>
  )
}
