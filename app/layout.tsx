import type { Metadata } from 'next'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { Banner, Head } from 'nextra/components'
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

const banner = (
  <Banner dismissible={false}>
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      <span>Migration guides:</span>
      <a
        href="/naming-migration"
        className="underline underline-offset-4 hover:no-underline"
      >
        Kubling 26.5 namespace, JDBC and error-code changes →
      </a>
      <a
        href="/cli/migration"
        className="underline underline-offset-4 hover:no-underline"
      >
        KDV 26.3 CLI project and test workflow changes →
      </a>
    </div>
  </Banner>
)

export default async function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
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
