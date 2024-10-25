import { LogicateError } from "@/lib/api/error"
import { parseRequestBody } from "@/lib/api/utils"
import { withSession } from "@/lib/auth/session"
import { generateQuestionId } from "@/lib/id"
import { prisma } from "@logicate/database"
import { NextResponse } from "next/server"

export const POST = withSession(async ({ session, req }) => {
  const data = await parseRequestBody(req)

  const questionType = data.questionType
  const generatedQuestion = data.generatedQuestion

  const questionId = generateQuestionId()

  const questionData = {
    generatedQuestionType: questionType,
    generatedQuestion: generatedQuestion,
    userId: session.user.id,
    id: questionId,
  }

  const question = await prisma.question.create({
    data: {
      generatedQuestionType: questionType,
      generatedQuestion: generatedQuestion,
      userId: session.user.id,
      id: questionId,
    },
  })

  if (!question) {
    throw new LogicateError({
      code: "bad_request",
      message: "Failed to create question",
    })
  }

  return NextResponse.json(
    {
      success: true,
      id: questionId,
      data: questionData,
    },
    { status: 200 }
  )
})
