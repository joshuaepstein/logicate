import { prisma } from '@logicate/database'
import { unstable_cache } from 'next/cache'

export const getClassroom = (classroomId: string) =>
  unstable_cache(
    async () => {
      const classroom = await prisma.classroom.findUnique({
        where: {
          id: classroomId,
        },
        select: {
          students: true,
          createdAt: true,
          description: true,
          _count: true,
          id: true,
          name: true,
          teachers: true,
          updatedAt: true,
        },
      })
      return classroom
    },
    ['classroom', classroomId],
    {
      revalidate: 3600,
      tags: ['classroom', `classroom:${classroomId}`],
    }
  )
