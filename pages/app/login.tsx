import Head from 'next/head';
import router from 'next/router';
import React, { FormEvent, useState } from 'react';
import { NextPage } from 'next';
import { parseForm, title } from 'lib/helpers';
import Input from '@/components/Input';
import FormCard from '@/components/FormCard';
import AppLayout from '@/components/AppLayout';
import FormError from '@/components/FormError';
import FormCardTitle from '@/components/FormCardTitle';
import FormCardSubmit from '@/components/FormCardSubmit';
import { useUser } from 'store/hooks';

interface Props {}

const Login: NextPage<Props> = () => {
  const { login } = useUser();
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, remember } = parseForm(e);

    try {
      await login(email.toString(), password.toString(), remember?.toString());
      await router.push('/app');
    } catch (error: any) {
      setError(error.message);
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

            <label className="remember-label">
              <Input type="checkbox" name="remember" value="true" />
              تذكرني
            </label>

            <FormCardSubmit className="submit">تسجيل الدخول</FormCardSubmit>
          </div>
        </FormCard>
      </form>
      <style jsx>
        {`
          form {
            margin-top: 3rem;
          }
          .input-wrapper {
            max-width: 80%;
            margin: 0 auto;
          }
          .input-wrapper label {
            display: flex;
            align-items: center;
          }
          .remember-label {
            margin-bottom: 2rem;
          }
        `}
      </style>
    </AppLayout>
  );
};

export default Login;
