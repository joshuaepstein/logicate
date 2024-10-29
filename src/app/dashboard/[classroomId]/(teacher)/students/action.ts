"use server"

import { Invites, prisma } from "@/database"
import { getSession } from "@/lib/auth/utils"
import { generateInviteCode } from "@/lib/id"
import { Failure, Success } from "@/types/api"
import { sendEmail } from "@logicate/emails/index"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import { getPermissions } from "../settings/action"

export const resetInviteCode = async (student: Invites) => {
  const { user } = await getSession()
  const code = generateInviteCode()

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: student.classroomId,
    },
  })

  const emailResponse = await sendEmail({
    email: student.to,
    subject: "You have been invited to a classroom on Logicate",
    from: `${user.name} (${user.email}) from Logicate <system.logicate@joshepstein.co.uk>`,
    text: `You have been invited to join ${classroom?.name} on Logicate. Click the link below to accept the invite: ${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`,
    marketing: false,
  })

  if (emailResponse && emailResponse.data) {
    await prisma.invites.update({
      where: {
        id: student.id,
      },
      data: {
        emailId: emailResponse.data.id,
      },
    })

    const updated = await prisma.invites.update({
      where: {
        id: student.id,
      },
      data: {
        code,
      },
    })

    revalidateTag(`email-status-${student.emailId}`)

    return updated && emailResponse.data
  }

  return false
}

export const resendInvite = async (student: Invites) => {
  const { user } = await getSession()

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: student.classroomId,
    },
  })

  const emailResponse = await sendEmail({
    email: student.to,
    subject: `You have been invited to ${classroom?.name} on Logicate`,
    from: `${user.name} (${user.email}) from Logicate <system.logicate@joshepstein.co.uk>`,
    text: `You have been invited to join ${classroom?.name} on Logicate. Click the link below to accept the invite: ${process.env.NEXT_PUBLIC_APP_URL}/join/${student.code}`,
    marketing: false,
  })

  if (emailResponse && emailResponse.data) {
    await prisma.invites.update({
      where: {
        id: student.id,
      },
      data: {
        emailId: emailResponse.data.id,
      },
    })
  }

  revalidateTag(`email-status-${student.emailId}`)

  return emailResponse && emailResponse.data
}

export const revokeInvite = async (student: Invites) => {
  if (!student) {
    return false
  }

  const existing = await prisma.invites.findUnique({
    where: {
      id: student.id,
    },
  })

  if (!existing) {
    return false
  }

  const removed = await prisma.invites.delete({
    where: {
      id: student.id,
    },
  })

  revalidateTag(`classroom-${student.classroomId}`)

  return removed
}

const inviteStudentsSchema = z.object({
  classroomId: z.string(),
  emails: z.string().transform((emails) =>
    emails
      .split("\n")
      .map((email) => email.trim())
      .filter(Boolean)
  ),
})

export const inviteStudents = async (prevState: Failure<string> | Success<string> | undefined, formData: FormData) => {
  if (!inviteStudentsSchema.safeParse(Object.fromEntries(formData)).success) {
    return Failure("Invalid form data")
  }

  const { classroomId, emails } = inviteStudentsSchema.parse(Object.fromEntries(formData))

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: classroomId,
    },
  })

  if (!classroom) {
    return Failure("Classroom not found")
  }

  const { user } = await getSession()

  let invites: Invites[] = []
  for (const email of emails) {
    const code = generateInviteCode()
    const invite = await prisma.invites.create({
      data: {
        classroomId: classroom.id,
        fromId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
        to: email,
        code: code,
        accepted: false,
        asAccountType: "STUDENT",
      },
    })

    const emailResponse = await sendEmail({
      email: email,
      subject: "You have been invited to a classroom on Logicate",
      from: `${user.name} (${user.email}) from Logicate <system.logicate@joshepstein.co.uk>`,
      text: `You have been invited to join ${classroom.name} on Logicate. Click the link below to accept the invite: ${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`,
      marketing: false,
    })

    if (emailResponse && emailResponse.data) {
      await prisma.invites.update({
        where: {
          id: invite.id,
        },
        data: {
          emailId: emailResponse.data.id,
        },
      })
    }

    invites.push(invite)
  }

  if (invites.length !== emails.length) {
    return Failure(`Failed to send all invites. Sent ${invites.length} of ${emails.length} invites.`)
  }

  revalidateTag(`classroom-${classroomId}`)

  return Success("Invites sent successfully", { invites })
}

const inviteTeacherSchema = z.object({
  email: z.string(),
  classroomId: z.string(),
})
export const inviteTeacher = async (prevState: Failure<string> | Success<string> | undefined, formData: FormData) => {
  if (!inviteTeacherSchema.safeParse(Object.fromEntries(formData)).success) {
    return Failure("Invalid form data")
  }

  const { user } = await getSession()

  const { email, classroomId } = inviteTeacherSchema.parse(Object.fromEntries(formData))

  const code = generateInviteCode()

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: classroomId,
    },
  })

  if (!classroom) {
    return Failure("Classroom not found")
  }

  const existing = await prisma.classroom.findFirst({
    where: {
      id: classroomId,
      teachers: {
        some: {
          email,
        },
      },
    },
  })

  if (existing) {
    return Failure("Teacher already exists in classroom")
  }

  const existingInvite = await prisma.invites.findFirst({
    where: {
      classroomId,
      to: email,
      asAccountType: "TEACHER",
    },
  })

  if (existingInvite) {
    return Failure("Teacher already invited")
  }

  const invite = await prisma.invites.create({
    data: {
      classroomId: classroom.id,
      fromId: user.id,
      to: email,
      code: code,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
      asAccountType: "TEACHER",
      accepted: false,
    },
  })

  const emailResponse = await sendEmail({
    email: email,
    subject: "You have been invited to a classroom on Logicate",
    from: `${user.name} (${user.email}) from Logicate <system.logicate@joshepstein.co.uk>`,
    text: `You have been invited to join ${classroom.name} on Logicate. Click the link below to accept the invite: ${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`,
    marketing: false,
  })

  if (emailResponse && emailResponse.data) {
    await prisma.invites.update({
      where: {
        id: invite.id,
      },
      data: {
        emailId: emailResponse.data.id,
      },
    })
  } else {
    console.log("Invite created but not sent via email", { invite })
    return Success("Invite created but not sent via email", { invite })
  }

  revalidateTag(`classroom-${classroomId}`)

  return Success("Invite sent successfully", { invite })
}

export const removeStudent = async (classroomId: string, removeUserId: string) => {
  const { user } = await getSession()
  if (!user) {
    return Failure("You must be logged in to remove a student")
  }

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: classroomId,
    },
  })

  if (!classroom) {
    return Failure("Classroom not found")
  }

  const permission = await getPermissions(classroomId)

  if (permission.find((permission) => permission.userId === user.id)?.permission !== "OWNER") {
    return Failure("You do not have permission to remove this student")
  }

  const removed = await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      students: {
        disconnect: {
          id: removeUserId,
        },
      },
    },
  })

  revalidateTag(`classroom-${classroomId}`)

  return removed
}
