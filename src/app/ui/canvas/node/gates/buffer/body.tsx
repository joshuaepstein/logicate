import { GateItem } from '../../../types'

export default function BufferBody({ item }: { item?: GateItem }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      data-logicate-body
      className="min-h-8 w-[33px] select-none"
      width="33"
      height="33"
      style={{
        color: (item && item.settings.color) || '#000',
      }}
    >
      <path
        className="pointer-events-none"
        fill="#fff"
        stroke={(item && item.settings.color) || '#000'}
        strokeLinecap="square"
        strokeMiterlimit="3"
        strokeWidth="2"
        d="M1 31.35V1.6l29.55 14.075L1 31.35Z"
      />
    </svg>
  )
}
