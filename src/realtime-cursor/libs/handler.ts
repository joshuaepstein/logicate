import { io } from "socket.io-client"
import { CursorChangeEvent, CursorHandler, SocketIOApp } from "../types"

export const createHandler = (app: SocketIOApp): CursorHandler => {
  const { url, options, roomId, userId } = app
  const socket = io(url, options)

  // Join the specified room
  socket.emit("joinRoom", {
    roomId,
    userId,
  })

  const initialize = (
    handleCursor: (eventName: string, userId: string | null, data: any) => void,
    onReceiveSocketInfo: (data: { socketId: string }) => void
  ) => {
    socket.on("cursorPos", (data: CursorChangeEvent) => {
      if (data.id !== userId) {
        // Only handle cursor position changes for other users
        handleCursor("change", data.id, data)
      }
    })

    socket.on("connect_error", (err) => {
      console.error("Socket.IO Connection Error:", err)
    })

    socket.on("userLeft", (data: { roomId: string; userId: string }) => {
      // userId is a socket id
      handleCursor("remove", data.userId, null)
    })

    socket.on("connect", () => {
      onReceiveSocketInfo({ socketId: socket.id ?? "" })
    })
  }

  const onCursorPositionChanged = (event: CursorChangeEvent) => {
    socket.emit("cursorPos", event)
  }

  const disconnect = () => {
    socket.disconnect()
  }

  return { initialize, onCursorPositionChanged, disconnect }
}
