import { cn } from '@logicate/ui'
import { forwardRef, useMemo } from 'react'
import { GateType, gateTypeToIcon } from './types'
import { defaultInputs, inverted } from './constants'
import AndBody from './and/body'
import OrBody from './or/body'
import { GateItem } from '../../types'
import BufferBody from './buffer/body'
import XorBody from './xor/body'

type GateState = boolean | number | string | null

export type TemporaryGateProps = {
  type: GateType
  inputs: number
  state: GateState
  gateId: string
}

export const TemporaryGate = forwardRef<
  HTMLDivElement,
  TemporaryGateProps & {
    x: number
    y: number
    canvasZoom: number
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, inputs, x, y, state, gateId, canvasZoom, ...rest }, ref) => {
  const isInverted = useMemo(() => {
    return inverted.includes(type)
  }, [type])
  const isOrType = useMemo(() => {
    return type === GateType.OR || type === GateType.NOR
  }, [type])
  const isXorXnorType = useMemo(() => {
    return type === GateType.XOR || type === GateType.XNOR
  }, [type])
  const temporaryItem: GateItem = {
    id: 'temporary_item-' + gateId,
    inputs: [],
    itemType: 'gate',
    outputs: [],
    settings: {
      inputs,
    },
    type,
    x,
    y,
  }

  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute grid w-auto origin-top-left cursor-default select-none items-center justify-center outline-none'
        )}
        style={{ left: x, top: y, transform: `scale(${canvasZoom})` }}
        tabIndex={-1}
        ref={ref}
        data-logicate-temporary-dragging-node
        data-logicate-temporary_node_id={gateId}
        {...rest}
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
                className="pointer-events-auto transition-transform hover:scale-[1.2]"
              >
                <circle cx="6.5" cy="6.5" r="6" stroke="black" strokeWidth="1" fill="white"></circle>
              </svg>
            </div>
            <div className="order-1 h-[2px] min-w-4 grow bg-black"></div>
            <div
              className={cn('absolute z-[1] -order-1 h-2 w-2 rounded-[50%] border-2 border-black bg-white', {
                hidden: !isInverted,
              })}
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
            length:
              // either the inputs or the default inputs (if inputs is less than defaultInputs[type])
              Math.max(inputs, defaultInputs[type].default),
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
                  <circle cx="6.5" cy="6.5" r="6" stroke="black" strokeWidth="1" fill="white"></circle>
                </svg>
              </div>
              <div className="h-[2px] min-w-4 grow bg-black"></div>
              <div className="absolute z-[1] hidden h-2 w-2 rounded-[50%] border-2 border-black bg-white"></div>
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
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center">
            {/* <span
              className={cn('min-h-8 w-8 bg-no-repeat', {
                '-ml-[2px]': inputs > 3,
                'w-[38px]': isOrType,
                'w-[40px]': isXorXnorType,
              })}
              style={{
                backgroundImage: `url(${gateTypeToIcon[type]})`,
              }}
              data-logicate-body
            /> */}
            {(() => {
              switch (type) {
                case GateType.AND:
                case GateType.NAND:
                  return <AndBody item={temporaryItem} />
                case GateType.OR:
                case GateType.NOR:
                  return <OrBody item={temporaryItem} />
                case GateType.BUFFER:
                case GateType.NOT:
                  return <BufferBody item={temporaryItem} />
                case GateType.XOR:
                case GateType.XNOR:
                  return <XorBody item={temporaryItem} />
              }
            })()}
          </div>
        </div>
      </div>
    </>
  )
})

TemporaryGate.displayName = 'Temporary Logicate Logic Gate'
