import Head from 'next/head';
import router from 'next/router';
import React, { FormEvent, useState } from 'react';
import { NextPage, GetStaticPropsResult } from 'next';
import { parseForm, title } from 'lib/helpers';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import FormCardSubmit from '@/components/FormCardSubmit';
import FormCardTitle from '@/components/FormCardTitle';
import FormCard from '@/components/FormCard';
import Input from '@/components/Input';
import FormError from '@/components/FormError';

interface Props {}

const App: NextPage<Props> = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedForm = parseForm(e);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedForm),
    });
    const data = await res.json();

    if (data.error) {
      setError(
        {
          Unauthorized: 'المعلومات غير صحيحة',
          'Not Found': 'المستخدم غير مسجل',
        }[data.error] || 'نعتذر حدث خطأ ما.'
      );
      return;
    }

    if (data.data) {
      await router.push('/app');
      return;
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>{title('تسجيل الدخول')}</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <FormCard maxWidth="720px">
          <FormCardTitle>تسجيل الدخول</FormCardTitle>

          <div className="input-wrapper">
            <label htmlFor="email">البريد الألكتروني</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="البريد الألكتروني"
            />

            <label htmlFor="password">كلمة السر</label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="كلمة السر"
            />

            {error && <FormError>{error}</FormError>}

            <label>
              <Input type="checkbox" name="remember" value="true" />
              تذكرني
            </label>

            <FormCardSubmit>تسجيل الدخول</FormCardSubmit>
          </div>
        </FormCard>
      </form>
      <style jsx>
        {`
          .input-wrapper {
            max-width: 80%;
            margin: 0 auto;
          }
          .input-wrapper label {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </AppLayout>
  );
};

export default App;
