/* eslint-disable @typescript-eslint/no-empty-object-type */

import { User as UserType } from '@logicate/database'
import 'next-auth'
declare module 'next-auth' {
  interface User extends Omit<UserType, 'password'> {}
}
