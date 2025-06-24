import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const secret = cookies().get('admin_secret')?.value
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ authorized: false }, { status: 401 })
  }
  return NextResponse.json({ authorized: true })
}
