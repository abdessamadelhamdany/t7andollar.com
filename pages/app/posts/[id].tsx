import React from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import dynamic from 'next/dynamic';
import Input from '@/components/Input';

const RichText = dynamic(() => import('@/components/RichText'), {
  ssr: false,
});

const EditPost: NextPage = () => {
  const handleSubmit = () => {};

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <Input type="text" placeholder="العنوان" />

          <RichText dir="RTL" />
        </div>
      </form>
    </AppLayout>
  );
};

export default EditPost;
