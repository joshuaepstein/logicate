import { cn } from '@/lib'
import { OutputItem } from '../../../types'

export default function LightOutputBody({
  item,
  simulated,
}: {
  item?: OutputItem
  simulated?: {
    state: boolean
    id: string
  }
}) {
  return (
    <svg
      className="pointer-events-none"
      style={{
        overflow: 'visible',
        width: '37px',
        height: '54px',
      }}
    >
      <defs>
        <radialGradient id={`defaultTheme-light-bulb-gradient-${(item && item.id) || 'unknown'}`}>
          <stop
            style={{
              stopColor: simulated && simulated.state ? '#1b88e7' : '#fff',
            }}
            offset="0%"
          />
          <stop
            style={{
              stopColor: simulated && simulated.state ? '#1b88e7' : '#fff',
            }}
            offset="80%"
          />
        </radialGradient>
      </defs>
      <path
        fill={`url(#defaultTheme-light-bulb-gradient-${(item && item.id) || 'unknown'})`}
        stroke="none"
        d="M 36 18.5 Q 36 11.25 30.85 6.1 25.75 1 18.5 1 11.25 1 6.1 6.1 1 11.25 1 18.5 1 25.75 6.1 30.85 7 31.75 8 32.55 L 8 32 8 32.55 8 42 29 42 29 32.5 29 32 29 32.5 Q 29.95 31.75 30.85 30.85 36 25.75 36 18.5 M 26.75 21 Q 24.05 28.2 21.3 21 18.6 28.2 15.45 21 12.75 28.2 10 21 L 14.75 41.2 10 21 Q 12.75 28.2 15.45 21 18.6 28.2 21.3 21 24.05 28.2 26.75 21 L 22 41.2 26.75 21 Z"
      />
      <path
        fill="#000000"
        stroke="none"
        d="M 7 42.25 Q 7.0001953125 42.620703125 7 43 7.00234375 47.8080078125 10.35 51.1 13.7455078125 54.4990234375 18.5 54.5 23.3068359375 54.4990234375 26.65 51.1 29.9978515625 47.8080078125 30 43 29.9998046875 42.620703125 29.95 42.25 L 7 42.25 Z"
      />
      <path
        stroke="#000000"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        d="M 22 41.2 L 26.75 21 M 10 21 L 14.75 41.2"
      />
      <path
        className={cn('stroke-current text-black', {
          'text-white': simulated && simulated.state,
        })}
        stroke="#000000"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        d="M 26.75 21 Q 24.05 28.2 21.3 21 18.6 28.2 15.45 21 12.75 28.2 10 21"
      />
      <path
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        d="M 8 32.55 Q 7 31.75 6.1 30.85 1 25.75 1 18.5 1 11.25 6.1 6.1 11.25 1 18.5 1 25.75 1 30.85 6.1 36 11.25 36 18.5 36 25.75 30.85 30.85 29.95 31.75 29 32.5 M 29 42 L 8 42"
      />
      <path
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="butt"
        fill="none"
        d="M 29 32.5 L 29 42 M 8 42 L 8 32.55 8 32 M 29 32 L 29 32.5"
      />
    </svg>
  )
}
