import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modal"
import ClientProfilePicture from "@/components/ui/profile-picture/client"
import { H3, H4 } from "@/components/ui/typography"
import { cn } from "@/lib"
import { getSession } from "@/lib/auth/utils"
import { randomAvatar } from "@/lib/random"
import { ArrowSwitchHorizontalIcon, Pencil01Icon } from "@jfstech/icons-react/24/outline"
import { notFound } from "next/navigation"
import { getClassroom } from "../actions"
import { getUserPermission } from "../user-action"
import { getPermissions, getPublicDisplays } from "./action"
import DescriptionInput from "./description-input"
import NameInput from "./name-input"
import SelectablePermission from "./selectable-permission"
import TransferTeacherDialogContent from "./transfer-teacher-dialog-content"

// TODO: Invite teachers & Loading State (We fetch a lot of data here so assume the loading state will be visible for a while on slower networks)
export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params
  const classroom = await getClassroom(classroomId)()
  if (!classroom) return notFound()
  const { user } = await getSession()
  if (!user) return notFound()
  const userPermission = await getUserPermission(user.id, classroomId)
  if (!userPermission || userPermission === "MEMBER") return notFound()
  const publicDisplays = await getPublicDisplays(classroom.teachers.map((teacher) => teacher.id))
  const permissions = await getPermissions(classroomId)

  return (
    <>
      <H3 className="mt-0">Classroom Settings</H3>

      <NameInput classroom={classroom} />
      <DescriptionInput classroom={classroom} />

      <H4>Teachers</H4>
      <ul className="flex flex-col gap-2">
        {classroom.teachers.map((teacher, index) => (
          <li key={index} className="even:bg-neutralgrey-200 -mx-4 flex flex-row items-center justify-between rounded-md px-4 py-4">
            <div className="flex flex-row items-center justify-start gap-4">
              <ClientProfilePicture
                type="profilePicture"
                profilePicture={
                  publicDisplays.find((publicDisplay) => publicDisplay.userId === teacher.id)?.profilePicture || randomAvatar()
                }
                // @ts-ignore
                user={teacher}
                className="rounded-sm"
              />
              <div className="flex flex-col gap-0">
                <p className="text-neutralgrey-1200 flex items-center justify-start gap-3 text-sm font-[450]">
                  {teacher.name}{" "}
                  <span
                    className={cn("text-2xs h-max rounded-sm px-1 font-[450] tracking-tight", {
                      "bg-squash-700 text-squash-1200 text-shimmer":
                        (permissions.find((permission) => permission.userId === teacher.id)?.permission || "MEMBER") === "OWNER",
                      "bg-neutralgrey-200 text-neutralgrey-1200":
                        (permissions.find((permission) => permission.userId === teacher.id)?.permission || "MEMBER") !== "OWNER",
                    })}
                  >
                    {permissions.find((permission) => permission.userId === teacher.id)?.permission || "MEMBER"}
                  </span>
                </p>
                <p className="text-neutralgrey-600 -mt-0.5 text-xs">{teacher.email}</p>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              {user.id !== teacher.id && userPermission === "OWNER" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={index % 2 === 0 ? "no-borders" : "secondary"} size="icon-sm">
                      <ArrowSwitchHorizontalIcon className="size-4 -rotate-90 -scale-y-100" />
                    </Button>
                  </DialogTrigger>
                  <TransferTeacherDialogContent teacherName={teacher.name} teacherId={teacher.id} classroomId={classroomId} />
                </Dialog>
              )}
              {user.id !== teacher.id &&
                (permissions.find((permission) => permission.userId === teacher.id)?.permission || "MEMBER") !== "OWNER" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={index % 2 === 0 ? "no-borders" : "secondary"} size="icon-sm">
                        <Pencil01Icon className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Teacher ({teacher.name})</DialogTitle>
                        <DialogDescription>Edit the teacher's permissions below.</DialogDescription>
                      </DialogHeader>

                      <SelectablePermission
                        permission={permissions.find((permission) => permission.userId === teacher.id)?.permission || "MEMBER"}
                        teacherId={teacher.id}
                        classroomId={classroomId}
                      />
                    </DialogContent>
                  </Dialog>
                )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
