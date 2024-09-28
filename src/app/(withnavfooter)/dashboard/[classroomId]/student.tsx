import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { capitalise, cn } from '@/lib'
import { getAvatar, randomAvatar } from '@/lib/random'
import { prisma, User } from '@logicate/database'
import { camelCase } from 'lodash'
import { notFound } from 'next/navigation'

async function getOwnedCanvas(userId: string) {
  'use server'
  const canvas = await prisma.logicateSession.findMany({
    where: {
      ownerId: userId,
    },
  })
  return canvas
}

async function getClassroom(classroomId: string) {
  'use server'
  const classroom = await prisma.classroom.findUnique({
    where: {
      id: classroomId,
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

export default async function StudentDashboard({ user, classroomId }: { user: User; classroomId: string }) {
  const classroom = await getClassroom(classroomId)
  if (!classroom) notFound()
  const leaderboard = await getLeaderboard(classroomId)

  return (
    <main className="mb-8 flex min-h-[calc(100dvh-15rem)] flex-col">
      <header className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{user.name}</h1>
          <p className="text-neutralgrey-1000">{classroom.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xs text-neutralgrey-1000 font-semibold">LEVEL {Math.floor(user.progressLevel)}</p>
          <Progress
            value={Math.max(0, Math.min(100, (user.progressLevel - Math.floor(user.progressLevel)) * 100))}
            max={100}
            className="h-[5px] w-[196px]"
            indicatorStyles={cn('to-ultramarine-600 bg-gradient-to-r from-blue-900')}
          />
        </div>
      </header>

      <section className="mt-8 flex h-full w-max grow flex-row gap-12">
        <div className="shadow-hard-xs flex w-max flex-col gap-3 bg-white p-4">
          <header>
            <h2 className="text-lg font-medium">Class Leaderboard</h2>
            <p className="text-2xs text-neutralgrey-900">View your fellow classmates and aim for the top!</p>
          </header>
          <ScrollArea className="mt-2 flex h-full grow flex-col">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className="flex w-full min-w-[442px] max-w-md flex-row items-center justify-between border-b pb-4 pt-4 first-of-type:pt-0 last-of-type:border-y-0 last-of-type:pb-0"
              >
                <div className="flex items-center justify-start gap-4">
                  <div
                    className="size-9 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${user.publicDisplay.length > 0 ? user.publicDisplay[0].profilePicture : getAvatar(index)})`,
                    }}
                  />
                  <h4 className="font-medium">{user.name}</h4>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-2xs text-neutralgrey-1000 font-medium">LEVEL {Math.floor(user.progressLevel)}</p>
                  <Progress
                    value={Math.max(0, Math.min(100, (user.progressLevel - Math.floor(user.progressLevel)) * 100))}
                    max={100}
                    className="h-[5px] w-[196px]"
                    indicatorStyles={cn('to-ultramarine-600 bg-gradient-to-r from-blue-900')}
                  />
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="flex h-full w-full flex-col gap-16 border border-red-900">
          <div className="">
            <h3>Your Homework Assignments</h3>
          </div>
        </div>
      </section>
    </main>
  )
}
