import { getSession } from "@/lib/auth/utils"
import { notFound } from "next/navigation"
import { getClassroom } from "../actions"

export default async function DashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const params = await props.params

  const { classroomId } = params

  const session = await getSession()
  const classroom = await getClassroom(classroomId)()

  if (session.user.accountType !== "TEACHER" || !classroom || !classroom.teachers.some((teacher) => teacher.id === session.user.id)) {
    return notFound()
  }

  return (
    // TODO: Implement Invite students page
    <form>
      <h1>Invite students</h1>
    </form>
  )
}
