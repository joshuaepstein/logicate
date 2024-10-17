'use client'

import BooleanExpressionIcon from '@/components/icons/boolean-expression-icon'
import LogicGateIcon from '@/components/icons/logic-gate-icon'
import TruthTableIcon from '@/components/icons/truth-table-icon'
import { Button } from '@/components/ui/button'
import { capitaliseEachWord, cn } from '@/lib'
import { QuestionType } from '@/questions/question'
import { DashIcon, Plus01Icon } from '@jfstech/icons-react/24/outline'
import { lowerCase } from 'lodash'
import { redirect } from 'next/navigation'
import { Dispatch, SetStateAction, useState, useTransition } from 'react'
import { toast } from 'sonner'

const STAGES = [
  {
    id: 0,
    title: `Select Question Types`,
  },
  {
    id: 1,
    title: `Select Question Count`,
  },
  {
    id: 2,
    title: `Select Question Difficulty`,
  },
  {
    id: 3,
    title: `Enter Quiz Details`,
  },
  {
    id: 'create',
    title: `Creating Quiz`,
  },
]

export default function CreateQuizQuestionsForm() {
  const [stage, setStage] = useState<number>(0)
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<QuestionType[]>([])
  const [questionCount, setQuestionCount] = useState<number>(0)
  const [creatingQuestions, createQuestions] = useTransition()

  const updateStage = () => {
    if (stage < STAGES.length - 1) {
      setStage((prev) => prev + 1)
    } else {
      // submit form
      createQuestions(async () => {
        // await createQuestions()
        // go to quiz page
        const createdQuizId = '123'
        redirect(`/q/${createdQuizId}`)
      })
    }
  }

  return (
    <div className="flex min-h-[70dvh] flex-col gap-4">
      {(() => {
        switch (stage) {
          case 0:
            return (
              <StageOne
                updateStage={updateStage}
                selectedQuestionTypes={selectedQuestionTypes}
                setSelectedQuestionTypes={setSelectedQuestionTypes}
              />
            )
          case 1:
            return <StageTwo updateStage={updateStage} questionCount={questionCount} setQuestionCount={setQuestionCount} />
          default:
            return null
        }
      })()}
    </div>
  )
}

export function StageOne({
  selectedQuestionTypes,
  setSelectedQuestionTypes,
  updateStage,
}: {
  selectedQuestionTypes: QuestionType[]
  setSelectedQuestionTypes: Dispatch<SetStateAction<QuestionType[]>>
  updateStage: () => void
}) {
  return (
    <>
      <h4 className="text-neutralgrey-900 mb-1 mt-2">Select the question types you would like to include:</h4>
      <div className="flex flex-row items-start justify-start gap-6">
        {Object.values(QuestionType).map((questionType, index) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  'shadow-hard-soft-md hover:shadow-hard-soft-lg peer flex size-48 scale-100 flex-col items-center justify-center rounded-md transition hover:scale-105 active:scale-[1]',
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
              <p
                className={cn('mt-3 font-medium transition-all peer-hover:mt-4', {
                  'text-blue-1000': selectedQuestionTypes.includes(questionType),
                  'text-neutralgrey-1300': !selectedQuestionTypes.includes(questionType),
                })}
              >
                {capitaliseEachWord(lowerCase(questionType))}
              </p>
            </div>
          )
        })}
      </div>
      <Button
        onClick={() => {
          if (selectedQuestionTypes.length === 0) {
            toast.error(`Please select at least one question type`)
          } else {
            updateStage()
          }
        }}
        className="mt-4"
      >
        Next
      </Button>
    </>
  )
}

export function StageTwo({
  updateStage,
  questionCount,
  setQuestionCount,
}: {
  updateStage: () => void
  questionCount: number
  setQuestionCount: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-neutralgrey-900 mb-1 mt-2">Select the number of questions you would like to include:</h4>
      <div className="w-full">
        <div className="flex w-max flex-row items-center">
          <Button
            variant="no-borders"
            size="icon-xs"
            onClick={() => {
              if (questionCount > 0) {
                setQuestionCount(questionCount - 1)
              }
            }}
          >
            <DashIcon className="size-4" />
          </Button>
          <input
            className="w-full max-w-20 border-none text-center outline-none ring-0 focus:outline-none focus:ring-0"
            value={questionCount}
            // type="number"
            id="questions-amount-quantity-field"
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (!isNaN(value)) {
              }
            }}
          />
          <Button
            variant="no-borders"
            size="icon-xs"
            onClick={() => {
              // max = 50
              if (questionCount < 50) setQuestionCount(questionCount + 1)
            }}
          >
            <Plus01Icon className="size-4" />
          </Button>
        </div>
      </div>
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
