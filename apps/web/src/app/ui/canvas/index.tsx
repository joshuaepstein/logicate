'use client'
import { LogicateSession, User } from '@logicate/database'
import { Click } from '@logicate/utils/buttons'
import { randomGateId, randomWireId } from '@logicate/utils/id'
import { use, useCallback, useEffect, useRef, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useHotkeys } from 'react-hotkeys-hook'
import BackgroundElement from './background-element'
import useCanvasActions from './canvas_actions'
import useDisableHook from './hooks/disable-hook'
import useUpdateCanvasStore from './hooks/updateCanvasStore'
import useCanvasStore from './hooks/useCanvasStore'
import { GateType } from './node/gates/types'
import { defaultInputs } from './node/gates/constants'
import { Gate } from './node/gates'
import { Input } from './node/inputs'
import { InputType } from './node/inputs/types'
import { TemporaryInput } from './node/inputs/temporary'
import { TemporaryGate } from './node/gates/temporary'
import { NodeType, OutputType } from './node/type'
import Sidebar from './sidebar'
import { Item, Selected, SelectedItem, TypeWire, Wire as WireType } from './types'
import { ConnectionWire, Wire } from './wire'
import { gates } from './node'
import Cookies from 'js-cookie'
import LoadingCircle from '@logicate/ui/icons/loading-circle'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@logicate/ui'
import FloatingToolbar from './toolbar'

export default function Canvas({
  sessionId,
  user,
  logicateSession,
  isNew,
}: {
  sessionId: string
  logicateSession: LogicateSession
  user: User
  isNew: boolean
}) {
  const canvasReference = useRef<HTMLDivElement>(null)
  const {
    items,
    addItem,
    selected,
    setSelected,
    setItemsSelected,
    wires,
    setWires,
    setItems,
    select,
    addWire,
    canvas,
    selectItemId,
    isHolding,
    setHolding,
    itemsUpdate,
    temporaryWire,
    setTemporaryWire,
    updateTemporaryWire,
    updatingDatabase,
    updateSelected,
  } = useCanvasStore()
  const [clockInterval, setClockInterval] = useState<NodeJS.Timeout | null>(null)
  const [clockValue, setClockValue] = useState(false)
  const [draggingNewElement, setDraggingNewElement] = useState<{
    type: NodeType
    x: number
    y: number
  } | null>(null)
  const [simulatedItemState, setSimulatedItemState] = useState<
    {
      id: string
      state: boolean
    }[]
  >([])
  const [simulatedWires, setSimulatedWires] = useState<
    {
      id: string
      active: boolean
    }[]
  >([])
  const [usingDatabase, setUsedDatabase] = useState(false)
  const [isMassSelecting, setMassSelecting] = useState<{
    start: {
      x: number
      y: number
    }
    end: {
      x: number
      y: number
    }
  } | null>()
  const { CanvasActions, confirmClear, setConfirmClear } = useCanvasActions(sessionId)
  useDisableHook(canvasReference)
  useUpdateCanvasStore(logicateSession.id)
  useBeforeunload(() => 'Are you sure you want to leave this page? You will lose all unsaved changes......')
  const [preinstalled_opacity, setPreinstalledOpacity] = useState<Item[]>([])

  useEffect(() => {
    if (usingDatabase && !isNew) return
    // use cookies to store if it has been initialized when default values for this update
    if (logicateSession.id) {
      // TODO: Refactor this so that the server generates a new "ticket" when the canvas is updated when the client should check if is the most recent one. (e.g. the logicateSession stores the currentSession and cookies stores the current one and if they dont match then update.)
      setItems(logicateSession.items as Item[])
      setWires(logicateSession.wires as unknown as TypeWire[])
      setPreinstalledOpacity(logicateSession.items as Item[])
      setUsedDatabase(true)
    }
  }, [logicateSession])

  useHotkeys('esc', () => {
    if (draggingNewElement) {
      setDraggingNewElement(null)
    }
    if (selected.length > 0) {
      setSelected([])
    }
    if (confirmClear) {
      setConfirmClear(false)
    }
  })

  useHotkeys('ctrl+z', (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (selected.length > 0) setSelected([])
    if (draggingNewElement) setDraggingNewElement(null)
    if (confirmClear) setConfirmClear(false)

    const recentItem = items[items.length - 1]
    if (recentItem) {
      itemsUpdate((items) => items.slice(0, -1))
      const wiresConnecting = wires.filter((wire) => wire.from.id === recentItem.id || wire.to.id === recentItem.id)
      const updatedWires = wires.filter((wire) => !wiresConnecting.includes(wire))
      setWires(updatedWires)
    }
  })

  useHotkeys('down', (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (selected.length > 0) {
      // move them all down by 1
      const updatedItems = items.map((item) => {
        if (selected.find((selectedItem) => selectedItem.id === item.id)) {
          return {
            ...item,
            y: item.y + 10,
          }
        }
        return item
      })
      setItems(updatedItems)
    }
  })

  useHotkeys('Delete,Backspace', (e) => {
    e.preventDefault()
    e.stopPropagation()

    // we need to check if the ids of items and wires match any in selected and delete them from the arrays
    const selectedItemIds = selected
      .map((item) => {
        if (item.selectedType === 'item') return item.id
        return null
      })
      .filter((a) => a !== null)
    const selectedWires = selected
      .map((item) => {
        if (item.selectedType === 'wire') return item.id
        return null
      })
      .filter((a) => a !== null)
    const newItems = items.filter((items) => !selectedItemIds.includes(items.id))
    let newWires = wires.filter((items) => !selectedWires.includes(items.id))

    if (selectedItemIds.length > 0) {
      newWires = newWires.filter((wire) => {
        return wire.from.id !== selectedItemIds[0] && wire.to.id !== selectedItemIds[0]
      })
    }

    setWires(newWires)
    setItems(newItems)
  })

  // When user starts dragging from the element, save drag position - but it should continue dragging when the cursor leaves this element. So this means the listener needs to be added to the document.
  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (isMassSelecting && e.buttons === Click.Primary) {
        const canvasElement = document.querySelector('[data-logicate-canvas]')
        if (!canvasElement) return
        setMassSelecting((previous) => {
          if (previous) {
            return {
              ...previous,
              end: {
                x: e.clientX - canvasElement.getBoundingClientRect().left,
                y: e.clientY - canvasElement.getBoundingClientRect().top,
              },
            }
          }
          return null
        })
      }

      if (temporaryWire && e.buttons === Click.Primary) {
        // update the end position of the wire
        updateTemporaryWire((previous) => ({
          ...previous,
          to: { x: e.clientX, y: e.clientY },
        }))
      }

      if (draggingNewElement && e.buttons === Click.Primary) {
        const element = document.querySelector('[data-logicate-temporary-dragging-node]')
        if (!element) return
        setDraggingNewElement((previous) => {
          if (previous) {
            return {
              ...previous,
              x: mouseX - element.getBoundingClientRect().width / 2,
              y: mouseY - element.getBoundingClientRect().height / 2,
            }
          }
          return null
        })
      }

      const mouseX = e.clientX
      const mouseY = e.clientY
      const mouseOverElement = document.elementFromPoint(mouseX, mouseY)
      if (
        mouseOverElement &&
        mouseOverElement.getAttribute('data-logicate-draggable') &&
        mouseOverElement.getAttribute('data-logicate-draggable-sidebar') &&
        !isHolding
      ) {
        const type = mouseOverElement.getAttribute('data-logicate-gate-type-type')
        const typeType = mouseOverElement.getAttribute('data-logicate-type')
        if (type && !draggingNewElement && e.buttons === Click.Primary) {
          setDraggingNewElement({
            type: {
              type: type as NodeType['type'],
              node: typeType as NodeType['node'],
            } as NodeType,
            x: mouseX - 16 / -canvas.zoom,
            y: mouseY + 16 / -canvas.zoom,
          })
          setHolding(true)
        }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (temporaryWire) {
        const cursorOn = document.elementFromPoint(e.clientX, e.clientY)
        if (cursorOn && cursorOn.getAttribute('data-logicate-node-parent-id')) {
          const parentId = cursorOn.getAttribute('data-logicate-node-parent-id')
          const terminalType = cursorOn.getAttribute('data-logicate-parent-terminal-type')
          if (parentId && terminalType) {
            const parent = items.find((item) => item.id === parentId)
            if (!parent) return
            switch (parent.itemType) {
              case 'gate':
                if (terminalType === 'input') {
                  parent.inputs.push({
                    id: temporaryWire.fromId,
                    node_index: parseInt(cursorOn.getAttribute('data-logicate-parent-terminal-index') ?? '0'),
                  })
                  const wire = {
                    id: randomWireId(),
                    from: {
                      id: temporaryWire.fromId,
                      node_index: temporaryWire.fromNodeIndex,
                    },
                    to: {
                      id: parentId,
                      node_index: parseInt(cursorOn.getAttribute('data-logicate-parent-terminal-index') ?? '0'),
                    },
                    active: false,
                  } satisfies WireType
                  addWire(wire)
                } else if (terminalType === 'output') {
                  parent.outputs.push({
                    id: temporaryWire.fromId,
                    node_index: parseInt(cursorOn.getAttribute('data-logicate-parent-terminal-index') ?? '0'),
                  })
                }
                setTemporaryWire(null)
                setHolding(false)
                break
              case 'input':
                if (terminalType === 'output') {
                  parent.outputs.push({
                    id: temporaryWire.fromId,
                    node_index: parseInt(cursorOn.getAttribute('data-logicate-parent-terminal-index') ?? '0'),
                  })
                  const wire = {
                    id: randomWireId(),
                    from: {
                      id: temporaryWire.fromId,
                      node_index: temporaryWire.fromNodeIndex,
                    },
                    to: {
                      id: parentId,
                      node_index: parseInt(cursorOn.getAttribute('data-logicate-parent-terminal-index') ?? '0'),
                    },
                    active: false,
                  } satisfies WireType
                  addWire(wire)
                }
                setTemporaryWire(null)
                setHolding(false)
                break
              default:
                break
            }
          } else {
            setTemporaryWire(null)
            setHolding(false)
          }
        } else {
          setTemporaryWire(null)
          setHolding(false)
        }
      }

      if (draggingNewElement) {
        setDraggingNewElement(null)
        // We need to adjust the x and y to be the one relative to the canvas so that it doesnt account for the width of the sidebar
        if (!canvasReference.current) return
        const clientX = e.clientX
        const clientY = e.clientY
        if (
          clientX < canvasReference.current.getBoundingClientRect().left ||
          clientX > canvasReference.current.getBoundingClientRect().right ||
          clientY < canvasReference.current.getBoundingClientRect().top ||
          clientY > canvasReference.current.getBoundingClientRect().bottom
        ) {
          return
        }
        const xOnCanvas = (draggingNewElement.x - canvasReference.current.getBoundingClientRect().left) / canvas.zoom
        const maxMinX = Math.max(0, Math.min(xOnCanvas, 1000))
        const yOnCanvas = (draggingNewElement.y - canvasReference.current.getBoundingClientRect().top) / canvas.zoom
        const maxMinY = Math.max(0, Math.min(yOnCanvas, 1000))
        const item = {
          id: randomGateId(),
          x: maxMinX,
          y: maxMinY,
          ...(draggingNewElement.type.type === 'input'
            ? {
                itemType: 'input' as const,
                type: draggingNewElement.type.node as InputType,
                value: (draggingNewElement.type.node as InputType) === InputType.HIGH_CONSTANT ? true : false,
                outputs: [],
                settings: {},
              }
            : draggingNewElement.type.type === 'gate'
              ? {
                  itemType: 'gate' as const,
                  type: draggingNewElement.type.node as GateType,
                  computedValue: false,
                  inputs: [],
                  outputs: [],
                  settings: {
                    inputs: defaultInputs[draggingNewElement.type.node].default,
                    color: '#000',
                  },
                }
              : {
                  itemType: 'output' as const,
                  type: draggingNewElement.type.node as OutputType,
                  inputs: [],
                  settings: {},
                  computedValue: false,
                }),
        } satisfies Item
        addItem(item)
        setHolding(false)
      }

      if (isMassSelecting) {
        const canvasElement = document.querySelector('[data-logicate-canvas]')
        if (!canvasElement) return
        setSelected([])
        items.forEach((item) => {
          // isMassSelecting contains x and y for start and end
          if (
            item.x < Math.max(isMassSelecting.start.x, isMassSelecting.end.x) &&
            item.x > Math.min(isMassSelecting.start.x, isMassSelecting.end.x) &&
            item.y < Math.max(isMassSelecting.start.y, isMassSelecting.end.y) &&
            item.y > Math.min(isMassSelecting.start.y, isMassSelecting.end.y)
          ) {
            selectItemId(item.id)
          }
        })
        setMassSelecting(null)
        setHolding(false)
      }
    }

    const mouseDown = (e: MouseEvent) => {
      // if the user doesnt click on any element and they arent already in a mass selection, then start a mass selection
      const mouseOverElement = document.elementFromPoint(e.clientX, e.clientY)
      if (mouseOverElement && mouseOverElement.getAttribute('data-logicate-canvas-items') && !isMassSelecting) {
        const canvasElement = document.querySelector('[data-logicate-canvas]')
        if (!canvasElement) return
        setMassSelecting({
          start: {
            x: e.clientX - canvasElement.getBoundingClientRect().left,
            y: e.clientY - canvasElement.getBoundingClientRect().top,
          },
          end: {
            x: e.clientX - canvasElement.getBoundingClientRect().left,
            y: e.clientY - canvasElement.getBoundingClientRect().top,
          },
        })
        setHolding(true)
      }
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', mouseDown)

    return () => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', mouseDown)
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setClockValue((previous) => !previous)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [items])

  const simulate = useCallback(() => {
    const { items, wires } = useCanvasStore.getState()
    const newSimulatedItems: { id: string; state: boolean }[] = []
    const newSimulatedWires: { id: string; active: boolean }[] = []

    const getValue = (id: string) => {
      const item = items.find((item) => item.id === id)
      if (!item) return false
      if (item.itemType === 'input') {
        if (item.type === InputType.CLOCK) {
          return clockValue
        }
        return item.value
      }
      return item.computedValue || false
    }

    const visited = new Set<string>()
    const stack: string[] = []

    const visit = (id: string) => {
      if (visited.has(id)) return
      visited.add(id)
      const item = items.find((item) => item.id === id)
      if (item) {
        const outputs = wires.filter((wire) => wire.from.id === id).map((wire) => wire.to.id)
        outputs.forEach((outputId) => visit(outputId))
        stack.push(id)
      }
    }

    items.forEach((item) => {
      if (!visited.has(item.id)) {
        visit(item.id)
      }
    })

    while (stack.length > 0) {
      const id = stack.pop()
      if (id !== undefined) {
        const item = items.find((item) => item.id === id)
        if (item) {
          if (item.itemType === 'input') {
            if (item.type === InputType.CLOCK) {
              newSimulatedItems.push({ id: item.id, state: clockValue })
            } else {
              newSimulatedItems.push({ id: item.id, state: item.value })
            }
          } else if (item.itemType === 'gate' || item.itemType === 'output') {
            const inputWires = wires.filter((wire) => wire.to.id === item.id)
            const inputValues = inputWires.map((wire) => getValue(wire.from.id))
            let computedValue = false

            if (item.itemType === 'output') {
              computedValue = inputValues[0] || false
            } else if (item.type in gates) {
              computedValue = gates[item.type](inputValues)
            }

            newSimulatedItems.push({ id: item.id, state: computedValue })
          }
        }
      }
    }

    // Update simulated wires
    wires.forEach((wire) => {
      const fromItem = newSimulatedItems.find((item) => item.id === wire.from.id)
      newSimulatedWires.push({ id: wire.id, active: fromItem?.state || false })
    })

    setSimulatedItemState(newSimulatedItems)
    setSimulatedWires(newSimulatedWires)
  }, [clockValue])

  useEffect(() => {
    simulate()
  }, [items, wires, clockValue ?? false])

  return (
    <>
      <main className="flex h-full w-full grow flex-row">
        <AnimatePresence mode="wait">
          {(!isNew && !usingDatabase && (
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 1,
                ease: 'easeInOut',
              }}
              className="pointer-events-auto absolute inset-0 z-50 flex cursor-none flex-col items-center justify-center gap-2 bg-black/30"
            >
              <LoadingCircle className="size-5" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-neutralgrey-100 text-sm font-medium">Loading...</p>
                <p className="text-neutralgrey-100/50 text-xs">We are loading your data so you can use this canvas.</p>
              </div>
            </motion.div>
          )) ||
            null}
        </AnimatePresence>
        <Sidebar canvas={logicateSession} />
        <FloatingToolbar session={logicateSession} />
        <div
          ref={canvasReference}
          className="relative max-h-full w-full grow overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          data-logicate-canvas-position={`${canvas.x}px ${canvas.y}px`}
          data-logicate-canvas-zoom={canvas.zoom}
          data-logicate-canvas
        >
          {isMassSelecting && (
            <div
              data-logicate-mass-selector
              className="z-50 border border-blue-800 bg-blue-800/30"
              style={{
                position: 'absolute',
                top: Math.min(isMassSelecting.start.y, isMassSelecting.end.y),
                left: Math.min(isMassSelecting.start.x, isMassSelecting.end.x),
                width: Math.abs(isMassSelecting.end.x - isMassSelecting.start.x),
                height: Math.abs(isMassSelecting.end.y - isMassSelecting.start.y),
                pointerEvents: 'none',
              }}
            />
          )}
          <BackgroundElement canvasReference={canvasReference} showBackground={user.client_showBackground ?? true} />
          <div
            className={cn('absolute inset-0 h-full w-full opacity-100 transition-opacity duration-300', {
              'opacity-0': !usingDatabase && !isNew,
            })}
            style={{
              transform: `scale(${canvas.zoom})`,
            }}
            data-logicate-canvas-items
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                transform: `scale(${canvas.zoom})`,
                transformOrigin: 'center',
              }}
            >
              {wires.map((wire, index) => {
                return (
                  <ConnectionWire
                    key={index}
                    wire={wire}
                    simulatedWires={simulatedWires}
                    className={!usingDatabase && !isNew ? 'opacity-0' : 'opacity-100'}
                  />
                )
              })}
            </svg>
            {items.map((item) =>
              item.itemType === 'gate' ? (
                <Gate
                  key={item.id}
                  type={item.type}
                  inputs={item.settings.inputs ?? 0}
                  state={item.computedValue ?? false}
                  gateId={item.id}
                  x={item.x + canvas.x}
                  y={item.y + canvas.y}
                  simulated={
                    simulatedItemState.find((item) => item.id === item.id) ?? {
                      id: item.id,
                      state: false,
                    }
                  }
                  className={!usingDatabase && !isNew ? 'opacity-0' : 'opacity-100'}
                />
              ) : item.itemType === 'input' ? (
                <Input
                  key={item.id}
                  type={item.type}
                  value={item.value ?? false}
                  inputId={item.id}
                  x={item.x + canvas.x}
                  y={item.y + canvas.y}
                  simulated={
                    simulatedItemState.find((item) => item.id === item.id) ?? {
                      id: item.id,
                      state: false,
                    }
                  }
                  input={item}
                  clock={clockValue}
                  className={!usingDatabase && !isNew ? 'opacity-0' : 'opacity-100'}
                />
              ) : null
            )}
          </div>
        </div>
        {CanvasActions}
      </main>
      {draggingNewElement && (
        <div
          className="pointer-events-none absolute z-[123456] origin-top-left"
          style={{
            width: '1000000px',
          }}
        >
          {draggingNewElement.type.type === 'gate' ? (
            <TemporaryGate
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputs={0}
              state={false}
              gateId={'temporary-dragging-logicate-element'}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : draggingNewElement.type.type === 'input' ? (
            <TemporaryInput
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputId={'temporary-dragging-logicate-element'}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : null}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        {temporaryWire && (
          <Wire
            start={{
              x: temporaryWire.from.x,
              y: temporaryWire.from.y,
              fromId: temporaryWire.fromId,
              fromIndex: temporaryWire.fromNodeIndex,
              fromTerminal: temporaryWire.fromTerminal,
            }}
            end={{
              x: temporaryWire.to.x,
              y: temporaryWire.to.y,
            }}
            isActive={false}
            type="normal"
          />
        )}
      </div>
    </>
  )
}
