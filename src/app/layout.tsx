import { Footer } from '@/components/marketing/footer'
import Navbar from '@/components/marketing/navbar'
import { prisma, User } from '@/database'
import { cn } from '@/lib'
import { getSession } from '@/lib/auth/utils'
import '@/styles/globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { unstable_cache } from 'next/cache'
import Providers from './providers'

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
  const sessionPromise = getSession()
  // const invites = (await getInvites(user)).filter((invite) => !invite.accepted && !checkInviteExpired(invite))

  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn(GeistSans.className, GeistMono.className)}>
        <Providers>
          <Navbar sessionPromise={sessionPromise} />
          {children}
          <Footer />
        </Providers>
        {/* TODO: Play a ding if */}
      </body>
    </html>
  )
}
