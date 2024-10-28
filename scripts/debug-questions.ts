import { BooleanExpression, BooleanExpressionDifficulty } from "@/questions/boolean-expression"
import { Question, QuestionType } from "@/questions/question"

async function main() {
  let failedCount = 0
  for (let i = 0; i < 10000; i++) {
    let generatedBooleanExpression = BooleanExpression.generateRandom(BooleanExpressionDifficulty.Medium)
    let question = new Question(QuestionType.BOOLEAN_EXPRESSION, generatedBooleanExpression)

    let answer = question.getAnswer()

    let equal = BooleanExpression.areEqual(question.getQuestion(), answer)

    while (!equal) {
      console.log(
        red(
          `Iteration ${i + 1}: Question and answer are not equal /|\\ ${question.getQuestion().displayAsString()} !== ${answer instanceof BooleanExpression ? answer.displayAsString() : answer}`
        )
      )
      // console.log(`--------------------------------`)
      // console.log("Question")
      // console.log(JSON.stringify(question.getQuestion().toJSON(), null, 2))
      // console.log("--------------------------------")
      // console.log("Answer")
      // console.log(answer instanceof BooleanExpression ? JSON.stringify(answer.toJSON(), null, 2) : answer)
      // console.log("--------------------------------")
      // console.log(question.getQuestion().displayAsString())
      // console.log(answer instanceof BooleanExpression ? answer.displayAsString() : answer)
      // break
      generatedBooleanExpression = BooleanExpression.generateRandom(BooleanExpressionDifficulty.Medium)
      question = new Question(QuestionType.BOOLEAN_EXPRESSION, generatedBooleanExpression)
      answer = question.getAnswer()
      equal = BooleanExpression.areEqual(question.getQuestion(), answer)
    }

    if (i === 9999) {
      console.log(green(`All ${10000 - failedCount} iterations were equal`))
      console.log(red(`${failedCount} iterations failed`))
      console.log(`${failedCount / 10000}%`)
    }
  }
}

main()

function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`
}

function red(text: string) {
  return `\x1b[31m${text}\x1b[0m`
}
