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
import useCanvasStore from './hooks/useCanvasStore'

export const DraggableItem = ({
  type,
  draggingNewElement,
  setDraggingNewElement,
}: {
  type: NodeType
  setDraggingNewElement: (
    element: {
      type: NodeType
      x: number
      y: number
      hidden: boolean
    } | null
  ) => void
  draggingNewElement: {
    type: NodeType
    x: number
    y: number
    hidden: boolean
  } | null
}) => {
  const { isHolding, setHolding } = useCanvasStore()

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
          onMouseDown={(e) => {
            if (e.buttons === 1) {
              // Left mouse button
              const startX = e.clientX
              const startY = e.clientY

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = Math.abs(moveEvent.clientX - startX)
                const deltaY = Math.abs(moveEvent.clientY - startY)

                setDraggingNewElement({
                  type: type,
                  x: moveEvent.clientX,
                  y: moveEvent.clientY,
                  hidden: true,
                })
                setHolding(true)
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
              }

              document.addEventListener('mousemove', handleMouseMove)
              document.addEventListener('mouseup', handleMouseUp)
            }
          }}
        >
          <div
            className="size-6"
            style={{
              backgroundImage: `url(${type.type === 'gate' ? gateTypeToIcon[type.node] : type.type === 'input' ? inputTypeToIcon[type.node] : outputTypeToIcon[type.node]})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />

          {/* {(() => {
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
          })()} */}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type.node}</p>
      </TooltipContent>
    </Tooltip>
  )
}
