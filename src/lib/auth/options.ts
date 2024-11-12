import { NoCredentialsError } from "@/lib/auth/errors/NoCredentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma, prismaAdapter } from "@logicate/database"
import { sendEmail } from "@logicate/emails"
import { subscribe } from "@logicate/emails/resend"
import { waitUntil } from "@vercel/functions"
import { CredentialsSignin, NextAuthConfig } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { ExceededLoginAttemptsError } from "./errors/ExceededLoginAttempts"
import { InvalidCredentialsError } from "./errors/InvalidCredentials"
import { NotVerifiedError } from "./errors/NotVerifiedError"
import { exceededLoginAttemptsThreshold, incrementLoginAttemps } from "./lock-account"
import { validatePassword } from "./password"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Logicate",
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new NoCredentialsError()
        }

        const { email, password } = credentials as {
          email?: string
          password?: string
        }

        if (!email || !password) {
          throw new CredentialsSignin("no-credentials")
          // return null
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
            _count: {
              select: {
                verificationTokens: true,
              },
            },
          },
        })

        if (!user || !user.password) {
          throw new InvalidCredentialsError()
          // return null
        }

        if (exceededLoginAttemptsThreshold(user)) {
          throw new ExceededLoginAttemptsError()
          // return null
        }

        const passwordMatch = await validatePassword({
          password,
          passwordHash: user.password,
        })

        if (!passwordMatch) {
          const exceededLoginAttempts = exceededLoginAttemptsThreshold(await incrementLoginAttemps(user))

          if (exceededLoginAttempts) {
            throw new ExceededLoginAttemptsError()
            // return null
          } else {
            throw new InvalidCredentialsError()
            // return null
          }
        }

        if (user._count.verificationTokens > 0) {
          throw new NotVerifiedError()
          // return null
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
  adapter: PrismaAdapter({
    ...prismaAdapter,
  }) as Adapter,
  session: {
    strategy: "jwt",
  },
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       domain: VERCEL_DEPLOYMENT ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  pages: {
    error: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user
      }

      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
          include: {
            publicDisplay: true,
          },
        })

        if (refreshedUser) {
          token.user = refreshedUser
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
                subject: "Welcome to Logicate",
                email,
                // react: WelcomeEmail({
                //   email,
                //   name: user.name,
                //   accountType: user.accountType,
                // }),
                text: "Welcome to Logicate - We are working on this email template and should be ready soon!",
                scheduledAt: new Date(Date.now() + 5 * 60 + 1000).toISOString(),
                marketing: true,
              }),
            ])
          )
        }
      }
    },
  },
}
