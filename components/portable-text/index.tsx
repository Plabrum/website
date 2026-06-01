'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'
import { useMemo } from 'react'
import SanityImage from '../general/SanityImage'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { sonokai, sonokaiBg, sonokaiFg, sonokaiDim } from 'lib/sonokai'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

// Number inline images so figcaptions can carry a "Fig. NN" plate label —
// the catalog device that reinforces the project-page-as-caption intent.
function useFigureNumbers(value: PortableTextBlock[] | undefined) {
  return useMemo(() => {
    const map = new Map<string, number>()
    if (!value) return map
    let n = 0
    for (const block of value) {
      const b = block as { _type?: string; _key?: string }
      if (b._type === 'image' && b._key) {
        n += 1
        map.set(b._key, n)
      }
    }
    return map
  }, [value])
}

function slugifyChildren(children: React.ReactNode): string {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
      : ''
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function PortableTextRenderer({
  value,
  compact = false,
}: {
  value: PortableTextBlock[]
  compact?: boolean
}) {
  const figureNumbers = useFigureNumbers(value)

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="mb-[22px]">{children}</p>,
      h2: ({ children }) => {
        const id = slugifyChildren(children)
        return (
          <h2
            id={id}
            className="font-sans text-[12px] uppercase tracking-[0.14em] font-semibold text-muted mt-[56px] mb-5 pt-4 border-t border-rule"
          >
            {children}
          </h2>
        )
      },
      h3: ({ children }) => {
        const id = slugifyChildren(children)
        return (
          <h3
            id={id}
            className="font-serif text-[21px] leading-snug font-semibold text-text-strong mt-10 mb-2.5"
          >
            {children}
          </h3>
        )
      },
      h4: ({ children }) => (
        <h4 className="font-sans text-[12px] uppercase tracking-[0.1em] font-semibold text-muted mt-7 mb-1.5">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 pl-5 border-l border-rule text-muted italic text-[19px]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 mb-[22px]">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-[22px]">{children}</ol>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent border-b border-accent/35 hover:text-accent-hover hover:border-accent-hover"
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="font-mono text-[0.85em] bg-code-bg px-1.5 py-px rounded-sm">{children}</code>
      ),
      em: ({ children }) => <em>{children}</em>,
      strong: ({ children }) => <strong>{children}</strong>,
    },
    types: {
      // A ruled statement band, not a magazine pull quote: left-aligned serif
      // set off by top/bottom hairlines — the same border-y grammar as the
      // section headings, no breakout, no decorative quote glyphs.
      pullQuote: ({ value }: { value: { text: string } }) => (
        <aside className="my-10 border-y border-rule py-7 font-serif italic text-[22px] leading-[1.45] text-text-strong max-sm:my-8 max-sm:py-6 max-sm:text-[20px]">
          {value.text}
        </aside>
      ),
      sidenote: ({ value }: { value: { text: string } }) => (
        <span className="sidenote font-sans text-[13.5px] leading-[1.5] text-muted">
          <details>
            <summary>†</summary>
            <span className="sidenote-body">{value.text}</span>
          </details>
        </span>
      ),
      image: ({
        value,
      }: {
        value: { _key?: string; alt?: string; caption?: string; asset?: { _ref: string } }
      }) => {
        const n = value._key ? figureNumbers.get(value._key) : undefined
        return (
          <figure className="my-6">
            <SanityImage
              sanitySrc={value as never}
              width={1200}
              height={800}
              alt={value.alt || ''}
              className="w-full h-auto"
            />
            {(n !== undefined || value.caption) && (
              <figcaption className="mt-2.5 flex items-baseline gap-2.5 text-muted">
                {n !== undefined && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] whitespace-nowrap flex-shrink-0">
                    Fig. {String(n).padStart(2, '0')}
                  </span>
                )}
                {value.caption && <span className="text-sm leading-snug">{value.caption}</span>}
              </figcaption>
            )}
          </figure>
        )
      },
      // The fenced code block is an always-dark Sonokai panel, independent of the
      // site's light/dark mode (Phil's call — it mirrors his editor). The <pre>
      // carries the Sonokai panel background/foreground; the highlighter's own
      // background is forced transparent so its tokens sit on the panel. Inline
      // `code` (the marks.code above) stays on the Forest --code-bg, unchanged.
      code: ({ value }: { value: { language?: string; code: string } }) => (
        <pre
          className="relative rounded-sm p-4 pt-7 text-[14.5px] leading-relaxed overflow-x-auto my-6"
          style={{ background: sonokaiBg, color: sonokaiFg }}
        >
          {value.language && (
            <span
              className="absolute top-1.5 right-3 font-mono text-[10.5px] uppercase tracking-[0.1em]"
              style={{ color: sonokaiDim }}
            >
              {value.language}
            </span>
          )}
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={sonokai}
            wrapLongLines
            customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
          >
            {value.code}
          </SyntaxHighlighter>
        </pre>
      ),
      latex: ({ value }: { value: { latex_string: string } }) => (
        <div className="my-6 overflow-x-auto">
          <Latex>{value.latex_string}</Latex>
        </div>
      ),
      external: ({ value }: { value: { link_to_html: string; width?: number; height?: number } }) => {
        const ratio = value.width && value.height ? `${(value.height / value.width) * 100}%` : '56.25%'
        // paddingBottom is dynamic (computed per-embed aspect ratio), so it stays inline.
        return (
          <div className="my-6 relative" style={{ paddingBottom: ratio }}>
            <iframe src={value.link_to_html} className="absolute inset-0 w-full h-full" allowFullScreen />
          </div>
        )
      },
    },
  }

  return (
    <div className={compact ? 'text-[15px] leading-[1.6]' : 'text-[16px] leading-[1.7]'}>
      <PortableText components={components} value={value} />
    </div>
  )
}

export default PortableTextRenderer
