import Head from 'next/head';
import hljs from 'highlight.js';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from 'store';
import { title } from 'lib/helpers';
import Layout from '@/components/Layout';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MundanaScripts from '@/components/Meta/MundanaScripts';
import 'styles/globals.scss';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log({ path: router.asPath });

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
        <meta
          name="description"
          content="طحن الدولار هو موقع إلكتروني لتعلم طرق العمل على الإنترنت في شتى المجالات كما تعليم الأدوات مثل ووردبريس، بلوجر، تطوير مواقع الويب والعديد من المصادر التعليمية."
        />
        <meta
          name="keywords"
          content="العمل على الإنترنت, تحسين محركات البحث, انشاء المواقع الالكترونية, أخبار تقنية"
        />
        <title>{title('تعرف على طرق طرق العمل على الإنترنت')}</title>

        {process.env.NODE_ENV === 'production' &&
          !router.asPath.startsWith('/app') &&
          (!pageProps.authUser || pageProps.authUser.role !== Role.ADMIN) && (
            <GoogleAnalytics
              measurementId={process.env.ANALYTICS_MEASUREMENT_ID || ''}
            />
          )}
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
