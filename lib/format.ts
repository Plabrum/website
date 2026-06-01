export function formatDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function formatLong(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatYearRange(start?: string | null, end?: string | null): string {
  const s = start ? new Date(start).getFullYear() : undefined
  const e = end ? new Date(end).getFullYear() : undefined
  if (s && e) return s === e ? `${s}` : `${s} — ${e}`
  if (s && !e) return `${s} — present`
  if (e) return `${e}`
  return ''
}

export function projectYear(start?: string | null, end?: string | null): string {
  if (end) return `${new Date(end).getFullYear()}`
  if (start) return `${new Date(start).getFullYear()}`
  return ''
}
