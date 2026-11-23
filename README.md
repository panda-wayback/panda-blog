# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Write docs (usual workflow)

Everything lives under `docs/`. There is no separate blog. You do **not** need to touch `docusaurus.config.ts` to add sections or pages.

```text
docs/
  tutorial/          → top navbar "Tutorial"
    intro.mdx
    ...
  guides/            → top navbar "Guides"
    writing-docs.mdx
  my-new-section/    → add a folder → new navbar item
    _nav.json        → optional: { "label": "...", "position": 3 }
    page.mdx
```

Nested folders become the sidebar. Publish a version snapshot with:

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
