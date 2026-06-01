import Link from 'next/link'

export type IndexListItem = {
  key: string
  href: string
  meta: string
  title: string
  blurb?: string
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
export function IndexList({
  items,
  showIndex = true,
}: {
  items: IndexListItem[]
  showIndex?: boolean
}) {
  return (
    <ul className="list-none m-0 p-0 border-y border-rule">
      {items.map((item, i) => (
        <li key={item.key} className="group py-2.5">
          <div className="flex items-baseline gap-3.5">
            {showIndex && (
              <span
                aria-hidden
                className="font-mono text-[12px] text-muted min-w-[1.75rem] flex-shrink-0 transition-colors group-hover:text-accent"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <Link
              href={item.href}
              className="font-sans text-text no-underline text-[17px] min-w-0 truncate transition-colors group-hover:text-accent focus-visible:text-accent focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
            >
              {item.title}
            </Link>
            <span
              aria-hidden
              className="hidden xs:block flex-1 min-w-[1.5rem] -translate-y-[0.3em] border-b border-dotted border-rule transition-colors group-hover:border-muted"
            />
            <span className="font-sans text-muted tabular-nums text-[13px] flex-shrink-0 ml-auto">
              {item.meta}
            </span>
          </div>
          {item.blurb && (
            <p
              className={`m-0 mt-1 font-sans text-muted text-[13px] leading-snug ${
                showIndex ? 'pl-[2.55rem]' : ''
              }`}
            >
              {item.blurb}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
