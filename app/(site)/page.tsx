import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'
import PortableTextRenderer from 'components/portable-text'
import type { PortableTextBlock } from 'sanity'

interface HomeData {
  about: {
    name?: string
    bio?: string
    intro?: PortableTextBlock[]
  } | null
}

const homeQuery = defineQuery(`{
  "about": *[_type=="siteSettings" && !(_id in path('drafts.**'))][0]{
    name, bio, intro
  }
}`)

export default async function Page() {
  const data = await client.fetch<HomeData>(
    homeQuery,
    {},
    {
      next: { tags: ['siteSettings'] }
    }
  )
  const about = data.about

  return (
    <div className="mx-auto max-w-measure">
      <section className="mb-4">
        <h1 className="m-0 mb-6 font-serif text-[28px] leading-tight text-text">
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- empty-string name should fall back to default, not render blank */}
          {about?.name || 'Phil Labrum'}
        </h1>
        {about?.intro && about.intro.length > 0 ? (
          <PortableTextRenderer
            value={about.intro}
            compact
          />
        ) : (
          about?.bio && <p className="m-0 text-[15px] leading-[1.6] text-muted">{about.bio}</p>
        )}
      </section>
    </div>
  )
}
