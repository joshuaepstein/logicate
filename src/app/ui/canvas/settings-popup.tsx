'use client'

import { DashIcon, Maximise01Icon, Minimise02Icon, Plus01Icon } from '@jfstech/icons-react/24/outline'
import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/ui/input/index'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useCanvasStore from './hooks/useCanvasStore'
import { defaultInputs } from './node/gates/constants'
import { GateItem, InputItem, OutputItem, Selected } from './types'
import { HexColorPicker } from 'react-colorful'
import { cn } from '@/lib'

export default function SettingsPopup() {
  const { selected, updateItem, updateSelected } = useCanvasStore()
  const [selectedItem, setSelectedItem] = useState<Selected | null>(null)
  const [minimized, setMinimized] = useState(true)
  const expressionLetterRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selected.length === 1) {
      if (selected[0]) {
        if (selectedItem?.id !== selected[0].id) {
          setMinimized(true)
          // clear expressionLetterRef content
          if (expressionLetterRef.current) {
            expressionLetterRef.current.value = ''
          }
        }
        setSelectedItem(selected[0])
      }
    }
  }, [selected])

  return (
    (<AnimatePresence>
      {selected.length === 1 && selected[0] && selectedItem && (
        <motion.div
          className="shadow-hard-xs min-w-80 origin-bottom-right overflow-y-hidden rounded-md bg-white"
          initial={{
            opacity: 0,
            x: '20%',
          }}
          animate={{
            opacity: 1,
            x: '0',
          }}
          exit={{
            opacity: 0,
            x: '20%',
          }}
        >
          <div className="border-b-neutralgrey-400 flex w-full items-center justify-between border-b px-4 py-2">
            <h5 className="text-neutralgrey-1100 text-sm font-medium">Node Settings</h5>
            <Button variant="no-borders" size="icon-xs" onClick={() => setMinimized(!minimized)}>
              {minimized ? <Maximise01Icon className="size-4" /> : <Minimise02Icon className="size-4" />}
            </Button>
          </div>

          <motion.div
            variants={{
              open: { height: 'auto' },
              closed: { height: 0 },
            }}
            animate={minimized ? 'closed' : 'open'}
            className={cn('flex w-full flex-col items-start justify-between overflow-y-hidden', {
              'h-0': minimized,
              'h-auto': !minimized,
            })}
          >
            {selectedItem.selectedType === 'item' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex w-full flex-col gap-4 p-4"
              >
                {selectedItem.itemType === 'gate' ? (
                  <div className="flex w-full flex-row items-center justify-between gap-4">
                    <p className="text-neutralgrey-800 text-sm">Inputs</p>
                    <div className="flex w-max flex-row items-center">
                      <Button
                        variant="no-borders"
                        size="icon-xs"
                        onClick={() => {
                          const inputs = (selected[0] as GateItem).settings.inputs
                          const inputsOptions = defaultInputs[(selected[0] as GateItem).type]
                          if (inputs - 1 < inputsOptions.min) return
                          updateItem(selected[0].id, {
                            ...selected[0],
                            settings: {
                              ...(selected[0] as GateItem).settings,
                              // @ts-expect-error because we know that the settings are an object with an inputs property
                              inputs: inputs - 1,
                            },
                          })
                          updateSelected()
                        }}
                      >
                        <DashIcon className="size-4" />
                      </Button>
                      <input
                        className="w-full max-w-20 border-none text-center outline-none ring-0 focus:outline-none focus:ring-0"
                        value={selectedItem.settings.inputs}
                        // type="number"
                        id="logicate-gate-inputs-quantity-field"
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (!isNaN(value)) {
                            const inputsOptions = defaultInputs[(selectedItem as GateItem).type]
                            if (value + 1 > inputsOptions.max) return
                            if (value - 1 < inputsOptions.min) return
                            updateItem(selectedItem.id, {
                              ...selectedItem,
                              settings: {
                                ...(selectedItem as GateItem).settings,
                                inputs: value,
                              },
                            })
                            updateSelected()
                          }
                        }}
                      />
                      <Button
                        variant="no-borders"
                        size="icon-xs"
                        onClick={() => {
                          const inputs = (selectedItem as GateItem).settings.inputs
                          const inputsOptions = defaultInputs[(selectedItem as GateItem).type]
                          if (inputs + 1 > inputsOptions.max) return
                          updateItem(selectedItem.id, {
                            ...selectedItem,
                            settings: {
                              ...(selectedItem as GateItem).settings,
                              inputs: inputs + 1,
                            },
                          })
                          updateSelected()
                        }}
                      >
                        <Plus01Icon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : null}
                <div className="flex w-full flex-row items-center justify-between gap-4">
                  <p className="text-neutralgrey-800 text-sm">Label</p>
                  <div className="flex w-max flex-row items-center">
                    <TextInput
                      value={selectedItem.settings.label}
                      className="min-w-40"
                      onChange={(e) => {
                        updateItem(selectedItem.id, {
                          ...selectedItem,
                          settings: {
                            ...(selectedItem as GateItem).settings,
                            label: e.target.value,
                          },
                        })
                        updateSelected()
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-4">
                  <p className="text-neutralgrey-800 text-sm">Colour</p>
                  <div className="flex w-max flex-row items-center">
                    <HexColorPicker
                      color={selectedItem.settings.color}
                      onChange={(color) => {
                        updateItem(selectedItem.id, {
                          ...selectedItem,
                          settings: {
                            ...(selectedItem as GateItem).settings,
                            color: color as `#${string}`,
                          },
                        })
                        updateSelected()
                      }}
                    />
                  </div>
                </div>
                {selectedItem.itemType === 'input' || selectedItem.itemType === 'output' ? (
                  <div className="flex w-full flex-row items-center justify-between gap-4">
                    <p className="text-neutralgrey-800 text-sm">Symbol</p>
                    <div className="flex w-max flex-row items-center">
                      <TextInput
                        value={(selectedItem as InputItem | OutputItem).settings.expressionLetter}
                        className="min-w-40"
                        maxLength={1}
                        ref={expressionLetterRef}
                        onChange={(e) => {
                          // ensure only one character is allowed
                          if (e.target.value.length > 1) return
                          const value = e.target.value.toUpperCase()
                          // dont allow non-alphabetic characters (but allow empty string)
                          if (value !== '' && !/^[A-Z]$/.test(value)) return
                          updateItem(selectedItem.id, {
                            ...selectedItem,
                            settings: {
                              ...(selectedItem as InputItem | OutputItem).settings,
                              // @ts-expect-error because we know that the settings are an object with an expressionLetter property
                              expressionLetter: value as Alphabet,
                            },
                          })
                          updateSelected()
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>)
  );
}
