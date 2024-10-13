import { Container } from '@/components/ui/not-done-yet/container'
import CreateQuizQuestionForm from './form'
import { H1, H2 } from '@/components/ui/typography'

export default function NewQuizPage() {
  return (
    <Container>
      <H2>Create a new quiz</H2>
      <CreateQuizQuestionForm />
    </Container>
  )
}
