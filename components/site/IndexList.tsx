import Link from 'next/link'

export interface IndexListItem {
  key: string
  href: string
  meta: string
  title: string
  blurb?: string | undefined
}

/**
 * The "Compendium" index — a printed table-of-contents row.
 *
 * Title and date are joined by a dotted leader; each entry carries a mono
 * catalog numeral that rhymes with the § section numerals in the type system.
 * State is communicated by color only (brass on hover/focus) — no motion,
 * per the B4 design rules. The numerals/leader/title all sit on `--bg`, so
 * they use `--accent` (brass on dark), which is correct under the split-accent
 * rule. The leader is hidden below the `xs` breakpoint, where the title and
 * date sit at the two edges instead.
 */
export function IndexList({ items, showIndex = true }: { items: IndexListItem[]; showIndex?: boolean }) {
  return (
    <ul className="m-0 list-none border-y border-rule p-0">
      {items.map((item, i) => (
        <li
          key={item.key}
          className="group py-2.5"
        >
          <div className="flex items-baseline gap-3.5">
            {showIndex && (
              <span
                aria-hidden
                className="min-w-[1.75rem] flex-shrink-0 font-mono text-[12px] text-muted transition-colors group-hover:text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <Link
              href={item.href}
              className="min-w-0 truncate font-sans text-[17px] text-text no-underline transition-colors focus-visible:text-accent focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none group-hover:text-accent"
            >
              {item.title}
            </Link>
            <span
              aria-hidden
              className="hidden min-w-[1.5rem] flex-1 -translate-y-[0.3em] border-b border-dotted border-rule transition-colors group-hover:border-muted xs:block"
            />
            <span className="ml-auto flex-shrink-0 font-sans text-[13px] tabular-nums text-muted">{item.meta}</span>
          </div>
          {item.blurb && (
            <p className={`m-0 mt-1 font-sans text-[13px] leading-snug text-muted ${showIndex ? 'pl-[2.55rem]' : ''}`}>
              {item.blurb}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
