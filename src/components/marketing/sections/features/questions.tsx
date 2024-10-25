"use client"

import { BlurImage } from "@/components/ui/blur-image"
import useMediaQuery from "@/lib/hooks/use-media-query"
import { motion } from "framer-motion"
import { RefObject, useRef } from "react"
import { useHover } from "usehooks-ts"
import Gradient1 from "~/_static/gradient_element_blue-1.png"
import Gradient2 from "~/_static/gradient_element_blue-2.png"
import Gradient3 from "~/_static/gradient_element_blue-3.png"
import { FeatureDescription, FeatureTag, FeatureTitle } from "./components"
import FeatureWrapper from "./feature-wrapper"

export default function FeatureQuestions() {
  const { device } = useMediaQuery()
  const truthTableRef = useRef<HTMLDivElement>(null)
  const truthTableHovering = useHover(truthTableRef as RefObject<HTMLDivElement>)

  const booleanAlgebraRef = useRef<HTMLDivElement>(null)
  const booleanAlgebraHovering = useHover(booleanAlgebraRef as RefObject<HTMLDivElement>)

  const circuitDiagramRef = useRef<HTMLDivElement>(null)
  const circuitDiagramHovering = useHover(circuitDiagramRef as RefObject<HTMLDivElement>)

  return (
    <FeatureWrapper id="feature-questions">
      <FeatureTag className="text-purple-800">QUESTIONS</FeatureTag>
      <FeatureTitle>Challenge your students</FeatureTitle>
      <FeatureDescription>
        Using our question generator, you can either generate questions to test your own knowledge, or assign them to your students.
      </FeatureDescription>

      <div className="mt-8 flex w-full max-w-4xl flex-col justify-center gap-4 sm:flex-row">
        <div
          className="group relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-neutralgrey-100 p-6 shadow-hard-soft-2xs sm:w-1/3"
          ref={truthTableRef}
        >
          <BlurImage src={Gradient1} alt="Gradient" className="absolute left-0 top-0 size-full" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <p className="text-lg font-medium text-neutralgrey-1200 transition group-hover:text-ultramarine-700">Truth Tables</p>
            {(device !== "mobile" && (
              <motion.p
                className="text-center text-sm text-neutralgrey-1000/85"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: "auto",
                  },
                }}
                initial="hidden"
                animate={truthTableHovering ? "visible" : "hidden"}
              >
                Generate questions with a boolean expression and truth table that must be filled in.
              </motion.p>
            )) || (
              <p className="text-center text-sm text-neutralgrey-1000/85">
                Generate questions with a boolean expression and truth table that must be filled in.
              </p>
            )}
          </div>
        </div>
        <div
          className="group relative h-64 w-full overflow-hidden rounded-lg bg-neutralgrey-100 p-6 shadow-hard-soft-2xs sm:w-1/3"
          ref={booleanAlgebraRef}
        >
          <BlurImage src={Gradient2} alt="Gradient" className="absolute left-0 top-0 size-full" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
            <p className="text-lg font-medium text-neutralgrey-1200 transition group-hover:text-blue-800">Boolean Algebra</p>
            {(device !== "mobile" && (
              <motion.p
                className="text-center text-sm text-neutralgrey-1000/85"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: "auto",
                  },
                }}
                initial="hidden"
                animate={booleanAlgebraHovering ? "visible" : "hidden"}
              >
                Reduce boolean expressions of a chosen difficulty to their most simple form.
              </motion.p>
            )) || (
              <p className="text-center text-sm text-neutralgrey-1000/85">
                Reduce boolean expressions of a chosen difficulty to their most simple form.
              </p>
            )}
          </div>
        </div>
        <div
          className="group relative h-64 w-full overflow-hidden rounded-lg bg-neutralgrey-100 p-6 shadow-hard-soft-2xs sm:w-1/3"
          ref={circuitDiagramRef}
        >
          <BlurImage src={Gradient3} alt="Gradient" className="absolute left-0 top-0 z-0 size-full" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
            <p className="text-lg font-medium text-neutralgrey-1200 transition group-hover:text-teal-800">Logic Circuits</p>
            {(device !== "mobile" && (
              <motion.p
                className="text-center text-sm text-neutralgrey-1000/85"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: "auto",
                  },
                }}
                initial="hidden"
                animate={circuitDiagramHovering ? "visible" : "hidden"}
              >
                Create logic circuits from a boolean expression and vice versa.
              </motion.p>
            )) || (
              <p className="text-center text-sm text-neutralgrey-1000/85">
                Create logic circuits from a boolean expression and vice versa.
              </p>
            )}
          </div>
        </div>
      </div>
    </FeatureWrapper>
  )
}
