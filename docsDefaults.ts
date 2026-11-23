/**
 * Single source of truth for docs site behavior.
 *
 * Daily writing: only edit files under docs/.
 * Override only when special:
 * - top-level section → docs/<section>/_nav.json
 * - nested category   → docs/.../<folder>/_category_.json
 * - single page       → front matter (sidebar_position / sidebar_label / ...)
 */
export const docsDefaults = {
  /** Nested folder categories in the sidebar */
  category: {
    /** `getting-started` → `Getting Started` when no _category_.json label */
    titleCaseLabel: true,
    /** Category click opens generated index if no index.md / explicit link */
    generatedIndex: true,
    collapsible: true,
    /** Deep trees stay compact; open the active path only */
    collapsed: true,
  },

  /**
   * Docs plugin options applied to every page.
   * @see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs
   */
  plugin: {
    breadcrumbs: true,
    /** Needs full git history in CI (fetch-depth: 0) */
    showLastUpdateTime: true,
    showLastUpdateAuthor: false,
    includeCurrentVersion: true,
    /**
     * Set your real repo when ready, e.g.
     * 'https://github.com/org/repo/tree/main/'
     * Leave undefined to hide "Edit this page".
     */
    editUrl: undefined as string | undefined,
  },

  /** themeConfig.docs — sidebar UX */
  themeDocs: {
    sidebar: {
      hideable: true,
      autoCollapseCategories: true,
    },
  },

  /** In-page TOC */
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  },

  /**
   * Extra Prism languages beyond the defaults.
   * Add here instead of touching docusaurus.config for each language.
   */
  prismLanguages: [
    'bash',
    'json',
    'typescript',
    'javascript',
    'jsx',
    'tsx',
    'css',
    'diff',
    'yaml',
    'markdown',
    'cpp',
    'python',
  ],

  /**
   * Local search (@easyops-cn/docusaurus-search-local).
   * Docusaurus has no built-in search; Algolia needs an external account.
   * Local search indexes docs at build time — no third-party service.
   */
  search: {
    hashed: true,
    language: ['en', 'zh'] as string[],
    indexDocs: true,
    indexBlog: false,
    indexPages: false,
    docsRouteBasePath: 'docs',
    highlightSearchTermsOnTargetPage: true,
  },
} as const;
