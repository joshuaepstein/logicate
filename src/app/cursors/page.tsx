"use client"

import { ReactRealtimeCursor } from "@/realtime-cursor"

export default function CursorsPage() {
  return (
    <ReactRealtimeCursor
      socketIOApp={{
        url: "http://localhost:4000",
        roomId: "1",
        userId: "1",
      }}
      style={{
        minHeight: "100vh",
      }}
    >
      <div>Hello 1</div>
    </ReactRealtimeCursor>
  )
}
