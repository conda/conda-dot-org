import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Header from '../components/Header';
import Features from '../components/Features';
import News from '../components/News'; 
import styles from './index.module.css';

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
        <News />
      </main>
    </Layout>
  );
}
