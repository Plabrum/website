import Providers from 'components/ContextProviders'
import Header from 'components/site/Header'
import Footer from 'components/site/Footer'
import React from 'react'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="mx-auto max-w-wide px-7 pt-[72px] pb-28 max-sm:px-5 max-sm:pt-10 max-sm:pb-[72px]">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  )
}
