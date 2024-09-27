import { prisma } from '@logicate/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user) {
    return NextResponse.json({
      accountExists: true,
    })
  }

  return NextResponse.json({
    accountExists: false,
  })
}
