import LogicGateIcon from "@/components/icons/logic-gate-icon"
import { Container } from "@/components/ui/not-done-yet/container"
import { H3 } from "@/components/ui/typography"
import { getSession } from "@/lib/auth/utils"
import { prisma } from "@logicate/database"
import { unstable_cache } from "next/cache"
import Link from "next/link"

const getAllCanvas = unstable_cache(
  async (userId: string) => {
    return prisma.logicateSession.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: [{ updatedAt: "desc" }],
    })
  },
  ["canvas"],
  {
    revalidate: 3600,
    tags: ["canvas"],
  }
)

export default async function CanvasPage({}) {
  const session = await getSession()
  const canvas = await getAllCanvas(session.user.id)

  return (
    <Container>
      <H3>Your Canvases</H3>
      <div className="flex flex-wrap gap-4">
        {canvas.map((c) => (
          <Link
            className="flex aspect-square size-40 h-full flex-col items-center justify-start rounded-md shadow-hard-2xs transition-all duration-200 hover:scale-105 active:scale-95"
            key={c.id}
            href={`/canvas/${c.id}`}
          >
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                backgroundImage: `url(/_static/grid.png)`,
                backgroundRepeat: "repeat",
                backgroundSize: "30px 30px",
                backgroundPosition: "center",
              }}
            >
              {/* TODO: Render the circuit with a smaller scale than normal. */}
              <LogicGateIcon className="size-16 [&>path]:stroke-1" />
            </div>
            <p className="line-clamp-2 flex min-h-14 w-full items-center justify-center border-t border-t-neutralgrey-300 text-center text-sm font-medium">
              {c.name}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  )
}
