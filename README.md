# 网站

本站使用 [Docusaurus](https://docusaurus.io/) 构建。

## 写文档

内容都在 `docs/` 下。全局默认在 `docsDefaults.ts`。平时写文档不用改配置。

```text
docs/
  tutorial/          → 顶栏「Tutorial」
    intro.mdx
    ...
  guides/            → 顶栏「Guides」
  my-new-section/    → 新建目录 → 顶栏多一项
    page.mdx
```

只在需要特殊处理时覆盖：`_nav.json`（顶栏）、`_category_.json`（侧边栏目录）。发布一个版本文档：

```bash
npm run docs:version 1.0.0
```

## 安装

```bash
npm install
```

## 本地开发

```bash
npm run start
```

## 构建

```bash
npm run build
```

## 部署

地址和仓库写在 `.env`，不改 `docusaurus.config.ts`。这个文件可以随仓库一起提交。没有它时，复制一份：

```bash
cp .env.example .env
```

| 变量 | 填什么 |
| --- | --- |
| `URL` | 站点地址，例如 `https://<user>.github.io` |
| `BASE_URL` | 用户站填 `/`。项目站填 `/<repo>/`，开头和结尾都要有 `/` |
| `ORGANIZATION_NAME` | GitHub 用户名或组织名 |
| `PROJECT_NAME` | 仓库名 |
| `GIT_USER` | HTTPS 推送用的 GitHub 用户名 |

`make deploy` 会读取 `.env`，构建站点，并把 `build/` 推送到 `gh-pages` 分支。GitHub 仓库的 Pages 发布来源选这个分支。

```bash
make deploy
```

改用 SSH，或推到别的分支：

```bash
USE_SSH=true make deploy
DEPLOYMENT_BRANCH=<branch> make deploy
```
