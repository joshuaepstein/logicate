import { getSession } from "@/lib/auth/utils";
import { prisma } from "@logicate/database";
import Canvas from "../../ui/canvas";
import { userAgent } from "next/server";

const getDatabaseSession = async (canvasId: string) => {
  "use server";
  const response = await prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
    },
  });
  return response;
};

export default async function Home({
  params: { canvas },
}: {
  params: { canvas: string };
}) {
  const session = await getSession();
  const logicateSession = await getDatabaseSession(canvas);

  if (!logicateSession) {
    return <div>Session not found</div>;
  }

  if (logicateSession.ownerId !== session.user.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="w-full max-h-dvh overflow-hidden h-dvh flex flex-col">
      <nav className="w-full h-16 border-b border-neutralgrey-400">
        {session.user.name}
      </nav>
      <Canvas
        sessionId={logicateSession.id}
        logicateSession={logicateSession}
        user={session.user}
      />
    </div>
  );
}
