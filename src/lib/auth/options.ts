import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@logicate/database'
import { sendEmail } from '@logicate/emails'
import { subscribe } from '@logicate/emails/resend'
import { waitUntil } from '@vercel/functions'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { exceededLoginAttemptsThreshold, incrementLoginAttemps } from './lock-account'
import { validatePassword } from './password'
import { randomAvatar } from '../random'
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Logicate',
      type: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('no-credentials')
        }

        const { email, password } = credentials as {
          email?: string
          password?: string
        }

        if (!email || !password) {
          throw new Error('no-credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            password: true,
            name: true,
            email: true,
            invalidLoginAttempts: true,
            publicDisplay: {
              select: {
                profilePicture: true,
              },
            },
          },
        })

        if (!user || !user.password) {
          throw new Error('invalid-credentials')
        }

        if (exceededLoginAttemptsThreshold(user)) {
          throw new Error('exceeded-login-attempts')
        }

        const passwordMatch = await validatePassword({
          password,
          passwordHash: user.password,
        })

        if (!passwordMatch) {
          const exceededLoginAttempts = exceededLoginAttemptsThreshold(await incrementLoginAttemps(user))

          if (exceededLoginAttempts) {
            throw new Error('exceeded-login-attempts')
          } else {
            throw new Error('invalid-credentials')
          }
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            invalidLoginAttempts: 0,
          },
        })

        const publicDisplay = await prisma.publicDisplay.findUnique({
          where: { userId: user.id },
        })

        return {
          ...updatedUser,
          publicDisplay: publicDisplay || {},
        }
      },
    }),
  ],
  // @ts-expect-error - because
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       // When working on localhost, the cookie domain must be omitted entirely
  //       domain: VERCEL_DEPLOYMENT ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  pages: {
    error: '/login',
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) token.user = user

      if (trigger === 'update') {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        let publicDisplay = await prisma.publicDisplay.findUnique({
          where: { userId: token.sub },
        })

        if (publicDisplay) {
          if (publicDisplay.profilePicture === null) {
            // publicDisplay.profilePicture = `internal:${randomAvatar()}`
            const updatedProfilePicture = await prisma.publicDisplay.update({
              where: { userId: token.sub },
              data: {
                profilePicture: `internal:${randomAvatar()}`,
              },
            })

            publicDisplay = updatedProfilePicture
          }
        }

        if (refreshedUser) {
          token.user = {
            ...refreshedUser,
            publicDisplay: publicDisplay || {},
          }
        } else {
          return {}
        }
      } else if (trigger === undefined) {
        // refresh the user because we want to make sure we have the latest data
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        let publicDisplay = await prisma.publicDisplay.findUnique({
          where: { userId: token.sub },
        })

        if (publicDisplay) {
          if (publicDisplay.profilePicture === null) {
            // publicDisplay.profilePicture = `internal:${randomAvatar()}`
            const updatedProfilePicture = await prisma.publicDisplay.update({
              where: { userId: token.sub },
              data: {
                profilePicture: `internal:${randomAvatar()}`,
              },
            })

            publicDisplay = updatedProfilePicture
          }
        }

        if (refreshedUser) {
          token.user = {
            ...refreshedUser,
            publicDisplay: publicDisplay || {},
          }
        } else {
          return {}
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      }

      return session
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            publicDisplay: {
              select: {
                profilePicture: true,
              },
            },
            createdAt: true,
            accountType: true,
          },
        })
        if (!user) return

        if (user.createdAt && new Date(user.createdAt).getTime() > Date.now() - 10000) {
          waitUntil(
            Promise.allSettled([
              subscribe({ email, name: user.name }),
              sendEmail({
                subject: 'Welcome to Logicate',
                email,
                // react: WelcomeEmail({
                //   email,
                //   name: user.name,
                //   accountType: user.accountType,
                // }),
                text: 'Welcome to Logicate - We are working on this email template and should be ready soon!',
                scheduledAt: new Date(Date.now() + 5 * 60 + 1000).toISOString(),
                marketing: true,
              }),
            ])
          )
        }
      }
    },
  },
  secret: process.env.SECRET_PASSWORD,
}
