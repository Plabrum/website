'use client'

import { Fragment, useState } from 'react'
import { IndexList, type IndexListItem } from 'components/site/IndexList'

export type WritingItem = IndexListItem & { type: 'essay' | 'project' }

type Filter = 'all' | 'essay' | 'project'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'essay', label: 'Essays' },
  { value: 'project', label: 'Projects' }
]

/**
 * The "Writing" index header and its filter.
 *
 * The heading anchors the left edge; the type filter is demoted to a quiet
 * cluster on the opposite edge — small caps, middot separators, color-only
 * state. Inactive labels sit muted, the selection reads as plain text (legible
 * against its dimmer neighbours), and brass is reserved for hover/focus so the
 * control rhymes with the IndexList rows below rather than competing with the
 * heading.
 */
export function WritingFilter({ items, heading }: { items: WritingItem[]; heading: string }) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? items : items.filter(i => i.type === filter)

  return (
    <>
      <div className="mb-[18px] flex items-baseline justify-between gap-4">
        <h2 className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted">{heading}</h2>
        <div
          className="flex items-baseline gap-2.5"
          role="group"
          aria-label="Filter writing"
        >
          {FILTERS.map((f, i) => {
            const active = filter === f.value
            return (
              <Fragment key={f.value}>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="select-none text-[10px] text-rule"
                  >
                    ·
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFilter(f.value)
                  }}
                  aria-pressed={active}
                  className={`cursor-pointer border-0 bg-transparent p-0 font-sans text-[10px] uppercase tracking-[0.1em] transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none ${
                    active ? 'text-text' : 'text-muted/70'
                  }`}
                >
                  {f.label}
                </button>
              </Fragment>
            )
          })}
        </div>
      </div>
      <IndexList items={visible} />
    </>
  )
}
