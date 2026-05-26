'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'
import { createContext, useMemo } from 'react'
import SanityImage from '../general/SanityImage'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gruvboxDark, gruvboxLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { useTheme } from 'next-themes'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

const H2NumberContext = createContext<Map<string, number>>(new Map())

function useH2Numbers(value: PortableTextBlock[] | undefined) {
  return useMemo(() => {
    const map = new Map<string, number>()
    if (!value) return map
    let n = 0
    for (const block of value) {
      const b = block as { _type?: string; _key?: string; style?: string }
      if (b._type === 'block' && b.style === 'h2' && b._key) {
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

const leadClass =
  'mb-[22px] first-letter:float-left first-letter:font-serif first-letter:text-[4.4em] first-letter:font-semibold first-letter:leading-[0.9] first-letter:pr-2.5 first-letter:pt-1.5 first-letter:text-accent-deep'

export function PortableTextRenderer({
  value,
  lead = true,
}: {
  value: PortableTextBlock[]
  lead?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const h2Numbers = useH2Numbers(value)

  // Mark the first plain-text paragraph long enough to hold the drop cap as the lead.
  // Short opening paragraphs (e.g. "Overview:") would let the floated cap spill into
  // the next paragraph and wrap its text awkwardly.
  const leadKey = useMemo(() => {
    if (!lead) return undefined
    for (const b of value || []) {
      const block = b as {
        _type?: string
        style?: string
        _key?: string
        children?: Array<{ text?: string }>
      }
      if (block._type !== 'block' || (block.style && block.style !== 'normal')) continue
      const text = (block.children || []).map((c) => c.text || '').join('').trim()
      if (text.length >= 180) return block._key
    }
    return undefined
  }, [value, lead])

  const components: PortableTextComponents = {
    block: {
      normal: ({ children, value: v }) => {
        const isLead = (v as { _key?: string })?._key === leadKey
        return <p className={isLead ? leadClass : 'mb-[22px]'}>{children}</p>
      },
      h2: ({ children, value: v }) => {
        const key = (v as { _key?: string })?._key
        const n = key ? h2Numbers.get(key) : undefined
        const id = slugifyChildren(children)
        return (
          <h2
            id={id}
            className="font-sans text-[13px] uppercase tracking-[0.12em] font-normal text-text mt-[52px] mb-4"
          >
            {n !== undefined && <span className="text-accent mr-2 font-semibold">§ {n}</span>}
            {children}
          </h2>
        )
      },
      h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>,
      h4: ({ children }) => <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="my-8 pl-6 border-l-[3px] border-accent text-text italic text-[19px] opacity-95">
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
      pullQuote: ({ value }: { value: { text: string } }) => (
        <aside className="font-serif italic text-[26px] leading-[1.35] text-text-strong text-center -mx-10 my-11 py-1.5 relative before:content-['\\201C'] before:block before:text-5xl before:leading-[0.4] before:text-accent before:mb-[18px] before:not-italic after:content-['\\201D'] after:block after:text-5xl after:leading-[0] after:text-accent after:mt-6 after:not-italic max-sm:mx-0 max-sm:text-[22px] max-sm:my-9">
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
      image: ({ value }: { value: { alt?: string; caption?: string; asset?: { _ref: string } } }) => (
        <figure className="my-6">
          <SanityImage
            sanitySrc={value as never}
            width={1200}
            height={800}
            alt={value.alt || ''}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-muted">{value.caption}</figcaption>
          )}
        </figure>
      ),
      code: ({ value }: { value: { language?: string; code: string } }) => (
        <pre className="relative bg-code-bg border-l-2 border-accent-deep/65 rounded-r-sm p-4 text-[14.5px] leading-relaxed overflow-x-auto my-6 text-text">
          {value.language && (
            <span className="absolute top-0 right-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted bg-accent/10 px-2 py-[3px] rounded-bl-sm">
              {value.language}
            </span>
          )}
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={resolvedTheme === 'dark' ? gruvboxDark : gruvboxLight}
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
    <H2NumberContext.Provider value={h2Numbers}>
      <PortableText components={components} value={value} />
    </H2NumberContext.Provider>
  )
}

export default PortableTextRenderer
