'use client'

import BooleanExpressionIcon from '@/components/icons/boolean-expression-icon'
import LogicGateIcon from '@/components/icons/logic-gate-icon'
import TruthTableIcon from '@/components/icons/truth-table-icon'
import { capitaliseEachWord, cn } from '@/lib'
import { QuestionType } from '@/questions/question'
import { lowerCase } from 'lodash'
import { useState } from 'react'

export default function CreateQuizQuestionsForm() {
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<QuestionType[]>([])

  return (
    <div className="flex flex-row items-start justify-start gap-6">
      {Object.values(QuestionType).map((questionType, index) => {
        return (
          <div className="flex flex-col items-center justify-center">
            <div
              className={cn(
                'shadow-hard-soft-md hover:shadow-hard-soft-lg flex size-48 scale-100 flex-col items-center justify-center rounded-md transition hover:scale-105 active:scale-[1]',
                {
                  '!shadow-blue-1000/25 text-blue-1000 bg-white fill-white': selectedQuestionTypes.includes(questionType),
                  'text-neutralgrey-1300 bg-white fill-white': !selectedQuestionTypes.includes(questionType),
                }
              )}
              onClick={() => {
                setSelectedQuestionTypes((prev) => {
                  if (prev.includes(questionType)) {
                    return prev.filter((q) => q !== questionType)
                  } else {
                    return [...prev, questionType]
                  }
                })
              }}
              key={index}
            >
              <IconFromQuestionType questionType={questionType} />
            </div>
            <p className="mt-3 font-medium">{capitaliseEachWord(lowerCase(questionType))}</p>
          </div>
        )
      })}
    </div>
  )
}

function IconFromQuestionType({ questionType }: { questionType: QuestionType }) {
  switch (questionType) {
    case QuestionType.LOGIC_GATE:
      return <LogicGateIcon className="fill-inherit text-current" />
    case QuestionType.BOOLEAN_EXPRESSION:
      return <BooleanExpressionIcon className="text-current" />
    case QuestionType.TRUTH_TABLE:
      return <TruthTableIcon className="text-current" />
    default:
      return null
  }
}
