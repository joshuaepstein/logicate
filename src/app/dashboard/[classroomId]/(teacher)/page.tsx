import { redirect } from "next/navigation"

export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params

  redirect(`/dashboard/${classroomId}/activity`)
}
