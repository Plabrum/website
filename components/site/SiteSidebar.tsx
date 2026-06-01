'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { cn } from 'lib/utils'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from 'components/ui/sheet'

interface NavItem {
  label: string
  href: string
}

// The site's top-level sections. Kept in sync with the header used on the
// gallery page (components/site/Header.tsx). `/projects` is only a redirect to
// `/writing`, so it is intentionally not a nav item.
const navItems: NavItem[] = [
  { label: 'About', href: '/' },
  { label: 'Writing', href: '/writing' },
  { label: 'Experience', href: '/experience' }
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const brandClass = 'font-sans text-sm font-semibold uppercase tracking-[0.04em] text-text no-underline'

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {navItems.map(l => {
        const active = isActive(pathname, l.href)
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? 'page' : undefined}
              {...(onNavigate ? { onClick: onNavigate } : {})}
              className={cn(
                'font-sans text-[15px] font-medium no-underline transition-colors',
                active ? 'text-accent' : 'text-muted hover:text-text'
              )}
            >
              {l.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function SiteSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: a small nav floating in the left gutter of the centered
          content column. Scrolls with the page, Mitchell-style. */}
      <nav className="absolute right-full top-12 mr-8 hidden w-[150px] md:top-[72px] lg:block">
        <Link
          href="/"
          className={brandClass}
        >
          Phil Labrum
        </Link>
        <div className="mt-8">
          <NavLinks pathname={pathname} />
        </div>
      </nav>

      {/* Mobile: a hamburger that opens the shadcn Sheet drawer. */}
      <div className="absolute inset-x-5 top-4 flex items-center justify-between md:inset-x-7 lg:hidden">
        <Link
          href="/"
          className={brandClass}
        >
          Phil Labrum
        </Link>
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger
            aria-label="Open navigation"
            className="text-muted transition-colors hover:text-text"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[260px] border-rule bg-bg p-0 text-text"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Site navigation links</SheetDescription>
            <div className="px-6 pt-14">
              <SheetClose asChild>
                <Link
                  href="/"
                  className={brandClass}
                >
                  Phil Labrum
                </Link>
              </SheetClose>
              <div className="mt-8">
                <NavLinks
                  pathname={pathname}
                  onNavigate={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
