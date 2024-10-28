export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params
  // Fetch all assignments and tasks which are related to all students in the classroom

  // Fetch a suggestion of tasks to create or set for the classroom

  return <>TeacherClassroomDashboardPage.Assignments</>
}
