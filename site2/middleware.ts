import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/config/auth.config"

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith("/dashboard")) {
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
} 