import { get } from "@vercel/edge-config"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { getUserViaToken } from "./lib/auth/middleware/get-user-via-token"
import { parse } from "./lib/middleware"

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
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+|maintenance).*)",
  ],
}

const appRoutes = {
  ui: "/ui.logicate",
}

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, fullPath } = parse(req)
  let maintenance = false
  try {
    maintenance = (await get("isMaintenance")) || false
  } catch (e) {
    console.error("Error getting maintenance status", e)
    maintenance = false
  }
  const isDev = process.env.NODE_ENV === "development"

  if (maintenance === true && !isDev) {
    return NextResponse.redirect(new URL("/maintenance", req.url))
  } else {
    if (path.startsWith("/maintenance")) {
      const response = NextResponse.redirect(new URL("/", req.url))
      response.headers.set("x-url", fullPath)
      return response
    }
  }

  //TODO: If the page is "admin." then redirect to the admin page

  for (const [key, value] of Object.entries(appRoutes)) {
    if (domain === `${key}.logicate` || domain === `${key}.localhost:3000`) {
      const response = NextResponse.rewrite(new URL(`${value}${path}`, req.url))
      response.headers.set("x-url", fullPath)
      return response
    }
  }

  const user = await getUserViaToken(req)
  console.log(user, "User", req, ev)
  if (
    (!user || !user.email) &&
    path !== "/login" &&
    path !== "/register" &&
    !path.startsWith("/auth/reset-password/") &&
    !path.startsWith("/auth/verify-email") &&
    !path.startsWith("/auth/unlock-account") &&
    !path.startsWith("/canvas/demo") &&
    !path.startsWith("/changelog") &&
    path !== "/" &&
    !path.startsWith("/legal/") &&
    !path.startsWith("/auth/created") &&
    !path.startsWith("/auth/verify")
  ) {
    if (fullPath.startsWith("/logout")) {
      const response = NextResponse.redirect(new URL("/login", req.url))
      response.headers.set("x-url", fullPath)
      return response
    }
    console.log("redirecting to login because user is not logged in", user)
    const response = NextResponse.redirect(new URL(`/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`, req.url))
    response.headers.set("x-url", fullPath)
    return response
  } else if (user) {
    if (user.createdAt && new Date(user.createdAt).getTime() > Date.now() - 10000 && path !== "/welcome") {
      const response = NextResponse.redirect(new URL("/welcome", req.url))
      response.headers.set("x-url", fullPath)
      return response
    } else if (path === "/login" || path === "/register") {
      const response = NextResponse.redirect(new URL("/", req.url))
      response.headers.set("x-url", fullPath)
      return response
    }
    // else if (path.startsWith('/canvas/demo')) {
    // return NextResponse.redirect(new URL('/canvas/new', req.url))
    // }
  }

  const response = NextResponse.next()
  response.headers.set("x-url", fullPath)
  return response
}
