import { getSession } from "@/lib/auth/utils";
import { prisma } from "@logicate/database";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Canvas from "../../ui/canvas";

const getDatabaseSession = async (canvasId: string, userId: string) => {
  "use server";
  const canvas = await prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
      ownerId: userId,
    },
  });
  return canvas;
};

async function revalidateData(canvasId: string) {
  "use server";
  revalidateTag(`canvas-${canvasId}`);
}

export default async function Home({ params: { canvas } }: { params: { canvas: string } }) {
  const session = await getSession();
  if (!session) notFound();
  const logicateSession = await getDatabaseSession(canvas, session.user.id);

  if (!logicateSession) {
    // TODO: Canvas not found design
    return notFound();
  }

  return (
    <div className="w-full max-h-dvh overflow-hidden h-dvh flex flex-col">
      <nav className="w-full h-16 border-b border-neutralgrey-400">{session.user.name}</nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          sessionId={logicateSession.id}
          logicateSession={logicateSession}
          user={session.user}
          revalidateData={revalidateData}
        />
      </Suspense>
    </div>
  );
}
