'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/not-done-yet/accordion'
import { DraggableItem } from './draggable-item'
import { GateType } from './node/gates/types'
import { InputType } from './node/inputs/types'
import { LogicateSession } from '@logicate/database'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlignLeft02Icon, AlignRight02Icon } from '@jfstech/icons-react/24/outline'
import { cn } from '@/lib'
import { OutputType } from './node/outputs/types'

export default function Sidebar({ canvas }: { canvas: LogicateSession }) {
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        variants={{
          expanded: { height: 'auto' },
          collapsed: { height: 'min-content' },
        }}
        initial="expanded"
        animate={expanded ? 'expanded' : 'collapsed'}
        exit="collapsed"
        className={cn(
          'border-neutralgrey-400 shadow-hard-sm fixed z-[12345] my-10 ml-4 h-full w-0 overflow-y-hidden rounded-xl border-r bg-white transition-all duration-300 md:w-[35%] lg:w-[25%] xl:w-[15%]'
        )}
      >
        <div
          className={cn('flex items-center justify-between p-4 transition-[padding] duration-1000', {
            'px-4 py-2': !expanded,
          })}
        >
          <motion.p className="text-nowrap text-sm font-medium">{canvas.id}</motion.p>
          <Button variant="no-borders" className="overflow-hidden" size="icon-md" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: '20%' }}
                animate={{ opacity: 1, x: '0' }}
                exit={{ opacity: 0, x: '-20%' }}
                transition={{ duration: 0.2 }}
              >
                <AlignLeft02Icon className="size-5" />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, x: '-20%' }}
                animate={{ opacity: 1, x: '0' }}
                exit={{ opacity: 0, x: '20%' }}
                transition={{ duration: 0.2 }}
              >
                <AlignRight02Icon className="size-5" />
              </motion.div>
            )}
          </Button>
        </div>
        <motion.div
          variants={{
            expanded: { height: 'auto' },
            collapsed: { height: 0 },
          }}
          transition={{
            duration: 1,
            ease: [0.45, 0.01, 0.39, 0.99],
          }}
          className="overflow-y-hidden"
          initial="expanded"
          animate={expanded ? 'expanded' : 'collapsed'}
          exit="collapsed"
          key="accordion_wrapper"
        >
          <Accordion type="multiple" className={cn('min-h-[calc(100dvh-5rem-72px)] overflow-y-scroll text-nowrap')}>
            <AccordionItem value="inputs">
              <AccordionTrigger>Inputs</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(InputType).map((type) => (
                    <DraggableItem key={type} type={{ type: 'input', node: type }} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gates">
              <AccordionTrigger>Gates</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(GateType).map((type) => (
                    <DraggableItem key={type} type={{ type: 'gate', node: type }} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="outputs">
              <AccordionTrigger>Outputs</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap items-start justify-between gap-5 p-4">
                  {Object.values(OutputType).map((type) => (
                    <DraggableItem key={type} type={{ type: 'output', node: type }} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </motion.aside>
    </AnimatePresence>
  )
}
