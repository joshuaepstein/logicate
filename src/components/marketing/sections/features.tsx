'use client'

import { cn } from '@/lib'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import buildDemo from '~/build_demo.png'
import learnDemo from '~/learn_demo.png'
import questionsDemo from '~/questions_demo.png'
import simulateDemo from '~/simulate_demo.png'

const features = [
  {
    id: 'build',
    title: 'Build',
    description: 'Build your own logic gates and circuits with our intuitive builder.',
    extended_description:
      'Our builder is a simple and intuitive way to create logic gates and circuits.\nOur sidebar allows you to select inputs, gates, and outputs, and then connect them together to create your own circuits.',
    extended_information_list: [
      {
        title: 'Inputs',
        description:
          'Inputs are the starting points of your circuit. They are the values that you can change to see how your circuit behaves.',
      },
      {
        title: 'Gates',
        description:
          'Gates are the building blocks of your circuit. They are the logic gates that you can use to create your own circuits.',
      },
      {
        title: 'Outputs',
        description: 'Outputs are the results of your circuit. They are the values that your circuit produces.',
      },
    ],
    demo: buildDemo,
  },
  {
    id: 'simulate',
    title: 'Simulate',
    description: 'The simulator allows you to debug your circuits and see the results in real-time.',
    extended_description:
      'The simulator is built into the canvas. As you update your canvas, the simulator updates your circuit in real-time and shows you the results. The simulator also includes a debugger that allows you progress step by step through your circuit.',
    extended_information_list: [
      {
        title: 'Real-time Simulation',
        description: 'The simulator updates your circuits value in real-time as you update your circuit.',
      },
      {
        title: 'Debugger',
        description: 'The debugger allows you to progress step by step through your circuit.',
      },
      {
        title: 'Visualisation',
        description: 'The simulator includes a visualisation of your circuit that allows you to see the values of the inputs and outputs.',
      },
    ],
    demo: simulateDemo,
  },
  {
    id: 'questions',
    title: 'Answer Questions',
    description: 'Answer questions dynamically created by our system to progress through the curriculum.',
    extended_description:
      'Our system generates questions based on your progress through the curriculum. As you answer questions, our system updates your progress and generates new questions for you to answer.',
    extended_information_list: [
      {
        title: 'Progress Tracking',
        description:
          'The system stores progress and generates new questions. Teachers can view progress and recommend tasks for students to complete.',
      },
      {
        title: 'Question Generator',
        description:
          'The system can generate: Truth Tables, Boolean Expressions, Logic Gates, and Circuits. Students can answer questions and the system will provide feedback on their answers.',
      },
      {
        title: 'Feedback',
        description: 'Using AI, the system can provide feedback on student answers and provide guidance on how to improve.',
      },
    ],
    demo: questionsDemo,
  },
  {
    id: 'learn',
    title: 'Learn',
    description: 'Learn about logic gates and circuits with our interactive tutorials.',
    extended_description: 'Our system includes interactive tutorials that allow you to learn about logic gates and circuits.',
    extended_information_list: [
      {
        title: 'Interactive Tutorials',
        description: 'The system includes interactive tutorials that allow you to learn about logic gates and circuits.',
      },
      {
        title: 'Student Tasks',
        description: "The system includes student tasks that allow you to practice what you've learned.",
      },
      {
        title: 'Teacher Dashboard',
        description:
          'Teachers can view progress and recommend tasks for students to complete. It allows teachers to track student progress and guide their learning.',
      },
    ],
    demo: learnDemo,
  },
]

export default function Features() {
  const [selected, setSelected] = useState<(typeof features)[number]['id']>('build')

  return (
    <section id="features" className="flex w-full flex-col items-start justify-start gap-10 py-16">
      <h1 className="text-neutralgrey-1100 text-4xl font-medium">Features</h1>

      <div className="flex w-full flex-row gap-0">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            id={feature.id}
            selected={selected}
            setSelected={setSelected}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="flex w-full flex-row gap-10">
        <div className="flex w-1/3 flex-col">
          <h3 className="text-neutralgrey-1100 text-3xl font-medium">{features.find((feature) => feature.id === selected)?.title}</h3>
          <p className="text-neutralgrey-900 mt-2 text-sm">{features.find((feature) => feature.id === selected)?.extended_description}</p>
          <AnimatePresence mode="wait">
            <motion.div className="mt-4 flex flex-col gap-4">
              {features
                .find((feature) => feature.id === selected)
                ?.extended_information_list?.map((item) => (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 100,
                      y: 0,
                    }}
                    className="border-l pl-4"
                    key={item.title}
                  >
                    <h4 className="text-neutralgrey-1100 font-[475]">{item.title}</h4>
                    <p className="text-neutralgrey-900 mt-2 text-sm">{item.description}</p>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-2/3 flex-col">
          <AnimatePresence mode="wait">
            {features.map((feature) => {
              if (feature.id === selected) {
                return (
                  <motion.div
                    key={feature.id}
                    initial={{
                      y: 10,
                      opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                      y: -10,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <Image src={feature.demo} alt="Demo" className="shadow-hard-2xs aspect-video w-full rounded-md" />
                  </motion.div>
                )
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  id,
  selected,
  setSelected,
  title,
  description,
}: {
  id: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  title: string
  description: string
}) {
  return (
    <div
      className={cn(
        'border-b-neutralgrey-600 relative flex w-full max-w-sm cursor-pointer flex-col items-start justify-start border-b px-4 py-3 transition',
        {
          // 'border-b-blue-600': selected === id,
        }
      )}
      onClick={() => setSelected(id)}
    >
      <div
        className={cn('absolute -bottom-px left-0 right-0 h-[1px] bg-blue-600 transition-all duration-700 ease-in-out', {
          'w-full': selected === id,
          'left-auto right-0 w-0': selected !== id,
        })}
      />
      <h3 className="font-medium">{title}</h3>
      <p className="text-neutralgrey-900 text-xs">{description}</p>
    </div>
  )
}
