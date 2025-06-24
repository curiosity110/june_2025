import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin_secret')?.value
    if (token !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
