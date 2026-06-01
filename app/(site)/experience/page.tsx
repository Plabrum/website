import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'
import SanityImage from 'components/general/SanityImage'
import PortableTextRenderer from 'components/portable-text'
import { formatYearRange } from 'lib/format'
import type { Image, PortableTextBlock } from 'sanity'

export const metadata = {
  title: 'Experience — Phil Labrum',
  description: 'Roles, research, and education.'
}

interface Company {
  name?: string | undefined
  logo_image?: Image
}

interface ExperienceItem {
  _id: string
  role?: string
  duration?: { start?: string; end?: string }
  description?: PortableTextBlock[]
  company?: Company
}

interface EducationItem {
  _id: string
  school?: string
  degree?: string
  year_start?: number
  year_end?: number
  company?: Company
}

interface ExperienceData {
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

function Logo({ company, size = 26 }: { company?: Company | undefined; size?: number }) {
  const monogram = company?.name?.[0]?.toUpperCase() ?? '·'
  const hasImage = !!company?.logo_image?.asset?._ref
  const dim = size === 26 ? 'w-[26px] h-[26px] text-[11px]' : 'w-[26px] h-[26px] text-[11px] mr-1.5 align-middle'
  return (
    <span
      className={`inline-flex items-center justify-center ${dim} group-hover:border-accent/40 flex-shrink-0 overflow-hidden rounded-[6px] border border-rule bg-bg font-mono font-medium uppercase leading-none text-muted transition-colors group-hover:text-accent`}
      aria-hidden="true"
    >
      {hasImage && company.logo_image ? (
        <SanityImage
          sanitySrc={company.logo_image}
          width={64}
          height={64}
          alt=""
          className="block h-full w-full object-cover"
        />
      ) : (
        monogram
      )}
    </span>
  )
}

export default async function ExperienceIndex() {
  const data = await client.fetch<ExperienceData>(
    experienceQuery,
    {},
    {
      next: { tags: ['experience', 'education'] }
    }
  )

  return (
    <div className="mx-auto max-w-measure">
      <h2 className="mb-[18px] mt-14 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        Experience
      </h2>

      {data.featuredExperience.map(role => (
        <div
          className="group mb-8"
          key={role._id}
        >
          <div className="mb-1.5 grid grid-cols-[1fr_auto] items-baseline gap-5">
            <h3 className="m-0 font-sans text-[13px] font-normal uppercase tracking-[0.12em] text-text">{role.role}</h3>
            <span className="whitespace-nowrap font-sans text-xs tabular-nums tracking-[0.06em] text-muted">
              {formatYearRange(role.duration?.start, role.duration?.end)}
            </span>
          </div>
          <p className="m-0 mb-2.5 flex items-center gap-2 font-serif text-[15px] italic text-muted">
            <Logo company={role.company} />
            {role.company?.name}
          </p>
          {role.description && (
            <PortableTextRenderer
              value={role.description}
              compact
            />
          )}
        </div>
      ))}

      {data.earlierExperience.length > 0 && (
        <>
          <h3 className="mb-4 mt-10 border-t border-rule pt-5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Earlier
          </h3>
          <ul className="m-0 list-none p-0">
            {data.earlierExperience.map(r => (
              <li
                key={r._id}
                className="group grid grid-cols-[100px_1fr] items-baseline gap-5 py-2 font-sans text-[14.5px] leading-snug"
              >
                <span className="text-[13px] tabular-nums text-muted">
                  {formatYearRange(r.duration?.start, r.duration?.end)}
                </span>
                <span className="text-text">
                  <Logo
                    company={r.company}
                    size={22}
                  />
                  <em className="font-serif italic text-muted">{r.company?.name}</em>
                  {r.role && <> · {r.role}</>}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.education.length > 0 && (
        <>
          <h3 className="mb-4 mt-10 border-t border-rule pt-5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Education
          </h3>
          <ul className="m-0 list-none p-0">
            {data.education.map(e => {
              const range =
                e.year_start && e.year_end
                  ? e.year_start === e.year_end
                    ? `${e.year_end}`
                    : `${e.year_start} — ${e.year_end}`
                  : `${e.year_end ?? e.year_start ?? ''}`
              return (
                <li
                  key={e._id}
                  className="group grid grid-cols-[100px_1fr] items-baseline gap-5 py-2 font-sans text-[14.5px] leading-snug"
                >
                  <span className="text-[13px] tabular-nums text-muted">{range}</span>
                  <span className="text-text">
                    <Logo
                      company={e.company ?? { name: e.school }}
                      size={22}
                    />
                    <em className="font-serif italic text-muted">{e.school}</em>
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
