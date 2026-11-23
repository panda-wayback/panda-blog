import fs from 'fs';
import path from 'path';
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

const envFile = [process.cwd(), __dirname]
  .map((dir) => path.resolve(dir, '.env'))
  .find((file) => fs.existsSync(file));
if (envFile) {
  process.loadEnvFile(envFile);
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}，请写入 .env（可参考 .env.example）`);
  }
  return value;
}

function envBool(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined || value === '') {
    return fallback;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  throw new Error(`${name} 只能是 true 或 false`);
}

const siteTitle = '笔记';
const siteTagline = '按栏目阅读。';

const config: Config = {
  title: siteTitle,
  tagline: siteTagline,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: requiredEnv('URL'),
  baseUrl: requiredEnv('BASE_URL'),
  trailingSlash: envBool('TRAILING_SLASH', false),

  organizationName: requiredEnv('ORGANIZATION_NAME'),
  projectName: requiredEnv('PROJECT_NAME'),

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
