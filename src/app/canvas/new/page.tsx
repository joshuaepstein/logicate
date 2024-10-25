import { getSession } from "@/lib/auth/utils"
import { generateLogicateSessionId } from "@/lib/id"
import { prisma } from "@logicate/database"
import { notFound, redirect } from "next/navigation"

const createDatabaseSession = async (userId: string) => {
  "use server"
  const canvasesWithUntitledName = await prisma.logicateSession.findMany({
    where: {
      ownerId: userId,
      name: {
        startsWith: "Untitled Canvas",
      },
    },
  })

  const response = await prisma.logicateSession.create({
    data: {
      id: generateLogicateSessionId(),
      items: [],
      wires: [],
      ownerId: userId,
      name: "Untitled Canvas" + (canvasesWithUntitledName.length > 0 ? ` (${canvasesWithUntitledName.length + 1})` : ""),
    },
  })
  return {
    ...response,
    isNew: true,
  }
}

export default async function Home() {
  const session = await getSession()
  const logicateSession = await createDatabaseSession(session.user.id)
  if (!logicateSession) {
    notFound()
  }
  redirect(`/canvas/${logicateSession.id}?isNew=${logicateSession.isNew ? "true" : "false"}`)
}
