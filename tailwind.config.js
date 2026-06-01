/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '376px',
      ...defaultTheme.screens,
      sidenote: { min: '901px' }
    },
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'text': 'var(--text)',
        'text-strong': 'var(--text-strong)',
        'muted': 'var(--muted)',
        'rule': 'var(--rule)',
        'code-bg': 'var(--code-bg)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-deep': 'var(--accent-deep)',
        // shadcn token aliases mapped to project palette
        'background': 'var(--bg)',
        'foreground': 'var(--text)',
        'border': 'var(--rule)',
        'input': 'var(--rule)',
        'ring': 'var(--accent)',
        'primary': {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--bg)'
        },
        'secondary': {
          DEFAULT: 'var(--bg-elev)',
          foreground: 'var(--text)'
        },
        'destructive': {
          DEFAULT: '#c0392b',
          foreground: '#ffffff'
        },
        'popover': {
          DEFAULT: 'var(--bg)',
          foreground: 'var(--text)'
        },
        'card': {
          DEFAULT: 'var(--bg)',
          foreground: 'var(--text)'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif Pro', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        measure: '660px',
        wide: '1040px'
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
