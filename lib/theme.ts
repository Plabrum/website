/**
 * Canonical palette literals — the "Forest" theme.
 *
 * `styles/globals.css` holds the CSS-variable copy that the browser uses: the
 * cascade needs real values in `:root` / `.dark`, and a `.css` file can't import
 * this module. This file exists for code that emits **standalone HTML which never
 * loads globals.css** — chiefly the RSS feed (`app/feed.xml/route.ts`), since feed
 * readers render our markup in their own document with no access to our stylesheet,
 * CSS variables, or `.dark` class. Inline literal styles are the only thing that
 * survives into that context.
 *
 * Keep these in sync with `styles/globals.css`. If you change a token here, change
 * it there too (and vice versa). The two copies are unavoidable — CSS and TS can't
 * share a source without a build step — so they cross-reference each other instead.
 */
export const theme = {
  light: {
    bg: '#faf9f4',
    bgElev: '#eef0e9',
    text: '#1a1a1a',
    textStrong: '#0a0a0a',
    muted: '#6a6c62',
    rule: '#e4e6dc',
    codeBg: '#eef0e9',
    accent: '#2f5141',
    accentHover: '#213a2f',
    accentDeep: '#2f5141'
  },
  dark: {
    bg: '#14140f',
    bgElev: '#1b1c15',
    text: '#eee9d6',
    textStrong: '#f7f3e3',
    muted: '#87856f',
    rule: '#282a1f',
    codeBg: '#17170f',
    accent: '#7ba98a',
    accentHover: '#95bfa1',
    accentDeep: '#5a8468'
  }
} as const
