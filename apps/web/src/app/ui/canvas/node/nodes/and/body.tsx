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
      width="36"
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
        d="M11.95 1c9.967.2 17.516 5.234 22.65 15-5.134 9.766-12.683 14.8-22.65 15H1.6c1.234-2.567 2.184-5.067 2.85-7.5.2-.667.367-1.333.5-2 .88-3.739.881-7.26 0-11-.133-.667-.3-1.333-.5-2C3.784 6.067 2.834 3.567 1.6 1h10.35Z"
      />
    </svg>
  );
}
