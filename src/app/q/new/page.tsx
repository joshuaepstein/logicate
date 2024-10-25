import { Container } from "@/components/ui/not-done-yet/container"
import { H2 } from "@/components/ui/typography"
import CreateQuizQuestionForm from "./form"

export default function NewQuizPage() {
  return (
    <Container>
      <H2>Create a new quiz</H2>
      <CreateQuizQuestionForm />
    </Container>
  )
}
