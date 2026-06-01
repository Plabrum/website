import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client, imageBuilder } from 'lib/sanity.client'
import { formatLong } from 'lib/format'
import PortableTextRenderer from 'components/portable-text'
import { EntryLinks, type EntryLink } from 'components/site/EntryLinks'
import type { Metadata } from 'next'
import type { PortableTextBlock } from 'sanity'
import type { Image } from 'sanity'

interface Props {
  params: Promise<{ slug: string }>
}

interface EntryDetail {
  _id: string
  title: string
  type: 'essay' | 'project'
  summary?: string
  publishedAt: string
  updatedAt?: string
  links?: EntryLink[]
  body?: PortableTextBlock[]
  tags?: { name: string }[]
  related?: { title: string; slug: string; publishedAt: string }[]
}

const entryDetailQuery = defineQuery(`*[_type=="entry" && slug.current == $slug][0]{
  _id, title, type, summary, publishedAt, updatedAt, links, body,
  "tags": tags[]->{ name },
  "related": *[_type=="entry" && defined(slug.current) && _id != ^._id && count(tags[@._ref in ^.tags[]._ref]) > 0]
    | order(publishedAt desc)[0...3]{ title, "slug": slug.current, publishedAt }
}`)

const entrySlugsQuery = defineQuery(`*[_type=="entry" && defined(slug.current)].slug.current`)

const entryMetaQuery = defineQuery(`*[_type=="entry" && slug.current == $slug][0]{ title, summary, socialImage }`)

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    entrySlugsQuery,
    {},
    {
      next: { tags: ['entry'] }
    }
  )
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch<{ title?: string; summary?: string; socialImage?: Image } | null>(
    entryMetaQuery,
    { slug },
    { next: { tags: ['entry'] } }
  )
  if (!data) return { title: 'Not found' }
  const ogImage = data.socialImage
    ? imageBuilder.image(data.socialImage).width(1200).height(630).fit('crop').url()
    : undefined
  return {
    title: `${data.title} — Phil Labrum`,
    description: data.summary,
    openGraph: ogImage ? { title: data.title, description: data.summary, images: [{ url: ogImage }] } : undefined
  }
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params
  const entry = await client.fetch<EntryDetail | null>(entryDetailQuery, { slug }, { next: { tags: ['entry'] } })
  if (!entry) notFound()

  return (
    <article className="relative mx-auto max-w-measure">
      <header className="mb-9">
        <h1 className="max-sm:text-[28px] m-0 mb-4 text-[36px] font-semibold leading-[1.18] tracking-[-0.01em] text-text-strong">
          {entry.title}
        </h1>
        <div className="max-sm:flex-col max-sm:items-start flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-sans">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-muted">
            <time dateTime={entry.publishedAt}>{formatLong(entry.publishedAt)}</time>
            {entry.updatedAt && <span className="text-accent">· Updated {formatLong(entry.updatedAt)}</span>}
            {entry.links && entry.links.length > 0 && (
              <span
                aria-hidden
                className="text-rule"
              >
                ·
              </span>
            )}
            <EntryLinks links={entry.links} />
          </div>
          {entry.tags && entry.tags.length > 0 && (
            <div className="max-sm:text-left text-[12px] lowercase tracking-[0.02em] text-muted">
              {entry.tags.map(t => t.name).join('  ·  ')}
            </div>
          )}
        </div>
      </header>

      {entry.body && <PortableTextRenderer value={entry.body} />}

      <nav
        className="mt-16 border-t border-rule pt-6 font-sans"
        aria-label="Writing"
      >
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
