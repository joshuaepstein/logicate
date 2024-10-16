import { cn } from '@/lib'
import useCanvasStore from './hooks/useCanvasStore'
import { InputType } from './node/inputs/types'
import { InputItem } from './types'
import { Alphabet, AlphabetEnum } from './types'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function VariableControls() {
  const { items, variableValues, setVariableValue, setVariableValues } = useCanvasStore()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(items.some((item) => item.itemType === 'input' && item.type === InputType.VARIABLE))

    if (!items.some((item) => item.itemType === 'input' && item.type === InputType.VARIABLE)) {
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
            y: '-40%',
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: '0',
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: '40%',
          }}
          className="shadow-hard-xs absolute right-4 top-4 z-10 flex h-auto min-w-80 origin-center flex-col items-center justify-center gap-2 rounded-md bg-white p-4"
        >
          {(items.filter((item) => item.itemType === 'input' && item.type === InputType.VARIABLE) as InputItem[])
            .map((item) => item.settings.expressionLetter)
            .map((letter) => {
              const isSet = variableValues.some((v) => v.letter === letter && v.value)

              if (!letter) return null

              return (
                <div
                  key={letter}
                  className={cn(
                    'text-neutralgrey-800 bg-neutralgrey-100 flex w-full items-center justify-between rounded-md px-3 py-1.5 transition',
                    {
                      'bg-green-200 text-green-800': variableValues.some((v) => v.letter === letter && v.value),
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
                  <p className="text-xs font-medium">{isSet ? 'True' : 'False'}</p>
                </div>
              )
            })}
          <p className="text-neutralgrey-800 -mb-1.5 mt-0.5 w-full text-right text-xs leading-tight">Click to toggle</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
