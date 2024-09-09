import { cn } from '@logicate/ui';
import { GateItem } from '../../../types';
import { GateType } from '../../gate';

export default function AndBody({ item }: { item: GateItem }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('min-h-8 w-8 select-none', {
        '-ml-[2px]': item.settings.inputs > 3,
        'w-[38px]': item.type === GateType.OR,
        'w-[40px]': item.type === GateType.XOR || item.type === GateType.XNOR,
      })}
      style={{
        color: item.settings.color || '#000',
      }}
      width="32"
      height="32"
      fill="currentColor"
      data-logicate-body
    >
      <path
        className="pointer-events-none"
        fill="#fff"
        stroke={item.settings.color || '#000'}
        strokeLinecap="round"
        strokeWidth="2"
        d="M1 1h15c4.133 0 7.667 1.467 10.6 4.4C29.533 8.333 31 11.867 31 16s-1.467 7.667-4.4 10.6C23.667 29.533 20.133 31 16 31H1V1Z"
      />
    </svg>
  );
}
