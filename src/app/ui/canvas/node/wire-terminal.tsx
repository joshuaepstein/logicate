import { forwardRef } from 'react'
import useCanvasStore from '../hooks/useCanvasStore'
import { cn } from '@/lib'

export type WireTerminalProps = {
  isInput?: boolean
  isOutput?: boolean
  parentId: string
  index: number
}

export const WireTerminal = forwardRef<SVGSVGElement, WireTerminalProps & React.HTMLAttributes<SVGSVGElement>>(
  ({ isInput, isOutput, parentId, className, index, style, ...rest }, ref) => {
    const { setTemporaryWire, setHolding, wires } = useCanvasStore()
    return (
      <>
        <svg
          style={{
            overflow: 'visible',
            width: '12.5px',
            height: '12.5px',
            ...style,
          }}
          ref={ref}
          className={cn(
            'pointer-events-none',
            {
              'transition-transform hover:scale-[1.2]': true,
              // isInput ? !wires.find((wire) => wire.from.id === parentId && wire.from.node_index === index) : !wires.find((wire) => wire.to.id === parentId && wire.to.node_index === index),
            },
            className
          )}
          {...rest}
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="6"
            stroke="black"
            className="pointer-events-auto"
            strokeWidth="1"
            fill="white"
            data-logicate-node-parent-id={parentId}
            {...(isOutput
              ? {
                  'data-logicate-input-terminal': index,
                  'data-logicate-parent-terminal-index': index,
                  'data-logicate-parent-terminal-type': 'input',
                }
              : {
                  // data-logicate-output-terminal={0}
                  // data-logicate-node-parent-id={gateId}
                  // data-logicate-parent-terminal-index={0}
                  // data-logicate-parent-terminal-type="output"
                  // onMouseDown={(e) => {
                  //   setTemporaryWire({
                  //     from: {
                  //       x: e.clientX,
                  //       y: e.clientY,
                  //     },
                  //     fromId: gateId,
                  //     fromNodeIndex: 0,
                  //     to: {
                  //       x: e.clientX,
                  //       y: e.clientY,
                  //     },
                  //     active: false,
                  //     fromTerminal: 'output',
                  //   })
                  //   setHolding(true)
                  // }}

                  'data-logicate-output-terminal': index,
                  'data-logicate-parent-terminal-index': 0,
                  'data-logicate-parent-terminal-type': 'output',
                  onMouseDown: (e) => {
                    setTemporaryWire({
                      from: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      fromId: parentId,
                      fromNodeIndex: 0,
                      to: {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      active: false,
                      fromTerminal: 'output',
                    })
                    setHolding(true)
                  },
                })}
          ></circle>
        </svg>
      </>
    )
  }
)
