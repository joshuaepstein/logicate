import { getSession } from "@/lib/auth/utils";
import { prisma } from "@logicate/database";
import { redirect } from "next/navigation";

const createDatabaseSession = async (userId: string) => {
  "use server";
  const response = await prisma.logicateSession.create({
    data: {
      items: [],
      wires: [],
      ownerId: userId,
    },
  });
  return response;
};

export default async function Home() {
  const session = await getSession();
  const logicateSession = await createDatabaseSession(session.user.id);

  redirect(`/canvas/${logicateSession.id}`);
}
