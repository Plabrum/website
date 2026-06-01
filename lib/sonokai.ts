/**
 * Sonokai (Default variant) as a react-syntax-highlighter hljs style object.
 *
 * Sonokai isn't one of the library's bundled themes, so we hand-author it from the
 * official palette. The code block is rendered as an always-dark panel (Phil's
 * choice — it mirrors his editor regardless of the site's light/dark mode), so
 * there is no light counterpart here; the panel background/foreground constants
 * below are applied to the <pre> wrapper in components/portable-text.
 *
 * Palette: https://github.com/sainnhe/sonokai (Default)
 */

export const sonokaiBg = '#2c2e34' // panel background
export const sonokaiFg = '#e2e2e3' // default foreground
export const sonokaiDim = '#7f8490' // comments / muted (used for the language tag)

const red = '#fc5d7c'
const orange = '#f39660'
const yellow = '#e7c664'
const green = '#9ed072'
const blue = '#76cce0'
const purple = '#b39df3'

export const sonokai: Record<string, React.CSSProperties> = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    padding: '0.5em',
    background: sonokaiBg,
    color: sonokaiFg
  },
  'hljs-comment': { color: sonokaiDim, fontStyle: 'italic' },
  'hljs-quote': { color: sonokaiDim, fontStyle: 'italic' },
  'hljs-keyword': { color: red },
  'hljs-selector-tag': { color: red },
  'hljs-doctag': { color: red },
  'hljs-formula': { color: red },
  'hljs-operator': { color: orange },
  'hljs-literal': { color: purple },
  'hljs-number': { color: purple },
  'hljs-symbol': { color: purple },
  'hljs-string': { color: yellow },
  'hljs-regexp': { color: yellow },
  'hljs-meta-string': { color: yellow },
  'hljs-type': { color: blue, fontStyle: 'italic' },
  'hljs-built_in': { color: blue, fontStyle: 'italic' },
  'hljs-link': { color: blue, textDecoration: 'underline' },
  'hljs-title': { color: green },
  'hljs-section': { color: green },
  'hljs-name': { color: red },
  'hljs-tag': { color: sonokaiFg },
  'hljs-attr': { color: green },
  'hljs-attribute': { color: green },
  'hljs-selector-id': { color: green },
  'hljs-selector-class': { color: green },
  'hljs-selector-attr': { color: purple },
  'hljs-selector-pseudo': { color: purple },
  'hljs-params': { color: orange, fontStyle: 'italic' },
  'hljs-variable': { color: sonokaiFg },
  'hljs-template-variable': { color: sonokaiFg },
  'hljs-subst': { color: sonokaiFg },
  'hljs-bullet': { color: orange },
  'hljs-meta': { color: sonokaiDim },
  'hljs-addition': { color: green, backgroundColor: 'rgba(158, 208, 114, 0.1)' },
  'hljs-deletion': { color: red, backgroundColor: 'rgba(252, 93, 124, 0.1)' },
  'hljs-emphasis': { fontStyle: 'italic' },
  'hljs-strong': { fontWeight: 'bold' }
}
