import { cn } from '@logicate/ui'
import { InputItem } from '../../../types'
import { darkerColour, lighterColour } from '@logicate/utils/color'
import { MouseEvent, useCallback } from 'react'
import useCanvasStore from '../../../hooks/useCanvasStore'

export default function ButtonBody({ input }: { input: InputItem }) {
  const { updateItem } = useCanvasStore()

  const handleClickDown = useCallback(() => {
    updateItem(input.id, {
      value: true,
    })
  }, [input.id, input.value, updateItem])

  const handleClickUp = useCallback(() => {
    updateItem(input.id, {
      value: false,
    })
  }, [input.id, input.value, updateItem])

  return (
    <svg
      style={{ overflow: 'visible', width: '30px', height: '30px' }}
      className={cn('pointer-events-auto')}
      onMouseDown={handleClickDown}
      onMouseUp={handleClickUp}
      data-logicate-input-content
    >
      <g>
        <circle
          className={cn('pointer-events-auto', {
            'fill-current': input.value === true,
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
  )
}
