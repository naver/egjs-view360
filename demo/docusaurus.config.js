// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const darkCodeTheme = require("prism-react-renderer/themes/palenight");
const glslify = require("./plugin/glslify");
const preloadFont = require("./plugin/preload-font");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "View360",
  tagline: "360 integrated viewing solution from inside-out view to outside-in view. It provides user-friendly service by rotating 360 degrees through various user interaction such as motion sensor and touch.",
  url: "https://naver.github.io",
  baseUrl: "/egjs-view360/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "naver",
  projectName: "naver.github.io",
  trailingSlash: false,
  plugins: ["docusaurus-plugin-sass", glslify, preloadFont],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/naver/egjs-view360/edit/master/demo/",
          remarkPlugins: [require("remark-breaks")],
          breadcrumbs: false
        },
        pages: {
          remarkPlugins: [require("remark-breaks")]
        },
        theme: {
          customCss: [
            require.resolve("./src/styles/custom.css"),
            require.resolve("./src/styles/global.css"),
            require.resolve("../sass/view360.sass")
          ]
        },
        googleAnalytics: {
          trackingID: "UA-70842526-23",
          anonymizeIP: true
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "View360",
        logo: {
          alt: "egjs",
          src: "img/cube.svg",
          srcDark: "img/cube_white.svg"
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
            docId: "options/PanoViewer/source/src",
            label: "Options",
            position: "left"
          },
          {
            type: "doc",
            docId: "events/ready",
            label: "Events",
            position: "left"
          },
          {
            type: "doc",
            docId: "api/Class/PanoViewer",
            label: "API",
            position: "left"
          },
          {
            type: "search",
            position: "right",
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
                label: "Getting Started",
                to: "docs/"
              },
              {
                label: "Options",
                to: "docs/options/PanoViewer/source/src"
              },
              {
                label: "Events",
                to: "docs/events/ready"
              },
              {
                label: "API",
                to: "docs/api/Class/PanoViewer"
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
        copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus & Bulma.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
