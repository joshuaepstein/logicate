import { LogicateError } from '@/lib/api/error';
import { withSession } from '@/lib/auth/session';
import { prisma } from '@logicate/database';

export const GET = withSession(async ({ session, params }) => {
  const { canvasId } = params;

  if (!canvasId) {
    throw new LogicateError({
      code: 'bad_request',
      message: 'Canvas ID is required',
    });
  }

  if (!canvasId.startsWith('lc-')) {
    throw new LogicateError({
      code: 'bad_request',
      message: 'Invalid canvas ID',
    });
  }

  const canvas = await prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
      ownerId: session.user.id,
    },
  });

  if (!canvas) {
    throw new LogicateError({
      code: 'not_found',
      message: 'Canvas not found',
    });
  }

  return new Response(JSON.stringify(canvas), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
