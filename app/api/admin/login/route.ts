import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { secret } = await req.json()
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_secret', secret, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
