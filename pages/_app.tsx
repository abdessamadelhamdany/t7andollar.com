import { useEffect } from 'react';
import Head from 'next/head';
import hljs from 'highlight.js';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from 'store';
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

      <Provider store={store}>
        <Layout authUser={pageProps.authUser}>
          <Component {...pageProps} />
        </Layout>
      </Provider>

      <MundanaScripts />
    </>
  );
}

export default App;
