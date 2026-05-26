import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from 'lib/sanity.client'
import { formatDate, formatLong } from 'lib/format'
import PortableTextRenderer from 'components/portable-text'
import type { PortableTextBlock } from 'sanity'

type Props = { params: Promise<{ slug: string }> }

type EssayDetail = {
  _id: string
  title: string
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  body?: PortableTextBlock[]
  tags?: Array<{ name: string }>
  tagRefs?: string[]
  prev?: { title: string; slug: string } | null
  next?: { title: string; slug: string } | null
  related?: Array<{ title: string; slug: string; publishedAt: string }>
}

const essayDetailQuery = defineQuery(`*[_type=="post" && slug.current == $slug][0]{
  _id, title, excerpt, publishedAt, updatedAt, body,
  "tags": tags[]->{ name },
  "tagRefs": tags[]._ref,
  "prev": *[_type=="post" && defined(slug.current) && defined(publishedAt) && publishedAt < ^.publishedAt]
    | order(publishedAt desc)[0]{ title, "slug": slug.current },
  "next": *[_type=="post" && defined(slug.current) && defined(publishedAt) && publishedAt > ^.publishedAt]
    | order(publishedAt asc)[0]{ title, "slug": slug.current },
  "related": *[_type=="post" && defined(slug.current) && _id != ^._id && count(tags[@._ref in ^.tags[]._ref]) > 0]
    | order(publishedAt desc)[0...3]{ title, "slug": slug.current, publishedAt }
}`)

const essaySlugsQuery = defineQuery(`*[_type=="post" && defined(slug.current)].slug.current`)

const essayMetaQuery = defineQuery(`*[_type=="post" && slug.current == $slug][0]{ title, excerpt }`)

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(essaySlugsQuery, {}, {
    next: { tags: ['post'] },
  })
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const data = await client.fetch<{ title?: string; excerpt?: string } | null>(
    essayMetaQuery,
    { slug },
    { next: { tags: ['post'] } },
  )
  if (!data) return { title: 'Not found' }
  return {
    title: `${data.title} — Phil Labrum`,
    description: data.excerpt,
  }
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const essay = await client.fetch<EssayDetail | null>(
    essayDetailQuery,
    { slug },
    { next: { tags: ['post'] } },
  )
  if (!essay) notFound()

  return (
    <article className="mx-auto max-w-measure relative">
      <header className="mb-9">
        <h1 className="text-[36px] leading-[1.18] m-0 mb-3.5 font-semibold tracking-[-0.01em] text-text-strong max-sm:text-[28px]">
          {essay.title}
        </h1>
        <div className="font-sans text-muted text-xs uppercase tracking-[0.08em] mb-3.5">
          Published {formatLong(essay.publishedAt)}
          {essay.updatedAt && (
            <>
              {' · '}
              <span className="text-accent">Updated {formatLong(essay.updatedAt)}</span>
            </>
          )}
        </div>
        {essay.tags && essay.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-1">
            {essay.tags.map((t) => (
              <span
                key={t.name}
                className="font-sans text-[11px] lowercase tracking-[0.03em] text-muted border border-rule rounded-full px-2.5 py-0.5 bg-transparent"
              >
                {t.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {essay.body && <PortableTextRenderer value={essay.body} />}

      {(essay.prev || essay.next) && (
        <nav
          className="grid grid-cols-2 gap-7 mt-16 pt-6 border-t border-rule font-sans max-sm:grid-cols-1 max-sm:gap-[18px]"
          aria-label="Adjacent essays"
        >
          <div className="flex flex-col gap-1">
            {essay.prev && (
              <>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted">← Previous</span>
                <Link
                  href={`/essays/${essay.prev.slug}`}
                  className="text-text no-underline font-serif text-[17px] hover:text-accent"
                >
                  {essay.prev.title}
                </Link>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 text-right max-sm:text-left">
            {essay.next && (
              <>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted">Next →</span>
                <Link
                  href={`/essays/${essay.next.slug}`}
                  className="text-text no-underline font-serif text-[17px] hover:text-accent"
                >
                  {essay.next.title}
                </Link>
              </>
            )}
          </div>
        </nav>
      )}

      {essay.related && essay.related.length > 0 && (
        <section className="mt-14">
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold m-0 mb-3.5">
            Related
          </h3>
          <ul className="list-none m-0 p-0 border-t border-rule">
            {essay.related.map((r) => (
              <li
                key={r.slug}
                className="flex gap-5 py-3 items-baseline border-b border-rule max-sm:flex-wrap max-sm:gap-1.5"
              >
                <span className="font-sans text-muted tabular-nums text-[13px] min-w-[100px] flex-shrink-0 max-sm:min-w-0">
                  {formatDate(r.publishedAt)}
                </span>
                <Link href={`/essays/${r.slug}`} className="text-text no-underline text-[17px] hover:text-accent">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-16 pt-6 border-t border-rule font-sans" aria-label="Essays">
        <Link
          href="/essays"
          className="text-[11px] uppercase tracking-[0.1em] text-muted no-underline hover:text-accent"
        >
          ← All essays
        </Link>
      </nav>
    </article>
  )
}
