import { cn } from '@logicate/ui'
import { useNode } from './hooks/useNode'
import { Wire as WireItemType } from './types'
import useCanvasStore from './hooks/useCanvasStore'
import { useCallback, useEffect, useState } from 'react'

type WireType = {
  start: { x: number; y: number }
  end: { x: number; y: number }
  isActive: boolean
  type: 'normal'
}

type WireTypeAlt = {
  start: {
    id: string
    node_index: number
  }
  end: {
    id: string
    node_index: number
  }
  isActive: boolean
  type: 'alt'
}

type WireProps = WireType | WireTypeAlt

export const Wire = (props: WireProps) => {
  if (props.type === 'normal') {
    const { start, end, isActive } = props

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
    )
  } else {
    const { start, end, isActive } = props
    const startNode = useNode(start.id)
    const endNode = useNode(end.id)

    if (!startNode || !endNode) return null

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
    )
  }
}

export const ConnectionWire = ({
  wire,
  simulatedWires = [],
}: {
  wire: WireItemType
  simulatedWires: {
    id: string
    active: boolean
  }[]
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
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
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
        className={cn({
          'filter-[drop-shadow(0px_0px_3px_#0079db)]': isSelected(id),
        })}
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
  /*
  data-logicate-parent-terminal-index={index}
    data-logicate-parent-terminal-type="input"
  */
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
