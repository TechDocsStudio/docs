import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const features = [
  {
    title: 'Use a prebuilt payment page',
    description:
      'MONEI Hosted payment page is the simplest way to securely collect payments from your customers with multiple payment methods like Cards, PayPal, Bizum, GooglePay, Apple Pay & Installments by Cofidis.',
    url: '/integrations/use-prebuilt-payment-page'
  },
  {
    title: 'Build a custom checkout',
    description:
      'Use MONEI UI components to build your custom checkout and securely accept Cards, PayPal, Bizum, GooglePay, Apple Pay, multiple BNPL solutions, MB Way, SEPA Direct Debit and other payment methods.',
    url: '/integrations/build-custom-checkout'
  },
  {
    title: 'Integrate with multiple platforms',
    description:
      'Easily integrate MONEI with Shopify, Magento Commerce - Adobe, Wix, Salesforce Commerce Cloud, WooCommerce, PrestaShop, commercetools, Spreedly, saleor and other popular platforms.',
    url: '/getting-started#integrate-with-your-platform'
  },
  {
    title: 'Connect with business platforms and marketplaces',
    description:
      'Help your users/merchants accept more payment methods while saving time and money integrating payments into your business platform or marketplace.',
    url: '/monei-connect'
  }
];

function Feature({imageUrl, title, description, url}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>
        <Link to={url}>{title}</Link>
      </h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {tagline, title} = siteConfig;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:description" content={tagline} />
        {/* Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={tagline} />
        <meta property="og:image" content="/img/preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:image:alt" content={tagline} />

        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/img/preview.png" />
        <meta name="twitter:description" content={tagline} />
        <meta name="twitter:image:alt" content={tagline} />
      </Head>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Documentation</h1>
          <p className="hero__subtitle">{tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.getStarted)}
              to={useBaseUrl('getting-started/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
