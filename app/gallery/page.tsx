import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Gallery from './Gallery'

// Local-only color-theme explorer. Returns 404 in production builds so it never
// ships, and is excluded from indexing as a belt-and-suspenders measure.
export const metadata: Metadata = {
  title: 'Palette gallery (local)',
  robots: { index: false, follow: false },
}

export default function GalleryPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <Gallery />
}
