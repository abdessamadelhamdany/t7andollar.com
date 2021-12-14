import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { title } from 'lib/helpers';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';

const App: NextPage = () => {
  return (
    <AppLayout>
      <Head>
        <title>{title('لوحة التحكم')}</title>
      </Head>

      <div>
        <Link href="/app/posts/new">
          <a>مقال جديد</a>
        </Link>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    props: {},
  };
};

export default App;
