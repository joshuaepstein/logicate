import { getClassroom } from "./actions"
import TeacherClassroomDashboardHeader from "./header"

export default async function TeacherClassroomDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ classroomId: string }>
}) {
  const { classroomId } = await params

  const classroomPromise = getClassroom(classroomId)()

  return (
    <>
      <main className="max-w-dvw mb-8 mt-8 flex min-h-[calc(100dvh-15rem)] w-full flex-col">
        <TeacherClassroomDashboardHeader classroomPromise={classroomPromise} />
        <div className="container mt-6">{children}</div>
      </main>
    </>
  )
}
