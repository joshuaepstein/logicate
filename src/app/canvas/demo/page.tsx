import Canvas from "../../ui/canvas"

export default async function Home() {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      <Canvas
        sessionId="demo"
        isNew={false}
        logicateSession={{
          name: "",
          id: "demo",
          createdAt: new Date(),
          items: [],
          wires: [],
          variableValues: [],
          ownerId: "",
          updatedAt: new Date(),
        }}
        user={null}
        demo
      />
    </div>
  )
}
