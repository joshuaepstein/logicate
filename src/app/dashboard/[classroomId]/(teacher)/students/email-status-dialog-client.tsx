"use client"

import { Button } from "@/components/ui/button"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { DialogFooter } from "@/components/ui/modal"
import { cn } from "@/lib"
import { Invites } from "@prisma/client"
import Link from "next/link"
import { use, useTransition } from "react"
import { GetEmailResponse } from "resend"
import { toast } from "sonner"
import { resendInvite, resetInviteCode } from "./action"

export default function EmailStatusDialogClient({
  emailStatusPromise,
  student,
}: {
  emailStatusPromise: Promise<GetEmailResponse | null>
  student: Invites & {
    type: "invite"
  }
}) {
  const [regenerating, regenerate] = useTransition()
  const [resending, resend] = useTransition()
  const emailStatus = use(emailStatusPromise)

  return (
    <>
      <div className="flex items-center gap-2 leading-none">
        <div
          className={cn("size-2.5 rounded-full", {
            "bg-red-600": emailStatus?.error,
            "bg-green-600": !emailStatus?.error,
          })}
        />
        <p className="text-neutralgrey-1300 text-sm font-[520]">Recent Email Status</p>
      </div>
      <p className="text-neutralgrey-1000 -mt-2 text-sm font-[450] leading-none">
        The most recent email sent to {student.to} was {emailStatus?.error ? "unsuccessful" : "successful"}
      </p>

      <p className="text-neutralgrey-1300 mt-4 text-sm font-[450]">
        Current invite link: <Link href={`/join/${student.code}`}>{student.code}</Link>
      </p>

      <DialogFooter>
        <Button
          variant="secondary"
          className="relative"
          onClick={() =>
            regenerate(async () => {
              const response = await resetInviteCode(student)
              if (response) {
                toast.success("Invite link regenerated")
              } else {
                toast.error("Failed to regenerate invite link")
              }
            })
          }
          disabled={resending}
        >
          <span className={cn({ "opacity-0": regenerating })}>Regenerate Invite Link</span>

          {regenerating && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoadingCircle className="size-5" />
            </div>
          )}
        </Button>
        <Button
          variant="dark"
          className="relative"
          onClick={() =>
            resend(async () => {
              const response = await resendInvite(student)
              if (response) {
                toast.success("Invite link resent")
              } else {
                toast.error("Failed to resend invite link")
              }
            })
          }
          disabled={regenerating}
        >
          <span className={cn({ "opacity-0": resending })}>Resend Invite Link</span>

          {resending && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoadingCircle className="stroke-neutralgrey-800 text-neutralgrey-1000 size-5" />
            </div>
          )}
        </Button>
      </DialogFooter>
    </>
  )
}
