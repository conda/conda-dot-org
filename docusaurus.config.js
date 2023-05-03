// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'conda.org',
  tagline: 'Package and environment management for any language and platform',
  url: 'https://conda.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'conda-incubator', // Usually your GitHub org/user name.
  projectName: 'conda-dot-org', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: '/js/count.js', defer: true, 'data-goatcounter': 'https://conda-dot-org.goatcounter.com/count',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'learn',
          routeBasePath: 'learn',
          sidebarPath: require.resolve('./src/sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
          'https://github.com/conda-incubator/conda-dot-org/tree/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/conda-incubator/conda-dot-org/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'The conda logo',
          src: 'img/conda_logo.svg',
        },
        items: [
          {
            // type=doc entries need a docId that corresponds to
            // a filename under docs/, without extension
            type: 'doc',
            docId: 'faq',
            position: 'left',
            label: 'Learn',
          },
          {
            to: '/community',
            position: 'left',
            label: 'Community',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/conda',
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
                label: 'Discourse Forum',
                href: 'https://conda.discourse.group/',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/conda%20or%20miniconda%20or%20conda-forge?sort=Newest&edited=true',
              },
              {
                label: 'Matrix Chat',
                href: 'https://matrix.to/#/#conda:matrix.org',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/condaproject',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Style Guide',
                to: '/style-guide',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/conda-incubator/conda-dot-org',
              },
              {
                label: 'Analytics Dashboard',
                href: 'https://conda-dot-org.goatcounter.com/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Conda Community. <br /> Built with Docusaurus. This site is powered by <a href="https://www.netlify.com/" target="_blank" title="Powered by Netlify">Netlify</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],
};

module.exports = config;
