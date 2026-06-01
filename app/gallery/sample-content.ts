import { PortableTextBlock } from 'sanity'

// Sample Portable Text fed to the REAL PortableTextRenderer in the gallery, so
// the prose preview exercises the actual serializers (headings, link/code marks,
// blockquote, pull quote, code block, inline sidenote) rather than a copy of
// their markup. The figure/"Fig. NN" preview is rendered separately in Gallery.tsx
// (with a picsum placeholder) because the real image serializer is bound to
// SanityImage, which only emits Sanity-CDN URLs and can't render an external src.
export const sampleBlocks = [
  {
    _type: 'block',
    _key: 'lead',
    style: 'normal',
    markDefs: [{ _key: 'l1', _type: 'link', href: '#' }],
    children: [
      {
        _type: 'span',
        _key: 'l-a',
        text: 'Software engineer, currently building tools at the edge of where language models meet real codebases. I care about typography, plain text, and systems that still feel right in five years. Most of what I make is ',
        marks: [],
      },
      { _type: 'span', _key: 'l-b', text: 'quietly editorial', marks: ['l1'] },
      { _type: 'span', _key: 'l-c', text: ' rather than loud — restraint, not absence of design.', marks: [] },
    ],
  },
  {
    _type: 'block',
    _key: 'p2',
    style: 'normal',
    markDefs: [],
    children: [
      { _type: 'span', _key: 'p2-a', text: 'This paragraph carries an ', marks: [] },
      { _type: 'span', _key: 'p2-b', text: 'inline code span', marks: ['code'] },
      { _type: 'span', _key: 'p2-c', text: ' and a sidenote', marks: [] },
      {
        _type: 'sidenote',
        _key: 'sn1',
        text: 'On wide screens this pulls into the right margin; on narrow ones it collapses to an inline toggle.',
      },
      { _type: 'span', _key: 'p2-d', text: ' to test how the accent reads at small sizes against running prose.', marks: [] },
    ],
  },
  {
    _type: 'block',
    _key: 'h2a',
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: 'h2a-s', text: 'A section heading', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'p3',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'p3-s',
        text: 'Body text continues here so you can judge the muted tone, the rule colors, and the accent links in context. The goal is a palette that feels like the same place at two times of day.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'bq',
    style: 'blockquote',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'bq-s',
        text: 'A blockquote sits behind a three-pixel accent rule — a good test of how the accent holds up as a structural line rather than a glyph.',
        marks: [],
      },
    ],
  },
  {
    _type: 'pullQuote',
    _key: 'pq',
    text: 'The pull quote uses the on-bg accent for its big quotation marks.',
  },
  {
    _type: 'code',
    _key: 'code1',
    language: 'typescript',
    // A sample that touches most token classes so the Sonokai theme is fully
    // visible: comments, keywords, types, function names, built-ins, strings,
    // template literals, numbers, booleans, and operators.
    code: '// Load active users from the API\ninterface User {\n  id: number\n  name: string\n  active: boolean\n}\n\nasync function loadUsers(url: string): Promise<User[]> {\n  const res = await fetch(url)\n  const data: User[] = await res.json()\n  return data.filter((u) => u.active && u.id > 0)\n}\n\nconst LIMIT = 42\nconsole.log(`fetching up to ${LIMIT} users`)',
  },
  {
    _type: 'block',
    _key: 'h2b',
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: 'h2b-s', text: 'Lists, links, and structure', marks: [] }],
  },
] as unknown as PortableTextBlock[]
