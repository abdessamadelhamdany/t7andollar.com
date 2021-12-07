import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import Layout from '@/components/Layout';
import MundanaScripts from '@/components/MundanaScripts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>

      <MundanaScripts />
    </>
  );
}

export default MyApp;
