import { getSession } from '@/lib/auth/utils';
import { prisma } from '@logicate/database';
import { generateQuestionId } from '@logicate/utils/id';
import Canvas from './ui/canvas';

const createDatabaseSession = async (userId: string) => {
  'use server';
  const getLocigateSessionCount = await prisma.logicateSession.count({
    where: {
      ownerId: userId,
    },
  });
  if (getLocigateSessionCount >= 1) {
    // find the session with the least amount of items
    const locigateSessionWithLeastItems = await prisma.logicateSession.findFirst({
      where: {
        ownerId: userId,
      },
      orderBy: {
        items: 'asc',
      },
    });
    return locigateSessionWithLeastItems;
  }

  const response = await prisma.logicateSession.create({
    data: {
      id: generateQuestionId(),
      items: [],
      wires: [],
      ownerId: userId,
    },
  });
  return response;
};

export default async function Home() {
  const session = await getSession();
  // const logicateSession = await createDatabaseSession(session.user.id);
  // if (!logicateSession) {
  //   notFound();
  // }
  // redirect(`/canvas/${logicateSession.id}`);
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      <nav className="border-neutralgrey-400 h-16 w-full border-b">{session?.user?.name || 'Hi'}</nav>
      <Canvas
        sessionId={'12'}
        logicateSession={{
          id: '12',
          items: [],
          createdAt: new Date(),
          ownerId: session?.user?.id || 'userIdHere',
          updatedAt: new Date(),
          wires: [],
        }}
        user={
          session?.user || {
            id: 'userIdHere',
            name: 'Joshua Epstein',
            accountType: 'STUDENT',
            client_showBackground: true,
            createdAt: new Date(),
            email: 'josh@joshepstein.co.uk',
            invalidLoginAttempts: 0,
            username: 'joshepstein',
          }
        }
      />
    </div>
  );
}
