import { cn } from '@logicate/ui'

export default function SwitchBody() {
  return (
    <svg
      className="pointer-events-auto"
      style={{
        overflow: 'visible',
        width: '28px',
        height: '36px',
      }}
    >
      <g>
        <g>
          <path
            className={cn('pointer-events-auto', {})}
            fill={'#FFFFFF'}
            stroke="none"
            d={
              'M 28.5 0.5 L 0.5 0.5 0.5 36.5 28.5 36.5 28.5 0.5 M 27 6.55 L 24.5 18.5 24.5 33.5 4.5 33.5 4.5 18.5 2 6.55 2 6.5 2.05 6.45 3.5 3.5 25.2 3.5 25.25 3.5 27 6.55 Z'
            }
          />
          <path
            stroke={'#000'}
            strokeWidth="1"
            strokeLinejoin="miter"
            strokeLinecap="butt"
            strokeMiterlimit="3"
            fill="none"
            d="M 0.5 0.5 L 28.5 0.5 28.5 36.5 0.5 36.5 0.5 0.5 Z"
          />
        </g>
        <g className="origin-[0px_0px] cursor-pointer">
          <path
            fill="#FFFFFF"
            stroke="none"
            d={
              'M 24.5 33.5 L 24.5 18.5 4.5 18.5 4.5 33.5 24.5 33.5 M 27 6.55 L 25.25 3.5 25.2 3.5 3.5 3.5 2.05 6.45 2 6.5 2 6.55 27 6.55 M 24.5 18.5 L 27 6.55 2 6.55 4.5 18.5 24.5 18.5 Z'
            }
          />
          <path
            stroke={'#000'}
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d={
              'M 25.25 3.5 L 27 6.55 24.5 18.5 24.5 33.5 4.5 33.5 4.5 18.5 2 6.55 2 6.5 M 2.05 6.45 L 3.5 3.5 25.2 3.5 M 27 6.55 L 2 6.55 M 24.5 18.5 L 4.5 18.5'
            }
          />
        </g>
      </g>
    </svg>
  )
}
