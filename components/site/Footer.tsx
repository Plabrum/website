import { defineQuery } from 'next-sanity'
import { client } from 'lib/sanity.client'

const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{ linkedinUrl, githubUrl }`)

export default async function Footer() {
  const year = new Date().getFullYear()
  const settings = await client.fetch(siteSettingsQuery, {}, {
    next: { tags: ['siteSettings'] },
  })
  const linkClass = 'text-muted no-underline hover:text-accent transition-colors'
  return (
    <footer className="mt-24 pt-[18px] border-t border-rule text-muted text-[13px] flex justify-between font-sans">
      <span>© {year} Phil Labrum</span>
      <span>
        {settings?.githubUrl && (
          <>
            <a href={settings?.githubUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>GitHub</a>
            {' · '}
          </>
        )}
        {settings?.linkedinUrl && (
          <>
            <a href={settings?.linkedinUrl} target="_blank" rel="noreferrer noopener" className={linkClass}>LinkedIn</a>
            {' · '}
          </>
        )}
        <a href="/feed.xml" className={linkClass}>RSS</a>
      </span>
    </footer>
  )
}
