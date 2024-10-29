"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modal"
import { SubmitButton } from "@/components/ui/submit-button"
import { Classroom } from "@/database"
import { Plus01Icon } from "@jfstech/icons-react/24/outline"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { inviteTeacher } from "../students/action"

export const InviteTeacherDialog = ({ classroom }: { classroom: Classroom }) => {
  const [formStatus, invite] = useActionState(inviteTeacher, undefined)
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
          Invite Teacher
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Teacher</DialogTitle>
          <DialogDescription>Invite a teacher to your classroom by entering their email address below.</DialogDescription>
        </DialogHeader>

        <form action={invite}>
          <input type="hidden" name="classroomId" value={classroom.id} />
          <Input placeholder="Teacher Email" name="email" required type="email" />
          {formStatus && formStatus.success && <p className="text-green-800">{formStatus.value}</p>}
          {formStatus && !formStatus.success && <p className="text-red-800">{formStatus.error}</p>}
          <DialogFooter>
            <SubmitButton type="submit" variant="dark">
              Invite Teacher
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
