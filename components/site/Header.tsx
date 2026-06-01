'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinkClass =
  'font-sans text-[13px] uppercase tracking-[0.04em] transition-colors'

const navItems = [
  { href: '/', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/experience', label: 'Experience' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-baseline justify-between mb-16 pb-[18px] border-b border-rule">
      <Link
        href="/"
        className="font-sans font-semibold text-text no-underline text-sm uppercase tracking-[0.04em]"
      >
        Phil Labrum
      </Link>
      <nav>
        <ul className="list-none m-0 p-0 flex gap-[22px]">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={`${navLinkClass} ${
                  isActive(pathname, item.href)
                    ? 'text-accent'
                    : 'text-muted hover:text-accent'
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
