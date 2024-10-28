import { prisma } from "@/database"
import { unstable_cache } from "next/cache"

export const getClassroom = (classroomId: string) =>
  unstable_cache(
    async () => {
      const classroom = await prisma.classroom.findUnique({
        where: {
          id: classroomId,
        },
        select: {
          id: true,
          _count: true,
          createdAt: true,
          description: true,
          Invites: true,
          name: true,
          students: {
            select: {
              name: true,
              email: true,
              accountType: true,
              progressLevel: true,
              username: true,
              id: true,
            },
          },
          teachers: true,
          updatedAt: true,
        },
      })
      return classroom
    },
    ["classroom", classroomId],
    {
      revalidate: false,
      tags: ["classroom", classroomId, `classroom-${classroomId}`],
    }
  )
