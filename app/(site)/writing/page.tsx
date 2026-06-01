import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'
import { formatDate } from 'lib/format'
import { WritingFilter, type WritingItem } from 'components/site/WritingFilter'

export const metadata = {
  title: 'Writing — Phil Labrum',
  description: 'Essays and projects — thoughts about building, and records of things built.'
}

interface EntryRow {
  title: string
  slug: string
  type: 'essay' | 'project'
  publishedAt: string
  summary?: string
}

const writingIndexQuery =
  defineQuery(`*[_type=="entry" && !(_id in path('drafts.**')) && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc){
    title, "slug": slug.current, type, publishedAt, summary
  }`)

function cleanSlug(s: string): string {
  return s.replace(/^\/?(projects|essays|writing)\//, '').replace(/^\/+/, '')
}

export default async function WritingIndex() {
  const entries = await client.fetch<EntryRow[]>(
    writingIndexQuery,
    {},
    {
      next: { tags: ['entry'] }
    }
  )

  const items: WritingItem[] = entries.map(e => ({
    key: e.slug,
    href: `/writing/${cleanSlug(e.slug)}`,
    meta: formatDate(e.publishedAt),
    title: e.title,
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- coerce empty-string summary to undefined so no blurb renders
    blurb: e.summary || undefined,
    type: e.type
  }))

  return (
    <div className="mx-auto max-w-measure">
      <h2 className="mb-[18px] mt-14 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        Writing
      </h2>
      {items.length === 0 ? <p className="text-muted">Nothing here yet.</p> : <WritingFilter items={items} />}
    </div>
  )
}
