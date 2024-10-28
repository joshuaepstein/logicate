"use server"

import { prisma } from "@/database"
import { getSession } from "@/lib/auth/utils"

export const getCode = async (code: string) => {
  const user = await getSession()

  const inviteCode = await prisma.invites.findUnique({
    where: {
      code,
      ...(user ? { to: user.user.email } : {}),
      accepted: false,
      expires: {
        gte: new Date(),
      },
    },
    include: { classroom: true },
  })

  return inviteCode
}

export const joinClassroom = async (userId: string, inviteId: string, classroomId: string) => {
  const user = await getSession()

  if (!user) return "Must login to join classroom"

  const classroom = await prisma.classroom.findUnique({
    where: { id: classroomId },
  })

  if (!classroom) return "Classroom not found"

  const alreadyJoined = await prisma.classroom.findFirst({
    where: { id: classroomId, students: { some: { id: userId } } },
  })

  if (alreadyJoined) return "Already joined classroom"

  const updatedClassroom = await prisma.classroom.update({
    where: { id: classroomId },
    data: { students: { connect: { id: userId } } },
  })

  const updatedInvite = await prisma.invites.update({
    where: { id: inviteId },
    data: { accepted: true },
  })

  return updatedInvite && updatedClassroom ? "Joined classroom" : "Failed to join classroom"
}
