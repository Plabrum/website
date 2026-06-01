import Providers from 'components/ContextProviders'
import Footer from 'components/site/Footer'
import SiteSidebar from 'components/site/SiteSidebar'
import React from 'react'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {/* Content column is centered in the viewport; SiteSidebar floats the nav
          into the left gutter on desktop and becomes a drawer on mobile. */}
      <div className="relative mx-auto max-w-measure px-5 pb-[72px] pt-16 md:px-7 md:pt-[72px]">
        <SiteSidebar />
        <main>{children}</main>
        <Footer />
      </div>
    </Providers>
  )
}
