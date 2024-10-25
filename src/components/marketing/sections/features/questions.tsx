'use client'

import { BlurImage } from '@/components/ui/blur-image'
import { motion } from 'framer-motion'
import { RefObject, useRef } from 'react'
import { useHover } from 'usehooks-ts'
import Gradient1 from '~/_static/gradient_element_blue-1.png'
import Gradient2 from '~/_static/gradient_element_blue-2.png'
import Gradient3 from '~/_static/gradient_element_blue-3.png'

export default function FeatureQuestions() {
  const truthTableRef = useRef<HTMLDivElement>(null)
  const truthTableHovering = useHover(truthTableRef as RefObject<HTMLDivElement>)

  const booleanAlgebraRef = useRef<HTMLDivElement>(null)
  const booleanAlgebraHovering = useHover(booleanAlgebraRef as RefObject<HTMLDivElement>)

  const circuitDiagramRef = useRef<HTMLDivElement>(null)
  const circuitDiagramHovering = useHover(circuitDiagramRef as RefObject<HTMLDivElement>)

  return (
    <section id="feature-questions" className="bg-neutralgrey-200 flex min-h-[25dvh] w-full items-center justify-center py-12">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-2xs scale-100 select-none font-mono font-medium text-purple-800 transition hover:scale-105">QUESTIONS</p>
        <h4 className="text-neutralgrey-1200 mt-2 text-center text-2xl font-medium">Challenge your students</h4>
        <p className="text-neutralgrey-1000/85 mt-2 max-w-lg text-center">
          Using our question generator, you can either generate questions to test your own knowledge, or assign them to your students.
        </p>

        <div className="mt-8 flex w-full max-w-4xl flex-row gap-4">
          <div
            className="bg-neutralgrey-100 shadow-hard-soft-2xs relative flex h-64 w-1/3 items-center justify-center overflow-hidden rounded-lg p-6"
            ref={truthTableRef}
          >
            <BlurImage src={Gradient1} alt="Gradient" className="absolute left-0 top-0 size-full" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
              <p className="text-neutralgrey-1200 text-lg font-medium">Truth Tables</p>
              <motion.p
                className="text-neutralgrey-1000/85 text-center text-sm"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: 'auto',
                  },
                }}
                initial="hidden"
                animate={truthTableHovering ? 'visible' : 'hidden'}
              >
                Generate questions with a boolean expression and truth table that must be filled in.
              </motion.p>
            </div>
          </div>
          <div
            className="bg-neutralgrey-100 shadow-hard-soft-2xs relative h-64 w-1/3 overflow-hidden rounded-lg p-6"
            ref={booleanAlgebraRef}
          >
            <BlurImage src={Gradient2} alt="Gradient" className="absolute left-0 top-0 size-full" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
              <p className="text-neutralgrey-1200 text-lg font-medium">Boolean Algebra</p>
              <motion.p
                className="text-neutralgrey-1000/85 text-center text-sm"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: 'auto',
                  },
                }}
                initial="hidden"
                animate={booleanAlgebraHovering ? 'visible' : 'hidden'}
              >
                Reduce boolean expressions of a chosen difficulty to their most simple form.
              </motion.p>
            </div>
          </div>
          <div
            className="bg-neutralgrey-100 shadow-hard-soft-2xs relative h-64 w-1/3 overflow-hidden rounded-lg p-6"
            ref={circuitDiagramRef}
          >
            <BlurImage src={Gradient3} alt="Gradient" className="absolute left-0 top-0 z-0 size-full" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
              <p className="text-neutralgrey-1200 text-lg font-medium">Circuit Diagrams</p>
              <motion.p
                className="text-neutralgrey-1000/85 text-center text-sm"
                variants={{
                  hidden: {
                    opacity: 0,
                    height: 0,
                  },
                  visible: {
                    opacity: 1,
                    height: 'auto',
                  },
                }}
                initial="hidden"
                animate={circuitDiagramHovering ? 'visible' : 'hidden'}
              >
                Create and solve logic circuits with a chosen difficulty.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
