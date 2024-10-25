import { cn } from "@/lib"
import { cursorInside } from "@/lib/dom-cursor"
import { forwardRef, useCallback, useEffect, useState } from "react"
import { useCookie } from "react-use"
import useCanvasStore from "../../hooks/useCanvasStore"
import { InputItem } from "../../types"
import ButtonBody from "./button/body"
import ClockBody from "./clock/body"
import HighConstantBody from "./constant/high/body"
import LowConstantBody from "./constant/low/body"
import SwitchBody from "./switch/body"
import { InputType } from "./types"
import VariableBody from "./variable/body"

export type InputProps = {
  type: InputType
  inputId: string
  value: boolean
}

export const Input = forwardRef<
  HTMLDivElement,
  InputProps & {
    x: number
    y: number
    simulated: {
      id: string
      state: boolean
    }
    input: InputItem
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, x, y, input, inputId, className, value, simulated, ...rest }, ref) => {
  const {
    isHolding,
    setHolding,
    updateItemPosition,
    setTemporaryWire,
    canvas,
    updateItem,
    selectItemId: select,
    setSelectedIds,
    isSelected,
  } = useCanvasStore()
  const [debug] = useCookie(`debugMode`)
  const [position, setPosition] = useState({ x, y })
  const [offset, setOffset] = useState({ x, y })
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      if (target.dataset.logicateBody || target.dataset.logicateInputContent) {
        if (target.dataset.logicateButtonClickable) {
          return
        }
        setDragging(true)
        setOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        })
      }
    },
    [position, canvas.zoom, offset]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        const canvasElement = document.querySelector("[data-logicate-canvas]")
        if (canvasElement) {
          const bounds = canvasElement.getBoundingClientRect()
          if (cursorInside(e, bounds)) {
            setPosition({
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            })
            updateItemPosition(inputId, { x: e.clientX - offset.x, y: e.clientY - offset.y })
          }
        }
      }
    },
    [dragging, offset, canvas.zoom]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(false)
    setSelectedIds([inputId])
  }, [position])

  useEffect(() => {
    if (dragging) {
      setHolding(true)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      setHolding(false)
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [dragging])

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none",
          className
        )}
        style={{ left: position.x, top: position.y }}
        tabIndex={-1}
        data-logicate-item={inputId}
        data-logicate-id={inputId}
        data-logicate-type={type}
        data-logicate-state={value}
        {...rest}
        onMouseDown={handleMouseDown}
        data-logicate-dragging={dragging}
        data-logicate-selected={isSelected(inputId)}
      >
        {debug && debug === "true" && (
          <p className={cn("absolute left-[80%] top-full w-full text-2xs font-semibold text-red-500")} data-logicate-debug-info>
            <span>{inputId}</span>
            <br />
            <span>x: {position.x}</span>
            <br />
            <span>y: {position.y}</span>
            <br />
            <span>dragging: {dragging ? "true" : "false"}</span>
            <br />
            <span>value: {value ? "true" : "false"}</span>
            <br />
            <span>type: {type}</span>
          </p>
        )}
        <div
          className="flex flex-col items-start justify-center"
          style={{
            gridColumn: "3 / span 1",
            gridRow: "2 / span 1",
          }}
        >
          <div className="relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
            <div className="pointer-events-auto z-[1] order-2" style={{ lineHeight: 0 }}>
              <svg
                style={{
                  overflow: "visible",
                  width: "12.5px",
                  height: "12.5px",
                }}
                className="pointer-events-none transition-transform hover:scale-[1.2]"
              >
                <circle
                  className="pointer-events-auto"
                  cx="6.5"
                  cy="6.5"
                  r="6"
                  stroke={input.settings.color || "#000"}
                  strokeWidth="1"
                  fill="white"
                  data-logicate-output-terminal={0}
                  data-logicate-node-parent-id={inputId}
                  data-logicate-parent-terminal-index={0}
                  data-logicate-parent-terminal-type="output"
                  onMouseDown={(e) => {
                    setTemporaryWire({
                      from: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      fromId: inputId,
                      fromNodeIndex: 0,
                      to: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      active: false,
                      fromTerminal: "output",
                    })
                    setHolding(true)
                  }}
                ></circle>
              </svg>
            </div>
            <div
              className="order-1 h-[2px] min-w-4 grow"
              style={{
                backgroundColor: input.settings.color || "#000",
              }}
            ></div>
          </div>
        </div>
        <div
          className={cn(
            "flex min-h-[30px] w-[30px] min-w-[42px] items-center justify-center border-2 bg-white transition-[filter] duration-100",
            {
              "size-[42px]":
                type === InputType.BUTTON ||
                type === InputType.HIGH_CONSTANT ||
                type === InputType.LOW_CONSTANT ||
                type === InputType.VARIABLE,
              "h-[52px] w-[42px]": type === InputType.SWITCH,
              "h-[36px] w-[44px]": type === InputType.CLOCK,
            }
          )}
          style={{
            gridColumn: "2 / span 1",
            gridRow: "2 / span 1",
            filter: isSelected(inputId) ? "drop-shadow(0px 0px 3px #0079db)" : "none",
            borderColor: input.settings.color || "#000",
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center" data-logicate-body>
            {(() => {
              switch (type) {
                case InputType.BUTTON:
                  return <ButtonBody input={input} />
                case InputType.SWITCH:
                  return <SwitchBody input={input} />
                case InputType.CLOCK:
                  return <ClockBody input={input} />
                case InputType.HIGH_CONSTANT:
                  return <HighConstantBody input={input} />
                case InputType.LOW_CONSTANT:
                  return <LowConstantBody input={input} />
                case InputType.VARIABLE:
                  return <VariableBody input={input} />
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
    </>
  )
})
