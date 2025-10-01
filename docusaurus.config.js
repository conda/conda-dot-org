// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "conda.org",
  tagline: "Package and environment management for any language and platform",
  url: "https://conda.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "conda-incubator", // Usually your GitHub org/user name.
  projectName: "conda-dot-org", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  scripts: [
    {
      src: "/js/count.js",
      defer: true,
      "data-goatcounter": "https://conda-dot-org.goatcounter.com/count",
    },
  ],

  markdown: {
    format: "detect",
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "learn",
          routeBasePath: "learn",
          sidebarPath: "./learn/_sidebar.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/conda-incubator/conda-dot-org/tree/main",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/conda-incubator/conda-dot-org/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          // Expanding the alt text to indicate this redirects to conda.org
          alt: "The conda logo - Home conda.org",
          src: "img/conda_logo.svg",
        },
        items: [
          {
            to: "/learn",
            position: "left",
            label: "Learn",
          },
          {
            to: "/community",
            position: "left",
            label: "Community",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://docs.conda.io/",
            label: "Documentation",
            position: "left",
          },
          {
            href: "https://github.com/conda",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discourse Forum",
                href: "https://conda.discourse.group/",
              },
              {
                label: "Matrix Chat",
                href: "https://matrix.to/#/#conda:matrix.org",
              },
              {
                label: "Mastodon",
                href: "https://fosstodon.org/@conda",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/company/condacommunity/",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/conda%20or%20miniconda%20or%20conda-forge?sort=Newest&edited=true",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog archive",
                to: "/blog/archive",
              },
              {
                label: "Style Guide",
                to: "/style-guide",
              },
              {
                label: "GitHub",
                href: "https://github.com/conda-incubator/conda-dot-org",
              },
              {
                label: "Analytics Dashboard",
                href: "https://conda-dot-org.goatcounter.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Conda Community. <br /> Built with Docusaurus. This site is powered by <a href="https://www.netlify.com/" target="_blank" class="footer-link" title="Powered by Netlify">Netlify</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "0ODKLVRPCZ",

        // Public API key: it is safe to commit it
        apiKey: "cf5a5b2ee2c9278e23e79ac023bd5c7f",

        indexName: "condaorg",

        // Optional: see doc section below
        contextualSearch: true,

        /* Optional: Replace parts of the item URLs from Algolia.
        Useful when using the same search index for multiple deployments using
        a different baseUrl. You can use regexp or string in the `from` param.
        For example: localhost:3000 vs myCompany.com/docs */
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: false,

        // ... other Algolia params
        insights: true,
        debug: false, // Set debug to true if you want to inspect the modal
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: "./community/_sidebar.js",
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          // This function takes the contents of sidebarPath, and will return
          // only the entries that had to be autogenerated (i.e. meeting minutes)
          // We reverse them and return them
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          /* eslint no-restricted-syntax: ["off", "ForOfStatement"] */
          for (const item of sidebarItems) {
            if (item.id.includes("minutes")) {
              sidebarItems.reverse();
              break;
            }
          }
          return sidebarItems;
        },
      },
    ],
  ],
};

module.exports = config;
