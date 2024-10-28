"use client"

import LoadingCircle from "@/components/ui/icons/loading-circle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Classroom, User, UserPermissions } from "@prisma/client"
import { useTransition } from "react"
import { updateUserPermission } from "./action"

export default function SelectablePermission({
  permission,
  teacherId,
  classroomId,
}: {
  permission: UserPermissions
  teacherId: User["id"]
  classroomId: Classroom["id"]
}) {
  const [updatingPermission, updatePermission] = useTransition()

  return (
    <div className="flex w-full items-center gap-2">
      {!updatingPermission ? (
        <Select
          defaultValue={permission}
          onValueChange={(value) => {
            updatePermission(async () => {
              await updateUserPermission(teacherId, classroomId, value as UserPermissions)
            })
          }}
        >
          <SelectTrigger showIcon>
            <SelectValue placeholder="Select Permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OWNER" disabled className="text-neutralgrey-900">
              Owner
            </SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <LoadingCircle className="size-6" />
      )}
    </div>
  )
}
