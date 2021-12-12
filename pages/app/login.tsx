import React, { FormEvent } from 'react';
import Head from 'next/head';
import { NextPage, GetStaticPropsResult } from 'next';
import { parseForm, title } from 'lib/helpers';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import FormCardSubmit from '@/components/FormCardSubmit';
import FormCardTitle from '@/components/FormCardTitle';
import FormCard from '@/components/FormCard';
import Input from '@/components/Input';

interface Props extends StaticProps {}

const App: NextPage<Props> = ({ appUrl }) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedForm = parseForm(e);
    const res = await fetch(`${appUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedForm),
    });
    const data = await res.json();

    console.log(data);
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

interface StaticProps {
  appUrl: string;
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StaticProps>
> {
  return {
    props: { appUrl: process.env.APP_URL },
  };
}

export default App;
