import { prisma } from "@/database"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
  const changelogs =
    (await prisma.changelog.findMany({
      include: {
        author: false,
      },
    })) || []

  return NextResponse.json(changelogs, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
