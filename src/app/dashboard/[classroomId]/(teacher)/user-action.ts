import { prisma, UserPermissions } from "@/database"

export const getUserPermission: (userId: string, classroomId: string) => Promise<UserPermissions | null> = async (
  userId: string,
  classroomId: string
) => {
  const userPermission = await prisma.userPermission.findUnique({
    where: {
      userId_classroomId: {
        userId,
        classroomId,
      },
    },
  })
  return userPermission?.permission || null
}
