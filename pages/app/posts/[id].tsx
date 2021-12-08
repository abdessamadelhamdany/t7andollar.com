import React from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import dynamic from 'next/dynamic';

const RichText = dynamic(() => import('@/components/RichText'), {
  ssr: false,
});

const EditPost: NextPage = () => {
  return (
    <AppLayout>
      <div>
        <RichText />
      </div>
    </AppLayout>
  );
};

export default EditPost;
