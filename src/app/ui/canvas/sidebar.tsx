"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib"
import { AlignLeft02Icon, AlignRight02Icon } from "@jfstech/icons-react/24/outline"
import { LogicateSession } from "@logicate/database"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { updateSessionName } from "./actions"
import { DraggableItem } from "./draggable-item"
import { GateType } from "./node/gates/types"
import { InputType } from "./node/inputs/types"
import { OutputType } from "./node/outputs/types"
import { NodeType } from "./node/type"

export default function Sidebar({
  canvas,
  setDraggingNewElement,
  draggingNewElement,
}: {
  canvas: LogicateSession
  setDraggingNewElement: (
    element: {
      type: NodeType
      x: number
      y: number
      hidden: boolean
    } | null
  ) => void
  draggingNewElement: {
    type: NodeType
    x: number
    y: number
    hidden: boolean
  } | null
}) {
  const [expanded, setExpanded] = useState<boolean>(true)
  const [updatingName, updateName] = useTransition()
  const [name, setName] = useState<string>(canvas.name)
  const [debouncedName] = useDebounce(name, 500)

  useEffect(() => {
    if (updatingName) return
    if (canvas.id === "demo") return
    if (canvas.name === debouncedName) return
    updateName(async () => {
      const response = await updateSessionName(canvas.id, debouncedName)
      if (response) {
        toast.success("Session name updated")
        document.title = `${debouncedName} - Logicate`
      } else {
        toast.error("Failed to update session name")
        setName(canvas.name)
      }
    })
  }, [debouncedName])

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        variants={{
          expanded: { height: "auto" },
          collapsed: { height: "min-content" },
        }}
        initial="expanded"
        animate={expanded ? "expanded" : "collapsed"}
        exit="collapsed"
        className={cn(
          "fixed z-[12345] my-4 ml-4 h-full max-h-[calc(100dvh-(16px*2))] w-0 overflow-y-hidden rounded-xl border-r border-neutralgrey-400 bg-white shadow-hard-sm transition-all duration-300 md:w-[35%] lg:w-[25%] xl:w-[15%]"
        )}
        data-logicate-sidebar
      >
        <div
          className={cn("flex items-center justify-between p-4 transition-[padding] duration-1000", {
            "px-4 py-2": !expanded,
          })}
        >
          {(canvas.id === "demo" && <p className="text-sm font-medium">Demo</p>) || (
            <motion.input
              className="-m-1.5 mr-1 w-fit min-w-0 text-nowrap rounded-lg border-0 p-1.5 text-sm font-medium transition hover:bg-neutralgrey-200 focus-visible:border-0 focus-visible:bg-neutralgrey-200 focus-visible:outline-none focus-visible:ring-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Button
            variant="no-borders"
            className="aspect-square size-9 overflow-hidden"
            size="icon-md"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: "20%", scale: 0.9 }}
                animate={{ opacity: 1, y: "0", scale: 1 }}
                exit={{ opacity: 0, y: "-20%", scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <AlignLeft02Icon className="size-5 rotate-90" />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, y: "-20%", scale: 1.1 }}
                animate={{ opacity: 1, y: "0", scale: 1 }}
                exit={{ opacity: 0, y: "20%", scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <AlignRight02Icon className="size-5 rotate-90" />
              </motion.div>
            )}
          </Button>
        </div>
        <motion.div
          variants={{
            expanded: { height: "auto" },
            collapsed: { height: 0 },
          }}
          transition={{
            duration: 1,
            ease: [0.45, 0.01, 0.39, 0.99],
          }}
          className="overflow-y-hidden"
          initial="expanded"
          animate={expanded ? "expanded" : "collapsed"}
          exit="collapsed"
          key="accordion_wrapper"
        >
          <div className="max-h-[calc(100dvh-5rem-72px+(16px*3))] min-h-[calc(100dvh-5rem-72px+(16px*3))] overflow-y-scroll">
            <div className="flex w-full flex-col items-start justify-start">
              <h5 className="p-4 text-sm font-medium text-neutralgrey-1100">Inputs</h5>
              <div className="flex flex-wrap items-start justify-between gap-5 p-4 pt-0">
                {Object.values(InputType).map((type) => (
                  <DraggableItem
                    setDraggingNewElement={setDraggingNewElement}
                    draggingNewElement={draggingNewElement}
                    key={type}
                    type={{ type: "input", node: type }}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start">
              <h5 className="p-4 text-sm font-medium text-neutralgrey-1100">Gates</h5>
              <div className="flex flex-wrap items-start justify-between gap-5 p-4 pt-0">
                {Object.values(GateType).map((type) => (
                  <DraggableItem
                    setDraggingNewElement={setDraggingNewElement}
                    draggingNewElement={draggingNewElement}
                    key={type}
                    type={{ type: "gate", node: type }}
                  />
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start">
              <h5 className="p-4 text-sm font-medium text-neutralgrey-1100">Outputs</h5>
              <div className="flex flex-wrap items-start justify-between gap-5 p-4 pt-0">
                {Object.values(OutputType).map((type) => (
                  <DraggableItem
                    setDraggingNewElement={setDraggingNewElement}
                    draggingNewElement={draggingNewElement}
                    key={type}
                    type={{ type: "output", node: type }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* <Accordion
            type="multiple"
            value={['inputs', 'gates', 'outputs']}
            className={cn('min-h-[calc(100dvh-5rem-72px+(16px*3))] overflow-y-scroll text-nowrap')}
          >
            <AccordionItem value="inputs">
              <AccordionTrigger>Inputs</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(InputType).map((type) => (
                    <DraggableItem
                      setDraggingNewElement={setDraggingNewElement}
                      draggingNewElement={draggingNewElement}
                      key={type}
                      type={{ type: 'input', node: type }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gates">
              <AccordionTrigger>Gates</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(GateType).map((type) => (
                    <DraggableItem
                      setDraggingNewElement={setDraggingNewElement}
                      draggingNewElement={draggingNewElement}
                      key={type}
                      type={{ type: 'gate', node: type }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="outputs">
              <AccordionTrigger>Outputs</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(OutputType).map((type) => (
                    <DraggableItem
                      setDraggingNewElement={setDraggingNewElement}
                      draggingNewElement={draggingNewElement}
                      key={type}
                      type={{ type: 'output', node: type }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </motion.div>
      </motion.aside>
    </AnimatePresence>
  )
}
