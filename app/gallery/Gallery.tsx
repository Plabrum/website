'use client'

import { CSSProperties, useEffect, useState } from 'react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { IndexList } from 'components/site/IndexList'
import Header from 'components/site/Header'
import PortableTextRenderer from 'components/portable-text'
import { palettes } from './palettes'
import { sampleBlocks } from './sample-content'

type Mode = 'light' | 'dark'

const sampleEssays = [
  {
    key: 'e1',
    href: '#',
    meta: '2026',
    title: 'On the durability of plain text',
    blurb: 'Why the files that outlive us are the ones with the fewest dependencies.'
  },
  { key: 'e2', href: '#', meta: '2025', title: 'Notes toward a quieter interface' },
  { key: 'e3', href: '#', meta: '2025', title: 'The compiler is a reading of the spec' }
]

const sampleProjects = [
  { key: 'p1', href: '#', meta: 'Next.js · Sanity', title: 'plabrum.com' },
  { key: 'p2', href: '#', meta: '2024', title: 'Durations — a tiny time-input' },
  { key: 'p3', href: '#', meta: '2018–22', title: 'Older work' }
]

// Mirrors the <figure>/<figcaption> in components/portable-text/index.tsx's image
// serializer. We can't reuse that serializer directly: it renders through
// SanityImage, which only builds Sanity-CDN URLs from an asset ref and can't show
// an external picsum src. A seeded picsum URL keeps the image stable across loads
// and needs no next/image remotePatterns entry (plain <img>, not next/image).
function PreviewFigure() {
  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/plabrum/1200/800"
        alt="A placeholder landscape"
        className="h-auto w-full"
      />
      <figcaption className="mt-2.5 flex items-baseline gap-2.5 text-muted">
        <span className="flex-shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em]">
          Fig. 01
        </span>
        <span className="text-sm leading-snug">
          An inline figure carries a mono &ldquo;Fig. NN&rdquo; plate label in the caption row.
        </span>
      </figcaption>
    </figure>
  )
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-4 w-4 rounded-sm border border-black/10"
        style={{ background: color }}
      />
      <span className="font-mono text-[11px] text-muted">
        {label} {color}
      </span>
    </div>
  )
}

export default function Gallery() {
  const [paletteId, setPaletteId] = useState('current')
  const [mode, setMode] = useState<Mode>('light')

  // Restore the last viewed combo so flipping back and forth across reloads is painless.
  useEffect(() => {
    const saved = localStorage.getItem('gallery-state')
    if (saved) {
      try {
        const { paletteId: p, mode: m } = JSON.parse(saved)
        if (p) setPaletteId(p)
        if (m === 'light' || m === 'dark') setMode(m)
      } catch {
        /* ignore malformed */
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gallery-state', JSON.stringify({ paletteId, mode }))
  }, [paletteId, mode])

  const palette = palettes.find(p => p.id === paletteId) ?? palettes[0]
  const vars = palette[mode]

  return (
    <div className="min-h-screen bg-[#111113] font-sans text-[#e7e6e3]">
      {/* Toolbar — styled with fixed chrome colors so it never re-skins with the palette */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1d]/95 backdrop-blur">
        <div className="mx-auto max-w-[1100px] px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">Palette</span>
              <div className="flex flex-wrap gap-1.5">
                {palettes.map(p => {
                  const active = p.id === paletteId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaletteId(p.id)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                        active
                          ? 'border-white/70 bg-white/10 text-white'
                          : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white/80'
                      }`}
                    >
                      <span className="flex -space-x-1">
                        <span
                          className="h-3 w-3 rounded-full ring-1 ring-black/30"
                          style={{ background: p[mode]['--accent'] }}
                        />
                        <span
                          className="h-3 w-3 rounded-full ring-1 ring-black/30"
                          style={{ background: p[mode]['--bg'] }}
                        />
                      </span>
                      {p.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
              {(['light', 'dark'] as Mode[]).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-3 py-1 text-[12px] capitalize transition-colors ${
                    mode === m ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-2 max-w-[760px] text-[12.5px] leading-snug text-white/45">
            <span className="text-white/70">{palette.label}.</span> {palette.blurb}
          </p>
        </div>
      </div>

      {/* The preview surface — scoped CSS vars cascade to every real component inside */}
      <div className="mx-auto max-w-[1100px] px-6 py-8">
        <div
          className="rounded-xl border border-black/30 bg-bg shadow-2xl"
          style={vars as CSSProperties}
        >
          {/* swatch legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-rule px-8 py-4">
            <Swatch
              color={vars['--bg']}
              label="bg"
            />
            <Swatch
              color={vars['--text']}
              label="text"
            />
            <Swatch
              color={vars['--accent']}
              label="accent"
            />
            <Swatch
              color={vars['--accent-deep']}
              label="deep"
            />
            <Swatch
              color={vars['--muted']}
              label="muted"
            />
            <Swatch
              color={vars['--code-bg']}
              label="code"
            />
          </div>

          <div className="max-sm:px-5 px-8 py-10">
            <div className="mx-auto max-w-wide">
              {/* Real site Header. Nav links navigate for real — use browser back. */}
              <Header />

              <div className="mx-auto max-w-measure font-serif text-[18.5px] leading-[1.65] text-text">
                {/* Real PortableTextRenderer driving every prose serializer */}
                <PortableTextRenderer value={sampleBlocks} />

                {/* Figure preview (picsum) — see PreviewFigure note */}
                <PreviewFigure />

                <div className="mb-10 mt-12">
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">Writing</p>
                  <IndexList items={sampleEssays} />
                </div>

                <div className="mb-10">
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">Projects</p>
                  <IndexList
                    items={sampleProjects}
                    showIndex={false}
                  />
                </div>

                <div className="mb-10 flex flex-wrap items-center gap-3">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>

                <div className="max-w-sm">
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
                    Form focus (click in)
                  </p>
                  <Input placeholder="you@example.com" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[12px] text-white/30">Local preview only · not shipped · /gallery</p>
      </div>
    </div>
  )
}
