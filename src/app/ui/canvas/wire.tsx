import { cn } from '@/lib'
import { useNode } from './hooks/useNode'
import { Wire as WireItemType } from './types'
import useCanvasStore from './hooks/useCanvasStore'
import { useCallback, useEffect, useState } from 'react'

type WireType = {
  start: { x: number; y: number; fromId: string; fromIndex: number; fromTerminal: 'input' | 'output' }
  end: { x: number; y: number }
  isActive: boolean
  type: 'normal'
}

export const Wire = (props: WireType) => {
  const { items } = useCanvasStore()
  const { start, end, isActive } = props

  const startWireTerminal = getWireTerminalLocation(start.fromId, start.fromIndex, start.fromTerminal)
  if (!startWireTerminal) return
  const startnode = {
    x: startWireTerminal.getBoundingClientRect().x + startWireTerminal.getBoundingClientRect().width / 2,
    y: startWireTerminal.getBoundingClientRect().y + startWireTerminal.getBoundingClientRect().height / 2,
  }

  return (
    <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" data-logicate-signal={isActive}>
      <path
        d={`
              M ${startnode.x},${startnode.y}
              C ${startnode.x + (end.x - startnode.x) / 2},${startnode.y}
                ${startnode.x + (end.x - startnode.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
        stroke="black"
        fill="none"
        strokeWidth="6"
      />
      <path
        d={`
              M ${startnode.x},${startnode.y}
              C ${startnode.x + (end.x - startnode.x) / 2},${startnode.y}
                ${startnode.x + (end.x - startnode.x) / 2},${end.y}
                ${end.x},${end.y}
              `}
        strokeWidth="4"
        fill="none"
        className={cn('stroke-current text-white', {
          'text-white': !isActive,
          'text-[#1b88e7]': isActive,
          'text-red-700': items.length === 1,
        })}
      />
    </svg>
  )
}

export const ConnectionWire = ({
  wire,
  simulatedWires = [],
  className = '',
}: {
  wire: WireItemType
  simulatedWires: {
    id: string
    active: boolean
  }[]
  className?: string
}) => {
  const { items, wires, isSelected, selectWireId, unselectWireId } = useCanvasStore()
  const { from, to, active, id } = wire
  const canvas = useCanvasElement()
  const startNode = useNode(from.id)
  const endNode = useNode(to.id)
  const [start, setStart] = useState<{
    center: {
      x: number
      y: number
    }
  }>({
    center: {
      x: 0,
      y: 0,
    },
  })
  const [end, setEnd] = useState<{
    center: {
      x: number
      y: number
    }
  }>({
    center: {
      x: 0,
      y: 0,
    },
  })

  const updateWirePositions = useCallback(() => {
    const startWireTerminal = getWireTerminalLocation(from.id, from.node_index, 'output')
    const endWireTerminal = getWireTerminalLocation(to.id, to.node_index, 'input')

    if (!startWireTerminal || !endWireTerminal || !canvas) return
    setStart({
      center: {
        x:
          startWireTerminal.getBoundingClientRect().x -
          canvas.getBoundingClientRect().left +
          startWireTerminal.getBoundingClientRect().width / 2,
        y:
          startWireTerminal.getBoundingClientRect().y -
          canvas.getBoundingClientRect().top +
          startWireTerminal.getBoundingClientRect().height / 2,
      },
    })
    setEnd({
      center: {
        x:
          endWireTerminal.getBoundingClientRect().x -
          canvas.getBoundingClientRect().left +
          endWireTerminal.getBoundingClientRect().width / 2,
        y:
          endWireTerminal.getBoundingClientRect().y -
          canvas.getBoundingClientRect().top +
          endWireTerminal.getBoundingClientRect().height / 2,
      },
    })
  }, [])

  useEffect(() => {
    updateWirePositions()
  }, [updateWirePositions, items, wire, canvas])

  if (!canvas || !startNode || !endNode) return null

  return (
    <svg
      className={cn('pointer-events-auto absolute left-0 top-0 overflow-visible transition-colors duration-100', className)}
      key={id}
      data-logicate-wire={id}
      data-logicate-signal={active}
    >
      <path
        d={`
              M ${start.center.x},${start.center.y}
              C ${start.center.x + (end.center.x - start.center.x) / 2},${start.center.y}
                ${start.center.x + (end.center.x - start.center.x) / 2},${end.center.y}
                ${end.center.x},${end.center.y}
              `}
        stroke="black"
        fill="none"
        strokeWidth="6"
        style={{
          ...(isSelected(id) && {
            filter: 'drop-shadow(0px 0px 3px #0079db)',
          }),
        }}
      />
      <path
        d={`
              M ${start.center.x},${start.center.y}
              C ${start.center.x + (end.center.x - start.center.x) / 2},${start.center.y}
                ${start.center.x + (end.center.x - start.center.x) / 2},${end.center.y}
                ${end.center.x},${end.center.y}
              `}
        strokeWidth="4"
        fill="none"
        className={cn('pointer-events-auto stroke-current text-white', {
          'text-white': !simulatedWires.find((wire) => wire.id === id)?.active,
          'text-[#1b88e7]': simulatedWires.find((wire) => wire.id === id)?.active,
        })}
        onClick={() => {
          if (isSelected(id)) {
            unselectWireId(id)
          } else {
            selectWireId(id)
          }
        }}
      />
    </svg>
  )
}

const getWireTerminalLocation = (id: string, index: number, pos: 'input' | 'output') => {
  const { items } = useCanvasStore.getState()
  const item = items.find((item) => item.id === id)
  if (!item) return null
  const htmlElement = document.querySelector(`[data-logicate-item="${id}"]`) as HTMLElement
  if (!htmlElement) return null
  const terminal = htmlElement.querySelector(
    `[data-logicate-parent-terminal-index="${index}"][data-logicate-parent-terminal-type="${pos}"]`
  )
  return terminal
}

const useCanvasElement = () => {
  const element = document.querySelector('[data-logicate-canvas]') as HTMLElement
  if (!element) return null
  return element
}
