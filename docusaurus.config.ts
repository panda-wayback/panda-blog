import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {docsDefaults} from './docsDefaults';
import {
  buildFooterDocItems,
  buildHomeSections,
  buildNavbarDocItems,
  sidebarItemsGenerator,
} from './docsSections';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteTitle = '笔记';
const siteTagline = '按栏目阅读。';

const config: Config = {
  title: siteTitle,
  tagline: siteTagline,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          breadcrumbs: docsDefaults.plugin.breadcrumbs,
          showLastUpdateTime: docsDefaults.plugin.showLastUpdateTime,
          showLastUpdateAuthor: docsDefaults.plugin.showLastUpdateAuthor,
          includeCurrentVersion: docsDefaults.plugin.includeCurrentVersion,
          ...(docsDefaults.plugin.editUrl
            ? {editUrl: docsDefaults.plugin.editUrl}
            : {}),
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        ...docsDefaults.search,
      },
    ],
  ],

  customFields: {
    sections: buildHomeSections(),
  },

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: docsDefaults.themeDocs,
    tableOfContents: docsDefaults.tableOfContents,
    navbar: {
      title: siteTitle,
      logo: {
        alt: siteTitle,
        src: 'img/logo.svg',
      },
      items: [
        ...buildNavbarDocItems(),
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '栏目',
          items: buildFooterDocItems(),
        },
      ],
      copyright: `© ${new Date().getFullYear()} ${siteTitle}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [...docsDefaults.prismLanguages],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
