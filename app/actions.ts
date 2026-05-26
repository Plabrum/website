'use server'

import nodemailer from 'nodemailer'

export type ContactState =
  | { ok: true }
  | { ok: false; error: string }
  | null

type ContactPayload = {
  name: string
  email: string
  message: string
  website: string // honeypot
  token: string
}

async function verifyRecaptcha(token: string): Promise<{ ok: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: false, score: 0 }
  const body = new URLSearchParams({ secret, response: token }).toString()
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) return { ok: false, score: 0 }
  const data = (await res.json()) as { success?: boolean; score?: number }
  return { ok: !!data.success, score: data.score ?? 0 }
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactState> {
  // Honeypot: silently succeed without sending mail.
  if (payload.website && payload.website.trim().length > 0) {
    return { ok: true }
  }

  if (!payload.token) {
    return { ok: false, error: 'Missing reCAPTCHA token.' }
  }

  const verdict = await verifyRecaptcha(payload.token)
  if (!verdict.ok || verdict.score < 0.5) {
    return { ok: false, error: 'reCAPTCHA verification failed.' }
  }

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, error: 'Missing required fields.' }
  }

  const user = process.env.GMAIL_EMAIL_ADDRESS
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    return { ok: false, error: 'Mail transport not configured.' }
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `Plabrum.com <${user}>`,
      to: user,
      replyTo: `${payload.name} <${payload.email}>`,
      subject: `Contact form: ${payload.name}`,
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p><p>${escapeHtml(
        payload.message,
      ).replace(/\n/g, '<br/>')}</p>`,
    })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Send failed.' }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
