// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const darkCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const remarkBreaks = require("remark-breaks");
const glslify = require("./plugin/glslify");
const preloadFont = require("./plugin/preload-font");
const view360Pkg = require("../packages/view360/package.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "View360",
  tagline: "360 integrated viewing solution from inside-out view to outside-in view. It provides user-friendly service by rotating 360 degrees through various user interaction such as motion sensor and touch.",
  url: "https://naver.github.io",
  baseUrl: "/egjs-view360/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "naver",
  projectName: "naver.github.io",
  trailingSlash: false,
  plugins: [
    "docusaurus-plugin-sass",
    glslify,
    preloadFont,
    [
      "content-pages",
      /** @type {import('@docusaurus/plugin-content-pages').Options} */
      ({
        id: "demo",
        path: "demo/pages",
        routeBasePath: "/demo",
        remarkPlugins: [remarkBreaks],
        mdxPageComponent: require.resolve("./demo/layout/index.tsx")
      })
    ]
  ],
  clientModules: [
    require.resolve("./polyfill.js")
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/naver/egjs-view360/edit/master/demo/",
          remarkPlugins: [remarkBreaks],
          lastVersion: "current",
          versions: {
            current: {
              label: `v${view360Pkg.version}`
            }
          },
          breadcrumbs: false
        },
        pages: {
          remarkPlugins: [remarkBreaks]
        },
        theme: {
          customCss: [
            require.resolve("../packages/view360/sass/view360.sass"),
            require.resolve("typedoc-to-mdx/sass/theme.sass"),
            require.resolve("./src/styles/custom.css"),
            require.resolve("./src/styles/global.css"),
          ]
        },
        googleAnalytics: {
          trackingID: "UA-70842526-23",
          anonymizeIP: true
        }
      })
    ]
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"]
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true
        }
      },
      navbar: {
        title: "View360",
        logo: {
          alt: "egjs",
          src: "icon/view360.svg",
          srcDark: "icon/view360_white.svg"
        },
        items: [
          {
            type: "doc",
            docId: "tutorials/installation",
            label: "Tutorials",
            position: "left"
          },
          {
            type: "doc",
            docId: "projections/projections-basics",
            label: "Projections",
            position: "left"
          },
          {
            type: "doc",
            docId: "options/options-basics",
            label: "Options",
            position: "left"
          },
          {
            type: "doc",
            docId: "events/events-basics",
            label: "Events",
            position: "left"
          },
          {
            type: "doc",
            docId: "plugins/plugins-basics",
            label: "Plugins",
            position: "left"
          },
          {
            to: "/demo",
            label: "Demo",
            position: "left"
          },
          {
            type: "doc",
            docId: "api/Class/View360",
            label: "API",
            position: "left"
          },
          {
            type: "search",
            position: "right",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                to: "https://naver.github.io/egjs-view360/v3/",
                label: "v3"
              }
            ]
          },
          {
            type: "localeDropdown",
            position: "right"
          },
          {
            href: "https://www.npmjs.com/package/@egjs/view360",
            className: "header-npm-link",
            "aria-label": "NPM Package",
            position: "right"
          },
          {
            href: "https://github.com/naver/egjs-view360",
            className: "header-github-link",
            "aria-label": "GitHub Repository",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorials",
                to: "docs/"
              },
              {
                label: "Projections",
                to: "docs/projections"
              },
              {
                label: "Options",
                to: "docs/options"
              },
              {
                label: "Events",
                to: "docs/events/ready"
              },
              {
                label: "Plugins",
                to: "docs/plugins"
              },
              {
                label: "API",
                to: "docs/api/Class/View360"
              }
            ]
          },
          {
            title: "Demo",
            items: [
              {
                label: "Demo",
                to: "demo"
              }
            ]
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/naver/egjs-view360"
              },
              {
                label: "Issues",
                href: "https://github.com/naver/egjs-view360/issues"
              },
              {
                label: "Naver Open Source",
                href: "https://naver.github.io/"
              }
            ]
          }
        ],
        logo: {
          alt: "egjs",
          src: "img/egjs_white.svg",
          href: "https://naver.github.io/egjs/"
        },
        copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
    })
};

module.exports = config;
