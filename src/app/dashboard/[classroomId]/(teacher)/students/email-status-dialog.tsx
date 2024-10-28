import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modal"
import { Skeleton } from "@/components/ui/skeleton"
import { EmailIcon } from "@jfstech/icons-react/24/outline"
import { resend } from "@logicate/emails/resend"
import { Invites } from "@prisma/client"
import { unstable_cache } from "next/cache"
import { Suspense } from "react"
import EmailStatusDialogClient from "./email-status-dialog-client"

const getEmailStatus = (emailId: string | null) =>
  unstable_cache(
    async () => {
      if (!emailId) return null

      const emailStatus = await resend.emails.get(emailId)

      return emailStatus
    },
    [`email-status-${emailId}`],
    {
      revalidate: 60,
      tags: [`email-status-${emailId}`],
    }
  )

export default async function EmailStatusDialog({
  student,
}: {
  student: Invites & {
    type: "invite"
  }
}) {
  const emailStatus = getEmailStatus(student.emailId)()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="green-secondary" size="icon-2xs" className="flex items-center gap-2">
          <EmailIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Invite Status</DialogTitle>
          <DialogDescription>
            You can regenerate the invite link, or re-send the existing link to the students email address.
          </DialogDescription>
        </DialogHeader>

        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <EmailStatusDialogClient emailStatusPromise={emailStatus} student={student} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
