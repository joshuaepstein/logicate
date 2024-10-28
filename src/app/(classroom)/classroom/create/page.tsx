import { Container } from "@/components/ui/not-done-yet/container"
import { H2 } from "@/components/ui/typography"
import { CreateClassroomForm } from "./form"

export default function ClassroomCreator() {
  return (
    <Container className="mb-16">
      <H2>Create a Classroom</H2>
      <CreateClassroomForm />
    </Container>
  )
}
