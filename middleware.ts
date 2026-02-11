import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session")
  const userSession = request.cookies.get("user_session")
  const isLoginPage = request.nextUrl.pathname === "/login"
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  // Redirect to login if accessing admin routes without session
  if (isAdminRoute && !session && !userSession) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to admin if accessing login with active session
  if (isLoginPage && (session || userSession)) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
