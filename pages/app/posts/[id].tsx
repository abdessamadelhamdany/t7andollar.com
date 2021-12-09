import React, { FormEvent } from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import dynamic from 'next/dynamic';
import Input from '@/components/Input';
import FormHeader from '@/components/FormHeader';
import FormBody from '@/components/FormBody';
import FormSubmit from '@/components/FormSubmit';
import { parseForm } from 'lib/helpers';

const RichText = dynamic(() => import('@/components/RichText'), {
  ssr: false,
});

const EditPost: NextPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = parseForm(e);
    // TODO: save data
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          <FormSubmit>حفظ</FormSubmit>
        </FormHeader>

        <FormBody>
          <Input type="text" name="title" placeholder="العنوان" />
          <RichText dir="RTL" />
        </FormBody>
      </form>
    </AppLayout>
  );
};

export default EditPost;
