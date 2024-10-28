"use client"
import LogoIcon from "@/components/Logo"
import { cn } from "@/lib"
import { Click } from "@/lib/buttons"
import { cursorInsideElement } from "@/lib/dom-cursor"
import useMediaQuery from "@/lib/hooks/use-media-query"
import { randomGateId, randomWireId } from "@/lib/id"
import { LogicateSession, User } from "@logicate/database"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import BackgroundElement from "./background-element"
import useCanvasActions from "./canvas_actions"
import useDisableHook from "./hooks/disable-hook"
import useUpdateCanvasStore from "./hooks/updateCanvasStore"
import useCanvasStore from "./hooks/useCanvasStore"
import LogicGateLoader from "./logic-gate-loader"
import { gates } from "./node"
import { Gate } from "./node/gates"
import { defaultInputs } from "./node/gates/constants"
import { TemporaryGate } from "./node/gates/temporary"
import { GateType } from "./node/gates/types"
import { Input } from "./node/inputs"
import { TemporaryInput } from "./node/inputs/temporary"
import { InputType } from "./node/inputs/types"
import { Output } from "./node/outputs"
import { TemporaryOutput } from "./node/outputs/temporary"
import { OutputType } from "./node/outputs/types"
import { NodeType } from "./node/type"
import Sidebar from "./sidebar"
import FloatingToolbar from "./toolbar"
import { Alphabet, Item, TypeWire } from "./types"
import VariableControls from "./variable-controls"
import { ConnectionWire, Wire } from "./wire"

export default function Canvas({
  sessionId,
  user,
  logicateSession,
  isNew,
  isMobile = false,
  demo = false,
}: {
  sessionId: string
  logicateSession: LogicateSession
  user: User | null
  isNew: boolean
  isMobile?: boolean
  demo?: boolean
}) {
  const canvasReference = useRef<HTMLDivElement>(null)
  const {
    items,
    addItem,
    selected,
    setSelected,
    setItemsSelected,
    wires,
    variableValues,
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
    currentTool,
    recentActions,
    addRecentAction,
    setVariableValues,
    removeMostRecentAction,
  } = useCanvasStore()
  const [draggingNewElement, setDraggingNewElement] = useState<{
    type: NodeType
    x: number
    y: number
    hidden: boolean
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
  const [preinstalled_opacity, setPreinstalledOpacity] = useState<Item[]>([])
  const { isMobile: isMobileQuery } = useMediaQuery()

  useEffect(() => {
    if (sessionId === "demo") return
    if (usingDatabase && !isNew) return
    // use cookies to store if it has been initialized when default values for this update
    if (logicateSession.id) {
      // TODO: Refactor this so that the server generates a new "ticket" when the canvas is updated when the client should check if is the most recent one. (e.g. the logicateSession stores the currentSession and cookies stores the current one and if they dont match then update.)
      setItems(logicateSession.items as Item[])
      setWires(logicateSession.wires as unknown as TypeWire[])
      setVariableValues(logicateSession.variableValues as unknown as { letter: Alphabet; value: boolean }[])
      setPreinstalledOpacity(logicateSession.items as Item[])
      setUsedDatabase(true)
    }
  }, [logicateSession])

  useHotkeys("esc", () => {
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

  const undoRecent = useCallback(() => {
    const lastAction = recentActions[recentActions.length - 1]
    if (!lastAction) return

    if (lastAction.actionType === "add") {
      if (lastAction.itemType === "item") {
        setItems(items.filter((item) => item.id !== lastAction.id))
      } else if (lastAction.itemType === "wire") {
        setWires(wires.filter((wire) => wire.id !== lastAction.id))
      }
      removeMostRecentAction()
    } else if (lastAction.actionType === "remove") {
      if (lastAction.itemType === "item") {
        if (lastAction.oldState.selectedType === "item") {
          setItems([...items, lastAction.oldState])
        } else {
          // there was an unexpected error
        }
      } else if (lastAction.itemType === "wire") {
        if (lastAction.oldState.selectedType === "wire") {
          setWires([...wires, lastAction.oldState])
        } else {
          // there was an unexpected error
        }
      }
      removeMostRecentAction()
    } else if (lastAction.actionType === "mass_remove") {
      const newItems = items
      const newWires = wires
      lastAction.oldState.forEach((item) => {
        if (item.selectedType === "item") {
          newItems.push(item)
        } else if (item.selectedType === "wire") {
          newWires.push(item)
        }
      })
      setItems(newItems)
      setWires(newWires)
      removeMostRecentAction()
    }
  }, [items, wires, recentActions])

  useHotkeys("meta+z", (e) => {
    e.preventDefault()
    e.stopPropagation()

    undoRecent()
  })

  useHotkeys("Delete,Backspace", (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (selected.length === 1) {
      if (selected[0].selectedType === "item") {
        const newItems = items.filter((item) => item.id !== selected[0].id)
        setItems(newItems)
        addRecentAction({
          actionType: "remove",
          datetime: Date.now(),
          id: selected[0].id,
          itemType: "item",
          oldState: selected[0],
          newState: null,
        })
      } else if (selected[0].selectedType === "wire") {
        const deleteWire = wires.find((wire) => wire.id === selected[0].id)
        if (!deleteWire) return
        setWires(wires.filter((wire) => wire.id !== selected[0].id))
        const fromItem = items.find((item) => item.id === deleteWire.from.id)
        const toItem = items.find((item) => item.id === deleteWire.to.id)
        if (fromItem && toItem) {
          // delete the links
          if (fromItem.itemType === "gate") {
            fromItem.outputs = fromItem.outputs.filter((output) => output.id !== deleteWire.to.id)
            // file deepcode ignore DuplicateIfBody: <Code is very specific and do not want to replace with function as could break code and make it harder to understand>
          } else if (fromItem.itemType === "input") {
            fromItem.outputs = fromItem.outputs.filter((output) => output.id !== deleteWire.to.id)
          } else if (fromItem.itemType === "output") {
            fromItem.inputs = fromItem.inputs.filter((input) => input.id !== deleteWire.to.id)
          } else {
            // unexpected error
          }

          if (toItem.itemType === "gate") {
            toItem.inputs = toItem.inputs.filter((input) => input.id !== deleteWire.from.id)
          } else if (toItem.itemType === "output") {
            toItem.inputs = toItem.inputs.filter((input) => input.id !== deleteWire.from.id)
          } else {
            // unexpected error (can't input into   an input)
          }
        }
        addRecentAction({
          actionType: "remove",
          datetime: Date.now(),
          id: selected[0].id,
          itemType: "wire",
          oldState: selected[0],
          newState: null,
        })
      }
    } else {
      // delete all the items and wires that are selected - also delete all wires where the selected item is the from or to
      const newItems = items.filter((item) => !selected.flatMap((selected) => selected.id).includes(item.id))
      const newWires = wires.filter(
        (wire) =>
          !selected.flatMap((selected) => selected.id).includes(wire.from.id) &&
          !selected.flatMap((selected) => selected.id).includes(wire.to.id)
      )
      setItems(newItems)
      setWires(newWires)
      addRecentAction({
        actionType: "mass_remove",
        datetime: Date.now(),
        id: selected.flatMap((selected) => selected.id),
        oldState: selected,
      })
    }
  })

  useHotkeys("meta+a", (e) => {
    e.preventDefault()
    e.stopPropagation()
    items.forEach((item) => selectItemId(item.id))
    wires.forEach((wire) => select({ ...wire, selectedType: "wire" }))
  })

  // When user starts dragging from the element, save drag position - but it should continue dragging when the cursor leaves this element. So this means the listener needs to be added to the document.
  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (isMassSelecting && e.buttons === Click.Primary) {
        const canvasElement = document.querySelector("[data-logicate-canvas]")
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
      const mouseX = e.clientX
      const mouseY = e.clientY

      if (draggingNewElement && e.buttons === Click.Primary) {
        const element = document.querySelector("[data-logicate-temporary-dragging-node]")
        if (!element) return
        setDraggingNewElement((previous) => {
          if (previous) {
            return {
              ...previous,
              x: mouseX - element.getBoundingClientRect().width / 2,
              y: mouseY - element.getBoundingClientRect().height / 2,
              hidden: false,
            }
          }
          return null
        })
      }

      // const mouseOverElement = document.elementFromPoint(mouseX, mouseY)
      // if (
      //   mouseOverElement &&
      //   mouseOverElement.getAttribute('data-logicate-draggable') &&
      //   mouseOverElement.getAttribute('data-logicate-draggable-sidebar') &&
      //   !isHolding
      // ) {
      //   const type = mouseOverElement.getAttribute('data-logicate-gate-type-type')
      //   const typeType = mouseOverElement.getAttribute('data-logicate-type')
      //   if (type && !draggingNewElement && e.buttons === Click.Primary) {
      //     setDraggingNewElement({
      //       type: {
      //         type: type as NodeType['type'],
      //         node: typeType as NodeType['node'],
      //       } as NodeType,
      //       x: mouseX - 16 / -canvas.zoom,
      //       y: mouseY + 16 / -canvas.zoom,
      //     })
      //     setHolding(true)
      //   }
      // }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (temporaryWire) {
        const cursorOn = document.elementFromPoint(e.clientX, e.clientY)
        if (cursorOn && cursorOn.getAttribute("data-logicate-node-parent-id")) {
          const parentId = cursorOn.getAttribute("data-logicate-node-parent-id")
          const terminalType = cursorOn.getAttribute("data-logicate-parent-terminal-type")
          if (parentId && terminalType) {
            const parent = items.find((item) => item.id === parentId)
            if (!parent) return
            const nodeIndex = parseInt(cursorOn.getAttribute("data-logicate-parent-terminal-index") ?? "0")

            // Check if there's already a wire connected to this input
            const existingWire = wires.find((wire) => wire.to.id === parentId && wire.to.node_index === nodeIndex)

            if (existingWire && terminalType === "input") {
              // If there's already a wire connected to this input, don't add a new one
              setTemporaryWire(null)
              setHolding(false)
              return
            }

            switch (parent.itemType) {
              case "gate":
                if (terminalType === "input") {
                  parent.inputs.push({
                    id: temporaryWire.fromId,
                    node_index: nodeIndex,
                  })
                  addWire({
                    id: randomWireId(),
                    from: {
                      id: temporaryWire.fromId,
                      node_index: temporaryWire.fromNodeIndex,
                    },
                    to: {
                      id: parentId,
                      node_index: nodeIndex,
                    },
                    active: false,
                  })
                } else if (terminalType === "output") {
                  parent.outputs.push({
                    id: temporaryWire.fromId,
                    node_index: nodeIndex,
                  })
                }
                setTemporaryWire(null)
                setHolding(false)
                break
              case "input":
                if (terminalType === "output") {
                  parent.outputs.push({
                    id: temporaryWire.fromId,
                    node_index: nodeIndex,
                  })
                  addWire({
                    id: randomWireId(),
                    from: {
                      id: temporaryWire.fromId,
                      node_index: temporaryWire.fromNodeIndex,
                    },
                    to: {
                      id: parentId,
                      node_index: nodeIndex,
                    },
                    active: false,
                  })
                }
                setTemporaryWire(null)
                setHolding(false)
                break
              case "output":
                if (terminalType === "input" && !existingWire) {
                  parent.inputs.push({
                    id: temporaryWire.fromId,
                    node_index: temporaryWire.fromNodeIndex,
                  })
                  addWire({
                    id: randomWireId(),
                    from: {
                      id: temporaryWire.fromId,
                      node_index: temporaryWire.fromNodeIndex,
                    },
                    to: {
                      id: parentId,
                      node_index: nodeIndex,
                    },
                    active: false,
                  })
                }
                setTemporaryWire(null)
                setHolding(false)
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
          setHolding(false)
          return
        }
        const sidebarElement = document.querySelector("aside[data-logicate-sidebar]")
        if (!sidebarElement) {
          console.error("Sidebar element not found")
          setHolding(false)
          return
        }
        // if the mouse is over the sidebar, then dont add the item
        if (
          cursorInsideElement(
            {
              x: clientX,
              y: clientY,
            },
            sidebarElement.getBoundingClientRect()
          )
        ) {
          setHolding(false)
          // replace cursor with poof cursor
          document.body.style.cursor = "url(/_static/poof.png), auto"
          return
        }
        const xOnCanvas = (draggingNewElement.x - canvasReference.current.getBoundingClientRect().left) / canvas.zoom
        const maxMinX = Math.max(0, xOnCanvas)
        const yOnCanvas = (draggingNewElement.y - canvasReference.current.getBoundingClientRect().top) / canvas.zoom
        const maxMinY = Math.max(0, yOnCanvas)
        const item = {
          id: randomGateId(),
          x: maxMinX,
          y: maxMinY,
          ...(draggingNewElement.type.type === "input"
            ? {
                itemType: "input" as const,
                type: draggingNewElement.type.node as InputType,
                value: (draggingNewElement.type.node as InputType) === InputType.HIGH_CONSTANT ? true : false,
                outputs: [],
                settings: {},
              }
            : draggingNewElement.type.type === "gate"
              ? {
                  itemType: "gate" as const,
                  type: draggingNewElement.type.node as GateType,
                  computedValue: false,
                  inputs: [],
                  outputs: [],
                  settings: {
                    inputs: defaultInputs[draggingNewElement.type.node].default,
                    color: "#000",
                  },
                }
              : {
                  itemType: "output" as const,
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
        const canvasElement = document.querySelector("[data-logicate-canvas]")
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
      if (mouseOverElement && mouseOverElement.getAttribute("data-logicate-canvas-items") && !isMassSelecting) {
        const canvasElement = document.querySelector("[data-logicate-canvas]")
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

    document.addEventListener("mousemove", handleDrag)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousedown", mouseDown)
    document.addEventListener("UndoEvent", undoRecent)

    return () => {
      document.removeEventListener("mousemove", handleDrag)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("UndoEvent", undoRecent)
    }
  })

  const simulate = useCallback(() => {
    const { items, wires, variableValues } = useCanvasStore.getState()
    const newSimulatedItems: { id: string; state: boolean }[] = []
    const newSimulatedWires: { id: string; active: boolean }[] = []

    const getValue = (id: string) => {
      const simulatedItem = newSimulatedItems.find((item) => item.id === id)
      if (simulatedItem) return simulatedItem.state
      const item = items.find((item) => item.id === id)
      if (!item) return false
      if (item.itemType === "input") {
        if (item.type === InputType.VARIABLE && item.settings.expressionLetter) {
          return variableValues.some((v) => v.letter === item.settings.expressionLetter && v.value)
        }
        return item.value || false
      }
      return false
    }

    const simulateItem = (id: string) => {
      const item = items.find((item) => item.id === id)
      if (!item) return false

      if (item.itemType === "input") {
        if (item.type === InputType.VARIABLE && item.settings.expressionLetter) {
          return variableValues.some((v) => v.letter === item.settings.expressionLetter && v.value)
        }
        return item.value || false
      } else if (item.itemType === "gate" || item.itemType === "output") {
        const inputWires = wires.filter((wire) => wire.to.id === id)
        const inputValues = inputWires.map((wire) => getValue(wire.from.id))

        if (item.itemType === "output") {
          return inputValues[0] || false
        } else if (item.type in gates) {
          // Check if the item has a custom input number set and if it matches the actual inputs
          if (item.settings.inputs && item.settings.inputs !== inputValues.length) {
            return false
          }
          return gates[item.type](inputValues)
        }
      }
      return false
    }

    const maxIterations = items.length * 2 // Prevent infinite loops
    let iteration = 0
    let changed = true

    while (changed && iteration < maxIterations) {
      changed = false
      iteration++

      items.forEach((item) => {
        const oldState = getValue(item.id)
        const newState = simulateItem(item.id)

        if (oldState !== newState) {
          changed = true
          newSimulatedItems.push({ id: item.id, state: newState })
        }
      })
    }

    // Update simulated wires
    wires.forEach((wire) => {
      const fromState = getValue(wire.from.id)
      newSimulatedWires.push({ id: wire.id, active: fromState })
    })

    setSimulatedItemState(newSimulatedItems)
    setSimulatedWires(newSimulatedWires)
  }, [])

  useEffect(() => {
    simulate()
  }, [items, wires, variableValues])

  if (isMobile || isMobileQuery) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <LogoIcon className="text-neutralgrey-700 mb-8 h-8" />
        <p className="text-neutralgrey-1100 text-sm font-medium">Mobile/Tablet is not supported</p>
        <p className="text-neutralgrey-1000/50 text-xs">Please use a desktop device to use Logicate.</p>

        <p className="text-neutralgrey-1000/50 mt-4 text-xs">
          If you believe this is an error, please contact us at{" "}
          <Link href="mailto:support@joshepstein.co.uk" className="underline">
            support@joshepstein.co.uk
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <main className="flex h-full w-full grow flex-row">
        <AnimatePresence mode="wait">{(!isNew && !usingDatabase && sessionId !== "demo" && <LogicGateLoader />) || null}</AnimatePresence>
        <Sidebar setDraggingNewElement={setDraggingNewElement} draggingNewElement={draggingNewElement} canvas={logicateSession} />
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
                position: "absolute",
                top: Math.min(isMassSelecting.start.y, isMassSelecting.end.y),
                left: Math.min(isMassSelecting.start.x, isMassSelecting.end.x),
                width: Math.abs(isMassSelecting.end.x - isMassSelecting.start.x),
                height: Math.abs(isMassSelecting.end.y - isMassSelecting.start.y),
                pointerEvents: "none",
              }}
            />
          )}
          <BackgroundElement canvasReference={canvasReference} showBackground={user?.client_showBackground ?? true} />
          <div
            className={cn("absolute inset-0 h-full w-full opacity-100 transition-opacity duration-300", {
              "opacity-0": !usingDatabase && !isNew && sessionId !== "demo",
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
                transformOrigin: "center",
              }}
            >
              {wires.map((wire, index) => {
                return (
                  <ConnectionWire
                    key={index}
                    wire={wire}
                    simulatedWires={simulatedWires}
                    className={!usingDatabase && !isNew && sessionId !== "demo" ? "opacity-0" : "opacity-100"}
                  />
                )
              })}
            </svg>
            {items.map((item) =>
              item.itemType === "gate" ? (
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
                  demo={sessionId === "demo"}
                  className={!usingDatabase && !isNew && sessionId !== "demo" ? "opacity-0" : "opacity-100"}
                />
              ) : item.itemType === "input" ? (
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
                  className={!usingDatabase && !isNew && sessionId !== "demo" ? "opacity-0" : "opacity-100"}
                />
              ) : item.itemType === "output" ? (
                <Output
                  key={item.id}
                  type={item.type}
                  output={item}
                  simulated={
                    simulatedItemState.find((item1) => item1.id === item.id) || {
                      id: item.id,
                      state: false,
                    }
                  }
                  outputId={item.id}
                  value={item.computedValue || false}
                  x={item.x + canvas.x}
                  y={item.y + canvas.y}
                />
              ) : null
            )}
          </div>
        </div>
        <VariableControls />
        {CanvasActions}
      </main>
      {draggingNewElement && (
        <div
          className={cn("pointer-events-none absolute z-[123456] origin-top-left", {
            "opacity-0": draggingNewElement.hidden,
          })}
          style={{
            width: "1000000px",
          }}
        >
          {draggingNewElement.type.type === "gate" ? (
            <TemporaryGate
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputs={0}
              state={false}
              gateId={"temporary-dragging-logicate-element"}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : draggingNewElement.type.type === "input" ? (
            <TemporaryInput
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              inputId={"temporary-dragging-logicate-element"}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          ) : (
            <TemporaryOutput
              canvasZoom={canvas.zoom}
              type={draggingNewElement.type.node}
              outputId={"temporary-dragging-logicate-element"}
              x={draggingNewElement.x}
              y={draggingNewElement.y}
            />
          )}
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
