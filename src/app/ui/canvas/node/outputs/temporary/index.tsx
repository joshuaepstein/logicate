import { cn } from '@/lib'
import { forwardRef } from 'react'
import { OutputType, outputTypeToIcon } from '../types'
import LightBody from '../light/body'
import { InputType } from '../../inputs/types'
import { OutputItem } from '../../../types'
import { randomid } from '@/lib/id'
import { WireTerminal } from '../../wire-terminal'

export type TemporaryOutputProps = {
  type: OutputType
  outputId: string
}

export const TemporaryOutput = forwardRef<
  HTMLDivElement,
  TemporaryOutputProps & {
    x: number
    y: number
    canvasZoom: number
  } & React.HTMLAttributes<HTMLDivElement>
>(({ type, x, y, outputId, canvasZoom, ...rest }, ref) => {
  const output: OutputItem = {
    type: type,
    id: outputId,
    inputs: [],
    itemType: 'output',
    settings: {},
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
        {...rest}
      >
        {type === OutputType.LIGHT && (
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
                  <circle className="pointer-events-auto" cx="6.5" cy="6.5" r="6" strokeWidth="1" stroke="black" fill="white" />
                </svg>
              </div>
              <div
                className="order-1 min-h-4 w-[2px] grow"
                style={{
                  backgroundColor: '#000',
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
            borderColor: '#000',
          }}
        >
          <div className="pointer-events-auto flex h-full w-full items-center justify-center" data-logicate-body>
            {(() => {
              switch (type) {
                case OutputType.LIGHT:
                  return <LightBody />
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

TemporaryOutput.displayName = 'Temporary Logicate Logic Output'
