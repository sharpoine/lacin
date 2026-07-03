import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secretKey = process.env.SESSION_SECRET || "default-secret-key-for-local-dev-change-in-prod"
const key = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const session = request.cookies.get("session")?.value

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      await jwtVerify(session, key, {
        algorithms: ["HS256"],
      })
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
