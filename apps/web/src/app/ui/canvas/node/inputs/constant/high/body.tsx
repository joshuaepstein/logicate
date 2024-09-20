import { cn } from '@logicate/ui'
import { InputItem } from '../../../../types'
import { darkerColour, lighterColour } from '@logicate/utils/color'
import { MouseEvent, useCallback } from 'react'
import useCanvasStore from '../../../../hooks/useCanvasStore'

export default function HighConstantBody({ input }: { input: InputItem }) {
  const { updateItem } = useCanvasStore()

  return (
    <svg
      width="10"
      height="21"
      viewBox="0 0 10 21"
      style={{ overflow: 'visible', width: '10px', height: '21px' }}
      className={cn('pointer-events-none flex items-center justify-center')}
      data-logicate-input-content
    >
      <path
        d="M4.3 6.1H0V2.75L1.85 2.65C2.48333 2.58333 3 2.45 3.4 2.25C3.86667 2.01667 4.21667 1.71667 4.45 1.35C4.68333 0.983333 4.81667 0.533333 4.85 0H9.4V21H4.3V6.1Z"
        fill="black"
      />
    </svg>
  )
}
