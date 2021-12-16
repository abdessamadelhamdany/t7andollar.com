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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
          name="viewport"
        />
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
