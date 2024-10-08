import '@/styles/globals.css'
import { cn } from '@/lib'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Providers from './providers'
import { getSession } from '@/lib/auth/utils'
import { unstable_cache } from 'next/cache'
import { prisma, User } from '@/database'
import { checkInviteExpired } from '@/lib/invite'

const getInvites = unstable_cache(
  async (user: User) => {
    return prisma.invites.findMany({
      where: {
        to: user.email,
      },
    })
  },
  ['user_invites'],
  {
    revalidate: 60,
    tags: ['user_invites'],
  }
)

export default async function Layout({ children }: { children: React.ReactNode }) {
  // const { user } = await getSession()
  // const invites = (await getInvites(user)).filter((invite) => !invite.accepted && !checkInviteExpired(invite))
  const hiddenLayoutPages = ['/login', '/register', '/logout', '/canvas']

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, GeistMono.className)}>
        <Providers>{children}</Providers>
        {/* TODO: Play a ding if */}
      </body>
    </html>
  )
}
