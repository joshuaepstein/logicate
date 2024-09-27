import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { parse } from './lib/middleware'
import { getUserViaToken } from './lib/auth/middleware/get-user-via-token'

export const config = {
  matcher: [
    /**
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /robots.txt, /sitemap.xml, etc.)
     */
    '/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

const appRoutes = {
  ui: '/ui.logicate',
}

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key, fullPath } = parse(req)

  //TODO: If the page is "admin." then redirect to the admin page

  for (const [key, value] of Object.entries(appRoutes)) {
    if (domain === `${key}.logicate.joshepstein.uk` || domain === `${key}.localhost:3000`) {
      return NextResponse.rewrite(new URL(`${value}${path}`, req.url))
    }
  }

  const user = await getUserViaToken(req)

  if (
    !user &&
    path !== '/login' &&
    path !== '/register' &&
    !path.startsWith('/auth/reset-password/') &&
    !path.startsWith('/auth/verify-email') &&
    !path.startsWith('/auth/unlock-account')
  ) {
    if (fullPath.startsWith('/logout')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.redirect(new URL(`/login${path === '/' ? '' : `?next=${encodeURIComponent(fullPath)}`}`, req.url))
  } else if (user) {
    if (user.createdAt && new Date(user.createdAt).getTime() > Date.now() - 10000 && path !== '/welcome') {
      return NextResponse.redirect(new URL('/welcome', req.url))
    } else if (path === '/login' || path === '/register') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}
