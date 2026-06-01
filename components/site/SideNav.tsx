'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  label: string
  href: string
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SideNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname()

  return (
    <nav className="max-sm:flex-row max-sm:flex-wrap max-sm:gap-x-[22px] max-sm:gap-y-2 flex font-sans text-[13px] uppercase tracking-[0.04em] sm:flex-col sm:gap-[10px]">
      {links.map(l => {
        const active = isActive(pathname, l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? 'page' : undefined}
            className={`no-underline transition-colors hover:text-accent ${active ? 'text-accent' : 'text-muted'}`}
          >
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
