"use client"

import { Button } from "@/components/ui/button"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modal"
import { SubmitButton } from "@/components/ui/submit-button"
import { Textarea } from "@/components/ui/textarea"
import { AccountType, Classroom, Invites } from "@/database"
import { cn } from "@/lib"
import { Plus01Icon, Trash01Icon } from "@jfstech/icons-react/24/outline"
import { useActionState, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { inviteStudents, removeStudent, revokeInvite } from "./action"

export const RevokeButton = ({ student }: { student: Invites }) => {
  const [revoking, revoke] = useTransition()
  return (
    <Button
      variant="destructive-secondary"
      className="relative"
      size="icon-2xs"
      onClick={() =>
        revoke(async () => {
          const result = await revokeInvite(student)
          if (result) {
            toast.success(`Revoked invite for ${student.to}`)
          } else {
            toast.error(`Failed to revoke invite for ${student.to}`)
          }
        })
      }
    >
      {revoking && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingCircle className="size-5" />
        </div>
      )}
      <Trash01Icon
        className={cn("size-5", {
          "opacity-0": revoking,
        })}
      />
    </Button>
  )
}

export const RemoveStudentButton = ({
  classroomId,
  student,
}: {
  classroomId: string
  student: {
    id: string
    name: string
    email: string
    username: string
    progressLevel: number
    accountType: AccountType
  } & {
    type: "student"
  }
}) => {
  const [revoking, revoke] = useTransition()
  return (
    <Button
      variant="destructive-secondary"
      className="relative"
      size="icon-2xs"
      onClick={() =>
        revoke(async () => {
          const result = await removeStudent(classroomId, student.id)
          if (result.success) {
            toast.success(`Removed student ${student.email}`)
          } else {
            toast.error(result.error)
          }
        })
      }
    >
      {revoking && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingCircle className="size-5" />
        </div>
      )}
      <Trash01Icon
        className={cn("size-5", {
          "opacity-0": revoking,
        })}
      />
    </Button>
  )
}

export const InviteStudentsDialog = ({ classroom }: { classroom: Classroom }) => {
  const [formStatus, invite] = useActionState(inviteStudents, undefined)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (formStatus && formStatus.success) {
      setOpen(false)
      toast.success(formStatus.value)
    } else if (formStatus && !formStatus.success) {
      toast.error(formStatus.error)
    }
  }, [formStatus])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2" variant="secondary">
          <Plus01Icon className="size-4" />
          Invite Students
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Students</DialogTitle>
          <DialogDescription>Invite students to your classroom by entering their email addresses below.</DialogDescription>
        </DialogHeader>

        <form action={invite}>
          <input type="hidden" name="classroomId" value={classroom.id} />
          <Textarea placeholder="Student Emails" name="emails" className="min-h-[200px]" />
          <p className="text-neutralgrey-800 mt-2 text-sm">Enter email addresses, one per line</p>
          {/* TODO: Batch upload */}
          {formStatus && formStatus.success && <p className="text-green-800">{formStatus.value}</p>}
          {formStatus && !formStatus.success && <p className="text-red-800">{formStatus.error}</p>}
          <DialogFooter>
            <SubmitButton type="submit" variant="dark">
              Invite Students
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
