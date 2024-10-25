import { User } from "@logicate/database"
import { getClassroom } from "../actions"

export default function NoStudents({
  user,
  classroom,
}: {
  user: User
  classroom: NonNullable<Awaited<ReturnType<ReturnType<typeof getClassroom>>>>
}) {
  if (classroom.students.length > 0) {
    return null
  }
  return (
    <div className="flex h-full min-h-[80dvh] flex-col items-center justify-center">
      <h3 className="text-center text-2xl font-medium">There are no students in this class</h3>
      <p className="text-center text-sm text-neutralgrey-1000">Invite students to get started!</p>
    </div>
  )
}
