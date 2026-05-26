import { defineQuery } from 'next-sanity'
import Link from 'next/link'
import { client } from 'lib/sanity.client'
import SanityImage from 'components/general/SanityImage'
import PortableTextRenderer from 'components/portable-text'
import ContactForm from 'components/site/ContactForm'
import { formatDate, formatYearRange, projectYear } from 'lib/format'
import type { Image, PortableTextBlock } from 'sanity'

type Company = { name?: string; logo_image?: Image }

type ExperienceItem = {
  _id: string
  role?: string
  duration?: { start?: string; end?: string }
  description?: PortableTextBlock[]
  company?: Company
}

type EducationItem = {
  _id: string
  school?: string
  degree?: string
  year_start?: number
  year_end?: number
  company?: Company
}

type HomeData = {
  about: {
    name?: string
    bio?: string
    hero_photo?: Image
  } | null
  essays: Array<{ title: string; slug: string; publishedAt: string }>
  projects: Array<{
    title: string
    slug: string
    blurb?: PortableTextBlock[]
    duration?: { start?: string; end?: string }
  }>
  featuredExperience: ExperienceItem[]
  earlierExperience: ExperienceItem[]
  education: EducationItem[]
}

const homeQuery = defineQuery(`{
  "about": *[_type=="siteSettings" && !(_id in path('drafts.**'))][0]{
    name, bio, hero_photo
  },
  "essays": *[_type=="post" && !(_id in path('drafts.**')) && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc)[0...3]{
      title, "slug": slug.current, publishedAt
    },
  "projects": *[_type=="project" && !(_id in path('drafts.**')) && pin == true]
    | order(duration.end desc)[0...3]{
      title, "slug": slug.current, blurb, duration
    },
  "featuredExperience": *[_type=="experience" && !(_id in path('drafts.**')) && featured == true]
    | order(duration.start desc){
      _id, role, duration, description,
      "company": company->{ name, logo_image }
    },
  "earlierExperience": *[_type=="experience" && !(_id in path('drafts.**')) && featured != true]
    | order(duration.start desc){
      _id, role, duration,
      "company": company->{ name, logo_image }
    },
  "education": *[_type=="education" && !(_id in path('drafts.**'))]
    | order(year_end desc){
      _id, school, degree, year_start, year_end,
      "company": company->{ name, logo_image }
    }
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

const sectionHeadingClass =
  'font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-14 mb-[18px] flex items-baseline justify-between scroll-mt-24'
const sectionLinkClass = 'text-muted no-underline text-[11px] font-medium hover:text-accent'
const entriesClass = 'list-none m-0 p-0 border-t border-rule'
const entryItemClass =
  'flex gap-5 py-3.5 items-baseline border-b border-rule max-sm:flex-wrap max-sm:gap-1.5'
const entryDateClass =
  'font-sans text-muted tabular-nums text-[13px] min-w-[100px] flex-shrink-0 max-sm:min-w-0'
const entryLinkClass = 'text-text no-underline text-[18px] hover:text-accent'
const entryMetaClass = 'font-sans text-muted text-sm ml-1.5'

function Logo({ company, size = 26 }: { company?: Company; size?: number }) {
  const monogram = company?.name?.[0]?.toUpperCase() || '·'
  const hasImage = !!company?.logo_image?.asset?._ref
  const dim =
    size === 26
      ? 'w-[26px] h-[26px] text-[11px]'
      : 'w-[22px] h-[22px] text-[10px] mr-1.5 -translate-y-[1px]'
  return (
    <span
      className={`inline-flex items-center justify-center ${dim} rounded-full border border-rule text-muted bg-bg font-mono uppercase font-medium leading-none overflow-hidden flex-shrink-0 transition-colors group-hover:text-accent group-hover:border-accent/40`}
      aria-hidden="true"
    >
      {hasImage && company?.logo_image ? (
        <SanityImage
          sanitySrc={company.logo_image}
          width={size * 2}
          height={size * 2}
          alt=""
          className="w-full h-full object-cover block"
        />
      ) : (
        monogram
      )}
    </span>
  )
}

export default async function Page() {
  const data = await client.fetch<HomeData>(homeQuery, {}, {
    next: { tags: ['siteSettings', 'post', 'project', 'experience', 'education'] },
  })
  const about = data.about
  const bio = about?.bio || ''

  return (
    <div className="mx-auto max-w-measure">
      <section className="flex gap-6 items-center mb-14">
        <div
          className="w-[88px] h-[88px] rounded-full flex-shrink-0 overflow-hidden relative bg-gradient-to-br from-[#c08458] to-[#6a3a1c]"
          aria-hidden={about?.hero_photo ? undefined : true}
        >
          {about?.hero_photo && (
            <SanityImage
              sanitySrc={about.hero_photo}
              width={176}
              height={176}
              alt={about?.name || 'Phil Labrum'}
              className="w-full h-full object-cover block"
            />
          )}
        </div>
        <div className="min-w-0">
          <h1 className="font-serif text-[28px] leading-tight m-0 mb-1 text-text">
            {about?.name || 'Phil Labrum'}
          </h1>
          {bio && <p className="m-0 text-[17px] leading-[1.5] text-muted">{bio}</p>}
        </div>
      </section>

      {data.essays.length > 0 && (
        <>
          <h2 className={sectionHeadingClass} id="writing">
            <span>Writing</span>
            <Link href="/essays" className={sectionLinkClass}>See all →</Link>
          </h2>
          <ul className={entriesClass}>
            {data.essays.map((e) => (
              <li key={e.slug} className={entryItemClass}>
                <span className={entryDateClass}>{formatDate(e.publishedAt)}</span>
                <Link href={`/essays/${e.slug}`} className={entryLinkClass}>{e.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className={sectionHeadingClass} id="projects">
        <span>Projects</span>
        {data.projects.length > 0 && <Link href="/projects" className={sectionLinkClass}>See all →</Link>}
      </h2>
      {data.projects.length > 0 ? (
        <ul className={entriesClass}>
          {data.projects.map((p) => {
            const blurb = blurbToText(p.blurb)
            return (
              <li key={p.slug} className={entryItemClass}>
                <span className={entryDateClass}>{projectYear(p.duration?.start, p.duration?.end)}</span>
                <Link href={projectHref(p.slug)} className={entryLinkClass}>{p.title}</Link>
                {blurb && <span className={entryMetaClass}>{blurb}</span>}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-muted">No projects yet.</p>
      )}

      <h2 className={sectionHeadingClass} id="experience">
        <span>Experience</span>
      </h2>
      {data.featuredExperience.map((role) => (
        <div className="group mb-11" key={role._id}>
          <div className="grid grid-cols-[1fr_auto] gap-5 items-baseline mb-1.5">
            <h3 className="font-sans text-[13px] uppercase tracking-[0.12em] font-normal text-text m-0">
              {role.role}
            </h3>
            <span className="font-sans text-muted text-xs tracking-[0.06em] tabular-nums whitespace-nowrap">
              {formatYearRange(role.duration?.start, role.duration?.end)}
            </span>
          </div>
          <p className="font-serif italic text-muted text-base m-0 mb-3.5 flex items-center gap-2">
            <Logo company={role.company} />
            {role.company?.name}
          </p>
          {role.description && <PortableTextRenderer value={role.description} />}
        </div>
      ))}

      {data.earlierExperience.length > 0 && (
        <>
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-12 mb-6 pt-6 border-t border-rule">
            Earlier
          </h3>
          <ul className="list-none m-0 p-0">
            {data.earlierExperience.map((r) => (
              <li
                key={r._id}
                className="group grid grid-cols-[100px_1fr] gap-5 py-2 items-baseline font-sans text-[14.5px]"
              >
                <span className="text-muted text-[13px] tabular-nums">
                  {formatYearRange(r.duration?.start, r.duration?.end)}
                </span>
                <span className="text-text">
                  <Logo company={r.company} size={22} />
                  <em className="font-serif text-muted italic">{r.company?.name}</em>
                  {r.role && <> · {r.role}</>}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-12 mb-6 pt-6 border-t border-rule">
            Education
          </h3>
          <ul className="list-none m-0 p-0">
            {data.education.map((e) => {
              const range =
                e.year_start && e.year_end
                  ? e.year_start === e.year_end
                    ? `${e.year_end}`
                    : `${e.year_start} — ${e.year_end}`
                  : `${e.year_end || e.year_start || ''}`
              return (
                <li
                  key={e._id}
                  className="group grid grid-cols-[100px_1fr] gap-5 py-2 items-baseline font-sans text-[14.5px]"
                >
                  <span className="text-muted text-[13px] tabular-nums">{range}</span>
                  <span className="text-text">
                    <Logo company={e.company || { name: e.school }} size={22} />
                    <em className="font-serif text-muted italic">{e.school}</em>
                    {e.degree && <> · {e.degree}</>}
                  </span>
                </li>
              )
            })}
          </ul>
        </>
      )}

      <h2 className={sectionHeadingClass} id="contact">
        <span>Contact</span>
      </h2>
      <ContactForm />
    </div>
  )
}
