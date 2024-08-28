import { prismaEdge } from "@logicate/database/edge";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string };

  const user = await prismaEdge.user.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json({
      accountExists: true,
    });
  }

  return NextResponse.json({
    accountExists: false,
  });
}
