import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import Image from "next/image";
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  head: (
    <>
      <link rel="icon" href="/img/favicon.png" />
    </>
  ),
  logo: (
    <picture>
      <Image
        src="/img/logo.svg"
        alt="Kubling"
        width={140}
        height={30}
        className="max-w-full"
      />
    </picture>
  ),
  project: {
    link: 'https://github.com/kubling-community',
  },
  docsRepositoryBase: 'https://github.com/kubling-community/kubling-docs',
  editLink: { component: null },
  footer: {
    text: 'Kubling Documentation',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Kubling Docs'
      }
    }
  }
}

export default config