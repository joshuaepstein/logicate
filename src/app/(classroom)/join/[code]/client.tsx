"use client"

import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Classroom } from "@/database"
import { cn } from "@/lib"
import { Session } from "@/lib/auth/utils"
import { use, useEffect, useState, useTransition } from "react"
import { getCode, joinClassroom } from "./actions"

export default function ClientJoin({ session, params }: { session: Promise<Session>; params: Promise<{ code: string }> }) {
  const { user } = use(session)
  const { code } = use(params)
  const [loading, load] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [classroom, setClassroom] = useState<Classroom | null>(null)

  useEffect(() => {
    load(async () => {
      const invite = await getCode(code)

      if (!invite) {
        setError("Invalid invite code")
        return
      }

      setClassroom(invite.classroom)

      const joined = await joinClassroom(user.id, invite.id, invite.classroom.id)

      if (joined === "Joined classroom") {
        setSuccess(true)
      } else {
        setError(joined)
      }
    })
  }, [code])

  return (
    <div className="flex h-full min-h-[80dvh] w-full items-center justify-center">
      <div
        className={cn("shadow-hard-soft-2xs flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-lg px-4 py-8", {
          "bg-green-100": success,
          "shadow-soft-2xs bg-red-100": error != null,
        })}
      >
        {loading && (
          <div className="flex items-center justify-center gap-4">
            <LoadingCircle className="size-4" />
            <h1 className="text-xl font-medium">Joining classroom...</h1>
          </div>
        )}
        <p
          className={cn("text-neutralgrey-1200 text-sm", {
            "text-green-1000": success,
            "text-red-1000": error != null,
          })}
        >
          {success
            ? "Successfully joined classroom"
            : error != null
              ? error
              : !classroom
                ? "This may take a few seconds."
                : `Attempting to join ${classroom.name}`}
        </p>
      </div>
    </div>
  )
}
