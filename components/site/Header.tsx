import Link from 'next/link'
import ThemeSwitch from '../general/ThemeSwitch'

const navLinkClass =
  'font-sans text-[13px] uppercase tracking-[0.04em] text-muted hover:text-accent transition-colors'

export default function Header() {
  return (
    <header className="flex items-baseline justify-between mb-16 pb-[18px] border-b border-rule">
      <Link
        href="/"
        className="font-sans font-semibold text-text no-underline text-sm uppercase tracking-[0.04em]"
      >
        Phil Labrum
      </Link>
      <div className="flex gap-[22px] items-center">
        <nav>
          <ul className="list-none m-0 p-0 flex gap-[22px]">
            <li><Link href="/essays" className={navLinkClass}>Writing</Link></li>
            <li><Link href="/projects" className={navLinkClass}>Projects</Link></li>
            <li><Link href="/#experience" className={navLinkClass}>Experience</Link></li>
            <li><Link href="/#contact" className={navLinkClass}>Contact</Link></li>
          </ul>
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  )
}
