import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // const { domain, path, fullPath, key, fullKey } = parse(req);

  const user = null;

  // if (
  //   path !== "/login" &&
  //   path !== "/register" &&
  //   !user &&
  //   !path.startsWith("/auth/reset-password/")
  // ) {
  //   return NextResponse.redirect(
  //     new URL(
  //       `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
  //       req.url,
  //     ),
  //   );
  // } else if (user) {
  //   if (
  //     user.createdAt &&
  //     new Date(user.createdAt).getTime() > Date.now() - 10000 &&
  //     path !== "/welcome"
  //   ) {
  //     return NextResponse.redirect(new URL("/welcome", req.url));
  //   }
  // }

  return NextResponse.next();
}