import { cn } from '@logicate/ui'
import { InputItem } from '../../../types'
import { darkerColour, lighterColour } from '@logicate/utils/color'
import useCanvasStore from '../../../hooks/useCanvasStore'
import { useEffect } from 'react'

export default function ClockBody({ input }: { input: InputItem }) {
  const { updateItem } = useCanvasStore()

  useEffect(() => {
    const interval = setInterval(() => {
      updateItem(input.id, {
        value: !input.value,
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [input.id, input.value, updateItem])

  return (
    <svg
      className="pointer-events-auto"
      style={{
        overflow: 'visible',
        width: '29px',
        height: '17px',
      }}
    >
      <path
        stroke={input.value ? '#6c92e4' : '#FFFFFF'}
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit="3"
        fill="none"
        d="M 26.5 16 L 26.5 6 M 2.5 11 L 2.5 1 M 4 2.5 L 16 2.5 M 14.5 4 L 14.5 13 M 13 14.5 L 25 14.5"
      ></path>
      <path
        stroke="#000000"
        strokeWidth="1"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit="3"
        fill="none"
        d="M 28.5 6 L 28.5 16 M 24.5 6 L 24.5 12 M 24 5.5 L 29 5.5 M 16.5 1 L 16.5 12 M 0 11.5 L 5 11.5 M 0.5 11 L 0.5 1 M 4.5 5 L 4.5 11 M 0 0.5 L 17 0.5 M 4 4.5 L 13 4.5 M 12.5 5 L 12.5 16 M 16 12.5 L 25 12.5 M 12 16.5 L 29 16.5"
      ></path>
    </svg>
  )
}
