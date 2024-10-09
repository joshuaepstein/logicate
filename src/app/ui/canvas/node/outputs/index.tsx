import { cn } from '@/lib'
import { cursorInside } from '@/lib/dom-cursor'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import useCanvasStore from '../../hooks/useCanvasStore'
import { InputItem, OutputItem } from '../../types'
import { darkerColour, lighterColour } from '@/lib/color'
import { OutputType } from './types'
import LightOutputBody from './light/body'

export type OutputProps = {
  type: OutputType
  outputId: string
  value: boolean
}

export const Output = forwardRef<
  HTMLDivElement,
  OutputProps & {
    x: number
    y: number
    simulated: {
      id: string
      state: boolean
    }
    output: OutputItem
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, x, y, output, outputId, className, value, simulated, ...rest }, ref) => {
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
  const [position, setPosition] = useState({ x, y })
  const [offset, setOffset] = useState({ x, y })
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      if (target.dataset.logicateBody || target.dataset.logicateOutputContent) {
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
            updateItemPosition(outputId, { x: e.clientX - offset.x, y: e.clientY - offset.y })
          }
        }
      }
    },
    [dragging, offset, canvas.zoom]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(false)
    setSelectedIds([outputId])
  }, [position])

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
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none',
          className
        )}
        style={{ left: position.x, top: position.y }}
        tabIndex={-1}
        data-logicate-item={outputId}
        data-logicate-id={outputId}
        data-logicate-type={type}
        data-logicate-state={value}
        {...rest}
        onMouseDown={handleMouseDown}
        data-logicate-dragging={dragging}
        data-logicate-selected={isSelected(outputId)}
        data-logicate-simulated={simulated.state}
      >
        {output.type === OutputType.LIGHT ? (
          <div
            className="flex flex-row items-start justify-center"
            style={{
              gridColumn: '2 / span 1',
              gridRow: '3 / span 1',
            }}
          >
            <div className="relative mb-[2.5px] flex h-7 flex-col items-center last-of-type:mb-0">
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
                    stroke={output.settings.color || '#000'}
                    strokeWidth="1"
                    fill="white"
                    data-logicate-output-terminal={0}
                    data-logicate-node-parent-id={outputId}
                    data-logicate-parent-terminal-index={0}
                    data-logicate-parent-terminal-type="input"
                  ></circle>
                </svg>
              </div>
              <div
                className="order-1 min-h-4 w-[2px] grow"
                style={{
                  backgroundColor: output.settings.color || '#000',
                }}
              ></div>
            </div>
          </div>
        ) : (
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
                    stroke={output.settings.color || '#000'}
                    strokeWidth="1"
                    fill="white"
                    data-logicate-input-terminal={0}
                    data-logicate-node-parent-id={outputId}
                    data-logicate-parent-terminal-index={0}
                    data-logicate-parent-terminal-type="input"
                  ></circle>
                </svg>
              </div>
              <div
                className="order-1 h-[2px] min-w-4 grow"
                style={{
                  backgroundColor: output.settings.color || '#000',
                }}
              ></div>
            </div>
          </div>
        )}
        <div
          className={cn(
            'flex min-h-[30px] w-[30px] min-w-[42px] items-center justify-center border-2 bg-white transition-[filter] duration-100',
            {
              'min-h-[30px] min-w-[30px] border-none bg-[none]': type === OutputType.LIGHT,
            }
          )}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
            filter: isSelected(outputId) ? 'drop-shadow(0px 0px 3px #0079db)' : 'none',
            borderColor: output.settings.color || '#000',
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center" data-logicate-body>
            {(() => {
              switch (type) {
                case OutputType.LIGHT:
                  return <LightOutputBody item={output} simulated={simulated} />
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
