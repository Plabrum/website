import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'
import SanityImage from 'components/general/SanityImage'
import PortableTextRenderer from 'components/portable-text'
import { formatYearRange } from 'lib/format'
import type { Image, PortableTextBlock } from 'sanity'

export const metadata = {
  title: 'Experience — Phil Labrum',
  description: 'Roles, research, and education.',
}

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

type ExperienceData = {
  featuredExperience: ExperienceItem[]
  earlierExperience: ExperienceItem[]
  education: EducationItem[]
}

const experienceQuery = defineQuery(`{
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

function Logo({ company, size = 26 }: { company?: Company; size?: number }) {
  const monogram = company?.name?.[0]?.toUpperCase() || '·'
  const hasImage = !!company?.logo_image?.asset?._ref
  const dim =
    size === 26
      ? 'w-[26px] h-[26px] text-[11px]'
      : 'w-[26px] h-[26px] text-[11px] mr-1.5 align-middle'
  return (
    <span
      className={`inline-flex items-center justify-center ${dim} rounded-[6px] border border-rule text-muted bg-bg font-mono uppercase font-medium leading-none overflow-hidden flex-shrink-0 transition-colors group-hover:text-accent group-hover:border-accent/40`}
      aria-hidden="true"
    >
      {hasImage && company?.logo_image ? (
        <SanityImage
          sanitySrc={company.logo_image}
          width={64}
          height={64}
          alt=""
          className="w-full h-full object-cover block"
        />
      ) : (
        monogram
      )}
    </span>
  )
}

export default async function ExperienceIndex() {
  const data = await client.fetch<ExperienceData>(experienceQuery, {}, {
    next: { tags: ['experience', 'education'] },
  })

  return (
    <div className="mx-auto max-w-measure">
      <h2 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-14 mb-[18px]">
        Experience
      </h2>

      {data.featuredExperience.map((role) => (
        <div className="group mb-8" key={role._id}>
          <div className="grid grid-cols-[1fr_auto] gap-5 items-baseline mb-1.5">
            <h3 className="font-sans text-[13px] uppercase tracking-[0.12em] font-normal text-text m-0">
              {role.role}
            </h3>
            <span className="font-sans text-muted text-xs tracking-[0.06em] tabular-nums whitespace-nowrap">
              {formatYearRange(role.duration?.start, role.duration?.end)}
            </span>
          </div>
          <p className="font-serif italic text-muted text-[15px] m-0 mb-2.5 flex items-center gap-2">
            <Logo company={role.company} />
            {role.company?.name}
          </p>
          {role.description && <PortableTextRenderer value={role.description} compact />}
        </div>
      ))}

      {data.earlierExperience.length > 0 && (
        <>
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-10 mb-4 pt-5 border-t border-rule">
            Earlier
          </h3>
          <ul className="list-none m-0 p-0">
            {data.earlierExperience.map((r) => (
              <li
                key={r._id}
                className="group grid grid-cols-[100px_1fr] gap-5 py-2 items-baseline font-sans text-[14.5px] leading-snug"
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
          <h3 className="font-sans text-xs uppercase tracking-[0.12em] text-muted font-semibold mt-10 mb-4 pt-5 border-t border-rule">
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
                  className="group grid grid-cols-[100px_1fr] gap-5 py-2 items-baseline font-sans text-[14.5px] leading-snug"
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
    </div>
  )
}
