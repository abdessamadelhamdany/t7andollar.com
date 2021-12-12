import '../styles/globals.scss';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { title } from 'lib/helpers';
import Layout from '@/components/Layout';
import MundanaScripts from '@/components/Meta/MundanaScripts';

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;
