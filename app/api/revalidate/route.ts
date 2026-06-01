import { revalidateTag } from 'next/cache'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import type { NextRequest } from 'next/server'

const KNOWN_TYPES = new Set([
  'entry',
  'experience',
  'education',
  'siteSettings',
])

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return Response.json({ error: 'Missing secret' }, { status: 500 })
  }
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const rawBody = await req.text()
  if (!signature || !(await isValidSignature(rawBody, signature, secret))) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }
  const body = JSON.parse(rawBody) as { type?: string; slug?: string }
  const type = body?.type
  if (!type || !KNOWN_TYPES.has(type)) {
    return Response.json({ revalidated: [] })
  }
  revalidateTag(type)
  return Response.json({ revalidated: [type] })
}
