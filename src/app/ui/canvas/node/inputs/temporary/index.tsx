import { cn } from '@/lib'
import { forwardRef } from 'react'
import { InputType } from '../types'
import ButtonBody from './button/body'
import SwitchBody from './switch/body'
import ClockBody from './clock/body'
import HighConstantBody from './constant/high/body'
import LowConstantBody from '../constant/low/body'
import VariableBody from '../variable/body'

export type TemporaryInputProps = {
  type: InputType
  inputId: string
}

export const TemporaryInput = forwardRef<
  HTMLDivElement,
  TemporaryInputProps & {
    x: number
    y: number
    canvasZoom: number
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, x, y, inputId, canvasZoom, ...rest }, ref) => {
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
          </div>
        </div>
        <div
          className={cn(
            'flex min-h-[30px] w-[30px] min-w-[42px] items-center justify-center border-2 bg-white transition-[filter] duration-100',
            {
              'size-[42px]':
                type === InputType.BUTTON ||
                type === InputType.HIGH_CONSTANT ||
                type === InputType.LOW_CONSTANT ||
                type === InputType.VARIABLE,
              'h-[52px] w-[42px]': type === InputType.SWITCH,
              'h-[36px] w-[44px]': type === InputType.CLOCK,
            }
          )}
          style={{
            gridColumn: '2 / span 1',
            gridRow: '2 / span 1',
            borderColor: '#000',
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center" data-logicate-body>
            {(() => {
              switch (type) {
                case InputType.BUTTON:
                  return <ButtonBody />
                case InputType.SWITCH:
                  return <SwitchBody />
                case InputType.CLOCK:
                  return <ClockBody />
                case InputType.HIGH_CONSTANT:
                  return <HighConstantBody />
                case InputType.LOW_CONSTANT:
                  return <LowConstantBody />
                case InputType.VARIABLE:
                  return <VariableBody />
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

TemporaryInput.displayName = 'Temporary Logicate Logic Input'
