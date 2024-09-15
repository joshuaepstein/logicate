import { cn } from '@logicate/ui'
import { cursorInside } from '@logicate/utils/dom-cursor'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import useCanvasStore from '../../hooks/useCanvasStore'
import { InputItem } from '../../types'
import { darkerColour, lighterColour } from '@logicate/utils/color'

export enum InputType {
  BUTTON = 'BUTTON',
  SWITCH = 'SWITCH',
  HIGH_CONSTANT = 'HIGH_CONSTANT',
  LOW_CONSTANT = 'LOW_CONSTANT',
  CLOCK = 'CLOCK',
  //   INPUT = "INPUT", // TODO
}

export const inputTypeToIcon: Record<InputType, `data:image/${string}` | ''> = {
  [InputType.BUTTON]:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAwCAYAAABpJ5bJAAAEqGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjgxIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNDgiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI4MSIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNDgiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDUt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',
  [InputType.SWITCH]: '',
  [InputType.HIGH_CONSTANT]: '',
  [InputType.LOW_CONSTANT]: '',
  [InputType.CLOCK]: '',
}

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
>(({ type, x, y, input, inputId, value, simulated, ...rest }, ref) => {
  const { isHolding, setHolding, setTemporaryWire, canvas, updateItem, selectItemId: select, isSelected } = useCanvasStore()
  const [position, setPosition] = useState({ x, y })
  const [offset, setOffset] = useState({ x, y })
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      if (target.dataset.logicateBody || target.dataset.logicateInputContent) {
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
        const canvasElement = document.querySelector('[data-logicate-canvas]')
        if (canvasElement) {
          const bounds = canvasElement.getBoundingClientRect()
          if (cursorInside(e, bounds)) {
            setPosition({
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            })
            updateItem(inputId, { x: position.x, y: position.y })
          }
        }
      }
    },
    [dragging, offset, canvas.zoom]
  )

  const handleMouseUp = useCallback(() => {
    updateItem(inputId, { x: position.x, y: position.y })
    setDragging(false)
    if (!isSelected(inputId)) {
      select(inputId)
    }
  }, [position])

  const handleClickDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateItem(inputId, {
        value: true,
      })
    },
    [inputId, value, updateItem]
  )

  const handleClickUp = useCallback(() => {
    updateItem(inputId, {
      value: false,
    })
  }, [inputId, value, updateItem])

  useEffect(() => {
    if (dragging) {
      setHolding(true)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      setHolding(false)
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dragging])

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none'
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
        <div
          className="flex flex-col items-start justify-center"
          style={{
            gridColumn: '3 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          <div className="relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
            <div className="pointer-events-auto z-[1] order-2" style={{ lineHeight: 0 }}>
              <svg
                style={{
                  overflow: 'visible',
                  width: '12.5px',
                  height: '12.5px',
                }}
                className="pointer-events-none transition-transform hover:scale-[1.2]"
              >
                <circle
                  className="pointer-events-auto"
                  cx="6.5"
                  cy="6.5"
                  r="6"
                  stroke={input.settings.color || '#000'}
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
                      fromTerminal: 'output',
                    })
                  }}
                ></circle>
              </svg>
            </div>
            <div
              className="order-1 h-[2px] min-w-4 grow"
              style={{
                backgroundColor: input.settings.color || '#000',
              }}
            ></div>
          </div>
        </div>
        <div
          className={cn(
            'flex min-h-[42px] w-[42px] min-w-[42px] items-center justify-center border-2 bg-white transition-[filter] duration-100'
          )}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
            filter: isSelected(inputId) ? 'drop-shadow(0px 0px 3px #0079db)' : 'none',
            borderColor: input.settings.color || '#000',
          }}
        >
          <div
            className="pointer-events-auto flex h-full w-full items-center justify-center"
            onMouseDown={handleClickDown}
            onMouseUp={handleClickUp}
            onMouseLeave={handleClickUp}
            data-logicate-body
          >
            <svg
              style={{ overflow: 'visible', width: '30px', height: '30px' }}
              className={cn('pointer-events-none')}
              data-logicate-input-content
            >
              <g>
                <circle
                  className={cn('pointer-events-auto', {
                    'fill-current': value === true,
                  })}
                  style={{
                    color: (input.settings.color || '#000').startsWith('#000')
                      ? '#6c92e4'
                      : lighterColour(input.settings.color || '#6c92e4', 10) || '#6c92e4',
                  }}
                  fill="#FFFFFF"
                  stroke={darkerColour(input.settings.color || '#000', 70) || '#000'}
                  cx="15"
                  cy="15"
                  r="15"
                  data-logicate-input-content
                ></circle>
                <circle
                  className="cursor-pointer"
                  fill="#FFFFFF"
                  stroke={darkerColour(input.settings.color || '#000', 70) || '#000'}
                  strokeWidth="1"
                  cx="15"
                  cy="15"
                  r="11"
                  data-logicate-input-content
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
})
