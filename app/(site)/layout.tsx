import Providers from 'components/ContextProviders'
import Sidebar from 'components/site/Sidebar'
import Footer from 'components/site/Footer'
import React from 'react'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="max-sm:flex-col max-sm:gap-10 max-sm:px-5 max-sm:pb-[72px] max-sm:pt-10 mx-auto flex max-w-wide gap-16 px-7 pb-28 pt-[72px]">
        <Sidebar />
        <div className="flex min-w-0 max-w-measure flex-1 flex-col">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </Providers>
  )
}
