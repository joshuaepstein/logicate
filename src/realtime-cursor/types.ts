import { DOMAttributes } from "react"
import { SocketOptions } from "socket.io-client"

export type SocketIOApp = {
  url: string
  options?: SocketOptions
  roomId: string
  userId: string
}

export type CursorData = {
  id: string
  x: number
  y: number
  offsetX: number
  offsetY: number
  ratioX: number
  ratioY: number
  userName?: string
  comment?: string
}

export type CursorChangeEvent = Omit<CursorData, "offsetX" | "offsetY"> & {
  roomId: string
  ratioX: number
  ratioY: number
}

export type CursorHandler = {
  initialize: (
    handleCursor: (eventName: string, userId: string | null, data: any) => void,
    onReceiveSocketInfo: (data: { socketId: string }) => void
  ) => void
  onCursorPositionChanged: (event: CursorChangeEvent) => void
  disconnect: () => void
}

export type MouseEvents<T> = Pick<
  DOMAttributes<T>,
  | "onAuxClick"
  | "onAuxClickCapture"
  | "onClick"
  | "onClickCapture"
  | "onContextMenu"
  | "onContextMenuCapture"
  | "onDoubleClick"
  | "onDoubleClickCapture"
  | "onDrag"
  | "onDragCapture"
  | "onDragEnd"
  | "onDragEndCapture"
  | "onDragEnter"
  | "onDragEnterCapture"
  | "onDragExit"
  | "onDragExitCapture"
  | "onDragLeave"
  | "onDragLeaveCapture"
  | "onDragOver"
  | "onDragOverCapture"
  | "onDragStart"
  | "onDragStartCapture"
  | "onDrop"
  | "onDropCapture"
  | "onMouseDown"
  | "onMouseDownCapture"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onMouseMoveCapture"
  | "onMouseOut"
  | "onMouseOutCapture"
  | "onMouseOver"
  | "onMouseOverCapture"
  | "onMouseUp"
  | "onMouseUpCapture"
>
