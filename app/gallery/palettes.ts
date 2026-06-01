// Local-only palette explorations for the "not in love with the color theme"
// conversation. Each palette is a full set of the tokens defined in
// styles/globals.css, for both light and dark. The gallery applies one set as
// scoped CSS custom properties so the real components re-skin live.
//
// The split-accent rule (see project-site-design memory) is preserved in every
// proposal: `--accent` is the on-`--bg` hue (lifted on dark for legibility),
// `--accent-deep` is the on-substrate hue (drop cap, code rule, quote marks).

export type PaletteVars = {
  '--bg': string
  '--bg-elev': string
  '--text': string
  '--text-strong': string
  '--muted': string
  '--rule': string
  '--code-bg': string
  '--accent': string
  '--accent-hover': string
  '--accent-deep': string
}

export type Palette = {
  id: string
  label: string
  blurb: string
  light: PaletteVars
  dark: PaletteVars
}

export const palettes: Palette[] = [
  {
    id: 'current',
    label: 'Current',
    blurb: 'The shipped Compendium palette — warm cream paper, near-black text, terracotta-rust → brass split accent.',
    light: {
      '--bg': '#fbfaf7',
      '--bg-elev': '#f4f0e6',
      '--text': '#1a1a1a',
      '--text-strong': '#0a0a0a',
      '--muted': '#6f6a60',
      '--rule': '#e8e3d8',
      '--code-bg': '#f4f0e6',
      '--accent': '#a8531f',
      '--accent-hover': '#7e3d15',
      '--accent-deep': '#a8531f',
    },
    dark: {
      '--bg': '#171410',
      '--bg-elev': '#1e1a14',
      '--text': '#f2ead8',
      '--text-strong': '#fbf5e6',
      '--muted': '#8a8170',
      '--rule': '#2b251c',
      '--code-bg': '#1a160f',
      '--accent': '#d9a05b',
      '--accent-hover': '#e8b878',
      '--accent-deep': '#b8662a',
    },
  },
  {
    id: 'ink',
    label: 'Ink Blue',
    blurb: 'Keep the warm paper, swap rust for a deep Prussian/ink blue. Classic editorial. Blue-on-walnut reads like "blue hour" in dark.',
    light: {
      '--bg': '#faf9f6',
      '--bg-elev': '#f0eee8',
      '--text': '#1a1a1a',
      '--text-strong': '#0a0a0a',
      '--muted': '#6b6a64',
      '--rule': '#e6e3db',
      '--code-bg': '#f0eee8',
      '--accent': '#2a4a6b',
      '--accent-hover': '#1d3550',
      '--accent-deep': '#233a55',
    },
    dark: {
      '--bg': '#171410',
      '--bg-elev': '#1e1a14',
      '--text': '#f2ead8',
      '--text-strong': '#fbf5e6',
      '--muted': '#8a8170',
      '--rule': '#2b251c',
      '--code-bg': '#1a160f',
      '--accent': '#7ea7cc',
      '--accent-hover': '#9bbcdb',
      '--accent-deep': '#5a7fa3',
    },
  },
  {
    id: 'oxblood',
    label: 'Oxblood',
    blurb: 'Smallest move from today — keep warm paper, deepen the accent from terracotta to a richer wine/oxblood. Leather-bound, not pottery.',
    light: {
      '--bg': '#fbfaf7',
      '--bg-elev': '#f4f0e6',
      '--text': '#1a1a1a',
      '--text-strong': '#0a0a0a',
      '--muted': '#6f6a60',
      '--rule': '#e8e3d8',
      '--code-bg': '#f4f0e6',
      '--accent': '#7a2233',
      '--accent-hover': '#5c1926',
      '--accent-deep': '#7a2233',
    },
    dark: {
      '--bg': '#171410',
      '--bg-elev': '#1e1a14',
      '--text': '#f2ead8',
      '--text-strong': '#fbf5e6',
      '--muted': '#8a8170',
      '--rule': '#2b251c',
      '--code-bg': '#1a160f',
      '--accent': '#c97a86',
      '--accent-hover': '#d8949e',
      '--accent-deep': '#a8505e',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    blurb: 'Warm paper, muted British-racing / pine green accent. Earthy and calm — reads like aged paper and ink.',
    light: {
      '--bg': '#faf9f4',
      '--bg-elev': '#eef0e9',
      '--text': '#1a1a1a',
      '--text-strong': '#0a0a0a',
      '--muted': '#6a6c62',
      '--rule': '#e4e6dc',
      '--code-bg': '#eef0e9',
      '--accent': '#2f5141',
      '--accent-hover': '#213a2f',
      '--accent-deep': '#2f5141',
    },
    dark: {
      '--bg': '#14140f',
      '--bg-elev': '#1b1c15',
      '--text': '#eee9d6',
      '--text-strong': '#f7f3e3',
      '--muted': '#87856f',
      '--rule': '#282a1f',
      '--code-bg': '#17170f',
      '--accent': '#7ba98a',
      '--accent-hover': '#95bfa1',
      '--accent-deep': '#5a8468',
    },
  },
  {
    id: 'cool',
    label: 'Cool Neutral',
    blurb: 'Drops the warmth entirely — clean near-white paper, cool grey text, a single restrained slate accent. Crisp and modern.',
    light: {
      '--bg': '#fcfcfb',
      '--bg-elev': '#f1f2f4',
      '--text': '#16181c',
      '--text-strong': '#060708',
      '--muted': '#6a6f78',
      '--rule': '#e4e6ea',
      '--code-bg': '#f1f2f4',
      '--accent': '#3d5468',
      '--accent-hover': '#2b3e4f',
      '--accent-deep': '#3d5468',
    },
    dark: {
      '--bg': '#101215',
      '--bg-elev': '#181b1f',
      '--text': '#e8eaed',
      '--text-strong': '#f7f8fa',
      '--muted': '#828993',
      '--rule': '#25282d',
      '--code-bg': '#131519',
      '--accent': '#8fa8bd',
      '--accent-hover': '#a8bdce',
      '--accent-deep': '#6b8298',
    },
  },
]
