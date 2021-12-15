import React from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import PageNavbar from '@/components/PageNavbar';

const Posts: NextPage = () => {
  return (
    <AppLayout>
      <PageNavbar />
    </AppLayout>
  );
};

export default Posts;
