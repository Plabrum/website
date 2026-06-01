import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, imageBuilder } from 'lib/sanity.client'
import { formatDate, formatLong } from 'lib/format'
import PortableTextRenderer from 'components/portable-text'
import { IndexList } from 'components/site/IndexList'
import { EntryLinks, type EntryLink } from 'components/site/EntryLinks'
import type { PortableTextBlock } from 'sanity'
import type { Image } from 'sanity'

type Props = { params: Promise<{ slug: string }> }

type EntryDetail = {
  _id: string
  title: string
  type: 'essay' | 'project'
  summary?: string
  publishedAt: string
  updatedAt?: string
  links?: EntryLink[]
  body?: PortableTextBlock[]
  tags?: Array<{ name: string }>
  prev?: { title: string; slug: string } | null
  next?: { title: string; slug: string } | null
  related?: Array<{ title: string; slug: string; publishedAt: string }>
}

const entryDetailQuery = defineQuery(`*[_type=="entry" && slug.current == $slug][0]{
  _id, title, type, summary, publishedAt, updatedAt, links, body,
  "tags": tags[]->{ name },
  "prev": *[_type=="entry" && defined(slug.current) && defined(publishedAt) && publishedAt < ^.publishedAt]
    | order(publishedAt desc)[0]{ title, "slug": slug.current },
  "next": *[_type=="entry" && defined(slug.current) && defined(publishedAt) && publishedAt > ^.publishedAt]
    | order(publishedAt asc)[0]{ title, "slug": slug.current },
  "related": *[_type=="entry" && defined(slug.current) && _id != ^._id && count(tags[@._ref in ^.tags[]._ref]) > 0]
    | order(publishedAt desc)[0...3]{ title, "slug": slug.current, publishedAt }
}`)

const entrySlugsQuery = defineQuery(`*[_type=="entry" && defined(slug.current)].slug.current`)

const entryMetaQuery = defineQuery(`*[_type=="entry" && slug.current == $slug][0]{ title, summary, socialImage }`)

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(entrySlugsQuery, {}, {
    next: { tags: ['entry'] },
  })
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const data = await client.fetch<{ title?: string; summary?: string; socialImage?: Image } | null>(
    entryMetaQuery,
    { slug },
    { next: { tags: ['entry'] } },
  )
  if (!data) return { title: 'Not found' }
  const ogImage = data.socialImage
    ? imageBuilder.image(data.socialImage).width(1200).height(630).fit('crop').url()
    : undefined
  return {
    title: `${data.title} — Phil Labrum`,
    description: data.summary,
    openGraph: ogImage
      ? { title: data.title, description: data.summary, images: [{ url: ogImage }] }
      : undefined,
  }
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await client.fetch<EntryDetail | null>(
    entryDetailQuery,
    { slug },
    { next: { tags: ['entry'] } },
  )
  if (!entry) notFound()

  return (
    <article className="mx-auto max-w-measure relative">
      <header className="mb-9">
        <h1 className="text-[36px] leading-[1.18] m-0 mb-3.5 font-semibold tracking-[-0.01em] text-text-strong max-sm:text-[28px]">
          {entry.title}
        </h1>
        <div className="font-sans text-muted text-xs uppercase tracking-[0.08em]">
          Published {formatLong(entry.publishedAt)}
          {entry.updatedAt && (
            <>
              {' · '}
              <span className="text-accent">Updated {formatLong(entry.updatedAt)}</span>
            </>
          )}
        </div>
        <EntryLinks links={entry.links} />
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3.5">
            {entry.tags.map((t) => (
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

      {entry.body && <PortableTextRenderer value={entry.body} />}

      {(entry.prev || entry.next) && (
        <nav
          className="grid grid-cols-2 gap-7 mt-16 pt-6 border-t border-rule font-sans max-sm:grid-cols-1 max-sm:gap-[18px]"
          aria-label="Adjacent entries"
        >
          <div className="flex flex-col gap-1">
            {entry.prev && (
              <>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted">← Previous</span>
                <Link
                  href={`/writing/${entry.prev.slug}`}
                  className="text-text no-underline font-serif text-[17px] hover:text-accent"
                >
                  {entry.prev.title}
                </Link>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 text-right max-sm:text-left">
            {entry.next && (
              <>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted">Next →</span>
                <Link
                  href={`/writing/${entry.next.slug}`}
                  className="text-text no-underline font-serif text-[17px] hover:text-accent"
                >
                  {entry.next.title}
                </Link>
              </>
            )}
          </div>
        </nav>
      )}

      {entry.related && entry.related.length > 0 && (
        <section className="mt-14">
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold m-0 mb-3.5">
            Related
          </h3>
          <IndexList
            items={entry.related.map((r) => ({
              key: r.slug,
              href: `/writing/${r.slug}`,
              meta: formatDate(r.publishedAt),
              title: r.title,
            }))}
          />
        </section>
      )}

      <nav className="mt-16 pt-6 border-t border-rule font-sans" aria-label="Writing">
        <Link
          href="/writing"
          className="text-[11px] uppercase tracking-[0.1em] text-muted no-underline hover:text-accent"
        >
          ← All writing
        </Link>
      </nav>
    </article>
  )
}
