import { forwardRef } from 'react'
import useCanvasStore from '../hooks/useCanvasStore'

export type WireTerminalProps = {
  isInput?: boolean
  isOutput?: boolean
}

export const WireTerminal = forwardRef<SVGSVGElement, WireTerminalProps & React.HTMLAttributes<SVGSVGElement>>(
  ({ isInput, isOutput, style, ...rest }, ref) => {
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
          {...rest}
        >
          <circle cx="6.5" cy="6.5" r="6" stroke="black" className="pointer-events-auto" strokeWidth="1" fill="black"></circle>
        </svg>
      </>
    )
  }
)
