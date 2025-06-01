import type { DocsThemeConfig } from 'nextra-theme-docs'
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: <picture style={{ fontWeight: 600 }}>
    <Image
      src="/img/logo.svg"
      alt="Kubling"
      width={140}
      height={30}
      className="max-w-full"
    />
  </picture>,
  project: {
    link: 'https://github.com/kubling-community',
  },
  docsRepositoryBase: 'https://github.com/kubling-community/kubling-docs',
  editLink: { component: null },
  footer: {
    content: 'Kubling Documentation',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Kubling documentation" />
      <link rel="icon" href="/img/favicon.png" />
    </>
  )
}

export default config
