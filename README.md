<div align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="./public/img/logo.svg">
    <source media="(prefers-color-scheme: dark)" srcset="./public/img/logo-white.svg">
    <img alt="Kubling logo" src="./public/img/logo.svg" height="100">
  </picture>
</div>
<br>

# Kubling Documentation

This repository contains the source for the official
[Kubling documentation](https://docs.kubling.com). The site is built with
Next.js 16, Nextra 4, React 19, and Tailwind CSS 4.

## Local development

The required Node.js and npm versions are declared in `.nvmrc` and
`package.json`. With [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install
nvm use
npm install --global npm@12.0.2
npm ci
npm run dev
```

The development server is available at <http://localhost:3000>.
The first request may take around 20 seconds while Nextra compiles the MDX
catalog.

Before opening a pull request, run the same checks used by CI:

```bash
npm run check
```

## Docker

Build and run the production image locally:

```bash
docker build --tag kubling-docs:local .
docker run --rm --publish 3000:3000 kubling-docs:local
```

## Contributing

Documentation pages live in `content/` and use MDX. Navigation metadata is
defined in the adjacent `_meta.ts` files. Keep changes focused, verify links and
examples, and include the relevant product version when documenting behavior
that is version-specific.

Questions and documentation defects can be reported through
[GitHub Issues](https://github.com/kubling-community/kubling-docs/issues).

This project is licensed under the [Apache License 2.0](./LICENSE).
