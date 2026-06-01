'use client'

import { useState } from 'react'
import { IndexList, type IndexListItem } from 'components/site/IndexList'

export type WritingItem = IndexListItem & { type: 'essay' | 'project' }

type Filter = 'all' | 'essay' | 'project'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'essay', label: 'Essays' },
  { value: 'project', label: 'Projects' }
]

export function WritingFilter({ items }: { items: WritingItem[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? items : items.filter(i => i.type === filter)

  return (
    <>
      <div
        className="mb-[18px] flex items-center gap-4"
        role="group"
        aria-label="Filter writing"
      >
        {FILTERS.map(f => {
          const active = filter === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setFilter(f.value)
              }}
              aria-pressed={active}
              className={`cursor-pointer border-0 bg-transparent p-0 font-sans text-xs uppercase tracking-[0.08em] transition-colors ${
                active ? 'text-accent' : 'text-muted hover:text-text'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>
      <IndexList items={visible} />
    </>
  )
}
