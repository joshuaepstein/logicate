import { cn } from '@logicate/ui';
import { useNode } from './hooks/useNode';

type WireType = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  isActive: boolean;
  type: 'normal';
};

type WireTypeAlt = {
  start: {
    id: string;
    node_index: number;
  };
  end: {
    id: string;
    node_index: number;
  };
  isActive: boolean;
  type: 'alt';
};

type WireProps = WireType | WireTypeAlt;

export const Wire = (props: WireProps) => {
  if (props.type === 'normal') {
    const { start, end, isActive } = props;

    return (
      <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" data-logicate-signal={isActive}>
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          // stroke={isActive ? "#4CAF50" : "#9E9E9E"}
          // strokeWidth="2"
          // fill="none"
          stroke="black"
          fill="none"
          strokeWidth="6"
        />
        <path
          d={`
              M ${start.x},${start.y}
              C ${start.x + (end.x - start.x) / 2},${start.y}
                ${start.x + (end.x - start.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
          strokeWidth="4"
          fill="none"
          className={cn('stroke-current text-white', {
            'text-white': !isActive,
            'text-[#1b88e7]': isActive,
          })}
        />
      </svg>
    );
  } else {
    const { start, end, isActive } = props;
    const startNode = useNode(start.id);
    const endNode = useNode(end.id);

    if (!startNode || !endNode) return null;

    return (
      <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" data-logicate-signal={isActive}>
        <path
          d={`
              M ${startNode.x},${startNode.y}
              C ${startNode.x + (endNode.x - startNode.x) / 2},${startNode.y}
                ${startNode.x + (endNode.x - startNode.x) / 2},${endNode.y}
                ${endNode.x},${endNode.y}
              `}
          // stroke={isActive ? "#4CAF50" : "#9E9E9E"}
          // strokeWidth="2"
          // fill="none"
          stroke="black"
          fill="none"
          strokeWidth="6"
          style={{
            pointerEvents: 'visible',
          }}
          // TODO: Onclick should select the wire
        />
        <path
          d={`
              M ${startNode.x},${startNode.y}
              C ${startNode.x + (endNode.x - startNode.x) / 2},${startNode.y}
                ${startNode.x + (endNode.x - startNode.x) / 2},${endNode.y}
                ${endNode.x},${endNode.y}
              `}
          strokeWidth="4"
          fill="none"
          className={cn('stroke-current text-white', {
            'text-white': !isActive,
            'text-[#1b88e7]': isActive,
          })}
        />
      </svg>
    );
  }
};
