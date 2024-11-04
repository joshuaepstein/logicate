"use server"

import { Invites, prisma } from "@/database"
import { getSession } from "@/lib/auth/utils"
import { generateClassroomId, generateInviteCode } from "@/lib/id"
import { Failure, Success } from "@/types/api"
import { sendEmail } from "@logicate/emails/index"
import InviteStudent from "@logicate/emails/templates/invite-student"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  emails: z
    .string()
    .optional()
    .transform((value) =>
      (value || "")
        .split("\n")
        .map((email) => email.trim())
        .filter(Boolean)
    ),
})

export async function createClassroom(prevState: Failure<string> | Success<string> | undefined, formData: FormData) {
  if (!formSchema.safeParse(Object.fromEntries(formData)).success) {
    return Failure("Invalid form data")
  }

  const { name, description, emails } = formSchema.parse(Object.fromEntries(formData))

  const user = await getSession()

  const classroom = await prisma.classroom.create({
    data: {
      id: generateClassroomId(),
      name,
      description,
      teachers: {
        connect: {
          id: user.user.id,
        },
      },
    },
  })

  const userPermission = await prisma.userPermission.create({
    data: {
      userId: user.user.id,
      classroomId: classroom.id,
      permission: "OWNER",
    },
  })

  if (!classroom || !userPermission) {
    return Failure("Failed to create classroom")
  }

  revalidateTag("teacher_classrooms")

  if (emails && emails.length > 0) {
    let invites: Invites[] = []
    for (const email of emails) {
      const code = generateInviteCode()
      const invite = await prisma.invites.create({
        data: {
          classroomId: classroom.id,
          fromId: user.user.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
          to: email,
          code: code,
          accepted: false,
        },
      })

      const emailResponse = await sendEmail({
        email: email,
        subject: `You have been invited to join ${name} on Logicate`,
        from: `${user.user.name} (${user.user.email}) from Logicate <system.logicate@joshepstein.co.uk>`,
        // text: `You have been invited to join ${name} on Logicate. Click the link below to accept the invite: ${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`,
        react: InviteStudent({
          acceptUrl: `${process.env.NEXT_PUBLIC_APP_URL}/join/${code}`,
          classroomName: name,
          inviter: {
            name: user.user.name,
            email: user.user.email,
          },
          to: {
            email: email,
            name: email.split("@")[0] ?? email,
          },
        }),
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

    return Success(`Classroom created successfully and invited ${invites.length} student${invites.length === 1 ? "" : "s"}`, {
      classroom,
      invites,
    })
  }

  return Success("Classroom created successfully", { classroom })
}
