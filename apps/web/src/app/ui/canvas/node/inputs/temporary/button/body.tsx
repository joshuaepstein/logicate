import { cn } from '@logicate/ui'

export default function ButtonBody() {
  return (
    <svg style={{ overflow: 'visible', width: '30px', height: '30px' }} className={cn('pointer-events-auto')} data-logicate-input-content>
      <g>
        <circle
          className={cn('pointer-events-auto', {})}
          style={{
            color: '#000',
          }}
          fill="#FFFFFF"
          stroke={'#000'}
          cx="15"
          cy="15"
          r="15"
          data-logicate-input-content
        ></circle>
        <circle
          className="cursor-pointer"
          fill="#FFFFFF"
          stroke={'#000'}
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
