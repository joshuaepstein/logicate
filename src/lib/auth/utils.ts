import { PublicDisplay, User } from '@logicate/database'
import { NextRequest } from 'next/server'
import { auth } from '.'
import { LogicateError } from '../api/error'

export interface Session {
  user: Exclude<User, 'password' | 'invalidLoginAttempts' | 'lockedAt'> & {
    publicDisplay: PublicDisplay
  }
}

export const getSession = async () => {
  // return getServerSession(authConfig) as Promise<Session>
  return auth() as Promise<Session>
}

export const getAuthTokenOrThrow = (req: Request | NextRequest, type: 'Bearer' | 'Basic' = 'Bearer') => {
  const authorizationHeader = req.headers.get('Authorization')

  if (!authorizationHeader) {
    throw new LogicateError({
      code: 'bad_request',
      message: "Misconfigured authorization header. Did you forget to add 'Bearer '?",
    })
  }

  return authorizationHeader.replace(`${type} `, '')
}
