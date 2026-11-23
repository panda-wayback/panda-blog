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

`make deploy` builds the site and pushes `build/` to the `gh-pages` branch. It is the same command as `npm run deploy`.

Set these in `docusaurus.config.ts` before the first deploy. The values there are still the template placeholders.

| Field | Value |
| --- | --- |
| `organizationName` | GitHub user or organization |
| `projectName` | Repository name |
| `url` | Public site URL, such as `https://<user>.github.io` |
| `baseUrl` | `/` for a user site (`<user>.github.io`). `/<repo>/` for a project site |

In the GitHub repository, set Pages to publish from the `gh-pages` branch.

SSH, when this machine can already push to GitHub over SSH:

```bash
USE_SSH=true make deploy
```

HTTPS:

```bash
GIT_USER=<GitHub username> make deploy
```

Another branch, instead of `gh-pages`:

```bash
DEPLOYMENT_BRANCH=<branch> USE_SSH=true make deploy
```
