import { parseRequestBody } from "@/lib/api/utils";
import { withSession } from "@/lib/auth/session";
import { prisma } from "@logicate/database";
import { generateQuestionId } from "@logicate/utils/id";
import { NextResponse } from "next/server";

export const POST = withSession(
  async ({ session, params, req, searchParams }) => {
    const data = await parseRequestBody(req);

    const questionType = data.questionType;
    const generatedQuestion = data.generatedQuestion;

    const questionId = generateQuestionId();

    const questionData = {
      generatedQuestionType: questionType,
      generatedQuestion: generatedQuestion,
      userId: session.user.id,
      id: questionId,
    };

    const question = await prisma.question.create({
      data: {
        generatedQuestionType: questionType,
        generatedQuestion: generatedQuestion,
        userId: session.user.id,
        id: questionId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: questionId,
        data: questionData,
      },
      { status: 200 },
    );
  },
);
