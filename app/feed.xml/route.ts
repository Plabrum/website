import { defineQuery } from 'next-sanity'
import { toHTML, PortableTextHtmlComponents } from '@portabletext/to-html'
import { client, imageBuilder } from 'lib/sanity.client'
import type { Image, PortableTextBlock } from 'sanity'

export const dynamic = 'force-static'

type Post = {
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  body?: PortableTextBlock[]
}

const feedQuery = defineQuery(`*[_type=="post" && !(_id in path('drafts.**')) && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)[0...50]{
    title, "slug": slug.current, excerpt, publishedAt, updatedAt, body
  }`)

function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  return 'https://plabrum.com'
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const components: Partial<PortableTextHtmlComponents> = {
  types: {
    code: ({ value }: { value: { language?: string; code: string } }) =>
      `<pre style="background:#f4f0e6;border-left:2px solid #a8531f;padding:12px 14px;overflow-x:auto;"><code>${escapeXml(
        value.code,
      )}</code></pre>`,
    pullQuote: ({ value }: { value: { text: string } }) =>
      `<blockquote style="font-style:italic;text-align:center;font-size:1.2em;margin:24px 0;">${escapeXml(
        value.text,
      )}</blockquote>`,
    sidenote: ({ value }: { value: { text: string } }) =>
      `<aside style="color:#6f6a60;font-size:0.9em;border-left:2px solid #e8e3d8;padding-left:10px;margin:12px 0;">${escapeXml(
        value.text,
      )}</aside>`,
    image: ({ value }: { value: Image & { alt?: string; caption?: string } }) => {
      const src = value?.asset?._ref ? imageBuilder?.image(value).width(1200).url() : ''
      if (!src) return ''
      const cap = value.caption ? `<figcaption>${escapeXml(value.caption)}</figcaption>` : ''
      return `<figure><img src="${src}" alt="${escapeXml(value.alt || '')}" />${cap}</figure>`
    },
    latex: ({ value }: { value: { latex_string: string } }) =>
      `<p><code>${escapeXml(value.latex_string)}</code></p>`,
    external: ({ value }: { value: { link_to_html: string } }) =>
      `<p><a href="${value.link_to_html}">${escapeXml(value.link_to_html)}</a></p>`,
  },
}

export async function GET() {
  const posts = await client.fetch<Post[]>(feedQuery, {}, {
    next: { tags: ['post'] },
  })
  const base = siteUrl()

  const items = posts
    .map((p) => {
      const link = `${base}/essays/${p.slug}`
      const html = p.body ? toHTML(p.body, { components }) : ''
      const pub = new Date(p.publishedAt).toUTCString()
      return `<item>
  <title>${escapeXml(p.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${pub}</pubDate>
  ${p.excerpt ? `<description>${escapeXml(p.excerpt)}</description>` : ''}
  <content:encoded><![CDATA[${html}]]></content:encoded>
</item>`
    })
    .join('\n')

  const lastBuild = posts[0]?.publishedAt
    ? new Date(posts[0].publishedAt).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Phil Labrum</title>
<link>${base}</link>
<description>Essays and notes from Phil Labrum.</description>
<language>en-us</language>
<lastBuildDate>${lastBuild}</lastBuildDate>
<atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
