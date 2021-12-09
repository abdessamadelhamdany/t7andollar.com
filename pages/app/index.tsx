import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
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
        <Link href="/app/posts/0">
          <a>مقال جديد</a>
        </Link>
      </div>
    </AppLayout>
  );
};

export default App;
