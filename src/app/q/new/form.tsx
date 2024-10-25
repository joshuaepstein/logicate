"use client"

import BooleanExpressionIcon from "@/components/icons/boolean-expression-icon"
import LogicGateIcon from "@/components/icons/logic-gate-icon"
import TruthTableIcon from "@/components/icons/truth-table-icon"
import { Button } from "@/components/ui/button"
import { capitaliseEachWord, cn } from "@/lib"
import { QuestionType } from "@/questions/question"
import { AnimatePresence, motion, MotionValue, useSpring, useTransform } from "framer-motion"
import { lowerCase } from "lodash"
import { redirect } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"

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
    id: "create",
    title: `Creating Quiz`,
  },
]

export default function CreateQuizQuestionsForm() {
  const [stage, setStage] = useState<number>(0)
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<QuestionType[]>([])
  const [questionCount, setQuestionCount] = useState<number>(10)
  const [creatingQuestions, createQuestions] = useTransition()

  const updateStage = () => {
    if (stage < STAGES.length - 1) {
      setStage((prev) => prev + 1)
    } else {
      // submit form
      createQuestions(async () => {
        // await createQuestions()
        // go to quiz page
        const createdQuizId = "123"
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
      <h4 className="mb-1 mt-2 text-neutralgrey-900">Select the question types you would like to include:</h4>
      <div className="flex flex-row items-start justify-start gap-6">
        {Object.values(QuestionType).map((questionType, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  "peer flex size-48 scale-100 flex-col items-center justify-center rounded-md shadow-hard-soft-md transition hover:scale-105 hover:shadow-hard-soft-lg active:scale-[1]",
                  {
                    "bg-white fill-white text-blue-1000 !shadow-blue-1000/25": selectedQuestionTypes.includes(questionType),
                    "bg-white fill-white text-neutralgrey-1300": !selectedQuestionTypes.includes(questionType),
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
              >
                <IconFromQuestionType questionType={questionType} />
              </div>
              <p
                className={cn("mt-3 font-medium transition-all peer-hover:mt-4", {
                  "text-blue-1000": selectedQuestionTypes.includes(questionType),
                  "text-neutralgrey-1300": !selectedQuestionTypes.includes(questionType),
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
      <h4 className="mb-1 mt-2 text-neutralgrey-900">Select the number of questions you would like to include:</h4>
      <div className="w-full max-w-lg">
        {/* <div className="flex w-max flex-row items-center">
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
        </div> */}
        <CustomSlider questionCount={questionCount} setQuestionCount={setQuestionCount} />
      </div>
    </div>
  )
}

const CustomSlider = ({
  questionCount,
  setQuestionCount,
}: {
  questionCount: number
  setQuestionCount: Dispatch<SetStateAction<number>>
}) => {
  const [dragging, setDragging] = useState(false)

  useEventListener("mouseup", () => {
    if (dragging) {
      setDragging(false)
    }
  })

  useEventListener("mousemove", (e) => {
    if (dragging === true && e.buttons === 1) {
      const rect = document.querySelector("[data-slider-questions]")?.getBoundingClientRect()
      const maxRect = document.querySelector("[data-slider-questions]")?.parentElement?.getBoundingClientRect()
      if (rect && maxRect) {
        // if mouse not in the maxRect, do nothing
        if (e.clientX < maxRect.left || e.clientX > maxRect.right) return
        if (e.clientY < maxRect.top || e.clientY > maxRect.bottom) return
        const x = e.clientX + 5
        const maxWidth = maxRect.width
        const width = rect.width
        console.log(x, width, maxWidth)
        // get the position of the mouse relative to the slider
        const position = x - rect.left
        const percentage = (position / maxWidth) * 100
        // the percentage should lock at intervals of MAX_QUESTIONS
        const MAX_QUESTIONS = 50
        const roundedPercentage = Math.round(percentage / (100 / MAX_QUESTIONS)) * (100 / MAX_QUESTIONS)
        ;(document.querySelector("[data-slider-questions]")! as HTMLDivElement).style.width = `${roundedPercentage}%`
        const newQuestionCount = Math.round((roundedPercentage / 100) * MAX_QUESTIONS)
        // min question count is 1
        if (newQuestionCount < 1) {
          setQuestionCount(1)
        } else {
          setQuestionCount(newQuestionCount)
        }
      }
    }
  })

  return (
    <div
      className="group/p flex h-8 w-full items-center overflow-hidden rounded-md bg-neutralgrey-200 p-[2px]"
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()

        // click to a position on the slider
        const rect = document.querySelector("[data-slider-questions]")?.getBoundingClientRect()
        const maxRect = document.querySelector("[data-slider-questions]")?.parentElement?.getBoundingClientRect()
        if (rect && maxRect) {
          const x = e.clientX
          const position = x - rect.left
          const percentage = (position / maxRect.width) * 100
          console.log(percentage)
          ;(document.querySelector("[data-slider-questions]")! as HTMLDivElement).style.width = `${percentage}%`
          const newQuestionCount = Math.round((percentage / 100) * 50)
          setQuestionCount(newQuestionCount)
          setDragging(true)
        }
      }}
    >
      <div
        className="group relative flex h-full min-w-max items-center justify-end overflow-hidden rounded-[4px] bg-white pr-1.5 shadow-soft-xs"
        data-slider-questions
        style={{
          width: `${(questionCount / 50) * 100}%`,
        }}
      >
        <AnimatePresence mode="wait">
          {questionCount > 13 && (
            <motion.div
              initial={{
                x: -100,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -100,
              }}
              style={{ fontSize }}
              className="absolute left-2 flex overflow-hidden text-left leading-none text-neutralgrey-1300"
            >
              <Digit place={10} value={questionCount} />
              <Digit place={1} value={questionCount} />{" "}
              <span className="ml-1 text-neutralgrey-900">Question{questionCount > 1 ? "s" : ""}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="absolute bottom-0 right-0 top-0 h-full w-[15px] cursor-col-resize"
          onMouseDown={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            setDragging(false)
          }}
        />
        <div className="easey-bouncy ml-4 h-4 w-[3px] rounded-full bg-neutralgrey-800 transition-all group-hover/p:h-[18px] group-hover:h-[18px] group-hover/p:bg-neutralgrey-1300 group-hover:bg-neutralgrey-1100 group-active:h-[18px] group-active:bg-neutralgrey-1300" />
      </div>
      <AnimatePresence mode="wait">
        {questionCount < 14 && (
          <motion.div
            initial={{
              y: -25,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 25,
            }}
            style={{ fontSize }}
            className="ml-1 flex select-none overflow-hidden text-left leading-none text-neutralgrey-1300"
          >
            <Digit place={10} value={questionCount} />
            <Digit place={1} value={questionCount} />{" "}
            <span className="ml-1 text-neutralgrey-900">Question{questionCount > 1 ? "s" : ""}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const fontSize = 13
const padding = 0
const height = fontSize + padding

function Digit({ place, value }: { place: number; value: number }) {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace, { stiffness: 300, damping: 30 })

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  if (valueRoundedToPlace === 0) {
    return null
  }

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10

    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return memo
  })

  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {number}
    </motion.span>
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
