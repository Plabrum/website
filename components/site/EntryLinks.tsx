import { SiGithub, SiFigma, SiYoutube, SiX, SiNpm, SiVercel } from '@icons-pack/react-simple-icons'
import { Globe } from 'lucide-react'
import type { ComponentType } from 'react'

export interface EntryLink {
  url: string
  caption?: string
}

interface IconProps {
  size?: number
  color?: string
  className?: string
}

/**
 * Outbound links shown as an icon row under an entry's title. The icon and a
 * default caption are derived from the URL's hostname — paste a GitHub URL and
 * it resolves to the GitHub mark + "Code". Brand marks come from simple-icons;
 * anything unrecognised falls back to a generic globe. Forced to `currentColor`
 * so links read brass-on-hover like everything else, not in brand colours.
 */
const REGISTRY: { test: RegExp; Icon: ComponentType<IconProps>; label: string }[] = [
  { test: /(^|\.)github\.com$/, Icon: SiGithub, label: 'Code' },
  { test: /(^|\.)figma\.com$/, Icon: SiFigma, label: 'Figma' },
  { test: /(^|\.)(youtube\.com|youtu\.be)$/, Icon: SiYoutube, label: 'Video' },
  { test: /(^|\.)(x\.com|twitter\.com)$/, Icon: SiX, label: 'X' },
  { test: /(^|\.)npmjs\.com$/, Icon: SiNpm, label: 'npm' },
  { test: /(^|\.)vercel\.app$/, Icon: SiVercel, label: 'Live' }
]

function resolve(url: string): { Icon: ComponentType<IconProps>; label: string } {
  let host = ''
  try {
    host = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    // malformed URL — fall through to the generic globe
  }
  const brand = REGISTRY.find(b => b.test.test(host))
  if (brand) return { Icon: brand.Icon, label: brand.label }
  return { Icon: Globe, label: host || 'Link' }
}

export function EntryLinks({ links, className }: { links?: EntryLink[] | undefined; className?: string }) {
  if (!links || links.length === 0) return null
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5${className ? ` ${className}` : ''}`}>
      {links.map((link, i) => {
        const { Icon, label } = resolve(link.url)
        return (
          <a
            key={`${link.url}-${i}`}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] text-muted no-underline transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            <Icon
              size={14}
              color="currentColor"
              className="flex-shrink-0"
            />
            {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- an empty-string caption should fall back to the derived label, not render blank */}
            <span>{link.caption || label}</span>
          </a>
        )
      })}
    </div>
  )
}
