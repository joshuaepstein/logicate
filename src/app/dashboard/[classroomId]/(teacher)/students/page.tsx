import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { H3 } from "@/components/ui/typography"
import { notFound } from "next/navigation"
import { getClassroom } from "../actions"
import { InviteStudentsDialog, RevokeButton } from "./client"
import EmailStatusDialog from "./email-status-dialog"

export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params
  const classroom = await getClassroom(classroomId)()

  if (!classroom) return notFound()

  // @ts-ignore
  const students: (
    | ((typeof classroom.students)[number] & {
        type: "student"
      })
    | ((typeof classroom.Invites)[number] & {
        type: "invite"
      })
  )[] = [
    ...classroom.students.map((student) => ({ ...student, type: "student" })),
    ...classroom.Invites.filter((invite) => !classroom.students.some((student) => student.email === invite.to))
      .filter((invite) => invite.accepted === false && invite.expires > new Date() && invite.asAccountType === "STUDENT")
      .map((invite) => ({
        ...invite,
        type: "invite",
      })),
  ]

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <H3 className="mt-0">All Students</H3>
        <InviteStudentsDialog classroom={classroom} />
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Progress Level</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.type === "student" ? student.name : student.to}</TableCell>
              <TableCell>{student.type === "student" ? student.email : student.to}</TableCell>
              <TableCell>{student.type === "student" ? student.progressLevel : 0}</TableCell>
              <TableCell>
                {student.type === "student" ? (
                  <div className="size-2 rounded-full bg-green-600" aria-label="Joined" title="Joined Class" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-red-600" />
                    <p className="text-neutralgrey-1300 text-[13px] font-[450]">Invited</p>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {/* <Button variant="no-borders" size="icon-sm">
                  <Pencil01Icon className="size-4" />
                </Button> */}
                {student.type === "invite" && (
                  <div className="flex flex-row items-center justify-start gap-2">
                    <EmailStatusDialog student={student} />
                    <RevokeButton student={student} />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{students.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
