import { getSession } from "@/lib/auth/utils"
import { notFound } from "next/navigation"
import StudentDashboard from "../../student"

// Display either the teacher dashboard or the student dashboard - user is always available as middleware checks this
export default async function DashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params

  const session = await getSession()

  if (session.user.accountType !== "STUDENT") return notFound()

  return <StudentDashboard classroomId={classroomId} user={session.user} />
}
