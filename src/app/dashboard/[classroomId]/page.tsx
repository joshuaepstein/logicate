import { getSession } from '@/lib/auth/utils'
import { notFound } from 'next/navigation'
import StudentDashboard from './student'
import TeacherClassroomDashboard from './teacher'

// Display either the teacher dashboard or the student dashboard - user is always available as middleware checks this
export default async function DashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const params = await props.params

  const { classroomId } = params

  const session = await getSession()

  switch (session.user.accountType) {
    case 'TEACHER':
      return <TeacherClassroomDashboard classroomId={classroomId} user={session.user} />
    case 'STUDENT':
      return <StudentDashboard classroomId={classroomId} user={session.user} />
    default:
      return notFound()
  }
}
