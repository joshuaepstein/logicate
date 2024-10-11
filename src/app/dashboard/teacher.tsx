import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { InformationCircleContainedIcon } from '@jfstech/icons-react/24/outline'
import { prisma, User } from '@logicate/database'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getSession } from 'next-auth/react'

const getClassrooms = unstable_cache(
  async (user) => {
    if (!user) return []
    const classrooms = await prisma.classroom.findMany({
      where: {
        teachers: {
          some: {
            id: user.id,
          },
        },
      },
      select: {
        name: true,
        id: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: true,
        students: {
          select: {
            publicDisplay: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
    })
    return classrooms
  },
  ['teacher_classrooms'],
  {
    revalidate: 3600,
    tags: ['teacher_classrooms'],
  }
)

/*
  The teacher dashboard page should be responsible for displaying the teacher's
  classrooms but also allowing them to create new ones.

  It should have a title of `Your Dashboard` and a list with the following items:
  - Create a new classroom
  - Classroom 1
  - Classroom 2...

  It should use a fetch function to get the classrooms so that we can update this using the revalidate option.
*/
export default async function TeacherDashboard({ user }: { user: User }) {
  const classrooms = await getClassrooms(user)
  return (
    <div>
      <h1 className="text-3xl font-semibold">Your Dashboard</h1>
      <p className="text-neutralgrey-1000 flex items-center justify-start text-sm">
        You have {classrooms.length} classroom{classrooms.length > 1 ? 's' : ''} with a total of{' '}
        {classrooms.reduce((acc, classroom) => acc + classroom._count.students, 0)} student
        {classrooms.reduce((acc, classroom) => acc + classroom._count.students, 0) > 1 ? 's' : ''}.
        <Tooltip>
          <TooltipContent asChild>
            <Link href="/dashboard/teacher/stats">View more stats</Link>
          </TooltipContent>
          <TooltipTrigger asChild>
            <Link href="/dashboard/teacher/stats">
              <InformationCircleContainedIcon className="ml-1 size-4" />
            </Link>
          </TooltipTrigger>
        </Tooltip>
      </p>
      <ul className="mt-12 w-full">
        {classrooms.map((classroom, index) => {
          return (
            <Link
              href={`/dashboard/${classroom.id}`}
              key={index + classroom.id}
              className="shadow-hard-soft-2xs flex w-full flex-col items-start justify-start rounded-sm p-4"
            >
              <h1 className="text-xl font-medium">{classroom.name}</h1>
              <p>
                <span className="text-neutralgrey-1000">Students: </span>
                <span className="text-neutralgrey-800">{classroom._count.students}</span>
              </p>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
