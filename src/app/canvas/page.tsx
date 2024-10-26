import { Container } from "@/components/ui/not-done-yet/container"
import { H3 } from "@/components/ui/typography"
import { getSession } from "@/lib/auth/utils"
import { prisma } from "@logicate/database"
import Link from "next/link"
import { Item, Wire as TypeWire } from "../ui/canvas/types"
import CanvasPreview from "./preview"

async function getAllCanvas(userId: string) {
  "use server"

  return await prisma.logicateSession.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: [{ updatedAt: "desc" }],
  })
}

export default async function CanvasPage({}) {
  const session = await getSession()
  const canvas = await getAllCanvas(session.user.id)

  return (
    <Container>
      <H3>Your Canvases</H3>
      <div className="mb-16 mt-4 flex w-full flex-col gap-4">
        {canvas.map((c) => (
          <Link
            className="shadow-hard-2xs flex flex-row items-center justify-between rounded-md px-4 py-4 transition-all duration-200"
            key={c.id}
            href={`/canvas/${c.id}`}
          >
            <div className="flex flex-row items-center">
              <div
                className="bg-neutralgrey-200 relative aspect-square h-full min-h-16 rounded-md"
                style={{
                  backgroundImage: `url(/_static/grid.png)`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "center",
                  // imageResolution: "72dpi",
                  // backgroundPosition: `${canvas.x || 0}px ${canvas.y || 0}px`,
                  // transition for background position
                  transition: "background-position 1s ease-in-out",
                }}
              >
                <CanvasPreview logicateSession={c} />
              </div>
              <div className="ml-4 flex flex-col">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-neutralgrey-1100 text-xs">
                  {c.updatedAt.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <p className="text-neutralgrey-1100 text-xs">
                {c.items && (c.items as Item[]).length} item{c.items && (c.items as Item[]).length === 1 ? "" : "s"},{" "}
                {c.wires && (c.wires as TypeWire[]).length} wire
                {c.wires && (c.wires as TypeWire[]).length === 1 ? "" : "s"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
