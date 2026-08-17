import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/engine/script-context-members',
        destination: '/modules/script-context-members',
        permanent: true
      },
      {
        source: '/engine/ds/providers/:path*',
        destination: '/providers/:path*',
        permanent: true
      },
      {
        source: '/engine/ds/k8s',
        destination: '/providers/migration',
        permanent: true
      },
      {
        source: '/engine/ds/redis',
        destination: '/providers/migration',
        permanent: true
      },
      {
        source: '/engine/ds/cassandra',
        destination: '/providers/migration',
        permanent: true
      },
      {
        source: '/clients/dataviz/:path*',
        destination: '/clients/drivers/python',
        permanent: true
      }
    ]
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  }
})
