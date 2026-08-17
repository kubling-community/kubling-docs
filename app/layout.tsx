import type { Metadata } from 'next'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import '../styles/styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.kubling.com'),
  title: {
    default: 'Kubling Documentation',
    template: '%s – Kubling Docs'
  },
  description:
    'Kubling technical documentation: engine, integrations, query language, and more.',
  icons: {
    icon: '/img/favicon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.kubling.com',
    siteName: 'Kubling Docs'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kubling',
    site: '@kubling'
  }
}

const navbar = (
  <Navbar
    logo={
      <Image
        src="/img/logo.svg"
        alt="Kubling"
        width={257}
        height={90}
        className="max-w-full"
        style={{ width: '140px', height: 'auto' }}
        priority
      />
    }
    projectLink="https://github.com/kubling-community"
  />
)

const footer = <Footer>Kubling Documentation</Footer>

export default async function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/kubling-community/kubling-docs/tree/main"
          editLink={null}
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
