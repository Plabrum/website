'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinkClass = 'font-sans text-[13px] uppercase tracking-[0.04em] transition-colors'

const navItems = [
  { href: '/', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/experience', label: 'Experience' }
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="mb-16 flex items-baseline justify-between border-b border-rule pb-[18px]">
      <Link
        href="/"
        className="font-sans text-sm font-semibold uppercase tracking-[0.04em] text-text no-underline"
      >
        Phil Labrum
      </Link>
      <nav>
        <ul className="m-0 flex list-none gap-[22px] p-0">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={`${navLinkClass} ${
                  isActive(pathname, item.href) ? 'text-accent' : 'text-muted hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
