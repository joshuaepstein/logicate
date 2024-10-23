import { getSession } from '@/lib/auth/utils'
import { notFound } from 'next/navigation'
import StudentDashboard from './student'
import TeacherDashboard from '../teacher'
import TeacherClassroomDashboard from './teacher'
import { addRecentClassroom } from '@/lib/storage/dashboard/recent'
import { cookies } from 'next/headers'

// Display either the teacher dashboard or the student dashboard - user is always available as middleware checks this
export default async function DashboardPage({ params: { classroomId } }: { params: { classroomId: string } }) {
  const session = await getSession()

  // TODO: Save recent classrooms to cookies
  // const response = await addRecentClassroom(classroomId)
  // console.log('recentClassrooms', response)

  switch (session.user.accountType) {
    case 'TEACHER':
      return <TeacherClassroomDashboard classroomId={classroomId} user={session.user} />
    case 'STUDENT':
      return <StudentDashboard classroomId={classroomId} user={session.user} />
    default:
      return notFound()
  }
}
