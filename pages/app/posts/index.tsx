import React from 'react';
import { NextPage } from 'next';
import AppLayout from '@/components/AppLayout';
import AppPostsNavbarNav from '@/components/PageNavbar/AppPostsNavbarNav';

const Posts: NextPage = () => {
  return (
    <AppLayout pageNavbarNav={<AppPostsNavbarNav />}>
      <h2>Posts</h2>
    </AppLayout>
  );
};

export default Posts;
