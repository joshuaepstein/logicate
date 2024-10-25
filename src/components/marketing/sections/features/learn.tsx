"use client"

import { cn } from "@/lib"
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FeatureDescription, FeatureTag, FeatureTitle } from "./components"
import FeatureWrapper from "./feature-wrapper"

const DOCUMENTATION_STATES = [
  {
    title: "AND Gate",
    description:
      "An AND gate is a digital logic gate that outputs a high signal (1) only when all its inputs are high (1); otherwise, it outputs a low signal (0).",
    titleColor: "text-orange-800",
  },
  {
    title: "OR Gate",
    description:
      "An OR gate is a digital logic gate that outputs a high signal (1) if at least one of its inputs is high (1); it outputs a low signal (0) only when all inputs are low (0).",
    titleColor: "text-blue-800",
  },
  {
    title: "NOT Gate",
    description:
      "A NOT gate is a digital logic gate that inverts its input, outputting a high signal (1) when the input is low (0) and a low signal (0) when the input is high (1).",
    titleColor: "text-green-800",
  },
  {
    title: "XOR Gate",
    description:
      "An XOR gate, or exclusive OR gate, is a digital logic gate that outputs a high signal (1) only when exactly one of its inputs is high (1); it outputs a low signal (0) when both inputs are either high (1) or low (0).",
    titleColor: "text-purple-800",
  },
]

export default function FeaturesLearn() {
  const {
    rive,
    RiveComponent: InteractionDemo,
    canvas,
  } = useRive({
    src: "/_static/animation/interaction-learn.riv",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.TopCenter,
    }),
    // only play when the canvas is visible
  })
  const [documentationState, setDocumentationState] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDocumentationState((prev) => (prev + 1) % DOCUMENTATION_STATES.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <FeatureWrapper id="feature-learn">
      <FeatureTag className="text-orange-800">LEARN</FeatureTag>
      <FeatureTitle>Learn the fundamentals</FeatureTitle>
      <FeatureDescription>
        Our interactive tutorials will guide you and your students through the basics of logic gates and boolean algebra, helping you
        understand how to build and simulate circuits and simplify expressions.
      </FeatureDescription>

      <div className="mt-8 flex h-max w-full max-w-4xl flex-col justify-center gap-4 md:flex-row">
        <LearnCard
          title="Documentation"
          description="Using our documentation, you and your students can read through the basics of logic gates and boolean expressions."
        >
          <AnimatePresence mode="wait">
            {DOCUMENTATION_STATES.map((state, index) => {
              if (index !== documentationState) return null
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                  }}
                  transition={{
                    duration: 1,
                    // ease: index === documentationState ? [0, 0.41, 0, 0.95] : [0.98, 0, 0.42, 0.99],
                    ease: "easeInOut",
                  }}
                  className="relative mt-4 h-full w-full select-none"
                  key={index}
                >
                  <div className="absolute -inset-x-2 bottom-0 z-10 h-1/2 bg-gradient-to-b from-transparent to-white" />
                  <p
                    className={cn("absolute top-0 text-lg font-medium opacity-75 blur-[1px] transition-all hover:blur-0", state.titleColor)}
                  >
                    {state.title}
                  </p>
                  <p className="absolute top-6 opacity-50 blur-[1px] transition-all hover:blur-0">{state.description}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </LearnCard>

        <LearnCard
          title="Interactive Simulations"
          description="Our documentation includes interactive elements where you and your students can understand how logic gates work."
          wrapperClassName="p-0 w-full"
        >
          <InteractionDemo className="aspect-[582/286] w-full" />
        </LearnCard>
      </div>
    </FeatureWrapper>
  )
}

export function LearnCard({
  title,
  description,
  children,
  wrapperClassName,
}: {
  title: string
  description: string
  children: React.ReactNode
  wrapperClassName?: string
}) {
  return (
    <div className="flex aspect-video h-full w-full flex-col overflow-hidden rounded-lg bg-neutralgrey-100 shadow-hard-soft-2xs md:aspect-square md:w-1/3">
      <div className={cn("relative flex w-full grow flex-col items-center justify-center overflow-hidden px-4", wrapperClassName)}>
        {children}
      </div>
      <div className="flex flex-col px-4 pb-6">
        <h4 className="text-left font-medium">{title}</h4>
        <p className="text-left text-sm text-neutralgrey-1000/85">{description}</p>
      </div>
    </div>
  )
}
