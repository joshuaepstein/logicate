import { getUserViaToken } from "@/lib/auth/middleware/get-user-via-token";
import { parse } from "@logicate/utils/middleware/parse";
import { NextRequest, NextResponse } from "next/server";

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

export default async function middleware(req: NextRequest) {
  const { path, fullPath } = parse(req);
  const user = await getUserViaToken(req);

  if (
    !user &&
    path !== "/login" &&
    path !== "/register" &&
    !path.startsWith("/auth/reset-password/")
  ) {
    if (fullPath.startsWith("/logout")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.redirect(
      new URL(
        `/login${path === "/" ? "" : `?next=${encodeURIComponent(fullPath)}`}`,
        req.url,
      ),
    );
  } else if (user) {
    if (
      user.createdAt &&
      new Date(user.createdAt).getTime() > Date.now() - 10000 &&
      path !== "/welcome"
    ) {
      return NextResponse.redirect(new URL("/welcome", req.url));
    } else if (path === "/login" || path === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
