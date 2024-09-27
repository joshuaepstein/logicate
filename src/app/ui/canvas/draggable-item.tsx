import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { GateType, gateTypeToIcon } from './node/gates/types'
import { inputTypeToIcon } from './node/inputs/types'
import { NodeType } from './node/type'
import AndBody from './node/gates/and/body'

export const DraggableItem = ({ type }: { type: NodeType }) => {
  return (
    <Tooltip key={type.node}>
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
              backgroundImage: `url(${type.type === 'gate' ? gateTypeToIcon[type.node] : type.type === 'input' ? inputTypeToIcon[type.node] : ''})`,
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
  )
}
