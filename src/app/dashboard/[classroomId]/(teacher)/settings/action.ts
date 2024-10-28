"use server"

import { Classroom, prisma, User, UserPermissions } from "@/database"
import { getSession } from "@/lib/auth/utils"
import { revalidateTag } from "next/cache"

export const updateClassroomName = async (classroomId: string, name: string) => {
  const updated = await prisma.classroom.update({
    where: { id: classroomId },
    data: { name },
  })

  revalidateTag(`classroom-${classroomId}`)

  return updated
}

export const updateClassroomDescription = async (classroomId: string, description: string) => {
  const updated = await prisma.classroom.update({
    where: { id: classroomId },
    data: { description },
  })

  revalidateTag(`classroom-${classroomId}`)

  return updated
}

export const getPublicDisplays = async (userIds: User["id"][]) => {
  return await prisma.publicDisplay.findMany({
    where: {
      userId: { in: userIds },
    },
  })
}

export const getPermissions = async (classroomId: Classroom["id"]) => {
  return await prisma.userPermission.findMany({
    where: { classroomId },
  })
}

export const updateUserPermission = async (userId: User["id"], classroomId: Classroom["id"], permission: UserPermissions) => {
  const update = await prisma.userPermission.update({
    where: { userId_classroomId: { userId, classroomId } },
    data: { permission },
  })

  revalidateTag(`classroom-${classroomId}`)

  return update
}

export const transferTeacher = async (teacherId: User["id"], classroomId: Classroom["id"]) => {
  const user = await getSession()

  if (!user) throw new Error("User not found")

  const currentOwner = await prisma.userPermission.findFirst({
    where: { classroomId, permission: "OWNER" },
  })

  if (!currentOwner) throw new Error("Current owner not found")
  if (currentOwner.userId === teacherId) throw new Error("Cannot transfer ownership to the current owner")
  if (currentOwner.userId !== user.user.id) throw new Error("You are not the owner of this classroom")

  const removeOwner = await prisma.userPermission.update({
    where: { userId_classroomId: { userId: currentOwner.userId, classroomId } },
    data: { permission: "ADMIN" },
  })

  if (!removeOwner) throw new Error("Failed to remove owner")

  const updated = await prisma.userPermission.update({
    where: { userId_classroomId: { userId: teacherId, classroomId } },
    data: { permission: "OWNER" },
  })

  if (!updated) throw new Error("Failed to update teacher permission")

  revalidateTag(`classroom-${classroomId}`)

  return updated
}
