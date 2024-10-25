import { getSession } from "@/lib/auth/utils"
import { notFound } from "next/navigation"
import StudentDashboard from "./student"
import TeacherDashboard from "./teacher"

// Display either the teacher dashboard or the student dashboard - user is always available as middleware checks this
export default async function DashboardPage() {
  const session = await getSession()

  switch (session.user.accountType) {
    case "TEACHER":
      return <TeacherDashboard user={session.user} />
    case "STUDENT":
      return <StudentDashboard user={session.user} />
    default:
      return notFound()
  }
}
