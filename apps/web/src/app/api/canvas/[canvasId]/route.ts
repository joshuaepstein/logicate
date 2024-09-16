import { Item } from '@/app/ui/canvas/types'
import { LogicateError } from '@/lib/api/error'
import { parseRequestBody } from '@/lib/api/utils'
import { withSession } from '@/lib/auth/session'
import { prisma } from '@logicate/database'
import SuperJSON from 'superjson'

export const GET = withSession(async ({ session, params }) => {
  const { canvasId } = params

  if (!canvasId) {
    throw new LogicateError({
      code: 'bad_request',
      message: 'Canvas ID is required',
    })
  }

  if (!canvasId.startsWith('lc-')) {
    throw new LogicateError({
      code: 'bad_request',
      message: 'Invalid canvas ID',
    })
  }

  const canvas = await prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
      ownerId: session.user.id,
    },
  })

  if (!canvas) {
    throw new LogicateError({
      code: 'not_found',
      message: 'Canvas not found',
    })
  }

  return new Response(JSON.stringify(canvas), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})

export const POST = withSession(async ({ session, params, req }) => {
  const { canvasId } = params

  const { database } = await parseRequestBody(req)

  if (!database) {
    throw new LogicateError({
      code: 'bad_request',
      message: 'Database is required',
    })
  }

  const existingCanvas = await prisma.logicateSession.findUnique({
    where: {
      id: canvasId,
      ownerId: session.user.id,
    },
  })

  if (!existingCanvas) {
    throw new LogicateError({
      code: 'not_found',
      message: 'Canvas not found',
    })
  }

  const databaseObject = SuperJSON.parse<{
    items: Item[]
    wires: {
      from: {
        id: string
        node_index: number
      }
      to: {
        id: string
        node_index: number
      }
      id: string
      active?: boolean
    }[]
  }>(database)

  const { items, wires } = databaseObject

  const canvas = await prisma.logicateSession.update({
    where: {
      id: canvasId,
      ownerId: session.user.id,
    },
    data: {
      items,
      wires,
    },
  })

  if (!canvas) {
    console.error('Unable to update canvas')
    throw new LogicateError({
      code: 'internal_server_error',
      message: 'Failed to update canvas',
    })
  }

  console.info('Canvas updated successfully')
  return new Response(JSON.stringify(canvas), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
