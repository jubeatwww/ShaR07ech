import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

type SidebarItem = { type: 'category', label: string, items: SidebarItem[] } | {
  type: 'doc',
  label?: string,
  id: string
};

const mapLabelForSidebar = (items: SidebarItem[], labelMap: Map<string, [string, string]>) => {
  items.forEach((item) => {
    if (item.type === 'category') {
      mapLabelForSidebar(item.items, labelMap);
    } else if (item.type === 'doc' && labelMap.has(item.id)) {
      const [tag, title] = labelMap.get(item.id)
      const label = tag.charAt(0).toUpperCase() + tag.slice(1)
      item.label = `[${label}] ${title}`
    }
  });
}

const config: Config = {
  title: 'ShaR07ech',
  tagline: 'A blog about programming, algorithms, and life.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.shar0.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jubeatwww', // Usually your GitHub org/user name.
  projectName: 'ShaR07ech', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          path: 'note-box/posts',
          exclude: ['.obsidian', '*.canvas'],
          breadcrumbs: true,
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          async sidebarItemsGenerator({
                                        defaultSidebarItemsGenerator,
                                        ...args
                                      }) {
            const labelMap = new Map<string, [string, string]>();
            args.docs.forEach((doc) => {
              if (doc.frontMatter?.tags?.length) {
                labelMap.set(doc.id, [doc.frontMatter.tags[0].toString(), doc.title]);
              }
            });
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            // @ts-ignore
            mapLabelForSidebar(sidebarItems, labelMap);
            return sidebarItems;
          },
        },
        blog: {
          path: 'note-box/blogs',
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'online-judge',
        path: 'note-box/leetcode',
        routeBasePath: 'oj',
        sidebarPath: './sidebarsOnlineJudge.ts',
        exclude: ['.obsidian', '*.canvas'],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        numberPrefixParser(filename: string) {
          /*
          @example filename = '1. Two Sum.md'
          * */
          const numberPrefix = filename.match(/^\d+/)?.[0];
          if (numberPrefix) {
            return {
              numberPrefix: numberPrefix.slice(0, -1).padStart(4, '0'),
              filename,
            };
          }
          return {numberPrefix: undefined, filename};
        },
        async sidebarItemsGenerator({
                                      defaultSidebarItemsGenerator,
                                      ...args
                                    }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          for (const item of sidebarItems) {
            if (item.type === 'doc') {
              item.label = item.id;
            }
          }
          return sidebarItems;
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-1P40RLG7NV',
      async: true,
    }
  ],

  headTags: [
    {
      tagName: 'script',
      innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1P40RLG7NV');`,
      attributes: {
        type: 'text/javascript',
      },
    }
  ],

  themeConfig: {
    navbar: {
      title: 'ShaR07ech',
      logo: {
        alt: 'ShaR07ech Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '筆記',
        },
        {
          type: 'docSidebar',
          sidebarId: 'onlineJudgeSidebar',
          position: 'left',
          label: '解題',
          docsPluginId: 'online-judge',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/jubeatwww',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/l6104400',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/JubeatWw',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jubeatwww',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} jubeatwww. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'hcl', 'promql', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
