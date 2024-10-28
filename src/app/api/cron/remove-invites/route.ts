import { prisma } from "@/database"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  try {
    const invites = await prisma.invites.deleteMany({
      where: {
        accepted: true,
        updatedAt: {
          lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        },
        //   Will find all invites that were accepted within 1 day
      },
    })

    console.log(`Cron Job: Removed ${invites.count} invites`)

    return NextResponse.json({
      success: true,
      message: `Removed ${invites.count} invites`,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      success: false,
      message: "Failed to remove invites",
    })
  }
}
