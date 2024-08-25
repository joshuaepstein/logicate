"use client";

import { cn } from "@logicate/ui";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import buildDemo from "~/build_demo.png";
import learnDemo from "~/learn_demo.png";
import questionsDemo from "~/questions_demo.png";
import simulateDemo from "~/simulate_demo.png";

const features = [
  {
    id: "build",
    title: "Build",
    description:
      "Build your own logic gates and circuits with our intuitive builder.",
    extended_description:
      "Our builder is a simple and intuitive way to create logic gates and circuits.\nOur sidebar allows you to select inputs, gates, and outputs, and then connect them together to create your own circuits.",
    extended_information_list: [
      {
        title: "Inputs",
        description:
          "Inputs are the starting points of your circuit. They are the values that you can change to see how your circuit behaves.",
      },
      {
        title: "Gates",
        description:
          "Gates are the building blocks of your circuit. They are the logic gates that you can use to create your own circuits.",
      },
      {
        title: "Outputs",
        description:
          "Outputs are the results of your circuit. They are the values that your circuit produces.",
      },
    ],
    demo: buildDemo,
  },
  {
    id: "simulate",
    title: "Simulate",
    description:
      "The simulator allows you to debug your circuits and see the results in real-time.",
    extended_description:
      "The simulator is built into the canvas. As you update your canvas, the simulator updates your circuit in real-time and shows you the results. The simulator also includes a debugger that allows you progress step by step through your circuit.",
    extended_information_list: [
      {
        title: "Real-time Simulation",
        description:
          "The simulator updates your circuits value in real-time as you update your circuit.",
      },
      {
        title: "Debugger",
        description:
          "The debugger allows you to progress step by step through your circuit.",
      },
      {
        title: "Visualisation",
        description:
          "The simulator includes a visualisation of your circuit that allows you to see the values of the inputs and outputs.",
      },
    ],
    demo: simulateDemo,
  },
  {
    id: "questions",
    title: "Answer Questions",
    description:
      "Answer questions dynamically created by our system to progress through the curriculum.",
    extended_description:
      "Our system generates questions based on your progress through the curriculum. As you answer questions, our system updates your progress and generates new questions for you to answer.",
    extended_information_list: [
      {
        title: "Progress Tracking",
        description:
          "The system stores progress and generates new questions. Teachers can view progress and recommend tasks for students to complete.",
      },
      {
        title: "Question Generator",
        description:
          "The system can generate: Truth Tables, Boolean Expressions, Logic Gates, and Circuits. Students can answer questions and the system will provide feedback on their answers.",
      },
      {
        title: "Feedback",
        description:
          "Using AI, the system can provide feedback on student answers and provide guidance on how to improve.",
      },
    ],
    demo: questionsDemo,
  },
  {
    id: "learn",
    title: "Learn",
    description:
      "Learn about logic gates and circuits with our interactive tutorials.",
    extended_description:
      "Our system includes interactive tutorials that allow you to learn about logic gates and circuits.",
    extended_information_list: [
      {
        title: "Interactive Tutorials",
        description:
          "The system includes interactive tutorials that allow you to learn about logic gates and circuits.",
      },
      {
        title: "Student Tasks",
        description:
          "The system includes student tasks that allow you to practice what you've learned.",
      },
      {
        title: "Teacher Dashboard",
        description:
          "Teachers can view progress and recommend tasks for students to complete. It allows teachers to track student progress and guide their learning.",
      },
    ],
    demo: learnDemo,
  },
];

export default function Features() {
  const [selected, setSelected] =
    useState<(typeof features)[number]["id"]>("build");

  return (
    <section
      id="features"
      className="py-16 w-full flex flex-col gap-10 items-start justify-start"
    >
      <h1 className="text-4xl font-medium text-neutralgrey-1100">Features</h1>

      <div className="flex flex-row w-full gap-0">
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

      <div className="flex flex-row w-full gap-10">
        <div className="flex flex-col w-1/3">
          <h3 className="text-3xl font-medium text-neutralgrey-1100">
            {features.find((feature) => feature.id === selected)?.title}
          </h3>
          <p className="text-neutralgrey-900 text-sm mt-2">
            {
              features.find((feature) => feature.id === selected)
                ?.extended_description
            }
          </p>
          <div className="flex flex-col gap-4 mt-4">
            {features
              .find((feature) => feature.id === selected)
              ?.extended_information_list?.map((item) => (
                <div
                  className="rounded-md shadow-hard-soft-2xs bg-neutralgrey-100 p-4"
                  key={item.title}
                >
                  <h4 className="font-[475] text-neutralgrey-1100">
                    {item.title}
                  </h4>
                  <p className="text-neutralgrey-900 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-2/3">
          {/* <div className="aspect-video w-full bg-neutralgrey-500" /> */}
          {/* {features.find((feature) => feature.id === selected) && (
            <Image
              src={features.find((feature) => feature.id === selected)!.demo}
              alt="Demo"
              className="aspect-video w-full"
            />
          )} */}
          <AnimatePresence mode="wait">
            {features.map((feature, index) => {
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
                      duration: 0.15,
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <Image
                      src={feature.demo}
                      alt="Demo"
                      className="aspect-video w-full"
                    />
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  id,
  selected,
  setSelected,
  title,
  description,
}: {
  id: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "cursor-pointer flex flex-col border-b border-b-neutralgrey-600 transition px-4 py-3 items-start justify-start max-w-sm w-full",
        {
          "border-b-blue-600": selected === id,
        },
      )}
      onClick={() => setSelected(id)}
    >
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs text-neutralgrey-900">{description}</p>
    </div>
  );
}
