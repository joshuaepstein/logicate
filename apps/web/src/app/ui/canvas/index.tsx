'use client'
import { LogicateSession, User } from '@logicate/database'
import { Click } from '@logicate/utils/buttons'
import { randomGateId, randomWireId } from '@logicate/utils/id'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { Input, InputType } from './node/inputs'
import { TemporaryInput } from './node/inputs/temporary'
import { TemporaryGate } from './node/gates/temporary'
import { NodeType, OutputType } from './node/type'
import Sidebar from './sidebar'
import { Item, TypeWire, Wire as WireType } from './types'
import { ConnectionWire, Wire } from './wire'
import { gates } from './node'
import Cookies from 'js-cookie'

export default function Canvas({ sessionId, user, logicateSession }: { sessionId: string; logicateSession: LogicateSession; user: User }) {
  const canvasReference = useRef<HTMLDivElement>(null)
  const {
    items,
    addItem,
    selected,
    setSelected,
    wires,
    setWires,
    setItems,
    addWire,
    canvas,
    isHolding,
    setHolding,
    itemsUpdate,
    temporaryWire,
    setTemporaryWire,
    updateTemporaryWire,
    updatingDatabase,
  } = useCanvasStore()
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
  const { CanvasActions, confirmClear, setConfirmClear } = useCanvasActions(sessionId)
  useDisableHook(canvasReference)
  useUpdateCanvasStore(logicateSession.id)
  useBeforeunload(() => 'Are you sure you want to leave this page? You will lose all unsaved changes......')

  useEffect(() => {
    if (usingDatabase) return
    // use cookies to store if it has been initialized when default values for this update
    if (logicateSession.id) {
      // TODO: Refactor this so that the server generates a new "ticket" when the canvas is updated when the client should check if is the most recent one. (e.g. the logicateSession stores the currentSession and cookies stores the current one and if they dont match then update.)
      setItems(logicateSession.items as Item[])
      setWires(logicateSession.wires as unknown as TypeWire[])
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
                break
              case 'input':
                console.info('input')
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
                  console.info('new wire', wire)
                }
                setTemporaryWire(null)
                break
              default:
                break
            }
          } else {
            setTemporaryWire(null)
          }
        } else {
          setTemporaryWire(null)
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
                value: false,
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
    }

    const handleClickAnywhere = (e: MouseEvent) => {
      if (e.target) if ((e.target as HTMLElement).getAttribute('data-logicate-canvas-items')) setSelected([])
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClickAnywhere)

    return () => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClickAnywhere)
    }
  })

  const simulate = useCallback(() => {
    const { items, wires } = useCanvasStore.getState()
    const newSimulatedItems: { id: string; state: boolean }[] = []
    const newSimulatedWires: { id: string; active: boolean }[] = []

    const getValue = (id: string) => {
      const item = items.find((item) => item.id === id)
      if (!item) return false
      if (item.itemType === 'input') return item.value
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
            newSimulatedItems.push({ id: item.id, state: item.value })
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
  }, [])

  useEffect(() => {
    simulate()
  }, [items, wires])

  return (
    <>
      <main className="flex h-full w-full grow flex-row">
        <Sidebar />

        <div
          ref={canvasReference}
          className="relative max-h-[calc(100dvh-4rem)] w-full grow overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          data-logicate-canvas-position={`${canvas.x}px ${canvas.y}px`}
          data-logicate-canvas-zoom={canvas.zoom}
          data-logicate-canvas
        >
          <BackgroundElement canvasReference={canvasReference} showBackground={user.client_showBackground ?? true} />
          <div
            className="absolute inset-0 h-full w-full"
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
                return <ConnectionWire key={index} wire={wire} simulatedWires={simulatedWires} />
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
                />
              ) : null
            )}
          </div>
        </div>
        {CanvasActions}
      </main>
      {draggingNewElement && (
        <div
          className="pointer-events-none absolute origin-top-left"
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

      <div className="pointer-events-none absolute inset-0 h-full w-full">
        {temporaryWire && (
          <Wire
            start={{
              x: temporaryWire.from.x,
              y: temporaryWire.from.y,
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
