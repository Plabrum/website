import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from 'lib/sanity.client'
import PortableTextRenderer from 'components/portable-text'
import { projectYear } from 'lib/format'
import type { PortableTextBlock } from 'sanity'

type Props = { params: Promise<{ slug: string }> }

type ProjectDetail = {
  title: string
  meta_description?: string
  blurb?: PortableTextBlock[]
  description?: PortableTextBlock[]
  duration?: { start?: string; end?: string }
  repo_url?: string
  demo_url?: string
}

// The slug field in Sanity stores the leading "/projects/" prefix, but the URL
// param won't include that — match by either the bare slug or the prefixed form.
const projectDetailQuery = defineQuery(`*[_type=="project" && (slug.current == $slug || slug.current == $prefixed)][0]{
  title, meta_description, blurb, description, duration, repo_url, demo_url
}`)

const projectSlugsQuery = defineQuery(`*[_type=="project" && defined(slug.current)].slug.current`)

const projectMetaQuery = defineQuery(`*[_type=="project" && (slug.current == $slug || slug.current == $prefixed)][0]{ title, meta_description }`)

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery, {}, {
    next: { tags: ['project'] },
  })
  return slugs.map((s) => ({ slug: s.replace(/^\/projects\//, '') }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const data = await client.fetch<{ title?: string; meta_description?: string } | null>(
    projectMetaQuery,
    { slug, prefixed: `/projects/${slug}` },
    { next: { tags: ['project'] } },
  )
  if (!data) return { title: 'Not found' }
  return {
    title: `${data.title} — Phil Labrum`,
    description: data.meta_description,
  }
}

function blurbToText(blurb?: PortableTextBlock[]): string {
  if (!blurb) return ''
  return blurb
    .map((b) => {
      const block = b as { _type?: string; children?: Array<{ text?: string }> }
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((c) => c.text || '').join('')
    })
    .join(' ')
    .trim()
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await client.fetch<ProjectDetail | null>(
    projectDetailQuery,
    { slug, prefixed: `/projects/${slug}` },
    { next: { tags: ['project'] } },
  )
  if (!project) notFound()

  const year = projectYear(project.duration?.start, project.duration?.end)
  const blurb = blurbToText(project.blurb)
  const sub = [year, blurb].filter(Boolean).join(' · ')

  return (
    <article className="mx-auto max-w-measure">
      <h1 className="text-[34px] m-0 mb-1.5 font-semibold tracking-[-0.01em] text-text-strong max-sm:text-[28px]">
        {project.title}
      </h1>
      {sub && (
        <div className="font-sans text-muted text-[13px] uppercase tracking-[0.08em] mb-9">
          {sub}
        </div>
      )}

      {project.description && <PortableTextRenderer value={project.description} />}

      {(project.repo_url || project.demo_url) && (
        <div className="mt-9 font-sans text-[14.5px] text-muted">
          {project.repo_url && (
            <p className="m-0 mb-1.5">
              Repo:{' '}
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent border-b border-accent/35 hover:text-accent-hover hover:border-accent-hover"
              >
                {project.repo_url.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
          {project.demo_url && (
            <p className="m-0 mb-1.5">
              Live:{' '}
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent border-b border-accent/35 hover:text-accent-hover hover:border-accent-hover"
              >
                {project.demo_url.replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
        </div>
      )}

      <nav className="mt-16 pt-6 border-t border-rule font-sans" aria-label="Projects">
        <Link
          href="/projects"
          className="text-[11px] uppercase tracking-[0.1em] text-muted no-underline hover:text-accent"
        >
          ← All projects
        </Link>
      </nav>
    </article>
  )
}
