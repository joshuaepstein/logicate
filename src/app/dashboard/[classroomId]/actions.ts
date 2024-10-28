import { prisma } from "@logicate/database"
import { unstable_cache } from "next/cache"

export const getClassroom = (classroomId: string) =>
  unstable_cache(
    async () => {
      const classroom = await prisma.classroom.findUnique({
        where: {
          id: classroomId,
        },
        include: {
          Invites: true,
          _count: true,
          students: true,
          teachers: true,
        },
      })
      return classroom
    },
    ["classroom", classroomId],
    {
      revalidate: 3600,
      tags: ["classroom", `classroom:${classroomId}`],
    }
  )
