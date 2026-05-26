import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { client } from 'lib/sanity.client'
import { projectYear } from 'lib/format'
import type { PortableTextBlock } from 'sanity'

export const metadata = {
  title: 'Projects — Phil Labrum',
  description: 'A working record of projects.',
}

type ProjectRow = {
  title: string
  slug: string
  blurb?: PortableTextBlock[]
  duration?: { start?: string; end?: string }
}

const projectsIndexQuery = defineQuery(`*[_type=="project" && !(_id in path('drafts.**')) && defined(slug.current)]
  | order(coalesce(duration.end, duration.start) desc){
    title, "slug": slug.current, blurb, duration
  }`)

function projectHref(s: string): string {
  return s.startsWith('/projects/') ? s : `/projects/${s}`
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

export default async function ProjectsIndex() {
  const projects = await client.fetch<ProjectRow[]>(projectsIndexQuery, {}, {
    next: { tags: ['project'] },
  })
  return (
    <div className="mx-auto max-w-measure">
      <h2 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-14 mb-[18px] flex items-baseline justify-between">
        Projects
      </h2>
      {projects.length === 0 ? (
        <p className="text-muted">No projects yet.</p>
      ) : (
        <ul className="list-none m-0 p-0 border-t border-rule">
          {projects.map((p) => {
            const blurb = blurbToText(p.blurb)
            return (
              <li
                key={p.slug}
                className="flex gap-5 py-3.5 items-baseline border-b border-rule max-sm:flex-wrap max-sm:gap-1.5"
              >
                <span className="font-sans text-muted tabular-nums text-[13px] min-w-[100px] flex-shrink-0 max-sm:min-w-0">
                  {projectYear(p.duration?.start, p.duration?.end)}
                </span>
                <Link href={projectHref(p.slug)} className="text-text no-underline text-[18px] hover:text-accent">
                  {p.title}
                </Link>
                {blurb && <span className="font-sans text-muted text-sm ml-1.5">{blurb}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
