import { useEffect } from 'react';
import Head from 'next/head';
import hljs from 'highlight.js';
import type { AppProps } from 'next/app';
import { title } from 'lib/helpers';
import Layout from '@/components/Layout';
import MundanaScripts from '@/components/Meta/MundanaScripts';
import 'styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.hljs = hljs;
  }, []);

  return (
    <>
      <Head>
        <title>{title('تعرف على طرق الربح من الانترنت')}</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <MundanaScripts />
    </>
  );
}

export default App;
