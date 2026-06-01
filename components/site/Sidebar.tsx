import Link from 'next/link'
import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'
import SideNav from './SideNav'

const navQuery = defineQuery(`*[_type == "siteSettings"][0]{ navLinks[]{ label, href } }`)

interface NavSettings {
  navLinks: { label: string; href: string }[] | null
}

export default async function Sidebar() {
  const settings = await client.fetch<NavSettings | null>(navQuery, {}, { next: { tags: ['siteSettings'] } })
  const links = settings?.navLinks?.length
    ? settings.navLinks
    : [
        { label: 'Writing', href: '/writing' },
        { label: 'Projects', href: '/projects' }
      ]

  return (
    <aside className="max-sm:w-full shrink-0 self-start sm:sticky sm:top-[72px] sm:w-[200px]">
      <Link
        href="/"
        className="font-sans text-sm font-semibold uppercase tracking-[0.04em] text-text no-underline"
      >
        Phil Labrum
      </Link>
      <div className="max-sm:mt-4 mt-8">
        <SideNav links={links} />
      </div>
    </aside>
  )
}
