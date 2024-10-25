import { cn } from "@/lib"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import useCanvasStore from "./hooks/useCanvasStore"
import { InputType } from "./node/inputs/types"
import { InputItem } from "./types"

export default function VariableControls() {
  const { items, variableValues, wires, setVariableValue, setVariableValues } = useCanvasStore()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(items.some((item) => item.itemType === "input" && item.type === InputType.VARIABLE && item.settings.expressionLetter))

    if (!items.some((item) => item.itemType === "input" && item.type === InputType.VARIABLE)) {
      // we should clear the variable values because there are no variables
      setVariableValues([])
    }
  }, [items])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: "-40%",
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: "0",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: "40%",
          }}
          className="absolute right-4 top-4 z-10 flex h-auto min-w-80 origin-center flex-col items-center justify-center gap-2 rounded-md bg-white p-4 shadow-hard-xs"
        >
          <AnimatePresence>
            {(items.filter((item) => item.itemType === "input" && item.type === InputType.VARIABLE) as InputItem[])
              .map((item) => item.settings.expressionLetter)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((letter) => {
                const isSet = variableValues.some((v) => v.letter === letter && v.value)

                if (!letter) return null

                return (
                  <div
                    // initial={{
                    //   opacity: 0,
                    // }}
                    // animate={{
                    //   opacity: 1,
                    // }}
                    // exit={{
                    //   opacity: 0,
                    // }}
                    key={letter}
                    className={cn(
                      "relative flex w-full select-none items-center justify-between overflow-y-hidden rounded-md bg-neutralgrey-100 px-3 py-1.5 text-neutralgrey-800 transition",
                      {
                        "bg-green-200 text-green-800": variableValues.some((v) => v.letter === letter && v.value),
                      }
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!variableValues.some((v) => v.letter === letter)) {
                        setVariableValues([...variableValues, { letter, value: true }])
                      } else {
                        setVariableValue(letter, !isSet)
                      }
                    }}
                  >
                    <p className="text-sm font-medium">{letter}</p>
                    <div className="h-full w-full">
                      <AnimatePresence>
                        <motion.p
                          variants={{
                            hidden: { y: -30 },
                            visible: { y: 0 },
                          }}
                          key={letter + "-false"}
                          initial="hidden"
                          animate={!isSet ? "visible" : "hidden"}
                          exit="hidden"
                          className="absolute inset-y-0 right-0 flex w-full items-center justify-end pr-3 text-right leading-none"
                        >
                          False
                        </motion.p>
                        <motion.p
                          variants={{
                            hidden: { y: 30 },
                            visible: { y: 0 },
                          }}
                          key={letter + "-true"}
                          initial="hidden"
                          animate={isSet ? "visible" : "hidden"}
                          exit="hidden"
                          className="absolute inset-y-0 right-0 flex w-full items-center justify-end pr-3 text-right leading-none"
                        >
                          True
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
          </AnimatePresence>
          <p className="-mb-1.5 mt-0.5 w-full text-right text-xs leading-tight text-neutralgrey-800">Click to toggle</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
