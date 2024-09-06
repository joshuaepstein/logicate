import { getSession } from "@/lib/auth/utils";
import { revalidateTag } from "next/cache";
import Canvas from "../../ui/canvas";

const getDatabaseSession = async (canvasId: string) => {
  ("use server");
  // const response = await prisma.logicateSession.findUnique({
  //   where: {
  //     id: canvasId,
  //   },
  // });
  // return response;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/canvas/${canvasId}`, {
    method: "GET",
    mode: "cors",
    credentials: "include", // This will make sure that the cookie is sent along with the request
    cache: "no-store",
    next: {
      tags: [`canvas-${canvasId}`],
    },
  });
  return response.json();
};

async function revalidateData(canvasId: string) {
  "use server";
  revalidateTag(`canvas-${canvasId}`);
}

export default async function Home({ params: { canvas } }: { params: { canvas: string } }) {
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
      <nav className="w-full h-16 border-b border-neutralgrey-400">{session.user.name}</nav>
      <Canvas
        sessionId={logicateSession.id}
        logicateSession={logicateSession}
        user={session.user}
        revalidateData={revalidateData}
      />
    </div>
  );
}
