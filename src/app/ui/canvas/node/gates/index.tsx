import { cn } from '@/lib'
import { cursorInside } from '@/lib/dom-cursor'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import useCanvasStore from '../../hooks/useCanvasStore'
import { useNode } from '../../hooks/useNode'
import AndBody from './and/body'
import { GateItem } from '../../types'
import OrBody from './or/body'
import { createSVGColouredElement as createSVGColouredElementOr } from './or/svg-left-element'
import { createSVGColouredElement as createSVGColouredElementXor } from './xor/svg-left-element'
import { GateType } from './types'
import { defaultInputs } from './constants'
import BufferBody from './buffer/body'
import XorBody from './xor/body'
import { useCookie } from 'react-use'
import { WireTerminal } from '../wire-terminal'

const inverted = [GateType.NOT, GateType.NAND, GateType.NOR, GateType.XNOR]

type GateState = boolean | number | string | null

export type GateProps = {
  type: GateType
  inputs: number
  state: GateState
  gateId: string
}

export const Gate = forwardRef<
  HTMLDivElement,
  GateProps & {
    x: number
    y: number
    simulated: {
      id: string
      state: boolean
    }
    demo: boolean
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, inputs, className, demo = false, x, y, state, gateId, ...rest }, ref) => {
  const { setHolding, canvas, updateItemPosition, setTemporaryWire, setSelectedIds, isSelected } = useCanvasStore()
  const [debug] = useCookie(`debugMode`)
  const item = useNode(gateId) as GateItem
  const isInverted = useMemo(() => {
    return inverted.includes(type)
  }, [type])
  const isOrType = useMemo(() => {
    return type === GateType.OR || type === GateType.NOR
  }, [type])
  const isXorXnorType = useMemo(() => {
    return type === GateType.XOR || type === GateType.XNOR
  }, [type])
  const [position, setPosition] = useState({ x, y })
  const [offset, setOffset] = useState({ x, y })
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      if (target.dataset.logicateBody) {
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
    (event: MouseEvent) => {
      if (dragging) {
        const canvasElement = document.querySelector('[data-logicate-canvas]')
        if (canvasElement) {
          const bounds = canvasElement.getBoundingClientRect()
          if (cursorInside(event, bounds)) {
            setPosition({
              x: event.clientX - offset.x,
              y: event.clientY - offset.y,
            })
            updateItemPosition(gateId, { x: event.clientX - offset.x, y: event.clientY - offset.y })
          }
        }
      }
    },
    [dragging, offset, canvas.zoom]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(false)

    setSelectedIds([gateId])
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
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none transition-opacity duration-100',
          className
        )}
        style={{ left: position.x, top: position.y }}
        tabIndex={-1}
        data-logicate-item={gateId}
        data-logicate-id={gateId}
        data-logicate-type={type}
        data-logicate-inputs={inputs}
        data-logicate-state={state}
        ref={ref}
        {...rest}
        onMouseDown={handleMouseDown}
        data-logicate-dragging={dragging}
        data-logicate-selected={isSelected(gateId)}
      >
        {debug && debug === 'true' && (
          <p className={cn('text-2xs absolute left-[80%] top-full w-full font-semibold text-red-500')} data-logicate-debug-info>
            <span>{gateId}</span>
            <br />
            <span>x: {position.x}</span>
            <br />
            <span>y: {position.y}</span>
            <br />
            <span>dragging: {dragging ? 'true' : 'false'}</span>
            <br />
            <span>state: {state ? 'true' : 'false'}</span>
            <br />
            <span>type: {type}</span>
          </p>
        )}
        <div
          className="flex flex-col items-start justify-center"
          style={{
            gridColumn: '3 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          <div className="relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
            <div className="pointer-events-auto z-[1] order-2" style={{ lineHeight: 0 }}>
              {/* <svg
                style={{
                  overflow: 'visible',
                  width: '12.5px',
                  height: '12.5px',
                }}
                className="pointer-events-auto transition-transform hover:scale-[1.2]"
              >
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="6"
                  stroke={item.settings.color || '#000'}
                  strokeWidth="1"
                  fill="white"
                  data-logicate-output-terminal={0}
                  data-logicate-node-parent-id={gateId}
                  data-logicate-parent-terminal-index={0}
                  data-logicate-parent-terminal-type="output"
                  onMouseDown={(e) => {
                    setTemporaryWire({
                      from: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      fromId: gateId,
                      fromNodeIndex: 0,
                      to: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      active: false,
                      fromTerminal: 'output',
                    })
                    setHolding(true)
                  }}
                />
              </svg> */}
              <WireTerminal isInput index={0} parentId={gateId} />
            </div>
            <div
              className="order-1 h-[2px] min-w-4 grow"
              style={{
                backgroundColor: item.settings.color || '#000',
              }}
            />
            <div
              className={cn('absolute z-[1] -order-1 h-2 w-2 rounded-[50%] border-2 bg-white', {
                hidden: !isInverted,
              })}
              style={{
                borderColor: item.settings.color || '#000',
              }}
            ></div>
          </div>
        </div>
        <div
          className="flex flex-col items-end justify-center"
          style={{
            gridColumn: '1 / span 1',
            gridRow: '2 / span 1',
          }}
        >
          {Array.from({
            // length: inputs > defaultInputs[type] ? inputs : defaultInputs[type],
            length:
              inputs < defaultInputs[type].min
                ? defaultInputs[type].min
                : inputs > defaultInputs[type].max
                  ? defaultInputs[type].max
                  : inputs,
          }).map((_, index) => (
            <div key={index} className="pointer-events-none relative mb-[2.5px] flex w-7 flex-row items-center last-of-type:mb-0">
              <div
                className="relative z-[1]"
                style={{
                  lineHeight: 0,
                }}
              >
                <svg
                  style={{
                    overflow: 'visible',
                    width: '12.5px',
                    height: '12.5px',
                  }}
                  className="pointer-events-auto transition-transform hover:scale-[1.2]"
                  data-logicate-input-terminal={index}
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="6"
                    stroke={item.settings.color || '#000'}
                    strokeWidth="1"
                    fill="white"
                    data-logicate-input-terminal={index}
                    data-logicate-node-parent-id={gateId}
                    data-logicate-parent-terminal-index={index}
                    data-logicate-parent-terminal-type="input"
                  ></circle>
                </svg>
              </div>
              <div
                className={cn('h-[2px] min-w-4 grow', {
                  'mr-px min-w-0': isOrType || isXorXnorType,
                })}
                style={{
                  backgroundColor: item.settings.color || '#000',
                }}
              />
              <div
                className="absolute z-[1] hidden h-2 w-2 rounded-[50%] border-2 bg-white"
                style={{
                  borderColor: item.settings.color || '#000',
                }}
              ></div>
            </div>
          ))}
        </div>
        <div
          className={cn('flex min-h-8 w-8 min-w-[30px] items-center justify-center bg-transparent transition-[filter] duration-100', {
            // "filter-[drop-shadow(0px_0px_3px_#0079db)]": isSelected,
            'border-none': inputs < 4,
            'my-[5.25px] self-stretch border-l-2': inputs > 3 && !isOrType && !isXorXnorType,
            'my-[5.25px] self-stretch bg-repeat-y': inputs > 3 && (isOrType || isXorXnorType),
            '-ml-[4.5px] -mr-px w-[36px]': isOrType,
            '-ml-[9px] -mr-px w-[40px]': isXorXnorType,
          })}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
            filter: isSelected(gateId) ? `drop-shadow(0px 0px 3px #0079db)` : 'none',
            ...(inputs > 3 &&
              isOrType && {
                backgroundImage: `url(${createSVGColouredElementOr(item.settings.color || '#000')})`,
                backgroundPosition: 'center left',
              }),
            ...(inputs > 3 &&
              isXorXnorType && {
                backgroundImage: `url(${createSVGColouredElementXor(item.settings.color || '#000')})`,
                backgroundPosition: 'center left',
              }),
            borderColor: item.settings.color || '#000',
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center">
            {(() => {
              switch (type) {
                case GateType.AND:
                case GateType.NAND:
                  return <AndBody item={item} />
                case GateType.OR:
                case GateType.NOR:
                  return <OrBody item={item} />
                case GateType.BUFFER:
                case GateType.NOT:
                  return <BufferBody item={item} />
                case GateType.XOR:
                case GateType.XNOR:
                  return <XorBody item={item} />
              }
            })()}
          </div>
        </div>
      </div>
    </>
  )
})

Gate.displayName = 'Logicate Logic Gate'
