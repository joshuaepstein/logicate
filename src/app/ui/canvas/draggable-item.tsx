import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { GateType, gateTypeToIcon } from './node/gates/types'
import { inputTypeToIcon } from './node/inputs/types'
import { NodeType } from './node/type'
import AndBody from './node/gates/and/body'
import { outputTypeToIcon } from './node/outputs/types'
import OrBody from './node/gates/or/body'
import XorBody from './node/gates/xor/body'
import BufferBody from './node/gates/buffer/body'
import { TemporaryGate } from './node/gates/temporary'

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
          {/* <div
            className="size-6"
            style={{
              backgroundImage: `url(${type.type === 'gate' ? gateTypeToIcon[type.node] : type.type === 'input' ? inputTypeToIcon[type.node] : outputTypeToIcon[type.node]})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          /> */}

          {(() => {
            switch (type.type) {
              case 'gate':
                // switch for each gate type to display the body for each
                switch (type.node) {
                  case GateType.AND:
                    return (
                      <TemporaryGate
                        type={GateType.AND}
                        inputs={0}
                        state={null}
                        gateId="draggable_and"
                        x={0}
                        y={0}
                        canvasZoom={1}
                        noAbsolute
                      />
                    )
                  case GateType.OR:
                    return <OrBody />
                  case GateType.XOR:
                    return <XorBody />
                  case GateType.NOT:
                    return <BufferBody />
                  default:
                    return 'hi'
                }
              default:
                return 'hi'
            }
          })()}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type.node}</p>
      </TooltipContent>
    </Tooltip>
  )
}
