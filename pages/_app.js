import '../styles/styles.css'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

export default function KublingDocs({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}