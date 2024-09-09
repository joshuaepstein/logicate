import { Tooltip, TooltipContent, TooltipTrigger } from '@logicate/ui/tooltip';
import { gateTypeToIcon } from './node';
import { inputTypeToIcon } from './node/inputs';
import { NodeType } from './node/type';

export const DraggableItem = ({ type }: { type: NodeType }) => {
  return (
    <Tooltip key={type.type === 'gate' ? type.node : type.node}>
      <TooltipTrigger asChild>
        <div
          key={type.node}
          className="shadow-hard-soft-2xs aspect-square h-max w-max rounded-sm p-3"
          data-logicate-draggable
          data-logicate-draggable-sidebar
          data-logicate-gate-type-type={type.type}
          data-logicate-type={type.node}
        >
          <div
            className="size-6"
            style={{
              backgroundImage: `url(${type.type === 'gate' ? gateTypeToIcon[type.node] : inputTypeToIcon[type.node]})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type.node}</p>
      </TooltipContent>
    </Tooltip>
  );
};
