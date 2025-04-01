const path = require('path');
const {themes} = require('prism-react-renderer');

module.exports = {
  title: 'MONEI Documentation',
  url: 'https://docs.monei.com',
  tagline: 'Explore our guides and examples to integrate MONEI',
  trailingSlash: true,
  baseUrl: '/',
  favicon: 'https://assets.monei.com/images/icon.png',
  future: {
    experimental_faster: true
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'light'
    },
    prism: {
      theme: themes.nightOwl,
      additionalLanguages: ['php', 'bash']
    },
    algolia: {
      appId: '8G87BCQYSU',
      apiKey: '020dc2fc411d19f9f9dfe9d60c527139',
      indexName: 'monei',
      contextualSearch: true,
      searchParameters: {}
    },
    navbar: {
      title: 'MONEI',
      hideOnScroll: false,
      logo: {
        alt: 'MONEI',
        src: 'https://assets.monei.com/images/logo.svg'
      },
      items: [
        {
          to: 'getting-started/',
          label: 'Documentation',
          position: 'right',
          activeBaseRegex: '^/(?!apis/)'
        },
        {
          to: 'apis/rest/',
          label: 'API',
          position: 'right',
          activeBaseRegex: '^/apis/'
        },
        {
          to: 'https://support.monei.com',
          label: 'Support',
          position: 'right'
        },
        {
          to: 'https://dashboard.monei.com',
          label: 'Dashboard',
          position: 'right'
        }
      ]
    },
    languageTabs: [
      {
        highlight: 'javascript',
        language: 'javascript',
        logoClass: 'javascript',
        variants: ['node']
      },
      {
        highlight: 'python',
        language: 'python',
        logoClass: 'python',
        variants: ['python']
      },
      {
        highlight: 'php',
        language: 'php',
        logoClass: 'php',
        variants: ['php']
      }
    ],
    footer: {
      style: 'dark',
      copyright: `<p>Copyright © ${new Date().getFullYear()} MONEI — <a href="https://aws.amazon.com/es/blogs/startups/serverless-architecture-powers-moneis-fast-secure-and-scalable-digital-payment-solutions/" target="_blank" rel="noreferrer noopener">Winner of the AWS Startup Architecture Challenge 🏆</a></p><div class="footer-legal">MONEI DIGITAL PAYMENTS SL - ESB02660926 Palestina, 1, Entreplanta, 29007, Málaga, Spain BORME Registry Details: Registro Mercantil de MÁLAGA T 5998, L 4905, F 54, S 8,H MA158775, I/A 1 (14.01.21).  MONEI is a Payments Institution regulated by Banco de España with license number: 6911, and a Swift member with BIC number: MDIPES22. MONEI is member of the European Payments Council under the SRTP group.</div>`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'docs',
          path: 'docs',
          routeBasePath: '/',
          docItemComponent: '@theme/ApiItem',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/MONEI/docs/edit/master/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.7
        },
        googleTagManager: {
          containerId: 'GTM-NHS56QJ'
        }
      }
    ]
  ],
  plugins: [
    path.resolve(__dirname, './plugins/inject-scripts.js'),
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'rest',
        docsPluginId: 'rest',
        config: {
          api: {
            specPath: 'openapi.json',
            outputDir: 'docs/apis/rest',
            downloadUrl: 'https://js.monei.com/api/v1/openapi.json',
            hideSendButton: true,
            showExtensions: true,
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag'
            },
            showSchemas: true
          }
        }
      }
    ]
  ],
  themes: ['docusaurus-theme-openapi-docs']
};
