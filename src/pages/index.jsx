import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Header from '../components/header';
import Features from '../components/features';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The place for everything regarding the conda packaging ecosystem"
    >
      <main>
        <Header />
        <Features />
      </main>
    </Layout>
  );
}
