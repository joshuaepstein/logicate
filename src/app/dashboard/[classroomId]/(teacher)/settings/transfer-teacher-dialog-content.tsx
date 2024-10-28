"use client"

import { Button } from "@/components/ui/button"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/modal"
import { Classroom, User } from "@/database"
import { cn } from "@/lib"
import { useTransition } from "react"
import { toast } from "sonner"
import { transferTeacher } from "./action"

export default function TransferTeacherDialogContent({
  teacherId,
  classroomId,
  teacherName,
}: {
  teacherId: User["id"]
  classroomId: Classroom["id"]
  teacherName: User["name"]
}) {
  const [transferring, transfer] = useTransition()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Transfer Ownership</DialogTitle>
        <DialogDescription>Transfer the ownership of this classroom to {teacherName}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-row items-center justify-end gap-2">
        <Button
          disabled={transferring}
          variant="destructive-primary"
          className="relative"
          onClick={() => {
            transfer(async () => {
              try {
                await transferTeacher(teacherId, classroomId)
                toast.success("Successfully transferred ownership")
              } catch (error) {
                if (error instanceof Error) {
                  toast.error(error.message || "Failed to transfer ownership")
                } else {
                  toast.error("Failed to transfer ownership")
                }
              }
            })
          }}
        >
          {transferring && <LoadingCircle className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2" />}
          <span className={cn({ "opacity-0": transferring })}>Transfer</span>
        </Button>
      </div>
    </DialogContent>
  )
}
