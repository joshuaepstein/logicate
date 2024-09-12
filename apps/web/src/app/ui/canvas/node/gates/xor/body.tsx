import { cn } from '@logicate/ui'
import { GateItem } from '../../../types'

export default function XorBody({ item }: { item: GateItem }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="32"
      fill="none"
      className={cn('min-h-8 w-[42px] select-none')}
      style={{
        color: item.settings.color || '#000',
      }}
      data-logicate-body
    >
      <path
        className="pointer-events-none"
        fill={item.settings.color || '#000'}
        fillRule="evenodd"
        d="m2.487 0 .438.911C4.152 3.462 5.101 5.957 5.77 8.396c.202.673.371 1.347.506 2.024 1.105 5.026 1.01 9.757-.314 14.172l-.006.022-.7 2.001-.011.026a27.415 27.415 0 0 1-2.383 4.512L2.309 32 .615 30.896l.552-.847a25.405 25.405 0 0 0 2.197-4.155l.667-1.905c1.208-4.04 1.308-8.415.268-13.144l-.002-.01-.002-.01a20.288 20.288 0 0 0-.466-1.86l-.003-.012-.003-.012c-.633-2.31-1.538-4.695-2.72-7.154L.665.876 2.487 0Z"
        clipRule="evenodd"
      />

      <path
        className="pointer-events-none"
        fill="#fff"
        stroke={item.settings.color || '#000'}
        strokeLinecap="round"
        strokeWidth="2"
        d="M17.75 1c9.967.2 17.516 5.184 22.65 14.95-4.367 10.1-12.05 15.1-23.05 15H7.4a27.115 27.115 0 0 0 2.35-4.45l.7-2c1.3-4.333 1.4-9 .3-14-.133-.667-.3-1.333-.5-2C9.584 6.067 8.634 3.567 7.4 1h10.35Z"
      />
    </svg>
  )
}
