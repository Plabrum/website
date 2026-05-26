import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { client } from 'lib/sanity.client'
import { formatDate } from 'lib/format'

export const metadata = {
  title: 'Writing — Phil Labrum',
  description: 'Essays and notes on engineering, product, and tangents.',
}

type EssayRow = { title: string; slug: string; publishedAt: string }

const essaysIndexQuery = defineQuery(`*[_type=="post" && !(_id in path('drafts.**')) && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc){
    title, "slug": slug.current, publishedAt
  }`)

export default async function EssaysIndex() {
  const essays = await client.fetch<EssayRow[]>(essaysIndexQuery, {}, {
    next: { tags: ['post'] },
  })
  return (
    <div className="mx-auto max-w-measure">
      <h2 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-14 mb-[18px] flex items-baseline justify-between">
        Writing
      </h2>
      {essays.length === 0 ? (
        <p className="text-muted">No essays yet.</p>
      ) : (
        <ul className="list-none m-0 p-0 border-t border-rule">
          {essays.map((e) => (
            <li
              key={e.slug}
              className="flex gap-5 py-3.5 items-baseline border-b border-rule max-sm:flex-wrap max-sm:gap-1.5"
            >
              <span className="font-sans text-muted tabular-nums text-[13px] min-w-[100px] flex-shrink-0 max-sm:min-w-0">
                {formatDate(e.publishedAt)}
              </span>
              <Link href={`/essays/${e.slug}`} className="text-text no-underline text-[18px] hover:text-accent">
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
