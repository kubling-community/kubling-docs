/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
}

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
  })
  
  module.exports = withNextra({
    // Standard Next.js options
    output: 'standalone',
  });