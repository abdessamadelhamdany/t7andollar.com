import React from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import dynamic from 'next/dynamic';

const RichText = dynamic(() => import('@/components/RichText'));

const EditPost: NextPage = () => {
  return (
    <AppLayout>
      <RichText />
    </AppLayout>
  );
};

export default EditPost;
