import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const secret = cookieStore.get('admin_secret')?.value
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ authorized: false }, { status: 401 })
  }
  return NextResponse.json({ authorized: true })
}
