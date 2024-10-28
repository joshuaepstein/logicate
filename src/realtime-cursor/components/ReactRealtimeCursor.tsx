import { useEffect, useState } from "react"
import { useCursors } from "../hooks/useCursors"
import { useScrollPosition } from "../hooks/useScrollPosition"
import { createHandler } from "../libs/handler"
import { CursorHandler, MouseEvents, SocketIOApp } from "../types"
import { Cursors, CursorsProps } from "./Cursors"

type Props = MouseEvents<HTMLDivElement> & {
  socketIOApp: SocketIOApp
  cursors?: {
    me?: {
      visible?: boolean
    }
  }
} & Omit<CursorsProps, "currentUserId" | "cursorHandler" | "scrollPosition" | "cursorsOption" | "cursors" | "roomId">

export function ReactRealtimeCursor({ socketIOApp, cursors: cursorsOption = { me: { visible: true } }, ...props }: Props) {
  const [socketInfo, setSocketInfo] = useState<{
    socketId: string
  }>()
  const { cursors, handleCursor } = useCursors()
  const [handler, setHandler] = useState<CursorHandler>()

  const onReceiveSocketInfo = (data: { socketId: string }) => {
    setSocketInfo(data)
  }

  useEffect(() => {
    const socketHandler = createHandler(socketIOApp)
    setHandler(socketHandler)

    return () => {
      socketHandler.disconnect()
    }
  }, [socketIOApp])

  useEffect(() => {
    handler?.initialize(handleCursor, onReceiveSocketInfo)
  }, [handler, handleCursor, onReceiveSocketInfo])

  const { scrollPosition } = useScrollPosition()

  return (
    <Cursors
      {...props}
      cursors={cursors}
      cursorsOption={cursorsOption}
      currentUserId={socketIOApp.userId}
      scrollPosition={scrollPosition}
      cursorHandler={handler}
      roomId={socketIOApp.roomId}
    />
  )
}
