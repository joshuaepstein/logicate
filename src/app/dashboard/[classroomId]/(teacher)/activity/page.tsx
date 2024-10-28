export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params

  return <>TeacherClassroomDashboardPage.Activity</>
}
