# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Write docs (usual workflow)

Everything lives under `docs/`. Global defaults are in `docsDefaults.ts`. You do **not** need to touch config for normal writing.

```text
docs/
  tutorial/          → top navbar "Tutorial"
    intro.mdx
    ...
  guides/            → top navbar "Guides"
  my-new-section/    → new folder → new navbar item
    page.mdx
```

Optional overrides only when special: `_nav.json` (top bar), `_category_.json` (sidebar folder). Publish a version with:

```bash
npm run docs:version 1.0.0
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

## Build

```bash
npm run build
```

## Deployment

```bash
USE_SSH=true npm run deploy
# or
GIT_USER=<Your GitHub username> npm run deploy
```
